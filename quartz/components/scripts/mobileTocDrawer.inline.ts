// function setupMobileTocDrawer() {
//   const trigger = document.getElementById("mobile-toc-trigger") as HTMLButtonElement | null
//   const panel = document.getElementById("mobile-toc-panel")
//   const overlay = document.getElementById("mobile-toc-overlay")
//   const closeBtn = document.getElementById("mobile-toc-close")

//   if (!trigger || !panel || !overlay || !closeBtn) return

//   // 防止重复绑定
//   if ((trigger as any)._tocDrawerInitialized) return
//   ;(trigger as any)._tocDrawerInitialized = true

//   const openDrawer = () => {
//     panel.classList.add("active")
//     overlay.classList.add("active")
//     trigger.setAttribute("aria-expanded", "true")
//     document.body.style.overflow = "hidden" // 锁定背景滚动
//   }

//   const closeDrawer = () => {
//     panel.classList.remove("active")
//     overlay.classList.remove("active")
//     trigger.setAttribute("aria-expanded", "false")
//     document.body.style.overflow = ""
//   }

//   trigger.addEventListener("click", openDrawer)
//   closeBtn.addEventListener("click", closeDrawer)
//   overlay.addEventListener("click", closeDrawer)

//   // 点击目录链接后自动关闭抽屉
//   panel.querySelectorAll("a[href^='#']").forEach((link) => {
//     link.addEventListener("click", closeDrawer)
//   })

//   // ---- 触摸滑动支持 ----
//   let touchStartX = 0
//   let touchStartY = 0
//   let isSwiping = false

//   // 在面板上向左滑动关闭
//   panel.addEventListener(
//     "touchstart",
//     (e: TouchEvent) => {
//       touchStartX = e.touches[0].clientX
//       touchStartY = e.touches[0].clientY
//       isSwiping = false
//     },
//     { passive: true }
//   )

//   panel.addEventListener(
//     "touchmove",
//     (e: TouchEvent) => {
//       const dx = e.touches[0].clientX - touchStartX
//       const dy = e.touches[0].clientY - touchStartY
//       // 判断是否为水平向右滑动（且水平位移明显大于垂直）
//       if (Math.abs(dx) > Math.abs(dy) && dx > 50) {
//         isSwiping = true
//       }
//     },
//     { passive: true }
//   )

//   panel.addEventListener(
//     "touchend",
//     () => {
//       if (isSwiping) {
//         closeDrawer()
//         isSwiping = false
//       }
//     },
//     { passive: true }
//   )

//   // 在屏幕右边缘附近向左滑动打开
//   let edgeTouchStartX = 0
//   document.addEventListener(
//     "touchstart",
//     (e: TouchEvent) => {
//       // 只在屏幕右侧 50px 内触发
//       if (e.touches[0].clientX > window.innerWidth - 50) {
//         edgeTouchStartX = e.touches[0].clientX
//       } else {
//         edgeTouchStartX = 0
//       }
//     },
//     { passive: true }
//   )

//   document.addEventListener(
//     "touchend",
//     (e: TouchEvent) => {
//       if (edgeTouchStartX === 0 || panel.classList.contains("active")) return
//       const dx = e.changedTouches[0].clientX - edgeTouchStartX
//       // 向左滑动超过 60px 则打开
//       if (dx < -60) {
//         openDrawer()
//       }
//       edgeTouchStartX = 0
//     },
//     { passive: true }
//   )
// }

// document.addEventListener("nav", setupMobileTocDrawer)

// // 首次加载兜底
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", setupMobileTocDrawer)
// } else {
//   setupMobileTocDrawer()
// }