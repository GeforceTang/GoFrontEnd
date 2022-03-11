# JavaScript语言入门


## 引入JavaScript

将JavaScript插入HTML的主要方法是使用<script>元素，共有8各属性。

#### 常用的

- src：可选。表示包含要执行的代码的外部文件。
- async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。

#### 不常用的

- type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。
- crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
- integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。
- charset：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。
- language：废弃。最初用于表示代码块中的脚本语言（如"JavaScript"、"JavaScript 1.2"或"VBScript"）。

### 引入方式

方式1：嵌入式JavaScript代码块

```javascript
<script>
  function sayHi() {
    console.log("Hi!");
  }
</script>
```

方式2：引入外部JavaScript文件

```javascript
<script src="example.js"></script>
```

通常认为最佳实践是尽可能将JavaScript代码放在外部文件中，理由如下。

- 可维护性。JavaScript代码如果分散到很多HTML页面，会导致维护困难。而用一个目录保存所有JavaScript文件，则更容易维护，这样开发者就可以独立于使用它们的HTML页面来编辑代码。
- 缓存。浏览器会根据特定的设置缓存所有外部链接的JavaScript文件，这意味着如果两个页面都用到同一个文件，则该文件只需下载一次。这最终意味着页面加载更快。
- 适应未来。通过把JavaScript放到外部文件中，就不必考虑用XHTML注释黑科技（<Script><!-- code--></script>）。包含外部JavaScript文件的语法在HTML和XHTML中是一样的。

### 标签占位

过去所有<Script>和CSS都放到<head>标签内集中管理，但是这样带来的缺点是必须把所有JavaScript代码都下载、解析和解释完成后，才能开始渲染页面（页面在浏览器解析到<body>的起始标签时开始渲染），导致页面渲染延迟。

最佳的做法应该是将所有JavaScript引用放在<body>元素中的页面内容后面，这样一来页面会在处理JavaScript代码之前完全渲染页面，用户会感觉页面加载更快了。

```javascript
<!DOCTYPE html>
<html>
  <head>
  <title>Example HTML Page</title>
  </head>
  <body>
  <!--这里是页面内容-->
  <script src="example1.js"></script>
  <script src="example2.js"></script>
  </body>
</html>
```

### 注意项

#### 延迟执行脚本（defer属性）

表示脚本在执行的时候不会改变页面的结构，脚本会被延迟到整个页面都解析完毕后再运行。相当于告诉浏览器立即下载，但延迟执行。

```javascript
<script defer src="example1.js"></script>
```

- 在浏览器解析到结束的</html>标签后才会执行；
- 第一个推迟的脚本会在第二个推迟的脚本之前执行（不是绝对的，建议只出现一个defer）；
- 在DOMContentLoaded事件之前执行；
- defer属性只对外部脚本文件才有效。

#### 异步执行脚本（async属性）

给脚本添加async属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到该异步脚本下载和执行后再加载其他脚本。

```javascript
<script async src="example1.js"></script>
```

- 与defer类似只适用于外部脚本，都会告诉浏览器立即开始下载；
- 与defer不同的是，标记为async的脚本并不保证能按照它们出现的次序执行；
- 异步脚本不应该在加载期间修改DOM；
- 异步脚本保证会在页面的load事件前执行，但可能会在DOMContentLoaded之前或之后；
- 使用async也会告诉页面你不会使用document.write（不过好的Web开发实践根本就不推荐使用这个方法）。

#### 动态加载脚本（不推荐）

用JavaScript使用DOM API通过向DOM中动态添加script元素加载指定的脚本。

```javascript
let script = document.createElement('script');
script.src = 'gibberish.js';
document.head.appendChild(script);
```

## JavaScript语法

- ECMAScript区分大小写；
- 使用`//`当行注释，使用`/**/`多行注释；
- 语句可以没有`;`来结尾；
- 使用`"use strict"`开启严格模式，不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。

## 变量声明

ECMAScript变量是松散类型的，可以用于保存任何类型的数据，变量只不过是一个用于保存任意值的命名占位符。

### var关键字

```javascript
var message1 = "hi";
message2 = 100;  //合法，但不推荐
var message3="hi",message4="hi",message5="hi";
```

- 在函数内使用var声明的变量是函数的局部变量；

- 但如果函数内未使用var声明则会提升为全局变量；（不推荐）

- var声明提升（hoist）：把所有变量声明都拉到函数作用域的顶部

  ```javascript
  function foo() {
    console.log(age);
    var age = 26;
  }
  foo();  // undefined
  
  //等价于
  function foo() {
    var age;
    console.log(age);
    age = 26;
  }
  foo();  // undefined
  ```

