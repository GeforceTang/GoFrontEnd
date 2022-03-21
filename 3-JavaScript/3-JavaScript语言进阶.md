# JavaScript语言进阶

> 

## 变量特性

JavaScript变量是松散类型的，而且变量不过就是特定时间点一个特定值的名称而已。由于没有规则定义变量必须包含什么数据类型，变量的值和数据类型在脚本生命期内可以改变。ECMAScript变量可以包含两种不同类型的数据：原始值和引用值。

- 原始值（primitive value）：Undefined、Null、Boolean、Number、String和Symbol。保存原始值的变量是按值（by value）访问的

- 引用值（reference value）：保存在内存中的对象，操作对象的引用（reference）而非实际的对象本身。保存引用值的变量是按引用（by reference）访问的。

### 动态属性

引用值可以随时添加、修改和删除其属性和方法。

```javascript
let person = new Object();
person.name = "Nicholas";
console.log(person.name); // "Nicholas"

//原始值不能有属性
let name = "Nicholas";
name.age = 27;
console.log(name.age);  // undefined

//如果使用的是new关键字，则JavaScript会创建一个Object类型的实例。
let name1 = "Nicholas";
let name2 = new String("Matt");
name1.age = 27;
name2.age = 26;
console.log(name1.age);    // undefined
console.log(name2.age);    // 26
console.log(typeof name1); // string
console.log(typeof name2); // object
```

### 复制值

存储方式不同，原始值和引用值在通过变量复制时也有所不同。

```javascript
// 原始值是完全独立的，独立使用互补干扰。
let num1 = 5;
let num2 = num1;
num1=3

// 引用值实际赋值的是指针，指向的是同一个对象，操作会有影响。
let obj1 = new Object();
let obj2 = obj1;
obj1.name = "Nicholas";
console.log(obj2.name); // "Nicholas"
```

### 传递参数

ES中所有函数参数都是按值传递的，和变量复制值是一样的道理。

```javascript
//在按值传递参数时，值会被复制到一个局部变量（即一个命名参数，或者用ECMAScript的话说，就是arguments对象中的一个槽位）。
function addTen(num) {
  num += 10;
  return num;
}

let count = 20;
let result = addTen(count);
console.log(count);  // 20，没有变化
console.log(result); // 30


//在按引用传递参数时，值在内存中的位置会被保存在一个局部变量，这意味着对本地变量的修改会反映到函数外部。
function setName(obj) {
  obj.name = "Nicholas";
}

let person = new Object();
setName(person);
console.log(person.name);  // "Nicholas"
```

### 确定类型

#### 原始类型

typeof操作符最适合用来判断一个变量是否为原始类型。

```javascript
let s = "Nicholas";
let b = true;
let i = 22;
let u;
let n = null;
let o = new Object();
console.log(typeof s); // string
console.log(typeof i); // number
console.log(typeof b); // boolean
console.log(typeof u); // undefined
console.log(typeof n); // object
console.log(typeof o); // object
```

typeof操作符在用于检测函数时会返回"function"，任何实现内部[[Call]]方法的对象都应该在typeof检测时返回"function"。

#### 引用值

typeof虽然对原始值很有用，但它对引用值的用处不大（始终返回object）。ES提供了instanceof操作符

语法：`result = variable instanceof constructor`

```javascript
//如果变量是给定引用类型（由其原型链决定）的实例，则instanceof操作符返回true。
console.log(person instanceof Object);  //变量person是Object吗？
console.log(colors instanceof Array);   //变量colors是Array吗？
console.log(pattern instanceof RegExp); //变量pattern是RegExp吗？
```

所有引用值都是Object的实例，因此通过instanceof操作符检测任何引用值和Object构造函数都会返回true。类似地，如果用instanceof检测原始值，则始终会返回false，因为原始值不是对象。

## 上下文与作用域

> 变量或函数的执行上下文（简称“上下文”）决定了它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的变量对象（variable object），而这个上下文中定义的所有变量和函数都存在于这个对象上。全局上下文是最外层的上下文。在浏览器中全局上下文是window对象，所有通过var定义的全局变量和函数都会成为window对象的属性和方法。

下文中的代码在执行的时候，会创建变量对象的一个作用域链（scope chain）。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。如果上下文是函数，则其活动对象（activation object）用作变量对象。活动对象最初只有一个定义变量：arguments（全局上下文中没有这个变量）。作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；全局上下文的变量对象始终是作用域链的最后一个变量对象。

