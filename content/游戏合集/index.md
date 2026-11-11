```base
views:
  - type: table
    name: 全部
    filters:
      and:
        - file.inFolder("游戏合集")
        - file.basename != "index"
    order:
      - file.name
      - aliases
      - year
      - wikitags
    sort:
      - property: tags
        direction: ASC
      - property: file.name
        direction: ASC
  - type: table
    name: 解谜
    filters:
      and:
        - file.inFolder("游戏合集")
        - file.name != "index"
        - wikitags.contains(link("解谜"))
    order:
      - file.name
      - aliases
      - year
      - wikitags
    sort:
      - property: year
        direction: ASC

```