### let关键字

- 与var最大的不同是let声明的范围是块作用域，而var声明的范围是函数作用域。

```javascript
if (true) {
  var name = 'Matt';
  console.log(name); // Matt
}
console.log(name);   // Matt

/*age变量之所以不能在if块外部被引用，是因为它的作用域仅限于该块内部。块作用域是函数作用域的子集，因此适用于var的作用域限制同样也适用于let。*/
if (true) {
  let age = 26;
  console.log(age);   // 26
}
console.log(age);     // ReferenceError: age没有定义
```

- 第二处不同便是let也不允许同一个块作用域中出现冗余声明。

```javascript
var name;
var name;	//不存在问题

let age;
let age;  // SyntaxError；标识符age已经声明过了
```

- 另一个重要区别就是let声明的变量不会在作用域中被提升。

```javascript
// name会被提升
console.log(name); // undefined
var name = 'Matt';

/*在解析代码时，JavaScript引擎也会注意出现在块后面的let声明，只不过在此之前不能以任何方式来引用未声明的变量。在let声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），在此阶段引用任何后面才声明的变量都会抛出ReferenceError。*/
// age不会被提升
console.log(age); // ReferenceError：age没有定义
let age = 26;
```

- 另外使用let在全局作用域中声明的变量不会成为windows对象的属性（var声明变量则会）

```javascript
var name = 'Matt';
console.log(window.name); // 'Matt'

let age = 26;
console.log(window.age);  // undefined
```

- for循环定义使用let声明

```javascript
/*在let出现之前，for循环定义的迭代变量会渗透到循环体外部：*/
for (var i = 0; i < 5; ++i) {
  //循环逻辑
}
console.log(i); // 5

/*改成使用let之后，这个问题就消失了，因为迭代变量的作用域仅限于for循环块内部：*/
for (let i = 0; i < 5; ++i) {
  //循环逻辑
}
console.log(i); // ReferenceError: i没有定义

/*在使用var的时候，最常见的问题就是对迭代变量的奇特声明和修改：*/
for (var i = 0; i < 5; ++i) {
    setTimeout(() => console.log(i), 0)
}
//你可能以为会输出0、1、2、3、4
//实际上会输出5、5、5、5、5
```

### const关键字

const的行为与let基本相同，唯一的区别是用它声明变量时必须同时初始化变量，且尝试修改const声明的变量会导致运行时错误。

```javascript
const age = 26;
age = 36; // TypeError:给常量赋值
// const也不允许重复声明
const name = 'Matt';
const name = 'Nicholas'; // SyntaxError

// const声明的作用域也是块
const name = 'Matt';
if (true) {
  const name = 'Nicholas';
}
console.log(name); // Matt
```

### 最佳实践

1. 尽可能的不适用var：限制只使用let和const有助于提升代码质量，因为变量有了明确的作用域、声明位置，以及不变的值。
2. const优先，let次之：推断某些变量的值永远不会变，同时可以让静态代码分析工具迅速发现因意外赋值导致的非预期行为。

## 数据类型

ECMAScript有6种简单数据类型（也称为原始类型）：Undefined、Null、Boolean、Number、String和Symbol，和一种复杂数据类型叫Object（对象），Object是一种无序名值对的集合。

### typeof操作符

用来确定任意变量的数据类型，使用typeof操作符会返回下列字符串之一：

- "undefined"表示值未定义；
- "boolean"表示值为布尔值；
- "string"表示值为字符串；
- "number"表示值为数值；
- "object"表示值为对象（而不是函数）或null；
- "function"表示值为函数；
- "symbol"表示值为符号。

### Undefined类型

只有一个特殊值undefined。当使用var或let声明了变量但没有初始化时，就相当于给变量赋予了undefined值：

```javascript
let message;	//等价于 let message = undefined;
console.log(message == undefined); // true
```

目的就是为了正式明确空对象指针（null）和未初始化变量的区别。

```javascript
let message;    //这个变量被声明了，只是值为undefined

//确保没有声明过这个变量
// let age

console.log(message); // "undefined"
console.log(age);     //报错
console.log(typeof message); // "undefined"
console.log(typeof age);     // "undefined"

/*无论是声明还是未声明，typeof返回的都是字符串"undefined"。建议在声明变量的同时进行初始化，当typeof返回"undefined"时，就知道是因为变量尚未声明而不是声明了但未初始化。*/
```