```javascript
var color = "blue";

function changeColor() {
  let anotherColor = "red";

  function swapColors() {
    let tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    //这里可以访问color、anotherColor和tempColor
  }
  //这里可以访问color和anotherColor，但访问不到tempColor
  swapColors();
}

//这里只能访问color
changeColor();
```

### 作用域链增强

执行上下文主要有全局上下文和函数上下文两种（eval()调用内部存在第三种上下文），但有其他方式来增强作用域链。某些语句会导致在作用域链前端临时添加一个上下文，这个上下文在代码执行后会被删除。

- try/catch语句的catch块
- with语句

### 变量声明

#### var作用域声明

在使用var声明变量时，变量会被自动添加到最接近的上下文。在函数中，最接近的上下文就是函数的局部上下文。在with语句中，最接近的上下文也是函数上下文。

```javascript
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}

let result = add(10, 20); // 30
console.log(sum);         //报错：sum在这里不是有效变量

// 如果省略上面例子中的关键字var，那么sum在add()被调用之后就变成可以访问的了。
function add(num1, num2) {
  sum = num1 + num2;
  return sum;
}

let result = add(10, 20); // 30
console.log(sum);         // 30
//注意：未经声明而初始化变量是JavaScript编程中一个非常常见的错误，会导致很多问题
//这个现象的原因叫“提升”（hoisting）。
```

#### let块级作用域声明

let的作用域是块级的，这块级作用域由最近的一对包含花括号{}界定。比如if块、while块、function块，甚至连单独的块也是let声明变量的作用域。

```javascript
if (true) {
  let a;
}
console.log(a); // ReferenceError: a没有定义

while (true) {
  let b;
}
console.log(b); // ReferenceError: b没有定义

function foo() {
  let c;
}
console.log(c); // ReferenceError: c没有定义
                //这没什么可奇怪的
                // var声明也会导致报错

//这不是对象字面量，而是一个独立的块
// JavaScript解释器会根据其中内容识别出它来
{
  let d;
}
console.log(d); // ReferenceError: d没有定义
```

##### let与var的区别

- 重复的var声明会被忽略，而重复的let声明会抛出SyntaxError。
- let的行为适合在循环中声明迭代变量，使用var声明的迭代变量会泄漏到循环外部。
- 不能在声明之前使用let变量：let在JavaScript运行时中也会被提升，但由于存在“暂时性死区”（temporal dead zone）。

#### const的常量声明

使用const声明的变量必须同时初始化为某个值。一经声明，在其生命周期的任何时候都不能再重新赋予新值。

```javascript
const a; // SyntaxError:常量声明时没有初始化

const b = 3;
console.log(b); // 3
b = 4; // TypeError:给常量赋值
```

#### 识符查找

标识符搜索开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文中找到该标识符，则搜索停止，变量确定；如果没有找到变量名，则继续沿作用域链搜索。

```javascript
var color = 'blue';

function getColor() {
  let color = 'red';
  return color;
}

console.log(getColor()); // 'red'
//使用块级作用域声明并不会改变搜索流程，但可以给词法层级添加额外的层次：var color = 'blue';

function getColor() {
  let color = 'red';
  {
    let color = 'green';
    return color;
  }
}

console.log(getColor()); // 'green'
```

## 垃圾回收

JavaScript是使用垃圾回收的语言，不需要负责在代码管理内存。在浏览器的发展史上，用到过两种主要的标记策略：标记清理和引用计数。

### 标记清理

JavaScript最常用的垃圾回收策略是标记清理（mark-and-sweep）。当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。
给变量加标记的方式有很多种。比如，当变量进入上下文时，反转某一位；或者可以维护“在上下文中”和“不在上下文中”两个变量列表，可以把变量从一个列表转移到另一个列表。标记过程的实现并不重要，关键是策略。

### 引用计数

另一种没那么常用的垃圾回收策略是引用计数（reference counting）。其思路是对每个值都记录它被引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为1。如果同一个值又被赋给另一个变量，那么引用数加1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减1。当一个值的引用数为0时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序下次运行的时候就会释放引用数为0的值的内存。

但存在循环引用问题。为避免类似的循环引用问题，应该在确保不使用的情况下切断原生JavaScript对象与DOM元素之间的连接。比如通过以下代码可以清除前面的例子中建立的循环引用：

```javascript
// 把变量设置为null实际上会切断变量与其之前引用值之间的关系。当下次垃圾回收程序运行时，这些值就会被删除，内存也会被回收。
myObject.element = null;
element.someObject = null;
```

### 性能优化

#### 内存管理（解除引用）

