---
permalink: 80wz2k
---

```base
views:
  - type: table
    name: 视图
    filters:
      and:
        - file.inFolder("个人笔记")
        - file.basename != "index"

```