undefined是一个假值，可以用更简洁的方式`if(msg)`检测它。

### Null类型

只有一个特殊值null，null值表示一个空对象指针，这也是给typeof传一个null会返回"object"的原因：

```javascript
/*永远不必显式地将变量值设置为undefined。但任何时候只要变量要保存对象，而当时又没有那个对象可保存，就要用null来填充该变量。*/
let car = null;
console.log(typeof car);  // "object"

if (car != null) {
  // car是一个对象的引用
}

/*undefined值是由null值派生而来的，因此ECMA-262将它们定义为表面上相等*/
console.log(null == undefined);  // true
```

null是一个假值，可以用更简洁的方式`if(msg)`检测它。

### Boolean类型

布尔值只有两个值：true和false，但所有其他ECMAScript类型的值都有相应布尔值的等价形式，转换规则如下表：

| 数据类型  | 转换为true的值         | 转换为false的值 |
| --------- | ---------------------- | --------------- |
| Boolean   | true                   | false           |
| String    | 非空字符串             | ""（空字符串）  |
| Number    | 非零数值（包括无穷值） | 0、NaN          |
| Object    | 任意对象               | null            |
| Undefined | N/A（不存在）          | undefined       |

### Number类型

使用IEEE754格式表示整数和浮点值（双精度值）。

#### 整形定义

```javascript
/* 十进制字面量 */
let intNum = 55;  //整数

/* 八进制字面量：第一个数字必须是零（0o），然后是相应的八进制数字（数值0~7），不满足要求则会按十进制处理。*/
let octalNum1 = 0o70;  //八进制的56
let octalNum2 = 0o79;  //无效的八进制值，当成79处理
let octalNum3 = 0o8;   //无效的八进制值，当成8处理

/* 十六进制字面量：必须让真正的数值前缀0x（区分大小写），然后是十六进制数字（0~9以及A~F）。*/
let hexNum1 = 0xA;   //十六进制10
let hexNum2 = 0x1f;  //十六进制31
```

#### 浮点型定义

要定义浮点值，数值中必须包含小数点，而且小数点后面必须至少有一个数字。

```javascript
let floatNum1 = 1.;   //小数点后面没有数字，当成整数1处理
let floatNum2 = 10.0; //小数点后面是零，当成整数10处理
let floatNum = 3.125e7; //科学计数法e7=10的7次方 等于31250000

/*浮点值的精确度最高可达17位小数，但计算结果不精确。例如 0.1加0.2得到的不是0.3，而是0.300 000 000 000 000 04。*/
if (a + b == 0.3) {      //别这么干！
  console.log("You got 0.3.");
}
```

值的范围：5e-324（最小值Number.MIN_VALUE）~ 1.797 693 134 862 315 7e+308（最大值Number.MAX_VALUE中）

```javascript
/*如果某个计算得到的数值结果超出了JavaScript可以表示的范围，那么这个数值会被自动转换为一个特殊的Infinity（无穷）值。任何无法表示的负数以-Infinity（负无穷大）表示，任何无法表示的正数以Infinity（正无穷大）表示。*/
// 使用isFinite()函数可以监测一下计算结果是否超出范围。
let result = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(isFinite(result));  // false
```

#### NaN

有一个特殊的数值叫NaN，意思是“不是数值”（Not a Number），用于表示本来要返回数值的操作失败了（而不是抛出错误）。

- 任何涉及NaN的操作始终返回NaN
- NaN不等于包括NaN在内的任何值

```javascript
console.log(0/0);    // NaN
console.log(-0/+0);  // NaN
console.log(NaN == NaN); // false

/* isNaN()函数 */
console.log(isNaN(NaN));     // true
console.log(isNaN(10));      // false，10是数值
console.log(isNaN("10"));    // false，可以转换为数值10
console.log(isNaN("blue"));  // true，不可以转换为数值
console.log(isNaN(true));    // false，可以转换为数值1
```

#### 数值转换

有3个函数可以将非数值转换为数值：Number()、parseInt()和parseFloat()。

##### Number()

Number()是转型函数，可用于任何数据类型，Number()函数基于如下规则执行转换：

- Boolean类型：true为1，false为0；
- Number类型：直接返回；
- Null类型：返回0；
- Undefined类型：返回NaN；
- 字符串类型：
  - 字符串为数值按前面的定义来解析（十进制、八进制、十六进制）；
  - 空字符串（不含字符）返回0；
  - 其他情况返回NaN。
- Object对象：先使用ValueOf()转换值，如果为NaN则使用toString()以字符串类型转换。

