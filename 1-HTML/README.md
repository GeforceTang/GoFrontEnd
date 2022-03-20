# Html入门学习

## Html骨架

> HTML是网页的骨架，定义了网页

1. `lang`指定语言，包括zh、cn、zh-cn
2. `meta`是元的意思，用于对浏览器的基本配置
3. 字符集`charset`给浏览器指定加载的字符编码（注意文件需要匹配）    
4. 视口标签`viewport`指定加载的方式
5. 渲染方式`http-equiv`，让浏览器以特定兼容性模式来加载
6. 指定内核`renderer`，比如让360浏览器使用谷歌内核
7. Title标签，浏览器的页面标签内容。
8. `keywords`、`description`用于搜索引擎优化。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

## 基本语法
### 标签（语法及使用）
1. 标签名必须书写在一对尖括号`<>`内部。
2. 标签分为单标签和双标签，双标签必须成对出现，有开始和结束。
（1）单标签，比如：`<br/>`、`<hr>`
（2）双标签，比如：`<h1~6>`
3. 结束标签必须有关闭符号`/`。
4. 根据标签内部存放的内容不同，将不同的标签划分为两个级别：容器和文本。
（1）容器级：是元素内部可以存放文本之外，还可以嵌套标签。比如`div`、`ol`、`ul`、`li`、`h1~6`
（2）文本级：是元素内部只能存放文本或者文本级标签。比如`span`、`img`、`b`、`u`

### 属性（含义及使用）
含义：是标签身上的一些特殊特质，书写在开始标签中，书写语法是`k="v"`。
```html
<a href="https://baidu.com">百度</a>
```

### 注意项
1. 标签间的空白换行不敏感，需要额外的标签来做处理。空白`&nbsp;`、换行`<br/>`。
2. 文字位置不会根据书写位置决定，而是根据标签的种类块级还是行内级决定（ CSS中的概念）。
3. 文本中存在空格，只能识别一个，人工要增加多个空格需要使用空白`&nbsp;`。

## 常用标签
### 标题标签（h1~6）
英文：headline（标题）
一共包含六级 标题，有h1,h2,h3,h4,h5,h6。
从文本定义来说权重就是对文本的定义标题，从浏览器的角度考虑权重是对搜索引擎的优化，h1标签的权重是最高，通常一个页面只显示一个h1用于制作网页的logo。
如果在页面中设置了多个h1标签，搜索引擎会认为存在作弊从而降低排名。

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

### 段落标签（p）
英文：paragraph
双标签，给文本分段。

```html
<p>这是一个段落</p>
```

### 图片标签（img）
英文：Image
单标签，插入图片。

- src属性：作用是指定图片的位置
- alt属性：当图片加载不出来时替换的文本
- width、height属性：设置图片的大小，只设置单个属性可以实现等比例缩放
- title属性：设置鼠标悬停在图片上的提示文本

```html
<img src="" alt="">
```

#### 相对路径和绝对路径
- 相对路径：从html文件出发，找到对应文件位置的路径。进某个文件夹`/`，出某个文件夹`../`。
- 绝对路径：包含了操作系统的盘符和网址2种，盘符为类似于c:/image/a.jpg的形式，网址为https://bk.com/pic/a.jpg。

### 超连接（a）
英文：anchor（锚）
双标签，文本超链接标签
- href（Hypertext reference）：设置超级连的地址，可以是绝对路径也可以是相对路径。
- target：是否在新标签页面打开连接，参数值为`_blank`。
- title：鼠标移上后显示的信息。

```html
<a href="https://baidu.com" title="百度一下，你就知道">百度</a>
```

#### 锚点
锚点作用：点击超连接实现页面内的跳转。

使用方式一：设置一个空描点并设置name属性，和描点的herf属性'#name'对应。

使用方式二：定义要跳转的内容标签id属性，和描点的herf属性'#id'对应。

```html
<!-- 毛链接 -->
<a href="#jbxx">基本信息</a>
<a href="#xxxx">详细信息</a>
<!-- 锚点 -->
<a name="jbxx"></a>
<div id="xxxx"></div>
```

## 列表
由一组标签组成，包含了有序列表（ol）、无序列表（ul）和自定义列表（dl）。

### 无序列表
作用：定义一个没有顺序的列表结构。
标签：由ul（ulordered list）和li（list）组成。

```html
<ul>
    <li>a</li>
    <li>b</li>
</ul>
```

ul内部嵌套li，它们是父子关系。ul标签内部只能嵌套li，而li前面内部可以嵌套任何标签。

