```base
views:
  - type: table
    name: 视图
    filters:
      and:
        - file.inFolder("书籍合集")
        - file.basename != "index"

```