将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用的最佳手段就是保证在执行代码时只保存必要的数据。如果数据不再必要，那么把它设置为null，从而释放其引用。这个建议最适合全局变量和全局对象的属性。局部变量在超出作用域后会被自动解除引用：

```javascript
function createPerson(name){
  let localPerson = new Object();
  localPerson.name = name;
  return localPerson;
}

let globalPerson = createPerson("Nicholas");

//解除globalPerson对值的引用

globalPerson = null;
```

#### 声明提升性能（const和let）

const和let都以块（而非函数）为作用域，所以相比于使用var，使用这两个新关键字可能会更早地让垃圾回收程序介入，尽早回收应该回收的内存。

#### 共享隐藏类（V8）

运行期间，V8会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征，共享相同隐藏类的对象性能会更好。

```javascript
function Article() {
  this.title = 'Inauguration Ceremony Features Kazoo Band';
}

let a1 = new Article();
let a2 = new Article();

//避免动态属性，不管是新增或者删除（定义的时候存在author）都会导致无法共享隐藏类。
a1.author = 'jake'
delete a1.author;
```

#### 避免内存泄露

window对象上创建的属性，只要window本身不被清理就不会消失，也就无法清理。

另外闭包也会造成内存泄露：

```javascript
/* 调用outer()会导致分配给name的内存被泄漏。以上代码执行后创建了一个内部闭包，只要返回的函数存在就不能清理name，因为闭包一直在引用着它。假如name的内容很大（不止是一个小字符串），那可能就是个大问题了。*/
let outer = function() {
  let name = 'Jake';
  return function() {
    return name;
  };
};
```

#### 静态分配与对象池

说白了就是享元模式（Flyweight Pattern）。

## 基本引用类型

引用类型是把数据和功能组织到一起的结构，经常被人错误地称作“类”。引用类型有时候也被称为对象定义，描述了自己的对象应有的属性和方法。

对象被认为是某个特定引用类型的实例。新对象通过使用new操作符后跟一个构造函数（constructor）来创建。构造函数就是用来创建新对象的函数，比如下面这行代码：

### Date

Date类型可以精确表示1970年1月1日之前及之后285 616年的日期。

语法：`let now = new Date()`

### RegExp

ECMAScript通过RegExp类型支持正则表达式。

语法：`let expression = /pattern/flags` 或 `let expression = new RegExp("pattern","flags")`

#### 匹配模式

- g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
- i：不区分大小写，表示在查找匹配时忽略pattern和字符串的大小写。
- m：多行模式，表示查找到一行文本末尾时会继续查找。
- y：粘附模式，表示只查找从lastIndex开始及之后的字符串。
- u：Unicode模式，启用Unicode匹配。
- s：dotAll模式，表示元字符.匹配任何字符（包括\n或\r）。

```javascript
// 匹配字符串中的所有"at"
let pattern1 = /at/g;

// 匹配第一个"bat"或"cat"，忽略大小写
let pattern2 = /[bc]at/i;

// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;
```

#### exec()

方法只接收一个参数，即要应用模式的字符串。如果找到了匹配项，则返回包含第一个匹配信息的数组；如果没找到匹配项，则返回null。返回的数组虽然是Array的实例，但包含两个额外的属性：index和input。index是字符串中匹配模式的起始位置，input是要查找的字符串。

```javascript
let text = "mom and dad and baby";
let pattern = /mom( and dad( and baby)?)?/gi;

let matches = pattern.exec(text);
console.log(matches.index);   // 0
console.log(matches.input);   // "mom and dad and baby"
console.log(matches[0]);      // "mom and dad and baby"
console.log(matches[1]);      // " and dad and baby"
console.log(matches[2]);      // " and baby"
```

### 包装类型

ECMAScript提供了3种特殊的引用类型：Boolean、Number和String。具有引用类型一样的特点，但也具有与各自原始类型对应的特殊行为。

#### Boolean（不推荐使用）

Boolean是对应布尔值的引用类型。

#### Number

Number是对应数值的引用类型。

- toFixed()自动舍入的特点可以用于处理货币。
- toExponential()，返回以科学记数法（也称为指数记数法）表示的数值字符串。
- toPrecision()方法会根据情况返回最合理的输出结果，可能是固定长度，也可能是科学记数法形式。
- Number.isInteger()方法，用于辨别一个数值是否保存为整数。

#### String

String是对应字符串的引用类型。

