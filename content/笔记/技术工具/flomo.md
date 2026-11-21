## 探索 flomo 内置的标签 emoji

flomo 中，给标签添加 emoji 是付费功能。但我发现，用某些词作为标签，会自动添加 emoji，而且不需要会员（早期 flomo 的网页版也是可以显示这些 emoji 的，但是从 2026 年开始就不会显示了，不过移动端 App 仍然能够显示）。于是，我开始好奇这些词都有哪些。==~~论人闲的时候有多无聊。~~==

我通过简单的试错，汇总得到下面的表格：

| emoji | 标签  | emoji | 标签  | emoji | 标签  | emoji | 标签  | emoji | 标签  |
| ----- | --- | ----- | --- | ----- | --- | ----- | --- | ----- | --- |
| ✅     | 清单  | ✅     | 待办  | 💡    | 想法  | 💡    | 灵感  | 📔    | 日记  |
| 💬    | 金句  | 💬    | 摘抄  | 📚    | 学习  | 📖    | 阅读  | ✍     | 写作  |
| 💼    | 复盘  | 💼    | 工作  | 💼    | 会议  | 🧱    | 产品  | 🗺    | 旅游  |
| 🎧    | 音乐  | 📽    | 影视  | 📽    | 电影  | 🎮    | 游戏  | 🤣    | 段子  |
| 🏡    | 生活  | 🛌    | 梦   | 🏃    | 运动  | 🏃    | 减肥  | 🍳    | 食物  |
| 📷    | 图片  | ⌨     | 编程  | 🛠    | 工具  | 🗄    | 资源  | 🗄    | 资料  |

实际肯定还存在其他会自动添加 emoji 的标签。也许存在某种逆向方法可以直接获取到所有符合要求的词汇列表及其对应的 emoji，但这里不再深究了。

## 自用脚本：从导出文件夹中提取 Markdown 文件

> [!warning]
>
> 该脚本已不再使用和维护。
> 理由：不再使用 flomo，临时记录通过待办软件完成。

```python title="extract_memos.py"
#!/usr/bin/env python3
"""
从包含 HTML 文件的文件夹中提取 Flomo 风格的 memo，并按月份生成 Markdown 归档。

用法:
    python extract_memos.py ./flomo@user-20200101/ -o ./output/
"""

import os
import re
import argparse
from collections import defaultdict
from pathlib import Path
from bs4 import BeautifulSoup


def find_html_files(root_dir):
    """递归查找所有 .html 文件"""
    root_path = Path(root_dir)
    return root_path.rglob("*.html")


def extract_text_from_content(content_div):
    """
    从 content div 中提取纯文本内容，保留段落分隔。
    将 <p> 标签转换为换行，其他标签移除。
    """
    if not content_div:
        return ""
    # 获取内部 HTML，用换行替换 </p> 闭合标签，再移除所有标签
    html_content = str(content_div)
    # 将 </p> 替换为换行符，以便生成段落
    text = re.sub(r'</p>\s*<p>', '\n', html_content, flags=re.IGNORECASE)
    text = re.sub(r'</?p[^>]*>', '', text, flags=re.IGNORECASE)
    # 移除剩余的 HTML 标签
    # text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'<div class="[a-zA-Z]+">', '', text)
    text = re.sub('</div>', '', text)
    # 清理多余空白行
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return '\n\n'.join(lines)


def parse_html_file(file_path):
    """解析单个 HTML 文件，返回 memo 列表（每个元素为 (time_str, content_text)）"""
    memos = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
    except Exception as e:
        print(f"警告: 无法解析文件 {file_path}: {e}")
        return memos

    for memo_div in soup.find_all('div', class_='memo'):
        time_div = memo_div.find('div', class_='time')
        content_div = memo_div.find('div', class_='content')

        if not time_div or not content_div:
            continue

        time_str = time_div.get_text(strip=True)
        content_text = extract_text_from_content(content_div)

        if time_str and content_text:
            memos.append((time_str, content_text))

    return memos


def aggregate_memos(html_files):
    """
    遍历所有 HTML 文件，按时间聚合内容。
    返回字典：{time_str: [content_versions]}
    """
    data = defaultdict(list)

    for html_file in html_files:
        memos = parse_html_file(html_file)
        for time_str, content in memos:
            versions = data[time_str]
            # 仅当内容完全相同时才跳过
            if content not in versions:
                versions.append(content)

    return data


def write_monthly_markdown(data, output_dir="."):
    """将聚合后的数据按月份写入 Markdown 文件"""
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # 按月份分组
    month_groups = defaultdict(list)
    for time_str, contents in data.items():
        # 提取 YYYY-MM
        month_key = time_str[:7]  # 格式如 "2023-02"
        month_groups[month_key].append((time_str, contents))

    for month_key, entries in month_groups.items():
        # 按时间排序
        entries.sort(key=lambda x: x[0])

        md_file = output_path / f"{month_key}.md"
        with open(md_file, 'w', encoding='utf-8') as f:
            for time_str, contents in entries:
                num_versions = len(contents)
                # 标题行
                if num_versions == 1:
                    f.write(f"### {time_str}\n\n")
                else:
                    f.write(f"### {time_str} ({num_versions}个版本)\n\n")

                # 输出内容
                if num_versions == 1:
                    f.write(f"{contents[0]}\n\n")
                else:
                    for idx, content in enumerate(contents, start=1):
                        f.write(f"#### 版本{idx}\n\n")
                        f.write(f"{content}\n\n")

        print(f"已生成: {md_file}")


def main():
    parser = argparse.ArgumentParser(description="提取 HTML 中的 memo 并按月份生成 Markdown 文件")
    parser.add_argument("folder", help="包含 HTML 文件的根文件夹")
    parser.add_argument("-o", "--output", default=".", help="输出 Markdown 文件的目录 (默认当前目录)")
    args = parser.parse_args()

    root_dir = Path(args.folder)
    if not root_dir.is_dir():
        print(f"错误: '{root_dir}' 不是一个有效的文件夹")
        return

    print(f"正在扫描文件夹: {root_dir}")
    html_files = list(find_html_files(root_dir))
    print(f"找到 {len(html_files)} 个 HTML 文件")

    if not html_files:
        print("未找到任何 HTML 文件")
        return

    print("正在解析 memo 数据...")
    memo_data = aggregate_memos(html_files)
    print(f"共提取 {len(memo_data)} 条不同的 memo 记录")

    print("正在生成 Markdown 文件...")
    write_monthly_markdown(memo_data, args.output)

    print("完成！")


if __name__ == "__main__":
    main()
```
