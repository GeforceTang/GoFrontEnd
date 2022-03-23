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

### 文本样式

#### 文本对齐

text-align：设置段落的整体水平方向对齐。

#### 文本修饰

text-decoration：设置文本是否有线条，比如none（无）、overline（上划线）、line-through（删除线）、underline（下划线）

#### 文本缩进

text-indent：设置段落的首行缩进，可以有3种方式赋值

1. 以px单位的数值表示法；
2. 以%为单位，参考标签的父级的width的百分比；
3. 以em为单位，以字体大小的个数为单位（常用方案）。

## CSS样式表

包含了4种方式：行内式、内嵌式、外链式和导入式。

引用权重：行内是 > 内嵌式和外链式（以顺序来，下面的覆盖上面的） > 导入式

### 行内式

在HTML标签内的style属性中引入，基本语法：`<div style="font-family:'微软雅黑','宋体'"></div>`

### 内嵌式

在head的内部声明<style>，通过选择器制定样式。基本语法：

```html
<!DOCTYPE html>
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
<!DOCTYPE html>
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
<!DOCTYPE html>
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

同样选择器非常的灵活，可以各种组合使用，比如下面:

`#par .box li,div { color:red; }`

标识id为par下面的类为box下的li和div，修改其字体颜色为红色。

### 基础选择器

#### 标签选择器

通过HTML标签名来定位元素，选择范围是HTML所有的指定标签。基本语法：

```css
<!DOCTYPE html>
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
<!DOCTYPE html>
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
<!DOCTYPE html>
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
<!DOCTYPE html>
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

通过标签之后的后代关系去决定选择范围元素，作用是用于精确匹配。后代关系不一定是直接父子关系，可以是隔代关系。

书写方法：使用空格连续读个选择器。

```html
<!DOCTYPE html>
<head>
    <title>Document</title>
    <style>
        .box1 ul li{
            color: brown;
        }
        /* 同样可以使用隔代关系，不需要直接父子。
        .box1 li{
            color: brown;
        }*/
    </style>
</head>
<body>
    <div class="box1">
        <ul>
            <li>box1中的li1</li>
            <li>box1中的li2</li>
            <li>box1中的l13</li>
        </ul>
    </div>
    <div class="box2">
        <ul>
            <li>box2中的li1</li>
            <li>box2中的li2</li>
            <li>box2中的li3</li>
        </ul>
    </div>
</body>
</html>
```

#### 交集选择器

作用是满足所有选择器条件的匹配。

书写方法：将多个选择器连接抒写，中间没有空格（不需要增加任何符号）。

```html
<!DOCTYPE html>
<head>
    <title>Document</title>
    <style>
        div.par{
            color: cyan;
        }
    </style>
</head>
<body>
    <p class="par">par</p>
    <div class="par">par</div>
</body>
</html>
```

#### 并集选择器

并集选择器有'和'的意思，将多个选择器设置为同样的属性。

书写方法：使用`,`（逗号）作为多个选择器之间的连接符。

```html
<!DOCTYPE html>
<head>
    <title>Document</title>
    <style>
        div,p{
            color: cyan;
        }
    </style>
</head>
<body>
    <p class="par">par</p>
    <div class="par">par</div>
</body>
</html>
```

### 层叠性和继承性

#### 继承性

定义：只需要给父元素设置文字属性，内部子元素就能加载到这个属性，这个特性称之为集成性。

通过开发者工具查看样式，可以看到css标记有`inherited from`，代表这个属性有继承性。

**注意：css的继承性都是文字类的属性，比如color、font-size、font-family等。**

#### 层叠性

CSS样式表又称之为”层叠式样式表“：一个标签可以被多个选择器选中，并设置对应的属性，当多个选择性设置了相同的属性时，会存在优先级。

优先级为：元素内部的Stype > ID选择器 > 类选择器 > 标签选择器。

观察浏览器中发现元素的某些样式属性被杠掉了，这个情况下称之为被层叠了，也就是CSS的层叠性。

##### 例题

```html
<!DOCTYPE html>
<head>
    <title>Document</title>
    <style>
        .box1 div.box2 #box3 p{
            color: red;
        }
        #box1 #box2 div.box3 p{
            color: blue;
        }
        #box1 div.box2 .box3 p{
            color: green;
        }
    </style>
</head>
<body>
    <div id="box1" class="box1">
        <div id="box2" class="box2">
            <div id="box3" class="box3">
                <p>文字</p>
            </div>
        </div>
    </div>
</body>
</html>
```

解题：对于复杂选择器需要数选择器，观察是否选择的是同一个选择器，比如上述的。如果没有选定制定元素，则以离着近的。

将上面的选择器梳理，比如第一个样式中 id的有1个、class的有2个，标签的有2个。以这个方式解析下来：

1、.box1 div.box2 #box3 => 1，2，2

2、#box1 #box2 div.box3 p => 2，1，2

3、#box1 div.box2 .box3 p => 1，2，2

比较数值以最大的为准。

## CSS盒模型