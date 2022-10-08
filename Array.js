// 扩展运算符
// 扩展运算符(spread),三个点(...)
// 它好比rest参数的逆运算
// 将一个数组转为用都好分隔的参数序列

console.log(...[1, 2, 3])
//1 2 3
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
[...document.querySelectorAll('div')]
// [<div>,<div>,<div>]




// 用于函数调用
function push(array, ...items) {
    array.push(...items);
}

function add(x, y) {
    return x + y;
}

const numbers = [4, 38];
add(...numbers)//42

// array.push(...items)和add(...numbers)这两行，
// 都是函数的调用，它们都使用了扩展运算符。该运算符将一个数组，变为参数序列。

// 扩展运算符与正常的函数参数可以结合使用，非常灵活
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);


// 扩展运算符后面还可以放置表达式
const arr = [
    ...(x > 0 ? ['a'] : []),
    'b',
];


// 如果扩展运算符后面是一个空数组，则不产生任何效果
[...[], 1]
    //[1]

    // 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
    (...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2

// 上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，
// 因为扩展运算符所在的括号不是函数调用。


// 替代函数的apply方法
// ES5 的写法
function f(x, y, z) {
    // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6 的写法
function f(x, y, z) {
    // ...
}
let args = [0, 1, 2];
f(...args);


// 下面是扩展运算符取代apply()方法的实际的例子，
// 应用math.max()方法，简化求出一个数组最大元素的写法

// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);



// 通过push()函数，将一个数组添加到另一个数组的尾部。
// ES5 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);

// push()方法的参数不能是数组，所以只好通过apply()方法变通使用push()方法。
// 有了扩展运算符，就可以直接将数组传入push()方法。

// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))

// ES6
new Date(...[2015, 1, 1]);

// 扩展运算符的应用
// (1)复制数组
// 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，
// 而不是克隆一个全新的数组。
const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
a1 // [2, 2]

// 上面代码中，a2并不是a1的克隆，而是指向同一份数据的另一个指针。
// 修改a2，会直接导致a1的变化

// ES5只能用变通方法来复制数组
const a1=[1,2];
const a2=a1.concat();
a2[0]=2;
a1
// [1,2]