```javascript
let message = "abcde";

//字符串的length属性表示字符串包含多少16位码元
console.log(message.length); // 5

//charAt()方法返回给定索引位置的字符
console.log(message.charAt(2)); // "c"

//使用charCodeAt()方法可以查看指定码元的字符编码。
console.log(message.charCodeAt(2));  // 99
```

##### concat()方法

用于将一个或多个字符串拼接成一个新字符串。来看下面的例子：

```javascript
let stringValue = "hello ";
let result = stringValue.concat("world");

console.log(result);      // "hello world"
console.log(stringValue); // "hello"
```

##### slice()、substr()和substring()

这3个方法都返回调用它们的字符串的一个子字符串，而且都接收一或两个参数。第一个参数表示子字符串开始的位置，第二个参数表示子字符串结束的位置。

```javascript
let stringValue = "hello world";
console.log(stringValue.slice(3));       // "lo world"
console.log(stringValue.substring(3));   // "lo world"
console.log(stringValue.substr(3));      // "lo world"
console.log(stringValue.slice(3, 7));    // "lo w"
console.log(stringValue.substring(3,7)); // "lo w"
console.log(stringValue.substr(3, 7));   // "lo worl"
```

##### indexOf()和lastIndexOf()

这两个方法从字符串中搜索传入的字符串，并返回位置（如果没找到，则返回-1）。

```javascript
//两者的区别在于，indexOf()方法从字符串开头开始查找子字符串，而lastIndexOf()方法从字符串末尾开始查找子字符串。来看下面的例子：
let stringValue = "hello world";
console.log(stringValue.indexOf("o"));     // 4
console.log(stringValue.lastIndexOf("o")); // 7
```

##### startsWith()、endsWith()和includes()

这些方法都会从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值。

```javascript
//它们的区别在于，startsWith()检查开始于索引0的匹配项，endsWith()检查开始于索引(string.length - substring.length)的匹配项，而includes()检查整个字符串：
let message = "foobarbaz";

console.log(message.startsWith("foo"));  // true
console.log(message.startsWith("bar"));  // false

console.log(message.endsWith("baz"));    // true
console.log(message.endsWith("bar"));    // false

console.log(message.includes("bar"));    // true

console.log(message.includes("qux"));    // false
```

##### trim()方法

这个方法会创建字符串的一个副本，删除前、后所有空格符，再返回结果。由于trim()返回的是字符串的副本，因此原始字符串不受影响，即原本的前、后空格符都会保留。另外，trimLeft()和trimRight()方法分别用于从字符串开始和末尾清理空格符。 

```javascript
let stringValue = "  hello world  ";
let trimmedStringValue = stringValue.trim();
console.log(stringValue);         // "  hello world "
console.log(trimmedStringValue);  // "hello world"
```

##### repeat()方法

这个方法接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果。

```javascript
let stringValue = "na ";
console.log(stringValue.repeat(16) + "batman");
// na na na na na na na na na na na na na na na na batman
```

##### padStart()和padEnd()

padStart()和padEnd()方法会复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件。这两个方法的第一个参数是长度，第二个参数是可选的填充字符串，默认为空格（U+0020）。

```javascript
let stringValue = "foo";

console.log(stringValue.padStart(6));       // "   foo"
console.log(stringValue.padStart(9, "."));  // "......foo"

console.log(stringValue.padEnd(6));         // "foo   "
console.log(stringValue.padEnd(9, "."));    // "foo......"
```

##### toLowerCase()、toLocaleLowerCase()、toUpperCase()和toLocaleUpperCase()

toLowerCase()和toUpperCase()方法是原来就有的方法，toLocaleLowerCase()和toLocaleUpperCase()方法旨在基于特定地区实现。在很多地区，地区特定的方法与通用的方法是一样的。但在少数语言中（如土耳其语），Unicode大小写转换需应用特殊规则，要使用地区特定的方法才能实现正确转换。

```javascript
let stringValue = "hello world";
console.log(stringValue.toLocaleUpperCase());  // "HELLO WORLD"
console.log(stringValue.toUpperCase());        // "HELLO WORLD"
console.log(stringValue.toLocaleLowerCase());  // "hello world"
console.log(stringValue.toLowerCase());        // "hello world"
```

##### 字符串模式匹配方法

String类型专门为在字符串中实现模式匹配设计了几个方法。

###### match()方法

这个方法本质上跟RegExp对象的exec()方法相同。match()方法接收一个参数，可以是一个正则表达式字符串，也可以是一个RegExp对象。

