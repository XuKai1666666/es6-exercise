// let 和const命令
//let命令

// let 只在所在的代码块内有效，不会有变量提升
{
    let a = 10;
    var b = 1;
}
console.log(a) // ReferenceError: a is not defined.
console.log(b) // 1


//let很适合在循环计数器中使用
for (let i = 0; i < 10; i++) {
    // ...
}
console.log(i);
// ReferenceError: i is not defined


//   设置循环变量的那部分是一个父作用域，循环体内部是一个单独的子作用域
for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}
// abc
// abc
// abc


//   let 所申明的变量在声明后使用。
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;



// 暂时性死区
// 只要块级作用域内存在let命令，它所声明的变量就绑定这个区域，不再受外部影响
var tmp = 123;

if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
}
// ES6 明确规定，如果区块中存在let和const命令，
// 这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
// 凡是在声明之前就使用这些变量，就会报错。


// 在代码块内，使用let命令声明变量之前，该变量都是不可用的。
// 这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
//   ES6 规定暂时性死区和let、const语句不出现变量提升，
//   主要是为了减少运行时错误，防止在变量声明前就使用这个变量，
//   从而导致意料之外的行为。
//   暂时性死区的本质就是，只要一进入当前作用域，
//   所要使用的变量就已经存在了，但是不可获取，
//   只有等到声明变量的那一行代码出现，才可以获取和使用该变量。


//不允许在相同作用域内，重复声明同一个变量
// 报错
function func() {
    let a = 10;
    var a = 1;
}

// 报错
function func() {
    let a = 10;
    let a = 1;
}
// 因此，不能在函数内部重新声明参数。
function func(arg) {
    let arg;
}
func() // 报错

function func(arg) {
    {
        let arg;
    }
}
func() // 不报错


//   块级作用域
// let实际上为 JavaScript 新增了块级作用域。
function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n); // 5
}
//   ES6 允许块级作用域的任意嵌套。
{
    {
        {
            {
                { let insane = 'Hello World' }
                console.log(insane); // 报错
            }
        }
    }
};
//   上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。
// 第四层作用域无法读取第五层作用域的内部变量。

// 内层作用域可以定义外层作用域的同名变量。
{
    {
        {
            {
                let insane = 'Hello World';
                { let insane = 'Hello World' }
            }
        }
    }
};



//   块级作用域与函数声明
// ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
// ES6 规定，块级作用域之中，
// 函数声明语句的行为类似于let，在块级作用域之外不可引用。
function f() { console.log('I am outside!'); }

(function () {
    if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
    }

    f();
}());
// ES5 中运行，会得到“I am inside!”，
// 因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。

// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
    function f() { console.log('I am inside!'); }
    if (false) {
    }
    f();
}());


// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
    if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
    }

    f();
}());
// Uncaught TypeError: f is not a function

// 原来，如果改变了块级作用域内声明的函数的处理规则，
// 显然会对老代码产生很大影响。

// ES6 在附录 B里面规定，
// 浏览器的实现可以不遵守上面的规定，有自己的行为方式。
// --允许在块级作用域内声明函数。
// --函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
// --同时，函数声明还会提升到所在的块级作用域的头部。
// 注意，上面三条规则只对 ES6 的浏览器实现有效，
// 其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。


// 根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，
// 行为类似于var声明的变量。上面的例子实际运行的代码如下。
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
    var f = undefined;
    if (false) {
        function f() { console.log('I am inside!'); }
    }

    f();
}());
// Uncaught TypeError: f is not a function


// 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。
// 如果确实需要，也应该写成函数表达式，而不是函数声明语句。


// 块级作用域内部的函数声明语句，建议不要使用
{
    let a = 'secret';
    function f() {
        return a;
    }
}

// 块级作用域内部，优先使用函数表达式
{
    let a = 'secret';
    let f = function () {
        return a;
    };
}

// 还有一个需要注意的地方。ES6 的块级作用域必须有大括号，
// 如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
    let x = 1;
}

// 函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。
// 不报错
'use strict';
if (true) {
    function f() { }
}

// 报错
'use strict';
if (true)
    function f() { }

// const 命令
// const声明一个只读的常量。一旦声明，常量的值就不能改变。
// const声明的变量不得改变值，这意味着，
// const一旦声明变量，就必须立即初始化，不能留到以后赋值。
// const的作用域与let命令相同：只在声明所在的块级作用域内有效。

// 本质
// const实际上保证的，并不是变量的值不得改动，
// 而是变量指向的那个内存地址所保存的数据不得改动。
// 对于简单类型的数据（数值、字符串、布尔值），
// 值就保存在变量指向的那个内存地址，因此等同于常量。
// 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，
// 保存的只是一个指向实际数据的指针，
// const只能保证这个指针是固定的（即总是指向另一个固定的地址），
// 至于它指向的数据结构是不是可变的，就完全不能控制了。
// 因此，将一个对象声明为常量必须非常小心。