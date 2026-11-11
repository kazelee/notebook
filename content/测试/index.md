```base
views:
  - type: table
    name: 视图
    filters:
      and:
        - file.inFolder("测试")
        - file.basename != "index"

```