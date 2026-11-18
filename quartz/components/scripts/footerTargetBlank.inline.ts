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