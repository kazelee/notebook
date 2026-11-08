import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
// import * as ExternalPlugin from "./.quartz/plugins"
// import * as ExternalPlugin from "./quartz/plugins"
// import { SimpleSlug } from "./quartz/util/path"

// 破案了：https://github.com/jackyzha0/quartz/issues/2565
// 所以出现问题，别自己瞎折腾，也别想着靠 AI 抽奖，先看 issues，之前很多次也是这样
// import { componentRegistry } from "./quartz/components/registry"
// componentRegistry.setOptionOverrides("@quartz-community/explorer", {
// //   filterFn: (node) => {
// //     return node.slug!.startsWith("bases/")
// //   },
// })

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
// componentRegistry.setOptionOverrides("@quartz-community/recent-notes", {
//     filter: (f) =>
//       f.slug!.startsWith("bases/"),
//     linkToMore: "bases/" as SimpleSlug,
// })

// 补充说明: 这个方案大概率没用，本地测试看不出效果的
// (1) 之前出现的，本地链接，鼠标移动不提示具体 url 的，应该是这个时候服务已经关闭了
// (2) 之所以本地测试跳转链接没有 bug，完全是因为是从 localhost 到 云端，两个网段，肯定会重新加载的
//     这也解释了，为什么本地测试的时候，_blank 没有另开标签页，完全是没有真正实现导致的
// import FooterTargetBlank from "./quartz/components/FooterTargetBlank"

// export const sharedPageComponents: SharedLayout = {
//   head: Component.Head(),
//   header: [],
//   afterBody: [FooterTargetBlank()],   // ← 加这里
//   footer: Component.Footer({ /* 你原来的配置 */ }),
// }

// import MobileTocDrawer from "./quartz/components/MobileTocDrawer"
// import { Flex } from "./quartz/components"

// 导入 toolbar 中原有的三个内置组件
// import Search from "./quartz/components/Search"
// import Darkmode from "./quartz/components/Darkmode"
// import ReaderMode from "./quartz/components/ReaderMode"

// 用 Flex 重建 header 中的 toolbar，并追加 MobileTocDrawer
// Component.Flex({
//     components: [
//         { Component: Search() },
//         { Component: Darkmode() },
//         { Component: ReaderMode() },
//         { Component: MobileTocDrawer() },   // ← 仅移动端显示
//     ],
//     direction: "row",
//     gap: "0.5rem",
// })

const config = await loadQuartzConfig()
// const config = await loadQuartzConfig({
    
// })
export default config
// export const layout = await loadQuartzLayout()
export const layout = await loadQuartzLayout({
//   defaults: {
//     afterBody: [FooterTargetBlank()],
//     // 用 Flex 重建 header 中的 toolbar，并追加 MobileTocDrawer
//     left: [
//     //   Component.Flex({
//       Flex({
//         components: [
//           { Component: ExternalPlugin.Search() },
//           { Component: ExternalPlugin.Darkmode() },
//         //   { Component: ReaderMode() },
//           { Component: MobileTocDrawer() },   // ← 仅移动端显示
//         ],
//         direction: "row",
//         gap: "0.5rem",
//       }),
//     ],
//   },
})

// ExternalPlugin.RecentNotes({
//     filter: (f) =>
//       f.slug!.startsWith("bases/"),
//     linkToMore: "more/" as SimpleSlug,
// })

// document.querySelectorAll('a[href*="/notes/"]').forEach(link => {
//   link.setAttribute('target', '_blank');
// });

// function applyFooterTargetBlank() {
//   document.querySelectorAll<HTMLAnchorElement>("footer a[href]").forEach((a) => {
//     // 已经是 _blank 就不重复处理
//     if (a.getAttribute("target") === "_blank") return
//     a.setAttribute("target", "_blank")
//     a.setAttribute("rel", "noopener noreferrer")
//   })
// }

// // Quartz 每次 SPA 导航完成后都会派发 nav 事件
// document.addEventListener("nav", applyFooterTargetBlank)

// // 首次加载兜底（部分版本初次不触发 nav）
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", applyFooterTargetBlank)
// } else {
//   applyFooterTargetBlank()
// }