后两个函数主要用于将字符串转换为数值。对于同样的参数，这3个函数执行的操作也不同。。

##### parseInt()

parseInt()函数专注于字符串是否包含数值模式，通常在需要得到整数时可以优先使用parseInt()函数。

```javascript
let num1 = parseInt("1234blue");  // 1234
let num2 = parseInt("");          // NaN
let num3 = parseInt("0xA");       // 10，解释为十六进制整数
let num4 = parseInt(22.5);        // 22
let num5 = parseInt("70");        // 70，解释为十进制值
let num6 = parseInt("0xf");       // 15，解释为十六进制整数

/* parseInt()也接收第二个参数，用于指定底数（进制数）。*/
let num = parseInt("0xAF", 16); // 175
let num1 = parseInt("AF", 16);  // 175
let num2 = parseInt("AF");      // NaN

/* 不传底数参数相当于让parseInt()自己决定如何解析，所以为避免解析出错，建议始终传给它第二个参数。*/
let num1 = parseInt("10", 2);   // 2，按二进制解析
let num2 = parseInt("10", 8);   // 8，按八进制解析
let num3 = parseInt("10", 10);  // 10，按十进制解析
let num4 = parseInt("10", 16);  // 16，按十六进制解析
```

##### parseFloat()

与parseInt()类似，在获取浮点型时可以优先使用parseFloat()函数。

```javascript
let num1 = parseFloat("1234blue");  // 1234，按整数解析
let num2 = parseFloat("0xA");       // 0
let num3 = parseFloat("22.5");      // 22.5
let num4 = parseFloat("22.34.5");   // 22.34
let num5 = parseFloat("0908.5");    // 908.5
let num6 = parseFloat("3.125e7");   // 31250000
```

### String类型

String（字符串）数据类型表示零或多个16位Unicode字符序列，字符串可以使用双引号（"）、单引号（'）或反引号（`）标示。

```javascript
let firstName = "John";
let lastName = 'Jacob';
let lastName = `Jingleheimerschmidt`
```

#### 字符子面量

- \n：换行
- \t：制表
- \b：退格
- \r：回车
- \f：换页
- \\\\：反斜杠（\\）
- \\\'：单引号（'）
- \xnn：十六制编码nn表示的字符（n为十六进制0~F）
- \unnnn：十六制编码nn表示的Unicode字符（n为十六进制0~F）

#### 字符串不可变

字符串是不可变的（immutable），要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量。

```javascript
/* 这里，变量lang一开始包含字符串"Java"。紧接着，lang被重新定义为包含"Java"和"Script"的组合，也就是"JavaScript"。整个过程首先会分配一个足够容纳10个字符的空间，然后填充上"Java"和"Script"。最后销毁原始的字符串"Java"和字符串"Script"，因为这两个字符串都没有用了。*/
let lang = "Java";
lang = lang + "Script";
```

#### 转换为字符串

有两种方式把一个值转换为字符串。

##### toString()

方式1：toString()方法唯一的用途就是返回当前值的字符串等价物。toString()方法可见于数值、布尔值、对象和字符串值，null和undefined值没有toString()方法。

```javascript
let age = 11;
let ageAsString = age.toString();      //字符串"11"
let found = true;
let foundAsString = found.toString();  //字符串"true"

/* 在对数值调用这个方法时，toString()可以接收一个底数参数，即以什么底数来输出数值的字符串表示。默认情况下，toString()返回数值的十进制字符串表示。而通过传入参数，可以得到数值的二进制、八进制、十六进制，或者其他任何有效基数的字符串表示。*/
let num = 10;
console.log(num.toString());     // "10"
console.log(num.toString(2));    // "1010"
console.log(num.toString(8));    // "12"
console.log(num.toString(10));   // "10"
console.log(num.toString(16));   // "a"
```

##### String()

方式2：如果你不确定一个值是不是null或undefined，可以使用String()转型函数，它始终会返回表示相应类型值的字符串。String()函数遵循如下规则。

- 如果值有toString()方法，则调用该方法（不传参数）并返回结果。
- 如果值是null，返回"null"。
- 如果值是undefined，返回"undefined"。

```javascript
let value1 = 10;
let value2 = true;
let value3 = null;
let value4;

console.log(String(value1));  // "10"
console.log(String(value2));  // "true"
console.log(String(value3));  // "null"
console.log(String(value4));  // "undefined"
```

#### 模板字面量

