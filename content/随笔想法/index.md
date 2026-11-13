---
permalink: 80wr5d
---

```base
views:
  - type: table
    name: 视图
    filters:
      and:
        - file.inFolder("随笔想法")
        - file.basename != "index"

```