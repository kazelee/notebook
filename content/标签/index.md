```base
views:
  - type: table
    name: 视图
    filters:
      and:
        - file.inFolder("标签")
        - file.basename != "index"
    groupBy:
      property: tag-type
      direction: ASC

```