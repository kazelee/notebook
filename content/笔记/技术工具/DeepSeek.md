## DeepSeek 峰谷时间说明

参考：[模型 & 价格 | DeepSeek API Docs](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)

> (2) 空闲时段价格为高峰时段价格的一半。北京时间周一至周五（不含中国法定节假日）9:00 - 12:00、14:00 - 18:00 为高峰时段；其余时段，包括周末及中国法定节假日全天均为空闲时段。

## 自用脚本：从 `conversations.json` 中提取 Markdown 文件

> [!warning]
>
> 该脚本已不再使用和维护。
> 理由：这种提取没有价值，会产生「归档了 = 学会了」的错觉。

```python title="deepseek-converter.py"
"""
从 conversations.json 文件中提取所有对话内容，包括深度思考和引用链接。

用法:
    python deepseek-converter.py conversations.json -o ./output/
"""

import json
import re
import os
from datetime import datetime
from urllib.parse import urlparse
from pathlib import Path
from typing import Dict, List, Any, Optional
import unicodedata

class DeepSeekJsonToMarkdown:
    def __init__(self, output_dir: str = "converted_conversations"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        
    def _clean_filename(self, title: str) -> str:
        """清理文件名，移除非法字符"""
        if not title:
            return "unnamed"
        
        # 首先去除前后空白
        title = title.strip()
        
        # 移除所有控制字符和不可见字符
        # 包括换行符\n、回车符\r、制表符\t等
        title = re.sub(r'[\x00-\x1F\x7F]', '', title)
        
        # 移除Windows文件名中的非法字符，并替换为下划线
        # Windows非法字符: <>:"/\|?*
        # 同时还包括一些其他可能的问题字符
        illegal_chars = r'[<>:"/\\|?*&\'`]'
        title = re.sub(illegal_chars, '_', title)
        
        # 移除或替换其他可能的问题字符
        title = re.sub(r'[\[\]{}()~!@#$%^+=;,]', '_', title)
        
        # 替换连续的多个下划线为单个下划线
        title = re.sub(r'_+', '_', title)
        
        # 移除文件名开头和结尾的下划线或点号
        title = title.strip('_. ')
        
        # 如果清理后为空，使用默认名称
        if not title:
            return "unnamed"
        
        # 限制长度
        if len(title) > 80:
            title = title[:80]
        
        return title
    
    def _parse_timestamp(self, timestamp_str: str) -> str:
        """解析时间戳为可读格式"""
        try:
            # 解析ISO格式时间戳，移除时区信息中的Z并正确处理
            if 'Z' in timestamp_str:
                timestamp_str = timestamp_str.replace('Z', '+00:00')
            dt = datetime.fromisoformat(timestamp_str)
            return dt.strftime("%Y-%m-%d %H:%M:%S")
        except Exception as e:
            print(f"解析时间戳失败: {timestamp_str}, 错误: {e}")
            return timestamp_str
    
    def _format_timestamp_for_filename(self, timestamp_str: str) -> str:
        """解析时间戳为文件名格式"""
        try:
            if 'Z' in timestamp_str:
                timestamp_str = timestamp_str.replace('Z', '+00:00')
            dt = datetime.fromisoformat(timestamp_str)
            return dt.strftime("%Y%m%d_%H%M%S")
        except Exception as e:
            print(f"解析文件名时间戳失败: {timestamp_str}, 错误: {e}")
            return datetime.now().strftime("%Y%m%d_%H%M%S")
    
    def _format_search_result(self, result: Dict, citation_index: str) -> str:
        """格式化单个搜索结果"""
        title = result.get('title', '无标题')
        snippet = result.get('snippet', '无描述')
        url = result.get('url', '')
        site_icon = result.get('site_icon', '')
        
        # 提取域名用于引用
        domain = urlparse(url).netloc if url else '未知网站'
        
        # 构建脚注格式
        icon_markdown = f"![]({site_icon})" if site_icon else ""
        
        # 清理片段文本，移除多余空格和换行
        cleaned_snippet = ' '.join(snippet.split())
        # 限制描述长度
        if len(cleaned_snippet) > 200:
            cleaned_snippet = cleaned_snippet[:200] + "..."
        
        formatted = (
            f"[^{citation_index}]: {url}\t"
            f"{icon_markdown} **{title}** "
            f"{cleaned_snippet}"
        )
        
        return formatted, domain
    
    def _process_fragment(self, fragment: Dict, node_id: str, 
                         search_results_cache: Dict) -> str:
        """处理单个片段"""
        fragment_type = fragment.get('type', '')
        content = fragment.get('content', '')
        
        if fragment_type == 'REQUEST':
            return f"# ❓ 问题\n\n# {content}\n\n"
        
        elif fragment_type == 'RESPONSE':
            # 替换citation引用
            def replace_citation(match):
                citation_num = match.group(1)
                return f"[^{node_id}-{citation_num}]"
            
            processed_content = re.sub(
                r'\[citation:(\d+)\]',
                replace_citation,
                content
            )
            return f"# 💬 回答\n\n{processed_content}\n\n"
        
        elif fragment_type == 'THINK':
            # 处理多行思考内容
            lines = content.split('\n')
            if lines:
                quoted_lines = [f"> {line}" for line in lines]
                think_content = '\n'.join(quoted_lines)
                return f"# 🤔 思考过程\n\n{think_content}\n\n"
            return ""
        
        elif fragment_type == 'SEARCH':
            results = fragment.get('results', [])
            if not results:
                return ""
                
            search_content = "# 🔍 搜索参考\n\n"
            
            # 存储搜索结果到缓存，用于后续生成脚注
            search_results_cache[node_id] = results
            
            for i, result in enumerate(results, 1):
                citation_id = f"{node_id}-{i}"
                formatted_result, domain = self._format_search_result(result, citation_id)
                # 简化显示，详细信息会在脚注中
                search_content += f"> **参考来源 {i}:** [{domain}]({result.get('url', '')})\n"
                search_content += f"> *摘要: {result.get('snippet', '无描述')[:100]}...*\n"
                search_content += f"> *详见脚注: [^{citation_id}]*\n\n"
            
            return search_content
        
        elif fragment_type == 'INTERNAL':
            return f"# ⚙️ 内部指令\n\n```\n{content}\n```\n\n"
        
        else:
            return f"# 📝 {fragment_type}\n\n{content}\n\n"
    
    def _build_conversation_tree(self, mapping: Dict) -> List[Dict]:
        """构建对话树结构"""
        conversation_tree = []
        
        def traverse_node(node_id: str, depth: int = 0):
            node = mapping.get(node_id)
            if not node:
                return
            
            message = node.get('message')
            if message:
                # 检查是否有有效片段
                fragments = message.get('fragments', [])
                if fragments:
                    conversation_tree.append({
                        'id': node_id,
                        'depth': depth,
                        'message': message,
                        'children': node.get('children', [])
                    })
            
            # 继续遍历子节点
            for child_id in node.get('children', []):
                traverse_node(child_id, depth + 1)
        
        # 从根节点开始遍历
        root_node = mapping.get('root')
        if root_node and root_node.get('children'):
            for child_id in root_node['children']:
                traverse_node(child_id)
        
        return conversation_tree
    
    def _generate_footnotes(self, search_results_cache: Dict) -> str:
        """生成脚注"""
        if not search_results_cache:
            return ""
        
        footnotes = "# 📚 参考资料\n\n"
        
        # 按照节点ID排序，确保一致的输出顺序
        for node_id in sorted(search_results_cache.keys()):
            results = search_results_cache[node_id]
            for i, result in enumerate(results, 1):
                citation_id = f"{node_id}-{i}"
                formatted_result, _ = self._format_search_result(result, citation_id)
                footnotes += f"{formatted_result}\n\n"
        
        return footnotes
    
    def convert_conversation(self, conversation: Dict) -> str:
        """转换单个对话为Markdown"""
        # 获取对话信息
        title = conversation.get('title', f"对话_{conversation.get('id', 'unknown')}")
        conversation_id = conversation.get('id', 'unknown')
        inserted_at = conversation.get('inserted_at', '')
        updated_at = conversation.get('updated_at', '')
        
        # 解析时间
        inserted_time = self._parse_timestamp(inserted_at)
        updated_time = self._parse_timestamp(updated_at)
        
        # 构建对话树
        mapping = conversation.get('mapping', {})
        conversation_tree = self._build_conversation_tree(mapping)
        
        # 缓存搜索结果用于生成脚注
        search_results_cache = {}
        
        # 生成Markdown内容
        markdown_content = f"# {title}\n\n"
        markdown_content += "---\n\n"
        markdown_content += f"**对话ID:** `{conversation_id}`  \n"
        markdown_content += f"**创建时间:** {inserted_time}  \n"
        markdown_content += f"**更新时间:** {updated_time}\n\n"
        markdown_content += "---\n\n"
        
        # 处理每个对话节点
        for node in conversation_tree:
            message = node['message']
            node_id = node['id']
            
            # 检查是否包含文件
            files = message.get('files', [])
            model = message.get('model', '未知模型')
            
            # 处理片段
            fragments = message.get('fragments', [])
            
            if not fragments:
                continue
            
            # 处理模型信息
            if model != '未知模型':
                markdown_content += f"## 🤖 {model}\n\n"
            
            # 处理所有片段
            for fragment in fragments:
                fragment_content = self._process_fragment(
                    fragment, node_id, search_results_cache
                )
                if fragment_content:
                    markdown_content += fragment_content
            
            # 如果有文件，添加文件部分
            if files:
                markdown_content += "## 📎 附件\n\n"
                for file_info in files:
                    file_name = file_info.get('name', '未知文件')
                    file_type = file_info.get('type', '未知类型')
                    markdown_content += f"- **{file_name}** ({file_type})\n"
                markdown_content += "\n"
            
            markdown_content += "---\n\n"
        
        # 添加脚注
        footnotes = self._generate_footnotes(search_results_cache)
        if footnotes:
            markdown_content += footnotes
        
        return markdown_content, updated_at, title
    
    def convert_file(self, json_file_path: str):
        """转换JSON文件中的所有对话"""
        try:
            with open(json_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # 确保是列表格式
            if not isinstance(data, list):
                data = [data]
            
            converted_count = 0
            for i, conversation in enumerate(data):
                try:
                    markdown_content, updated_at, title = self.convert_conversation(conversation)
                    
                    # 生成文件名，使用updated_at的日期和title拼接
                    timestamp_prefix = self._format_timestamp_for_filename(updated_at)
                    safe_title = self._clean_filename(title)
                    
                    # 简单的文件名格式：日期_标题.md
                    filename = f"{timestamp_prefix}_{safe_title}.md"
                    
                    # 再次确保文件名没有换行符等控制字符
                    filename = re.sub(r'[\x00-\x1F\x7F]', '', filename)
                    
                    filepath = self.output_dir / filename
                    
                    # 写入文件
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(markdown_content)
                    
                    print(f"✓ 已转换: {filename}")
                    converted_count += 1
                    
                except Exception as e:
                    print(f"✗ 转换对话 {i+1} 失败: {str(e)}")
                    import traceback
                    traceback.print_exc()
            
            print(f"\n🎉 转换完成！共转换 {converted_count} 个对话")
            print(f"📁 输出目录: {self.output_dir.absolute()}")
            
        except Exception as e:
            print(f"❌ 读取文件失败: {str(e)}")
            import traceback
            traceback.print_exc()
    
    def convert_directory(self, directory_path: str):
        """转换目录中的所有JSON文件"""
        directory = Path(directory_path)
        json_files = list(directory.glob("*.json"))
        
        if not json_files:
            print(f"❌ 在 {directory_path} 中未找到JSON文件")
            return
        
        print(f"找到 {len(json_files)} 个JSON文件")
        
        for json_file in json_files:
            print(f"\n处理文件: {json_file.name}")
            self.convert_file(str(json_file))


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='DeepSeek JSON对话转Markdown工具')
    parser.add_argument('input', help='输入文件或目录路径')
    parser.add_argument('-o', '--output', default='converted_conversations', 
                       help='输出目录（默认: converted_conversations）')
    parser.add_argument('-d', '--directory', action='store_true',
                       help='输入是目录（批量处理）')
    parser.add_argument('--debug', action='store_true',
                       help='开启调试模式，显示更多错误信息')
    
    args = parser.parse_args()
    
    converter = DeepSeekJsonToMarkdown(args.output)
    
    if args.directory:
        converter.convert_directory(args.input)
    else:
        converter.convert_file(args.input)
    
    input('输入任意键退出...')

if __name__ == "__main__":
    main()
```
