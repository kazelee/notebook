# loneleaf's Notebook

> 记一辈子笔记！！！！！

## 内容说明

记录自己关于游戏，以及其他形式的艺术创作的学习笔记和心得体会。同时，也是作为今后自己在互联网上所发布内容的备份和汇总的空间。

## 技术说明

1. 基于 [Quartz 5](https://quartz.jzhao.xyz/) 搭建（相关文档个人使用 AI 简单[翻译了一版](https://kazelee.github.io/zh-docs-quartz-v5/)）
2. 主题参考 [Obsidian 教程 | Obsidian 教程](https://fdscend.github.io/obsidian_tutorial/)（其实是 Obsidian 的 [Border](https://github.com/Akifyss/obsidian-border) 主题）
3. 字体使用 [寒蝉全圆体](https://github.com/Warren2060/ChillRound)，CDN 在线字体来源 [字图 CDN | 一个免费中文字体公益 CDN 服务 | 中文网字计划](https://chinese-font.netlify.app/zh-cn/cdn/)

<!--
## 吐槽：差点退坑

Quartz 用的人少果然是有原因的，Quartz v5 用的人就更少了。

相关的文档和可以参考的教程也非常少，尤其是中文教程几乎没有。大多数可以参考的网站，也基本都是 v4 的版本。（甚至[作者自己的个人网站](https://jzhao.xyz/)，都还用着 v4 的版本……）

原本就是想着，Quartz 最接近 Obsidian 的使用习惯，关系图谱 和 双向链接 都是自带的，不需要自己再折腾。风格上也比较简洁，不像其他博客网站框架那样花里胡哨，更符合我的审美。结果，楞是折腾了好几天。

### 心路历程

我自己 23 年尝试折腾个人网站，当时用的是 [Hexo](https://hexo.io/zh-cn/) + [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 主题，不过功能有些局限，后面搁置了。

25 年又心血来潮想要尝试，并且想换一个框架，于是看重了 [Astro](https://astro.build/) + [Fuwari](https://github.com/saicaca/fuwari) 主题，觉得这个风格简洁，更注重内容。结果后面自己不自觉地开始折腾，调整一些样式，仍旧觉得不满意，最后作罢。

今年 26 年末又想着折腾，觉得不管怎么样，自己应该有一个内容备份的平台，而且直接放在 Github 仓库里面存着太敷衍了，还是应该有点仪式感。

于是，我开始寻找有没有直接基于 Obsidian 笔记软件工作区的博客部署网站，然后找到了 Quartz，当时还觉得相见恨晚。毕竟相较于一个博客，我更希望把自己的网站看作是一个笔记本，而 Quartz 很符合我的期望。

结果，自己就因为这个框架，断断续续折腾了 3 天时间。主要自己确实不了解前端的技术栈，加上文档并不完全正确，很多正确做法都在 issues 里面，导致我碰壁很多次。

### 罗列一些自己的折腾

部署主要是参考了下面的一些博客文章：

1. [Installation](https://quartz.jzhao.xyz/getting-started/installation)：这个就是官方的教程，为此我还[特地翻译了一个版本](https://kazelee.github.io/zh-docs-quartz-v5/getting-started/installation)供自己使用
2. [01.个人博客-obsidian+quartz · Why Z](https://jz21.eu.org/tech-notes/01-personal-blog-obsidian-quartz)：这位博主是基于 v4 版本的部署，加入了一些自定义的样式修改
3. [「Quartz 4 × Obsidian」：一键发布，构筑属于你的数字花园 | 时歌的博客](https://www.lapis.cafe/posts/technicaltutorials/obsidian-quartz-4/)：之前 Astro + Fuwari 的博客部署，就有参考这位博主的教程，不过后来博主也没有继续使用这个框架
4. [Quartz 教程：从零开始构建你的数字花园 | AI夜码人](https://ainightcoder.github.io/8.%E8%BE%93%E5%87%BA/quartz/0d98412b93ef972b5389388471dcb61e1e6e479c)：也是基于 v4，改动得更像博客了，不过一年多没有更新
5. [02_配置与本地构建 | Obsidian 教程](https://fdscend.github.io/obsidian_tutorial/section8/02_%E9%85%8D%E7%BD%AE%E4%B8%8E%E6%9C%AC%E5%9C%B0%E6%9E%84%E5%BB%BA)：关于 quartz-themes 的部署，不过我后面还是考虑需要时直接直接修改样式文件，而不是采用这个配置部署的方式

部署过程中，自己甚至考虑过，要在记录内容的同时，与官方的分支同步，实时获取最新的内容。为此，可行的办法有：

1. fork 原仓库，将内容放在 content 分支，然后自动化提交合并
2. 以原仓库作为模板，平时正常提交，如果有更新，可以手动使用命令更新（或者，通过 Quartz v5 提供的命令获取更新）
3. 使用多个仓库聚合，一个仓库只有样式，另一个仓库只有内容（样式与内容分离，但是部署难度较大）

在考虑这一点的时候，惊讶地发现，[02_配置与本地构建 | Obsidian 教程](https://fdscend.github.io/obsidian_tutorial/section8/02_%E9%85%8D%E7%BD%AE%E4%B8%8E%E6%9C%AC%E5%9C%B0%E6%9E%84%E5%BB%BA) 这篇文章就使用了类似的方式。一个仓库使用 3 个分支，`main` 分支更新内容，然后通过 Github Actions 将内容合并到有样式的 `v5` 分支，最后，`v5` 分支再通过 Github Actions 将结果部署到 `gh-pages` 分支。但通过这个文章，也看出了这个方案的复杂性，最后没有考虑。

最后，采用了教程推荐的方案。以原仓库作为模板，新建自己的仓库。Quartz 本身提供了 `npx quartz update` 命令可以拉取最新上游更新。但实际测试的时候，发现只要对模板文件有稍微的更改，就会报错，而且难以处理。而如果没有修改直接拉取，就会出现本地的 git 记录出现上游仓库的大量 commit 记录，这都不是我希望看到的。

所以，最后的结论，反而是放弃「与上游同步」的想法：闹了半天，还折腾啥，与其等上游更新，还不如自己需要的时候自己修改。

为此，我必须吐槽一下这个框架的逆天之处。

### 令人愤怒的「逆优化」

我只能说，`v4` 升级到 `v5` 确实是一个错误。虽然 v5 内置了更多 Obsidian 风格的功能，并且通过简单的 yaml 文件配置就可以调整。但结果是，这个方案可定制化的程度极低，稍微复杂点的功能，比如根据某个规则排序，就需要编写 ts 脚本，但是 ts 脚本和 yaml 文件的配置还有优先级和冲突问题。按照文档的教程，根本没有反应，必须使用别人提的 issues 下的解决方案，直接用语句覆盖的方式编写 ts 脚本。而 v4 完全是使用 ts 进行配置的，根本就没有这种问题。

Quartz 的很多设计也是主要服务于英文，对中文用户很不友好。比如默认字体通过 Google Fonts 获取，很多字重的配置也是基于这个。但 Google Fonts 上的中文字体少的可怜，还有显示 bug，想要好的体验就得改框架。

Explorer 视图 和 TOC 视图，显示也是有问题的。Explorer 距离右侧的收起符号，和 TOC 距离右侧的收起符号，宽度居然不一致，摆在一起很难看。TOC 视图的下拉是有问题的，如果文件目录过多，就会显示不全，必须改动 css；更离谱的是，如果 Explorer 和 TOC 视图都放在左侧，只要 TOC 过长，Explorer 就无法同时显示，必须关掉 TOC 才能显示。

Explorer 视图也不是很好用，没有一键收缩的功能。后面使用 yaml 和 ts 配置还有问题，会出现远程拉取不加载的 bug，必须强制下载到本地才奏效，也不知道是不是网络问题。考虑到 Obsidian 工作区本身就是弱化文件夹，强化双链、标签和数据库的设计，所以最后还是打算直接放弃 Explorer 视图。

最后参考了作者自己博客的 v4 ts 脚本，用 recent notes 结合一些筛选语句实现将指定文件固定的功能。这个很符合我的需要。只需要固定几个数据库文件和汇总文件，然后通过文件上的链接跳转到对应的主题即可。而不是通过一个 Explorer 反复展开收起。

### 总结

原本是图「不折腾」「开箱即用」才选择的 Quartz，结果到头来，折腾的一点不比自己过去折腾 Hexo 和 Astro 的博客要少。或许折腾博客的人，大多数都是不写博客的吧（笑）不过我这次是希望能认真写点东西。

原本不打算写这篇吐槽，中途被折磨后，便想着怎么也要把自己折腾的过程写成一个博客文章放上去。但后面想想还是免了，别对这些零散的技术付诸太多时间精力。自己毕竟不是前端工程师，对于这些乱七八糟的样式配置也只感到头疼。还是应该把精力放到自己的领域上，别瞎折腾，多做点真正有用的事情。

最终还是决定把这份吐槽写下来，就放在 `README.md` 中。惯例也是注释隐藏起来，给自己，以及给看到这里的有缘人。
-->