ES6新增了使用模板字面量定义字符串的能力。与使用单引号或双引号不同，模板字面量保留换行字符，可以跨行定义字符串：

```javascript
let myMultiLineString = 'first line\nsecond line';
let myMultiLineTemplateLiteral = `first line
second line`;

console.log(myMultiLineString);
// first line
// second line"

console.log(myMultiLineTemplateLiteral);
// first line
// second line

console.log(myMultiLineString === myMultiLinetemplateLiteral); // true
```

##### 字符串插值

模板字面量最常用的一个特性是支持字符串插值，字符串插值通过在${}中使用一个JavaScript表达式实现。

技术上讲模板字面量不是字符串，而是一种特殊的JavaScript句法表达式，只不过求值后得到的是字符串。模板字面量在定义时立即求值并转换为字符串实例，任何插入的变量也会从它们最接近的作用域中取值。

```javascript
let value = 5;
let exponent = 'second';
//以前，字符串插值是这样实现的：
let interpolatedString =
  value + ' to the ' + exponent + ' power is ' + (value * value);

//现在，可以用模板字面量这样实现：
let interpolatedTemplateLiteral =
  `${ value } to the ${ exponent } power is ${ value * value }`;

console.log(interpolatedString);           // 5 to the second power is 25
console.log(interpolatedTemplateLiteral);  // 5 to the second power is 25

//嵌套的模板字符串无须转义：
console.log(`Hello, ${ `World` }!`);  // Hello, World!

//将表达式转换为字符串时会调用toString()：
let foo = { toString: () => 'World' };
console.log(`Hello, ${ foo }!`);      // Hello, World!

//在插值表达式中可以调用函数和方法：
function capitalize(word) {
  return `${ word[0].toUpperCase() }${ word.slice(1) }`;
}
console.log(`${ capitalize('hello') }, ${ capitalize('world') }!`); // Hello, World!
```

##### 标签函数

模板字面量也支持定义标签函数（tag function），而通过标签函数可以自定义插值行为。标签函数会接收被插值记号分隔后的模板和对每个表达式求值的结果。

```javascript
let a = 6;
let b = 9;

function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
  console.log(strings);
  console.log(aValExpression);
  console.log(bValExpression);
  console.log(sumExpression);

  return 'foobar';
}

let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
let taggedResult = simpleTag`${ a } + ${ b } = ${ a + b }`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15

console.log(untaggedResult);   // "6 + 9 = 15"
console.log(taggedResult);     // "foobar"

//因为表达式参数的数量是可变的，所以通常应该使用剩余操作符（rest operator）将它们收集到一个数组中：
function simpleTag(strings, ...expressions) {
  console.log(strings);
  for(const expression of expressions) {
    console.log(expression);
  }

  return 'foobar';
}
```

#### 原始字符串

使用String.raw标签函数获取元素字符串内容而不是被转换后的字符表示、

```javascript
// \u00A9是版权符号
console.log(`\u00A9`);            // ©
console.log(String.raw`\u00A9`);  // \u00A9

//换行符示例
console.log(`first line\nsecond line`);
// first line
// second line

console.log(String.raw`first line\nsecond line`); // "first line\nsecond line"

//对实际的换行符来说是不行的
//它们不会被转换成转义序列的形式
console.log(`first line
second line`);
// first line
// second line

console.log(String.raw`first line
second line`);
// first line
// second line

//另外，也可以通过标签函数的第一个参数，即字符串数组的.raw属性取得每个字符串的原始内容：
function printRaw(strings) {
  console.log('Actual characters:');
  for (const string of strings) {
    console.log(string);
  }

  console.log('Escaped characters;');
  for (const rawString of strings.raw) {
    console.log(rawString);
  }
}

printRaw`\u00A9${ 'and' }\n`;
// Actual characters:
// ©
//（换行符）
// Escaped characters:
// \u00A9
// \n

```

### Symbol类型

Symbol（符号）是ES6新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

#### 基本使用

符号需要使用Symbol()函数初始化。

```javascript
//因为符号本身是原始类型，所以typeof操作符对符号返回symbol。
let sym = Symbol();
console.log(typeof sym); // symbol

//调用Symbol()函数时，也可以传入一个字符串参数作为对符号的描述（description），将来可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关：
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();

let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');

console.log(genericSymbol == otherGenericSymbol);  // false
console.log(fooSymbol == otherFooSymbol);          // false

//符号没有构造函数不行被初始化
let mySymbol = new Symbol(); // TypeError: Symbol is not a constructor
```

#### 使用全局符号注册表

