// import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// import { classNames } from "../util/lang"
// // @ts-ignore
// import script from "./scripts/mobileTocDrawer.inline"
// import style from "./styles/mobileTocDrawer.scss"
// // 复用 Quartz 内置的 TOC 组件
// // import TableOfContents from "./TableOfContents"
// import * as ExternalPlugin from "../../.quartz/plugins"

// const MobileTocDrawer: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
//   // 如果页面本身没有 TOC，则不渲染任何内容
//   const tocData = fileData.toc?.length ? fileData.toc : undefined
//   if (!tocData) return null

//   return (
//     <div class={classNames(displayClass, "mobile-toc-drawer-container")}>
//       {/* 触发按钮，仅在移动端显示 */}
//       <button
//         id="mobile-toc-trigger"
//         class="mobile-toc-trigger"
//         aria-label="打开目录"
//         aria-expanded="false"
//         aria-controls="mobile-toc-panel"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         >
//           <line x1="8" y1="6" x2="21" y2="6"></line>
//           <line x1="8" y1="12" x2="21" y2="12"></line>
//           <line x1="8" y1="18" x2="21" y2="18"></line>
//           <line x1="3" y1="6" x2="3.01" y2="6"></line>
//           <line x1="3" y1="12" x2="3.01" y2="12"></line>
//           <line x1="3" y1="18" x2="3.01" y2="18"></line>
//         </svg>
//       </button>

//       {/* 遮罩层 */}
//       <div id="mobile-toc-overlay" class="mobile-toc-overlay"></div>

//       {/* 从右侧滑出的抽屉面板 */}
//       <div
//         id="mobile-toc-panel"
//         class="mobile-toc-panel"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="mobile-toc-trigger"
//       >
//         <div class="mobile-toc-header">
//           <span>目录</span>
//           <button id="mobile-toc-close" class="mobile-toc-close" aria-label="关闭目录">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             >
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
//         </div>
//         <div class="mobile-toc-content">
//           {/* 直接复用内置 TableOfContents 来渲染列表 */}
//           {/* <TableOfContents {...({ fileData, cfg, displayClass } as QuartzComponentProps)} /> */}
//           <ExternalPlugin.TableOfContents {...({ fileData, cfg, displayClass } as QuartzComponentProps)} />
//         </div>
//       </div>
//     </div>
//   )
// }

// MobileTocDrawer.css = style
// MobileTocDrawer.afterDOMLoaded = script

// export default (() => MobileTocDrawer) satisfies QuartzComponentConstructor