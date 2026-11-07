import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
// import * as ExternalPlugin from "./.quartz/plugins"
// import * as ExternalPlugin from "./quartz/plugins"
import { SimpleSlug } from "./quartz/util/path"

// 破案了：https://github.com/jackyzha0/quartz/issues/2565
// 所以出现问题，别自己瞎折腾，也别想着靠 AI 抽奖，先看 issues，之前很多次也是这样
import { componentRegistry } from "./quartz/components/registry"
componentRegistry.setOptionOverrides("@quartz-community/explorer", {
//   filterFn: (node) => {
//     return node.slug!.startsWith("bases/")
//   },
})

// ExternalPlugin.Explorer({
//   mapFn: (node) => {
//     node.displayName = node.displayName.toUpperCase()
//     return node
//   },
// })

// ExternalPlugin.Explorer({
//   filterFn: (node) => {
//     // 排除带有 "explorerexclude" 标签的文件
//     // return node.data?.tags?.includes("explorerexclude") !== true
//     // return node.isFolder == false // 无效，可能是因为，文件夹内部的文件，只能在文件夹内部显示，这是 Explorer 的显示规范？
//     // const allowFolders = new Set(["bases"])
//     // return allowFolders.has(node.displayName.toLowerCase()) // ts 的警告直接无视，以及没用？示例有问题，应该是 文件路径
//     // return allowFolders.has(node.slugSegment?.toLowerCase())
//     // return node.slug!.startsWith("bases/")
//     // return node.slug!.toLowerCase.contains("bases/")
//     // console.log("[DEBUG] " + node)
//     // return true;
//     // 不理解为什么行不通，ts 你赢了，前端你赢了
//     var path = node.slugSegments?.join("/");
//     if (node.isFolder) path += "/index"
//     return path?.toLowerCase().includes("bases")
//   },
// })

// 就是没用，ts 里面的配置不生效，只有 yaml 里面的配置生效
// ExternalPlugin.RecentNotes({
//     filter: (f) =>
//       f.slug!.startsWith("bases/"),
//     linkToMore: "bases/" as SimpleSlug,
// })
componentRegistry.setOptionOverrides("@quartz-community/recent-notes", {
    filter: (f) =>
      f.slug!.startsWith("bases/"),
    linkToMore: "bases/" as SimpleSlug,
})

const config = await loadQuartzConfig()
// const config = await loadQuartzConfig({
    
// })
export default config
export const layout = await loadQuartzLayout()

// ExternalPlugin.RecentNotes({
//     filter: (f) =>
//       f.slug!.startsWith("bases/"),
//     linkToMore: "more/" as SimpleSlug,
// })