如果运行时的不同部分需要共享和重用符号实例，那么使用Symbol.for()方法用一个字符串作为键，在全局符号注册表中创建并重用符号。

```javascript
let fooGlobalSymbol = Symbol.for('foo');
console.log(typeof fooGlobalSymbol); // symbol

/* Symbol.for()对每个字符串键都执行幂等操作。第一次使用某个字符串调用时，它会检查全局运行时注册表，发现不存在对应的符号，于是就会生成一个新符号实例并添加到注册表中。后续使用相同字符串的调用同样会检查注册表，发现存在与该字符串对应的符号，然后就会返回该符号实例。*/
let fooGlobalSymbol = Symbol.for('foo');       //创建新符号
let otherFooGlobalSymbol = Symbol.for('foo');  //重用已有符号

console.log(fooGlobalSymbol === otherFooGlobalSymbol);  // true

//即使采用相同的符号描述，在全局注册表中定义的符号跟使用Symbol()定义的符号也并不等同：
let localSymbol = Symbol('foo');
let globalSymbol = Symbol.for('foo');

console.log(localSymbol === globalSymbol); // false

/* 使用Symbol.keyFor()来查询全局注册表，这个方法接收符号，返回该全局符号对应的字符串键。如果查询的不是全局符号，则返回undefined。*/
//创建全局符号
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s));   // foo

//创建普通符号
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2));  // undefined

//如果传给Symbol.keyFor()的不是符号，则该方法抛出TypeError：
Symbol.keyFor(123); // TypeError: 123 is not a symbol
```

//todo 其他待完善...

### Object类型

ECMAScript中的对象其实就是一组数据和功能的集合。对象通过new操作符后跟对象类型的名称来创建。

```javascript
let o = new Object();
let o = new Object;  //合法，但不推荐
```

- constructor：用于创建当前对象的函数。
- hasOwnProperty(propertyName)：用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如o.hasOwnProperty("name")）或符号。
- isPrototypeOf(object)：用于判断当前对象是否为另一个对象的原型。
- propertyIsEnumerable(propertyName)：用于判断给定的属性是否可以使用for-in语句枚举。与hasOwnProperty()一样，属性名必须是字符串。
- toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
- toString()：返回对象的字符串表示。
- valueOf()：返回对象对应的字符串、数值或布尔值表示。通常与toString()的返回值相同。

## 操作符

数学操作符（如加、减）、位操作符、关系操作符和相等操作符等。操作符可用于各种值，包括字符串、数值、布尔值，甚至还有对象，在应用给对象时，操作符通常会调用valueOf()和/或toString()方法来取得可以计算的值。

### 一元操作符

只操作一个值的操作符叫一元操作符（unary operator）

- 递增/递减操作符：--、++；
- 一元加和减：+、-；

### 位操作符

用于操作内存中表示数据的比特（位），位操作符是会将64位转换为32位，执行位操作后再转换为64位。

有符号整数使用32位的前31位表示整数值。

- 符号位（sign bit）：第32位表示数值的符号，如0表示正，1表示负。
- 正值以真正的二进制格式存储，即31位中的每一位都代表2的幂。
- 负值以一种称为二补数（或补码）的二进制编码存储。以值绝对值的二进制表示，将二进制反码，结果+1。

注意：使用位操作符转换也导致了一个奇特的副作用，即特殊值NaN和Infinity在位操作中都会被当成0处理。

#### 按位非（~）

按位非操作符用波浪符（~）表示，它的作用是返回数值的一补数。

```javascript
let num1 = 25;      //二进制00000000000000000000000000011001
let num2 = ~num1;   //二进制11111111111111111111111111100110
console.log(num2);  // -26

//按位非的最终效果是对数值取反并减1
let num1 = 25;
let num2 = -num1 - 1;
console.log(num2);   // "-26"

/*实际上，尽管两者返回的结果一样，但位操作的速度快得多。这是因为位操作是在数值的底层表示上完成的。*/
```

#### 按位与（&）

按位与操作符用和号（&）表示，有两个操作数。按位与就是将两个数的每一个位对齐，然后基于真值表中的规则，对每一位执行相应的与操作。

```javascript
//按位与操作在两个位都是1时返回1，在任何一位是0时返回0。
let result = 25 & 3;
console.log(result); // 1
```

#### 按位或（|）

按位或操作符用管道符（|）表示，同样有两个操作数。

```javascript
//按位或操作存在一位是1时返回1，只有两位都是0时才返回0。
let result = 25 | 3;
console.log(result); // 27
```

#### 按位异或（^）

