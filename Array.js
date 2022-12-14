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

// 上面代码中，a1会返回原数组的克隆，在修改a2就不会对a1产生影响。


// 扩展运算符提供了复制数组的简便写法
const a1=[1,2];
// 写法一
const a2=[...a1];
//写法二
const [...a2]=a1;

// 上面两种写法，a2都是a1的克隆



// 合并数组
// 扩展运算符提供了数组合并的新写法
const arr1=['a','b'];
const arr2=['c'];
const arr3=['d','e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

// 不过这两方式都是浅拷贝，使用的时候需要注意


const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true

// 上面代码中，a3和a4是用两种不同方法合并而成的新数组，
// 但是它们的成员都是对原数组成员的引用，这就是浅拷贝。
// 如果修改了引用指向的值，会同步反映到新数组。


// 与解构赋值结合
// 扩展运算符可以与解构赋值结合起来，用于生成数组。

// ES5
a = list[0], rest = list.slice(1)

// ES6
[a, ...rest] = list



// 下面是另外一些例子
const [first,...rest]=[1,2,3,4,5];
first
// 1
rest
// [2,3,4,5]

const [first,...rest]=[];
first
// undefined
rest
// []
const [first,...rest]=["foo"];
first
// foo
rest 
// []

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错




// 字符串
// 扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]

// 上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。

'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3

// 上面代码的第一种写法，JavaScript 会将四个字节的 Unicode 字符，
// 识别为 2 个字符，采用扩展运算符就没有这个问题。
// 因此，正确返回字符串长度的函数，可以像下面这样写。

function length(str) {
    return [...str].length;
  }
  
  length('x\uD83D\uDE80y') // 3

//   凡是涉及到操作四个字节的 Unicode 字符的函数，
//   都有这个问题。因此，最好都用扩展运算符改写。

let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'

// 不用扩展运算符，字符串的reverse()操作就不正确。




// 实现了 Iterator 接口的对象
// 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），
// 都可以用扩展运算符转为真正的数组。

let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
// 上面代码中，querySelectorAll()方法返回的是一个NodeList对象。
// 它不是数组，而是一个类似数组的对象。这时，
// 扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator。

Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}

console.log([...5]) // [0, 1, 2, 3, 4]
// 上面代码中，先定义了Number对象的遍历器接口，
// 扩展运算符将5自动转成Number实例以后，就会调用这个接口，就会返回自定义的结果。

// 对于那些没有部署 Iterator 接口的类似数组的对象，
// 扩展运算符就无法将其转为真正的数组。

let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
// 上面代码中，arrayLike是一个类似数组的对象，
// 但是没有部署 Iterator 接口，扩展运算符就会报错。
// 这时，可以改为使用Array.from方法将arrayLike转为真正的数组。

// （6）Map 和 Set 结构，Generator 函数

// 扩展运算符内部调用的是数据结构的 Iterator 接口，
// 因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
// Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
// 上面代码中，变量go是一个 Generator 函数，
// 执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，
// 就会将内部遍历得到的值，转为一个数组。

// 如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。

const obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object