```javascript
let text = "cat, bat, sat, fat";
let pattern = /.at/;

//等价于pattern.exec(text)
let matches = text.match(pattern);
console.log(matches.index);      // 0
console.log(matches[0]);         // "cat"
console.log(pattern.lastIndex);  // 0
```

###### search()方法

返回模式第一个匹配的位置索引，如果没找到则返回-1。search()始终从字符串开头向后匹配模式。

```javascript
let text = "cat, bat, sat, fat";
let pos = text.search(/at/);
console.log(pos);  // 1
```

###### replace()方法

简化子字符串替换操作

```javascript
let text = "cat, bat, sat, fat";
let result = text.replace("at", "ond");
console.log(result);  // "cond, bat, sat, fat"

result = text.replace(/at/g, "ond");
console.log(result);  // "cond, bond, sond, fond"
```

###### split()方法

根据传入的分隔符将字符串拆分成数组。

```javascript
let colorText = "red,blue,green,yellow";
let colors1 = colorText.split(",");       // ["red", "blue", "green", "yellow"]
let colors2 = colorText.split(",", 2);    // ["red", "blue"]
let colors3 = colorText.split(/[^,]+/);   // ["", ",", ",", ",", ""]
```

### 单例内置对象

ECMA-262对内置对象的定义是“任何由ECMAScript实现提供、与宿主环境无关，并在ECMAScript程序开始执行时就存在的对象”。开发者不用显式地实例化内置对象，因为它们已经实例化好了。

#### GlobalGlobal对象

是ECMAScript中最特别的对象，因为代码不会显式地访问它。ECMA-262规定Global对象为一种兜底对象，它所针对的是不属于任何对象的属性和方法。在全局作用域中定义的变量和函数都会变成Global对象的属性。包括isNaN()、isFinite()、parseInt()和parseFloat()，实际上都是Global对象的方法。除了这些，Global对象上还有另外一些方法：

##### URL编码方法

encodeURI()和encodeURIComponent()方法用于编码统一资源标识符（URI），以便传给浏览器。有效的URI不能包含某些字符，比如空格。使用URI编码方法来编码URI可以让浏览器能够理解它们，同时又以特殊的UTF-8编码替换掉所有无效字符。

##### eval()方法

可能是整个ECMAScript语言中最强大的方法，是一个完整的ECMAScript解释器，它接收一个参数，即一个要执行的ECMAScript（JavaScript）字符串。

##### window对象

浏览器将window对象实现为Global对象的代理，所有全局作用域中声明的变量和函数都变成了window的属性。

#### Math

Math对象作为保存数学公式、信息和计算的地方。Math对象提供了一些辅助计算的属性和方法。

注意：Math对象上提供的计算要比直接在JavaScript实现的快得多，因为Math对象上的计算使用了JavaScript引擎中更高效的实现和处理器指令。但使用Math计算的问题是精度会因浏览器、操作系统、指令集和硬件而异。

##### min()和max()方法

用于确定一组数值中的最小值和最大值。

##### 舍入方法

用于把小数值舍入为整数的4个方法：Math.ceil()、Math.floor()、Math.round()和Math.fround()。

- Math.ceil()方法始终向上舍入为最接近的整数。
- Math.floor()方法始终向下舍入为最接近的整数。
- Math.round()方法执行四舍五入。
- Math.fround()方法返回数值最接近的单精度（32位）浮点值表示。

```javascript
console.log(Math.ceil(25.9));   // 26
console.log(Math.ceil(25.5));   // 26
console.log(Math.ceil(25.1));   // 26

console.log(Math.round(25.9));  // 26
console.log(Math.round(25.5));  // 26
console.log(Math.round(25.1));  // 25

console.log(Math.fround(0.4));  // 0.4000000059604645
console.log(Math.fround(0.5));  // 0.5
console.log(Math.fround(25.9)); // 25.899999618530273

console.log(Math.floor(25.9));  // 25
console.log(Math.floor(25.5));  // 25
console.log(Math.floor(25.1));  // 25
```

##### random()方法

Math.random()方法返回一个0~1范围内的随机数，其中包含0但不包含1。

```javascript
//可以基于如下公式使用Math.random()从一组整数中随机选择一个数：

//这里使用了Math.floor()方法，因为Math.random()始终返回小数，即便乘以一个数再加上一个数也是小数。

number = Math.floor(Math.random() * total_number_of_choices + first_possible_value)
// 如果想从1~10范围内随机选择一个数，代码就是这样的：

let num = Math.floor(Math.random() * 10 + 1);
这样就有10个可能的值（1~10），其中最小的值是1。如果想选择一个2~10范围内的值，则代码就要写成这样：

let num = Math.floor(Math.random() * 9 + 2);
```