按位异或用脱字符（^）表示，同样有两个操作数。

```javascript
//只有一位上是1的时候返回1，两位都是1或0则返回0。
let result = 25 ^ 3;
console.log(result); // 26
```

#### 左移（<<）

左移操作符用两个小于号（<<）表示，会按照指定的位数将数值的所有位向左移动。

```javascript
let oldValue = 2;              //等于二进制10
let newValue = oldValue << 5;  //等于二进制1000000，即十进制64
//注意在移位后，数值右端会空出5位。左移会以0填充这些空位，让结果是完整的32位数值。
```

注意：左移会保留它所操作数值的符号。比如，如果-2左移5位，将得到-64，而不是正64。

#### 有符号右移（>>）

有符号右移由两个大于号（>>）表示，会将数值的所有32位都向右移，同时保留符号（正或负）。有符号右移实际上是左移的逆运算。

```javascript
let oldValue = 64;             //等于二进制1000000
let newValue = oldValue >> 5;  //等于二进制10，即十进制2
```

注意：右移后左侧会出现空位，ECMAScript会用符号位的值来填充这些空位，以得到完整的数值。

#### 无符号右移（>>>）

无符号右移用3个大于号表示（>>>），会将数值的所有32位都向右移。

```javascript
//对于正数，无符号右移与有符号右移结果相同。
let oldValue = 64;              //等于二进制1000000
let newValue = oldValue >>> 5;  //等于二进制10，即十进制2

//对于负数，有时候差异会非常大。与有符号右移不同，无符号右移会给空位补0，而不管符号位是什么。
let oldValue = -64;              //等于二进制11111111111111111111111111000000
let newValue = oldValue >>> 5;   //等于十进制134217726
```

### 布尔操作符

布尔操作符一共有3个：逻辑非、逻辑与和逻辑或。

#### 逻辑非（!）

逻辑非操作符由一个叹号（!）表示，始终返回布尔值，无论应用到的是什么数据类型。逻辑非操作符首先将操作数转换为布尔值，然后再对其取反。逻辑非操作符会遵循如下规则：

- 如果操作数是对象，则返回false。
- 如果操作数是空字符串，则返回true。
- 如果操作数是非空字符串，则返回false。
- 如果操作数是数值0，则返回true。
- 如果操作数是非数值0（包含Infinity），则返回flase。
- 如果操作数是null，则返回true。
- 如果操作数是NaN，则返回true。
- 如果操作数是undefined，则返回true。

```javascript
console.log(!false);   // true
console.log(!"blue");  // false
console.log(!0);       // true
console.log(!NaN);     // true
console.log(!"");      // true
console.log(!12345);   // false

//两个!!相当于将对象转换为Boolean类型，等价于调用Boolean()函数。
console.log(!!"blue"); // true
console.log(!!0);      // false
console.log(!!NaN);    // false
console.log(!!"");     // false
console.log(!!12345);  // true
```

#### 逻辑与（&&）

逻辑与操作符由两个和号（&&）表示，应用到两个值。只有两个都为true时才为true。

```javascript
let result = true && false;	//false
```

#### 逻辑或（||）

逻辑或操作符由两个管道符（||）表示，应用到两个值。只要有一个都为true时就为true。

```javascript
let result = true || false;	//true
```

### 乘性操作符

ECMAScript定义了3个乘性操作符：乘法、除法和取模。如果乘性操作符有不是数值的操作数，则该操作数会在后台被使用Number()转型函数转换为数值。这意味着空字符串会被当成0，而布尔值true会被当成1。

#### 乘法操作符（*）

乘法操作符由一个星号（*）表示，可以用于计算两个数值的乘积。

#### 除法操作符（/）

除法操作符由一个斜杠（/）表示，用于计算第一个操作数除以第二个操作数的商。

#### 取模操作符（%）

取模（余数）操作符由一个百分比符号（%）表示。

### 指数操作符（**）

ES7新增了指数操作符，Math.pow()现在有了自己的操作符**。

```javascript
console.log(Math.pow(3, 2);    // 9
console.log(3 ** 2);           // 9

console.log(Math.pow(16, 0.5); // 4
console.log(16** 0.5);         // 4

// 可以使用**=赋值操作符
let squared = 3;
squared **= 2;
console.log(squared); // 9

let sqrt = 16;
sqrt **= 0.5;
console.log(sqrt); // 4
```

### 加性操作符

#### 加法操作符（+）

加法操作符（+）用于求两个数的和。

#### 减法操作符（-）

