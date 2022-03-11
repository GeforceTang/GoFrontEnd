# JavaScript基础知识

## 语言概要
### 1、JavaScript

> ECMA-262即ECMAScript作为一个基准定义，Web浏览器只是ECMAScript实现的一种宿主环境（host environment）。宿主环境提供ECMAScript的基准实现和与环境自身交互必需的扩展。扩展（比如DOM）使用ECMAScript核心类型和语法，提供特定于环境的额外功能。其他宿主环境还有服务器端JavaScript平台Node.js和即将被淘汰的Adobe Flash。

ECMAScript包含以下部分：

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

ECMAScript只是对实现这个规范描述的所有方面的一门语言的称呼，JavaScript实现了ECMAScript。一般来讲JavaScript和ECMAScript基本上是同义词，但完整的JavaScript实现包含：

- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象模型（BOM）

#### 版本（edition）

1. ECMA-262第1版对应网景的JavaScript 1.1；
2. ECMA-262第2版是对第1版简单的修正；
3. ECMA-262第3版是真正意义上的首个标准；
4. ECMA-262第4版开展了一次彻底修订，增强了功能，但因为改动太大备放弃，改用了改动较小的3.1版本；
5. ECMA-262第5版于2009年12月3日正式发布，是ECMA-262第3.1版的基础上增加了新功能；
6. ECMA-262第6版（俗称ES6、ES2015或ES Harmony（和谐版），目前的主流）于2015年6月发布，正式支持了类、模块、迭代器、生成器、箭头函数、期约、反射、代理和众多新的数据类型；
7. ECMA-262第7版（俗称ES7、ES2016）于2016年6月发布，做了小量语法增强；
8. ECMA-262第8版（俗称ES8、ES2017）完成于2017年6月，主要增加了异步函数（async/await）、SharedArrayBuffer及Atomics API；
9. ECMA-262第9版（俗称ES9、ES2018）发布于2018年6月。
10. ECMA-262第10版（俗称ES10、ES2019）发布于2019年6月。

### 2、DOM

> 文档对象模型（DOM，Document Object Model）是一个应用编程接口（API），用于在HTML中使用扩展的XML。DOM将整个页面抽象为一组分层节点。HTML或XML页面的每个组成部分都是一种节点。

DOM通过创建表示文档树，让开发者可以随心所欲地控制网页的内容和结构。使用DOM API，可以轻松地删除、添加、替换、修改节点。

- DOM Level 1：映射文档结构；
- DOM Level 2：增加了对鼠标和用户界面事件、范围、遍历（迭代DOM节点的方法）的支持，而且通过对象接口支持了层叠样式表（CSS）；
  - DOM视图：描述追踪文档不同视图（如应用CSS样式前后的文档）的接口
  - DOM事件：描述事件及事件处理的接口
  - DOM样式：描述处理元素CSS样式的接口
  - DOM遍历和范围：描述遍历和操作DOM树的接口
- DOM Level 3：增加了以统一的方式加载和保存文档的方法（包含在一个叫DOM Load and Save的新模块中），还有验证文档的方法（DOM Validation）；
- DOM Level 4：目前，W3C不再按照Level来维护DOM了，而是作为DOM Living Standard来维护，其快照称为DOM4。

### 3、BOW

> 浏览器对象模型（BOM，Brower Object Model）API，用于支持访问和操作浏览器的窗口。使用BOM开发者可以操控浏览器显示页面之外的部分。HTML5的出现解决了BOM没有相关标准的JavaScript实现导致的相关问题。

总体来说，BOM主要针对浏览器窗口和子窗口（frame），不过人们通常会把任何特定于浏览器的扩展都归在BOM的范畴内。比如下面就是这样一些扩展：

- 弹出新浏览器窗口的能力；
- 移动、缩放和关闭浏览器窗口的能力；
- navigator对象，提供关于浏览器的详尽信息；
- location对象，提供浏览器加载页面的详尽信息；
- screen对象，提供关于用户屏幕分辨率的详尽信息；
- performance对象，提供浏览器内存占用、导航行为和时间统计的详尽信息；
- 对cookie的支持；
- 其他自定义对象，如XMLHttpRequest和IE的ActiveXObject。

因为在很长时间内都没有标准，所以每个浏览器实现的都是自己的BOM。有一些所谓的事实标准，比如对于window对象和navigator对象，每个浏览器都会给它们定义自己的属性和方法。现在有了HTML5，BOM的实现细节应该会日趋一致。关于BOM，本书会在第12章再专门详细介绍。


## 学习章节

1. 