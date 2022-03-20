# CSS入门学习

## CSS基础

### 简介

全称（cascading style sheet，层叠式样式表），主要用于配合HTML结构添加页面样式、辅助布局。

CSS样式分为文字的样式和盒模型样式，CSS辅助布局实现HTML不能实现的功能，比如并排显示、精确定位。

- 文字三属性：color、font-size、font-family
- 盒子三属性：width、height、background-color

### 颜色

属性名：color

基本使用：`<div style="color:blue"></div>`

由色彩3元素构成，红（red）、绿（green）、蓝（bule），有3种标识方法

- 单词表示法：red、blue

- RGB表示法：rgb(0,0,255)

- 十六进制表示法：#0000FF

![常用的颜色值](..\assets\image-20220320210124126.png)

### 字号

属性名：font-size

基本使用：`<div style="font-size:16px"></div>`

浏览器字号：Chrome浏览器默认字号为16px，最小字号为8px，IE浏览器最小字号为1像素。

### 字体

属性名：font-family

基本使用：`<div style="font-family:'微软雅黑','宋体'"></div>`

属性值：必须以`'`（引号）包裹，属性值可以有多个以`,`(逗号)分割开来。

字体的加载顺序为：优先以前面的字体来加载，如果字体无法识别以后面的字体再加载识别。

通常将因为的字体放到前面，这样可以使得英文字体可以独立加载。

### 盒子三属性

width：设置属性宽度

height：设置属性高度

background-color：设置属性的背景色

## CSS样式表

包含了4种方式：行内式、内嵌式、外链式和导入式。

引用权重：行内是 > 内嵌式和外链式（以顺序来，下面的覆盖上面的） > 导入式

### 行内式

在HTML标签内的style属性中引入，基本语法：`<div style="font-family:'微软雅黑','宋体'"></div>`

### 内嵌式

在head的内部声明<style>，通过选择器制定样式。基本语法：

```html
<head>
    <title>Document</title>
    <style>
        div{
            width: 50px;
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

### 外链式

在head的内部声明<link>，通过链接外部的CSS文件导入样式。基本语法：

```html
<head>
    <title>Document</title>
    <link rel="stylesheet" href="divs.css">
</head>
<body>
    <div></div>
</body>
</html>
```

### 导入式

在head的内部声明<style>，同外链式，语法上存在差异。

导入式必须写在style的最顶部，基本语法：

```html
<head>
    <title>Document</title>
    <style>
        @import url(divs.css);
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

## CSS选择器

选择器的用途是用于定位HTML的元素，分为基础选择器和高级选择器两种。

### 基础选择器

#### 标签选择器

通过HTML标签名来定位元素，选择范围是HTML所有的指定标签。基本语法：

```css
<head>
    <title>Document</title>
    <style>
    p{
        color:red;
    }
    h3{
        color:blue;
    }
    </style>
</head>
<body>
    <p>1</p>
    <div>2</div>
    <h3>3</h3>
</body>
</html>
```

#### 类名选择器

通过定义css类型，选定HTML元素上class对应的元素。基本语法：

```css
<head>
    <title>Document</title>
    <style>
        .a1{
            color: red;
        }
    </style>
</head>
<body>
    <div>1</div>
    <div class="a1">2</div>
    <div class="a2">3</div>
</body>
</html>
```

#### id选择器

通过标签上id属性进行选择，id是元素的身份证，具有唯一性，所以只能选择一个HTML元素。基本属性：

```html
<head>
  <title>Document</title>
  <style>
      #div{
          color: blue;
      }
   </style>
</head>
<body>
    <div>1</div>
    <div class="a1">2</div>
    <div id="div1" class="a2">3</div>
</body>
</html>
```

#### 通配符选择器

书写方法：`*` ，选择范围是html标签内的所有元素。通常用于清除页面的默认样式。

```html
<head>
    <title>Document</title>
    <style>
        *{
            padding: 0;
            margin: 0;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div>1</div>
    <div class="a1">2</div>
    <div id="div1" class="a2">3</div>
    <p>P</p>
    <h3>h3</h3>
</body>
</html>
```

### 高级选择器

#### 后代选择器

#### 交集选择器

#### 并集选择器

## CSS盒模型