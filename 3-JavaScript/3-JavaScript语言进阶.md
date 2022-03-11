# JavaScript语言进阶

## 变量

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