##### abs(x)方法

返回x的绝对值

##### pow(x,power)方法

返回x的power次幂

## 集合引用类型

### Object类型

#### 创建Object

```javascript
// new操作符 + Object构造函数
let person = new Object()	//与let person = {}; 相同
person.name = "Nicholas";
person.age = 29;

// 对象字面量（object literal）表示法
let person = {
  name: "Nicholas",
  age: 29
};
```

#### 获取属性值

一般是通过点语法来存取的，也可以使用中括号来存取属性。在使用中括号时，要在括号内使用属性名的字符串形式，

```javascript
console.log(person["name"]); // "Nicholas"
console.log(person.name);    // "Nicholas"

// 如果属性名中包含可能会导致语法错误的字符，或者包含关键字/保留字时，也可以使用中括号语法。
person["first name"] = "Nicholas";
```

### Array类型

ECMAScript数组也是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以存储任意类型的数据。

#### 创建数组

```javascript
let colors = new Array();
let colors = new Array(3);     //创建一个包含3个元素的数组
let names = new Array("Greg"); //创建一个只包含一个元素，即字符串"Greg"的数组
let colors = new Array("red", "blue", "green");//创建一个包含3个元素

//在使用Array构造函数时，也可以省略new操作符。结果是一样的，比如：
let colors = Array(3);     //创建一个包含3个元素的数组
let names = Array("Greg"); //创建一个只包含一个元素，即字符串"Greg"的数组

//使用数组字面量（array literal）表示法。数组字面量是在中括号中包含以逗号分隔的元素列表，
let colors = ["red", "blue", "green"];  //创建一个包含3个元素的数组
let names = [];                         //创建一个空数组
let values = [1,2,];                    //创建一个包含2个元素的数组



```

#### 数组转换

```javascript
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]

// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);

console.log(a1);        // [1, 2, 3, 4]
alert(a1 === a2); // false

// 应用于可迭代对象，arguments对象可以被轻松地转换为数组
function getArgsArray() {
  return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]
```

#### 数组空位

```javascript
const options = [,,,,,]; //创建包含5个元素的数组
console.log(options.length);   // 5
console.log(options);          // [,,,,,]
```

#### 数组索引

要取得或设置数组的值，需要使用中括号并提供相应值的数字索引

```javascript
let colors = ["red", "blue", "green"];  //定义一个字符串数组
alert(colors[0]);                       //显示第一项
colors[2] = "black";                    //修改第三项
colors[3] = "brown";                    //添加第四项
```

#### 数组增减

通过修改length属性，可以从数组末尾删除或添加元素。

```javascript
let colors = ["red", "blue", "green"]; //创建一个包含3个字符串的数组
colors.length = 2;
alert(colors[2]);  // undefined

let colors = ["red", "blue", "green"];  //创建一个包含3个字符串的数组
colors.length = 4;
alert(colors[3]);  // undefined

let colors = ["red", "blue", "green"];  //创建一个包含3个字符串的数组
colors[colors.length] = "black";        //添加一种颜色（位置3）
colors[colors.length] = "brown";        //再添加一种颜色（位置4

let colors = ["red", "blue", "green"];  //创建一个包含3个字符串的数组
colors[99] = "black";                   //添加一种颜色（位置99）
alert(colors.length);                   // 100
```

#### 检测数组

一个经典的ECMAScript问题是判断一个对象是不是数组。

```javascript
// 在只有一个网页（因而只有一个全局作用域）的情况下，使用instanceof操作符就足矣：
if (value instanceof Array){
  //操作数组
}

//如果网页里有多个框架，涉及两个不同的全局执行上下文，存在两个不同版本的Array构造函数。ECMAScript提供了Array.isArray()方法。这个方法的目的就是确定一个值是否为数组，而不用管它是在哪个全局执行上下文中创建的。
if (Array.isArray(value)){
  //操作数组
}
```

#### 迭代器方法

在ES6中，Array的原型上暴露了3个用于检索数组内容的方法：keys()、values()和entries()。

- keys()返回数组索引的迭代器，

- values()返回数组元素的迭代器，

- entries()返回索引/值对的迭代器：

```javascript
const a = ["foo", "bar", "baz", "qux"];

// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());
console.log(aKeys);     // [0, 1, 2, 3]
console.log(aValues);   // ["foo", "bar", "baz", "qux"]
console.log(aEntries);  // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]

// 使用ES6的解构可以非常容易地在循环中拆分键/值对
const a = ["foo", "bar", "baz", "qux"];
for (const [idx, element] of a.entries()) {
  alert(idx);
  alert(element);
}
// 0
// foo
// 1
// bar
// 2
// baz
// 3
// qux
```

