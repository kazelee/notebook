import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

import * as ExternalPlugin from "./.quartz/plugins";

// 推荐：创建一个全局的中文排序器，避免在每次比较时重复初始化
const zhCollator = new Intl.Collator("zh-CN", {
  numeric: true, // 让数字按数值大小排序（如 "第2章" 排在 "第10章" 前）
  sensitivity: "base", // 忽略大小写和音调差异，排序更自然
});

ExternalPlugin.Latex({
  // 其他选项...
  katexOptions: {
    strict: false, // 或者 "ignore"
  },
}),

ExternalPlugin.FolderPage({
  sort: (f1, f2) => {
    // 核心：优先使用 frontmatter.title；如果缺失，回退到文件基础名（而不是 URL slug）
    const title1 = f1.frontmatter?.title ?? "";
    const title2 = f2.frontmatter?.title ?? "";
    
    return zhCollator.compare(title1, title2);
  },
});

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
