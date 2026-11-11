```base
views:
  - type: table
    name: 视图
    filters:
      and:
        - file.inFolder("影视合集")
        - file.basename != "index"
    sort:
      - property: file.name
        direction: ASC

```