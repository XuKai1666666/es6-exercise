// 尾调用优化


//什么是尾调用
// 尾调用(tail call)：
// 指某个函数的最后一步是调用另一个函数
function f(x) {
    return g(x);
}
// 上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

// 下列三种情况不是尾调用
// 1.
function f(x) {
    let y = g(x)
    return y;
}
// 2.
function f(x) {
    return g(x) + 1
}
// 3.
function f(x) {
    g(x);
}

// 1.调用函数g之后，还有赋值操作，所以不属于尾调用
// 2.调用后还有操作。即使在一行内
// 3.等同于
function f(x) {
    g(x);
    return undefined;
}

function f(x) {
    if (x > 0) {
        return m(x)
    }
    return n(x);
}
// 上面代码中，函数m和n都属于尾调用，都是函数f的最后一步操作


// 尾调用优化

// 尾调用之所以与其他调用不同，就在于它的特殊调用位置

// 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），
// 保存调用位置和内部变量等信息。
// 如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。
// 等到B运行结束，将结果返回到A，B的调用帧才会消失。
// 如果函数B内部还调用函数C，那就还有一个C的调用帧，
// 以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

// 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
// 因为调用位置、内部变量等信息都不会再用到了，
// 只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
}
f();

// 等同于
function f() {
    return g(3);
}
f();

// 等同于
g(3);

//   上面代码中，如果函数g不是尾调用，
//   函数f就需要保存内部变量m和n的值、g的调用位置等信息。
//   但由于调用g之后，函数f就结束了，所以执行到最后一步，
//   完全可以删除f(x)的调用帧，只保留g(3)的调用帧。

// 这就叫做“尾调用优化”（Tail call optimization），
// 即只保留内层函数的调用帧。如果所有函数都是尾调用，
// 那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。
// 这就是“尾调用优化”的意义。

// 只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，
// 否则就无法进行“尾调用优化”。

function addOne(a) {
    var one = 1;
    function inner(b) {
        return b + one;
    }
    return inner(a);
}
// 上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。
// 注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。



// 尾递归
// 递归函数调用自身
// +尾调用自身  尾递归

// 递归消耗内存，保存很多调用帧，很容易发生栈溢出错误（stack overflow）
// 对于尾递归来说，由于只存在一个调用帧，所以永远不会发生栈溢出错误。

function factorial(n) {
    if (n === 1) return1;
    return n * factorial(n - 1)
}
factorial(5)//120
// 阶乘函数，计算n的阶乘，最多需要保存n个调用记录复杂度O(n)

// 尾递归只保留一个调用记录，复杂度O(1)

function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}
factorial(5, 1)
// 120


// 非尾递归 fibonaci数列
function Fibonacci(n) {
    if (n <= 1) { return 1 };

    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

//   尾递归优化过的 Fibonacci 数列实现如下。
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) { return ac2 };

    return Fibonacci2(n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
// 这就是说，ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），
// 相对节省内存。


// 蹦床函数并不是真正的尾递归优化，下面的实现才是。
function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function (x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    }
    else {
        return x
    }
});

sum(1, 100000)
  // 100001