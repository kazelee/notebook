---
permalink: 80x2p0
---

```base
views:
  - type: table
    name: 全部
    filters:
      and:
        - file.inFolder("标签")
        - file.basename != "index"
    groupBy:
      property: tag-type
      direction: ASC
  - type: table
    name: 游戏类型
    filters:
      and:
        - file.inFolder("标签")
        - file.basename != "index"
        - note["tag-type"] == "游戏类型"

```