#### 复制和填充方法

ES6新增了两个方法：批量复制方法copyWithin()，以及填充数组方法fill()。指定既有数组实例上的一个范围，包含开始索引，不包含结束索引。使用这个方法不会改变数组的大小。

##### fill()方法

可以向一个已有的数组中插入全部或部分相同的值。开始索引用于指定开始填充的位置，它是可选的。如果不提供结束索引，则一直填充到数组末尾。负值索引从数组末尾开始计算。也可以将负索引想象成数组长度加上它得到的一个正索引：

```javascript
const zeroes = [0, 0, 0, 0, 0];

/用5填充整个数组
zeroes.fill(5);
console.log(zeroes);  // [5, 5, 5, 5, 5]
zeroes.fill(0);       //重置

//用6填充索引大于等于3的元素
zeroes.fill(6, 3);
console.log(zeroes);  // [0, 0, 0, 6, 6]
zeroes.fill(0);       //重置

//用7填充索引大于等于1且小于3的元素
zeroes.fill(7, 1, 3);
console.log(zeroes);  // [0, 7, 7, 0, 0];
zeroes.fill(0);       //重置

//用8填充索引大于等于1且小于4的元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1);
console.log(zeroes);  // [0, 8, 8, 8, 0];
```

##### copyWithin()

按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置。开始索引和结束索引则与fill()使用同样的计算方法：

```javascript
let ints,
    reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

//从ints中复制索引0开始的内容，插入到索引5开始的位置
//在源索引或目标索引到达数组边界时停止
ints.copyWithin(5);
console.log(ints);  // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset();

//从ints中复制索引5开始的内容，插入到索引0开始的位置
ints.copyWithin(0, 5);
console.log(ints);  // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
reset();

//从ints中复制索引0开始到索引3结束的内容
//插入到索引4开始的位置
ints.copyWithin(4, 0, 3);
alert(ints);  // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
reset();

// JavaScript引擎在插值前会完整复制范围内的值
//因此复制期间不存在重写的风险
ints.copyWithin(2, 0, 6);
alert(ints);  // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9]
reset();

//支持负索引值，与fill()相对于数组末尾计算正向索引的过程是一样的
ints.copyWithin(-4, -7, -3);
alert(ints);  // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
```

##### 转换方法

toLocaleString()、toString()和valueOf()方法

join("拼接符")

##### 栈方法

栈是一种后进先出（LIFO，Last-In-First-Out）的结构，也就是最近添加的项先被删除。数据项的插入（称为推入，push）和删除（称为弹出，pop）只在栈的一个地方发生，即栈顶。ECMAScript数组提供了push()和pop()方法，以实现类似栈的行为。

```javascript
let colors = new Array();                 //创建一个数组
let count = colors.push("red", "green");  //推入两项
alert(count);                             // 2

count = colors.push("black");  //再推入一项
alert(count);                  // 3

let item = colors.pop();       //取得最后一项
alert(item);                   // black
alert(colors.length);          // 2
```

##### 队列方法

队列以先进先出（FIFO，First-In-First-Out）形式限制访问。队列在列表末尾添加数据，但从列表开头获取数据。因为有了在数据末尾添加数据的push()方法，所以要模拟队列就差一个从数组开头取得数据的方法了。这个数组方法叫shift()，它会删除数组的第一项并返回它，然后数组长度减1。

```javascript
let colors = new Array();                 //创建一个数组
let count = colors.push("red", "green");  //推入两项
alert(count);                             // 2

count = colors.push("black"); //再推入一项
alert(count);                 // 3

let item = colors.shift();  //取得第一项
alert(item);                // red
alert(colors.length);       // 2
```

##### 排序方法

数组有两个方法可以用来对元素重新排序：reverse()和sort()。reverse()方法就是将数组元素反向排列。

```javascript
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values);  // 5,4,3,2,1
```

##### 操作方法

###### concat()方法

可以在现有数组全部元素基础上创建一个新数组。

###### slice()方法

用于创建一个包含原有数组中一个或多个元素的新数组。splice()的主要目的是在数组中间插入元素，但有3种不同的方式使用这个方法。

