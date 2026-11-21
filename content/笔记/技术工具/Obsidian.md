## 自用 CSS 样式代码片段

### 关系图谱未创建文件节点显示红色

```css title="graph-red.css"
/* 深色主题下，未创建文件的节点颜色 */
.theme-dark .graph-view.color-fill-unresolved {
    color: red;
    opacity: 1.0;
}

/* 浅色主题下，未创建文件的节点颜色 */
.theme-light .graph-view.color-fill-unresolved {
    color: red;
    opacity: 1.0;
}
```

### 自用 Border 主题 cloze 隐藏效果

> 参考：[obsidian_tutorial/quartz/styles/snippets/class.css at v5 · FDscend/obsidian_tutorial](https://github.com/FDscend/obsidian_tutorial/blob/v5/quartz/styles/snippets/class.css)

```css title="cloze.css"
/* ============================================
   挖空效果 Snippet (全局生效，无需 cloze 标注)
   -  *~~文本~~*  : 蓝色虚线下划线 + 文字隐藏 + 悬停显示
   - ==~~文本~~== : 背景色蒙版 + 文字隐藏 + 悬停显示
   ============================================ */

/* ---------- 语法一：*~~文本~~* (斜体删除线) ---------- */

/* 阅读视图 & 实时预览 */
em > del,
.cm-em.cm-strikethrough {
  color: transparent !important;
  text-decoration: none !important;
  border-bottom: 2px dashed rgb(67, 157, 237) !important;
  transition: color 0.3s ease;
  cursor: help;
}

/* 悬停时显示文字 */
em > del:hover,
.cm-em.cm-strikethrough:hover {
  color: var(--text-normal) !important;
}


/* ---------- 语法二：==~~文本~~== (高亮 + 删除线) ---------- */

/* 阅读视图：<mark><del>...</del></mark> */
mark:has(> del) {
  background-color: var(--background-modifier-hover) !important;
  border-radius: 3px;
  padding: 0 2px;
  transition: background-color 0.3s ease;
  cursor: help;
}

mark:has(> del) > del {
  color: transparent !important;
  text-decoration: none !important;
  transition: color 0.3s ease;
}

/* 悬停：蒙版消失，文字恢复 */
mark:has(> del):hover {
  background-color: transparent !important;
}

mark:has(> del):hover > del {
  color: var(--text-normal) !important;
}

/* 实时预览：<span class="cm-highlight cm-strikethrough">...</span> */
.cm-highlight.cm-strikethrough {
  color: transparent !important;
  text-decoration: none !important;
  background-color: var(--background-modifier-hover) !important;
  border-radius: 3px;
  padding: 0 2px;
  transition: color 0.3s ease, background-color 0.3s ease;
  cursor: help;
}

.cm-highlight.cm-strikethrough:hover {
  color: var(--text-normal) !important;
  background-color: transparent !important;
}


/* ---------- 打印时始终隐藏文字 ---------- */
@media print {
  em > del,
  mark > del,
  .cm-em.cm-strikethrough,
  .cm-highlight.cm-strikethrough {
    color: transparent !important;
  }
  mark:has(> del),
  .cm-highlight.cm-strikethrough {
    background-color: transparent !important;
    border-bottom: none !important;
  }
}
```
