---
title: Markdown样式测试
unlisted: true
---

# 一级标题 Title I

## 二级标题 Title II

### 三级标题 Title III

#### 四级标题 Title IV

##### 五级标题 Title V

###### 六级标题 Title VI

---

正文正文正文，正文正文正文正文。

Text text text, text text text text.

正文**黑体**正文*斜体*正文***粗斜体***正文。

Text **Bold** Text *Italic* Text ***BoldItalic*** Text.

### 有序/无序列表

- 无序列表
	- 一次缩进
		- 二次缩进
			- 三次缩进
				- 四次缩进
					- 五次缩进
						- 六次缩进
					- 五次缩进
				- 四次缩进
			- 三次缩进
		- 二次缩进
	- 一次缩进
- 无序列表

1. 有序列表
	1. 一次缩进
		1. 二次缩进
			1. 三次缩进
				1. 四次缩进
					1. 五次缩进
						1. 六次缩进
					2. 五次缩进
				2. 四次缩进
			2. 三次缩进
		2. 二次缩进
	2. 一次缩进
2. 有序列表

### 特殊文字格式

[[markdown格式总结]]

==强调== ==**强调+粗体**== ==*强调+斜体*== ==**test**== ==🔴test==

~~删除~~ ~~**删除+粗体**~~ ~~*删除+斜体*~~ ==~~强调+删除~~==

`代码` %%弱注释%% <u>下划线</u> <!--强注释-->

上标[^1] 下标[~1] 严格上标<sup>1</sup> 严格下标<sub>1</sub>

嵌入数学公式 $a$ 和 $b$ 和 $c$：$a^2+b^2=c^2$

$$θ_1x_1+θ_2x_2^2+θ_3x_3^3$$

### 代码框/引用

`Console.WriteLine("Hello world!");{:cs}`

```cs title="./main.cs" {1-2,4}
using System;
public class HelloWorld {
	static void Main() {
		Console.WriteLine("Hello world!");
	}
}
```

> 黑夜给了我黑色的眼睛，我却用它寻找光明。
> ——顾城

### 风格化TODO

- [ ] 代办
- [x] 完成
- [-] 删除
- [/] 搁置
- [+] 加号
- [*] 星号
- [<] 提前
- [>] 延后
- [?] 问号
- [!] 叹号
- [#] 井号