### 有序列表
作用：定义一个有顺序的列表结构。
标签：由ol（ordered list）和li（list）组成。
```html
<ol>
    <li>a</li>
    <li>b</li>
</ol>
```

ol适用于有顺序的排名这类情况，类似结构没有顺序要求的使用ul。

### 定义列表
作用：由一个标题和内容自定义的列表结构
标签：由dl（definition list）、dt（definition term）、dd（definition description）组成。
dt：定义主题或定义术语，表示一个列表的主题。
dd：定义解释项，表示解释和说明前面的主题内容。

```html
<dl>
    <dt>一</dt>
    <dd>1</dd>
    <dd>one</dd>

    <dt>二</dt>
    <dd>2</dd>
    <dd>two</dd>
</dl>
```

dl内部只能存放dt和dd，dt和dd是兄弟关系。
工作中dl和同dt单独定义，以方便进行布局。

```html
<dl>
    <dt>一</dt>
    <dd>1</dd>
    <dd>one</dd>
</dl>
<dl>
    <dt>二</dt>
    <dd>2</dd>
    <dd>two</dd>
</dl>
```

## 表格

### 基础

#### 定义

由3个标签组成：

- table：定义一个表格的结构
- tr（table rows）：定义表格的行
- td（table dock）：定义表格的单元格

#### 关系

table -> tr -> td

```html
<!-- Table和td都有边框，通过border-collapse:collapse将边框合并-->
<table border="1" style="border-collapse:collapse">
    <tr>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
</table>
```
#### 表头
th（table header）：定义表格的表头
```html
<table>
    <tr>
        <th>第一行</th>
        <th>第二行</th>
    </tr>
    <tr>
        <th></th>
        <td></td>
    </tr>
</table>
```

### 表格使用
#### 单元格合并
一部分单元格需要进行跨行跨列，可以给对应的td和th表格设置属性：
- rowspan：上下跨行合并
- colspan：左右跨列合并

#### 表格分区
一个完整的表格包含：表格标题、表格表头、和表格主体。table内部含有3个分区标签：
- caption：定义表格的标题
- thead：定义表格的表头，内部嵌套 tr -> td
- tbody：定义表格的主体，内部嵌套 tr -> td

备注：vscode的快捷键 `tr*5>td*5`

## 表单

### 标签标签

#### from标签
form是容器级标签，内部存放即可输入的控件，如果输入的表单需要数据提交，所有控件需要被form表单包裹。

- method：提交的http方法类型，比如post、get
- atcion：数据提交请求的位置

#### input标签
input标签是输入框的一种，通过type属性可以扩展多中功能，比如文本、按钮、选择等

##### 输入框
通过type设置为text加载的
- value：设置默认显示内容
- placeholder：占位符，用于没有内容的时候的提示语

```html
文本框：<input type="text">
```

##### 密码框

通过type设置为password加载的

```html
密码框：<input type="password" placeholder="请输入密码">
```

##### 单选框

通过type设置为radio加载的

注意name的一致性来实现单选互斥的功能。

```html
单选框：<input name="sex" type="radio" >男 <input name="sex" type="radio" >女
```

##### 复选框

通过type设置为checkbox加载的

还是要通过设置name属性来成组。

通过给input标签添加属性`checked="checked"`属性设置为默认选中能力。

```html
多选框：<input name="game" type="checkbox" >dota <input name="game" type="checkbox" >王者荣耀
```

#### Label标签

通过Label标签可以和input联动绑定，扩大input的触发范围。

```html
<!-- 第一种方式，嵌套：-->
多选框：<label><input name="game" type="checkbox" >dota</label> <label><input name="game" type="checkbox" >王者荣耀</label>

<!-- 第二种方式，for属性： -->
多选框：<input id="dota" name="game" type="checkbox" ><label for="dota">dota</label> <label><input name="game" type="checkbox" >王者荣耀</label>
```

#### 文本域

textarea标签，input只能拿输入当行文本，textarea支持多行输入，是一个双标签。

- rows：定义文本域可视取区域有几行。
- cols：定义行显示的字节数量（以英文为准）。
- style="resize:none"：textare可以有自定义缩放能力，通过设置style resize可以关闭此功能。

#### 下拉框

需要2个标签来实现，select -> option

- select：搭建下拉框
- option：搭建下拉选项，selected属性来设置默认。

```html
下拉框：
<select name="diqu">
	<option>江苏</option>
	<option>上海</option>
	<option>山东</option>
</select>
```

## 布局

div和span是常用的布局标签，俗称盒子。

- div：分割跨度大，用于布局风格。
- span：小区域，用于文字分割。

```html
 <div>
 	今天共收入<span style="color: red;">300</span>元
 </div>
```

