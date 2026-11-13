---
permalink: 80wmrd
---

```base
views:
  - type: table
    name: 视图
    filters:
      and:
        - file.inFolder("音乐合集")
        - file.basename != "index"

```