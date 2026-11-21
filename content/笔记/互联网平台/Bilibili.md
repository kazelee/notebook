---
aliases:
  - B站
---

## 自用脚本：收藏夹导出为 HTML

> 参考：[快速导出B站收藏单节目列表 - 鱼肉真好吃 - 博客园](https://www.cnblogs.com/toumingbai/p/11399238.html)

> [!INFO]
> 
> 脚本末尾有 `标题` 和 `简介` 的变量声明，在控制台粘贴后需要手动改成实际收藏夹的标题和简介。
> （默认文件名是 `标题.html`，简介内容是 `\n简介\n`）

```js {202,205}
function escapeHtml(str) {
    return (str == null ? "" : String(str)).replace(/[&<>"']/g, function (s) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[s];
    });
}

function get_list() {
    let result = "";
    let count = 0;

    document.querySelectorAll(".items__item .bili-video-card").forEach(card => {
        // 标题
        const titleElement = card.querySelector(".bili-video-card__title");
        const title = titleElement
            ? (
                titleElement.querySelector("a")?.textContent ||
                titleElement.getAttribute("title") ||
                titleElement.textContent ||
                ""
              ).trim()
            : "";

        // 视频链接
        const linkElement = card.querySelector(".bili-cover-card");
        let link = linkElement ? linkElement.getAttribute("href") : "";
        link = link
            ? (link.startsWith("http") ? link : "https:" + link)
            : "";

        // 封面图
        const imgElement = card.querySelector(".bili-cover-card__thumbnail img");
        let imgSrc = imgElement ? imgElement.getAttribute("src") : "";

        if (imgSrc) {
            if (imgSrc.startsWith("//")) {
                imgSrc = "https:" + imgSrc;
            }
            imgSrc = imgSrc.replace(/^http:/, "https:");
        }

        // 播放量、弹幕数、时长
        let play = "";
        let danmu = "";
        let duration = "";

        card.querySelectorAll(".bili-cover-card__stats .bili-cover-card__stat").forEach(stat => {
            const text = (stat.querySelector("span")?.textContent || "").trim();

            if (stat.querySelector(".sic-BDC-playdata_square_line")) {
                play = text;
            } else if (stat.querySelector(".sic-BDC-danmu_square_line")) {
                danmu = text;
            } else {
                duration = text;
            }
        });

        // UP 主名称 + 空间链接
        const authorLinkEl = card.querySelector(".bili-video-card__author");
        let authorHref = authorLinkEl ? (authorLinkEl.getAttribute("href") || "") : "";
        if (authorHref) {
            if (authorHref.startsWith("//")) {
                authorHref = "https:" + authorHref;
            } else if (!authorHref.startsWith("http")) {
                authorHref = "https:" + authorHref;
            }
        }

        // 取 author 里的 span[title]，格式如：哈皮酱P · 收藏于3小时前
        const authorSpan = card.querySelector(
            ".bili-video-card__author .bili-video-card__text span[title]"
        );

        let authorText = "";
        if (authorSpan) {
            authorText = (
                authorSpan.getAttribute("title") ||
                authorSpan.textContent ||
                ""
            ).trim();
        } else {
            authorText = authorLinkEl ? authorLinkEl.textContent.trim() : "";
        }

        // 去掉 “ · 收藏于...” 后缀
        const author = authorText.replace(/\s*·\s*收藏于.*$/, "").trim();

        // 每 5 个视频开始一个新行
        if (count % 5 === 0) {
            if (count !== 0) result += "</tr>";
            result += "<tr>";
        }

        // 播放/弹幕/时长 一行，UP 主一行
        const authorHtml = authorHref
            ? `<a href="${escapeHtml(authorHref)}" target="_blank">${escapeHtml(author || "-")}</a>`
            : escapeHtml(author || "-");

        // 注意：信息行放在「封面图下方、标题上方」，保证跨单元格水平对齐
        result += `
            <td style="vertical-align: top; text-align: center; padding: 10px; width: 20%;">
                ${
                    imgSrc
                        ? `<img src="${escapeHtml(imgSrc)}" style="width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; margin-bottom: 5px;" alt="${escapeHtml(title)}">`
                        : ""
                }
                <div style="font-size: 12px; color: #666; line-height: 1.6; text-align: left; margin-bottom: 4px;">
                    <div>播放：${escapeHtml(play || "-")}　弹幕：${escapeHtml(danmu || "-")}　时长：${escapeHtml(duration || "-")}</div>
                    <div>UP主：${authorHtml}</div>
                </div>
                <DT style="text-align: left;"><A HREF="${escapeHtml(link)}" ADD_DATE="${Date.now()}">${escapeHtml(title)}</A></DT>
            </td>
        `;

        count++;
    });

    if (count > 0) {
        result += "</tr>";
    }

    return result;
}

async function main(html, filename) {
    // 等待页面稳定
    await new Promise(resolve => setTimeout(resolve, 500));

    html += get_list();

    // 获取所有下一页按钮（包括禁用的）
    const nextBtns = document.querySelectorAll(
        ".vui_button.vui_pagenation--btn.vui_pagenation--btn-side"
    );

    // 找到最后一个未被禁用的下一页按钮
    let nextBtn = null;
    for (let i = nextBtns.length - 1; i >= 0; i--) {
        if (
            !nextBtns[i].disabled &&
            nextBtns[i].textContent.trim() === "下一页"
        ) {
            nextBtn = nextBtns[i];
            break;
        }
    }

    if (!nextBtn || nextBtn.textContent.trim() !== "下一页") {
        html += "</table>\n</DL><p>\n";
        download(filename, html);
    } else {
        nextBtn.click();
        setTimeout(main, 1000, html, filename);
    }
}

function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function buildHtml(title, desc) {
    var html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
    <!-- This is an automatically generated file.
        It will be read and overwritten.
        DO NOT EDIT! -->
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <TITLE>` + title + `</TITLE>
    <H1>` + title + `</H1>
    <DL><p>
    <DT>` + desc + `</DT>
    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
    `;

    return html;
}

function toValidFileName(str, replacement = "_") {
    // 移除 Windows 文件名中的非法字符
    return str.replace(/[\\/:*?"<>|]/g, replacement);
}

function convertNewlinesToHtml(text) {
    // 将换行符转换为 <br> 标签
    return text.replace(/\n/g, "<br>");
}

var title = "标题";
var filename = toValidFileName(title) + ".html";
var desc = convertNewlinesToHtml(`
简介
`);
var html = buildHtml(title, desc);

setTimeout(main, 500, html, filename);
```