减法操作符（-）也是使用很频繁的一种操作符

### 关系操作符

关系操作符执行比较两个值的操作，包括小于（<）、大于（>）、小于等于（<=）和大于等于（>=），操作符都返回布尔值。

### 相等操作符

ES提供了两组操作符，第一组是等于和不等于，它们在比较之前执行转换；第二组是全等和不全等，它们在比较之前不执行转换。

#### 等于和不等于

ECMAScript中的等于操作符用两个等于号（==）表示，如果操作数相等，则会返回true。

不等于操作符用叹号和等于号（!=）表示，如果两个操作数不相等，则会返回true。

这两个操作符都会先进行类型转换（通常称为强制类型转换）再确定操作数是否相等。在转换操作数的类型时，相等和不相等操作符遵循如下规则。

##### 转换规则

- 如果任一操作数是布尔值 ，则将其转换为数值再比较是否相等。false转换为0，true转换为1。
- 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。
- 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法取得其原始值，再根据前面的规则进行比较。

##### 比较规则

- null和undefined相等。
- null和undefined不能转换为其他类型的值再进行比较。
- 如果有任一操作数是NaN，则相等操作符返回false，不相等操作符返回true。
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true。否则，两者不相等。

#### 全等和不全等

全等和不全等操作符与相等和不相等操作符类似，只不过它们在比较相等时不转换操作数。

1. 全等操作符由3个等于号（===）表示，只有两个操作数在不转换的前提下相等才返回true。

2. 不全等操作符用一个叹号和两个等于号（!==）表示，只有两个操作数在不转换的前提下不相等才返回true。

注意：注意由于相等和不相等操作符存在类型转换问题，因此推荐使用全等和不全等操作符。这样有助于在代码中保持数据类型的完整性。

### 条件操作符

语法：`variable = boolean_expression ? true_value : false_value;`

### 赋值操作符

- 乘后赋值（*=）
- 除后赋值（/=）
- 取模后赋值（%=）
- 加后赋值（+=）
- 减后赋值（-=）
- 左移后赋值（<<=）
- 右移后赋值（>>=）
- 无符号右移后赋值（>>>=）

### 逗号操作符

逗号操作符可以用来在一条语句中执行多个操作。

```javascript
let num1 = 1, num2 = 2, num3 = 3;

let num = (5, 1, 4, 8, 0); // num的值为0
```

## 语句

流控制语句通常使用一或多个关键字完成既定的任务。

### if语句

语法：`if (condition) statement1 else statement2`

if (condition1) statement1 else if (condition2) statement2 else statement3

### do-while语句

do-while语句是一种后测试循环语句，即循环体中的代码执行后才会对退出条件进行求值。循环体内的代码至少执行一次。

语法：

`do {
  statement
} while (expression);`

### while语句

while语句是一种先测试循环语句，即先检测退出条件，再执行循环体内的代码。while循环体内的代码有可能不会执行。

语法：`while(expression) statement`

### for语句

for语句也是先测试语句，只不过增加了进入循环之前的初始化代码，以及循环执行后要执行的表达式。

语法：`for (initialization; expression; post-loop-expression) statement`

### for-in语句

for-in语句是一种严格的迭代语句，用于枚举对象中的非符号键属性。

语法：`for (property in expression) statement`

### for-of语句

for-of语句是一种严格的迭代语句，用于遍历可迭代对象的元素。

语法：`for (property of expression) statement`

for-of循环会按照可迭代对象的next()方法产生值的顺序迭代元素。如果尝试迭代的变量不支持迭代，则for-of语句会抛出错误。

### 标签语句

标签语句用于给语句加标签。

语法：`label: statement`

### break语句

用于立即退出循环，强制执行循环后的下一条语句。

### continue语句

用于立即退出循环，但会再次从循环顶部开始执行。

### with语句

with语句的用途是将代码作用域设置为特定的对象。

语法：`with (expression) statement;`

警告：由于with语句影响性能且难于调试其中的代码，通常不推荐在产品代码中使用with语句。

### switch语句

switch语句是与if语句紧密相关的一种流控制语句。

语法：

`switch (expression) {
  case value1:
    statement
    break;
  case value2:
    statement
    break;
  case value3:
    statement
    break;
  case value4:
    statement
    break;
  default:
    statement
}`

## 函数

ES中的函数使用function关键字声明，后跟一组参数，然后是函数体。

语法：

`function functionName(arg0, arg1,...,argN) {
  statements
}`

- 不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值。
- 不指定返回值的函数实际上会返回特殊值undefined。