- 删除。需要给splice()传2个参数：要删除的第一个元素的位置和要删除的元素数量。
- 插入。需要给splice()传3个参数：开始位置、0（要删除的元素数量）和要插入的元素，可以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多个要插入的元素。
- 替换。splice()在删除元素的同时可以在指定位置插入新元素，同样要传入3个参数：开始位置、要删除元素的数量和要插入的任意多个元素。要插入的元素数量不一定跟删除的元素数量一致。

```javascript
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1);  //删除第一项
alert(colors);                     // green,blue
alert(removed);                    // red，只有一个元素的数组

removed = colors.splice(1, 0, "yellow", "orange");   //在位置1插入两个元素
alert(colors);                                       // green,yellow,orange,blue
alert(removed);                                      //空数组

removed = colors.splice(1, 1, "red", "purple");  //插入两个值，删除一个元素
alert(colors);                                   // green,red,purple,orange,blue
alert(removed);                                  // yellow，只有一个元素的数组
```

##### 搜索和位置方法

###### 严格相等

indexOf()和includes()方法从数组前头（第一项）开始向后搜索，而lastIndexOf()从数组末尾（最后一项）开始向前搜索。indexOf()和lastIndexOf()都返回要查找的元素在数组中的位置，如果没找到则返回-1。includes()返回布尔值，表示是否至少找到一个与指定元素匹配的项。

```javascript
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

alert(numbers.indexOf(4));          // 3
alert(numbers.lastIndexOf(4));      // 5
alert(numbers.includes(4));         // true

alert(numbers.indexOf(4, 4));       // 5
alert(numbers.lastIndexOf(4, 4));   // 3
alert(numbers.includes(4, 7));      // false

let person = { name: "Nicholas" };
let people = [{ name: "Nicholas" }];
let morePeople = [person];

alert(people.indexOf(person));      // -1
alert(morePeople.indexOf(person));  // 0
alert(people.includes(person));     // false
alert(morePeople.includes(person)); // true
```

###### 断言函数

断言函数接收3个参数：元素、索引和数组本身。其中元素是数组中当前搜索的元素，索引是当前元素的索引，而数组就是正在搜索的数组。断言函数返回真值，表示是否匹配。find()和findIndex()方法使用了断言函数。这两个方法都从数组的最小索引开始。find()返回第一个匹配的元素，findIndex()返回第一个匹配元素的索引。这两个方法也都接收第二个可选的参数，用于指定断言函数内部this的值。

```javascript
const people = [
  {
    name: "Matt",
    age: 27
  },
  {
    name: "Nicholas",
    age: 29
  }
];

alert(people.find((element, index, array) => element.age < 28));
// {name: "Matt", age: 27}

alert(people.findIndex((element, index, array) => element.age < 28));
// 0
```

##### 迭代方法

每个方法接收两个参数：以每一项为参数运行的函数，以及可选的作为函数运行上下文的作用域对象（影响函数中this的值）。传给每个方法的函数接收3个参数：数组元素、元素索引和数组本身。因具体方法而异，这个函数的执行结果可能会也可能不会影响方法的返回值。

- every()：对数组每一项都运行传入的函数，如果对每一项函数都返回true，则这个方法返回true。
- filter()：对数组每一项都运行传入的函数，函数返回true的项会组成数组之后返回。
- forEach()：对数组每一项都运行传入的函数，没有返回值。
- map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
- some()：对数组每一项都运行传入的函数，如果有一项函数返回true，则这个方法返回true。

### 定型数组（typed array）

ECMAScript新增的结构，目的是提升向原生库传输数据的效率。

ArrayBufferFloat32Array实际上是一种“视图”，可以允许JavaScript运行时访问一块名为ArrayBuffer的预分配内存。ArrayBuffer是所有定型数组及视图引用的基本单位。

### Map类型

Map是一种新的集合类型，为这门语言带来了真正的键/值存储机制。Map的大多数特性都可以通过Object类型实现，但二者之间还是存在一些细微的差异。

#### 初始化

```javascript
const m1 = new Map()

//使用嵌套数组初始化映射
const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);
alert(m1.size); // 3

```

#### 操作

set()方法再添加键/值对，使用get()和has()进行查询，通过size属性获取映射中的键/值对的数量，使用delete()和clear()删除值。

#### 与Object差异

- 顺序迭代：Map实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作。
- 内存占用：Map比Object节约内存。
- 插入性能：Map比Object更佳。
- 查找速度：Object速度更快。
- 删除性能：Object使用Delete性能饱受诟病，毫无疑问Map是最佳选择。

### Set类型

集合数据结构，Set是加强的Map，大多数API和行为都是共有的。

