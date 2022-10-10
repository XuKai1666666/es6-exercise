// 对象（object）是 JavaScript 最重要的数据结构。
// ES6 对它进行了重大升级，本章介绍数据结构本身的改变，
// 下一章介绍Object对象的新增方法。



// 属性的简洁表示法
// ES6 允许在大括号里面，直接写入变量和函数，
// 作为对象的属性和方法。这样的书写更加简洁。
const foo = 'bar';
const baz = { foo };
baz // {foo: "bar"}

// 等同于
const baz = { foo: foo };
// 变量foo直接写在大括号里面。
// 这时，属性名就是变量名, 属性值就是变量值。下面是另一个例子。
function f(x, y) {
    return { x, y };
}

// 等同于

function f(x, y) {
    return { x: x, y: y };
}

f(1, 2) // Object {x: 1, y: 2}



// 除了属性简写，方法也可以简写。
const o = {
    method() {
        return "Hello!";
    }
};

// 等同于

const o = {
    method: function () {
        return "Hello!";
    }
};

let birth = '2000/01/01';

const Person = {

    name: '张三',

    //等同于birth: birth
    birth,

    // 等同于hello: function ()...
    hello() { console.log('我的名字是', this.name); }

};

// 方便用于函数的返回值
function getPoint() {
    const x = 1;
    const y = 10;
    return { x, y };
}

getPoint()
// {x:1, y:10}


//   CommonJS 模块输出一组变量，就非常合适使用简洁写法。

let ms = {};

function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}

function clear() {
    ms = {};
}

module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
    getItem: getItem,
    setItem: setItem,
    clear: clear
};

// 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。

const cart = {
    _wheels: 4,

    get wheels() {
        return this._wheels;
    },

    set wheels(value) {
        if (value < this._wheels) {
            throw new Error('数值太小了！');
        }
        this._wheels = value;
    }
}

// 简洁写法在打印对象时也很有用。

let user = {
    name: 'test'
};

let foo = {
    bar: 'baz'
};

console.log(user, foo)
// {name: "test"} {bar: "baz"}
console.log({ user, foo })
// {user: {name: "test"}, foo: {bar: "baz"}}

//   console.log直接输出user和foo两个对象时，
//   就是两组键值对，可能会混淆。把它们放在大括号里面输出，
//   就变成了对象的简洁表示法，每组键值对前面会打印对象名，这样就比较清晰了。



// 简写的对象方法不能用作构造函数，会报错。
const obj = {
    f() {
        this.foo = 'bar';
    }
};

new obj.f() // 报错
// f是一个简写的对象方法，所以obj.f不能当作构造函数使用。


// 属性名表达式
// JavaScript 定义对象的属性，有两种方法。
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;

// 上面代码的方法一是直接用标识符作为属性名，
// 方法二是用表达式作为属性名，这时要将表达式放在方括号之内。


// 如果使用字面量方式定义对象（使用大括号），
// 在 ES5 中只能使用方法一（标识符）定义属性。
var obj = {
    foo: true,
    abc: 123
};

//   ES6 允许字面量定义对象时，
//   用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';

let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};




let lastWord = 'last word';

const a = {
    'first word': 'hello',
    [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

// 表达式还可以用于定义方法名
let obj = {
    ['h' + 'ello']() {
        return 'hi';
    }
};

obj.hello() // hi


// 属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc' };




// 属性名表达式如果是一个对象，
// 默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

const keyA = { a: 1 };
const keyB = { b: 2 };

const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}



// 属性的遍历
// ES6 一共有 5 种方法可以遍历对象的属性。
// （1）for...in
// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

// （2）Object.keys(obj)
// Object.keys返回一个数组，包括对象自身的（不含继承的）
// 所有可枚举属性（不含 Symbol 属性）的键名。

// （3）Object.getOwnPropertyNames(obj)
// Object.getOwnPropertyNames返回一个数组，
// 包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

// （4）Object.getOwnPropertySymbols(obj)
// Object.getOwnPropertySymbols返回一个数组，
// 包含对象自身的所有 Symbol 属性的键名。

// （5）Reflect.ownKeys(obj)
// Reflect.ownKeys返回一个数组，
// 包含对象自身的（不含继承的）所有键名，
// 不管键名是 Symbol 或字符串，也不管是否可枚举。

// 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

// 首先遍历所有数值键，按照数值升序排列。
// 其次遍历所有字符串键，按照加入时间升序排列。
// 最后遍历所有 Symbol 键，按照加入时间升序排列。
Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 })
// ['2', '10', 'b', 'a', Symbol()]

// 上面代码中，Reflect.ownKeys方法返回一个数组，
// 包含了参数对象的所有属性。这个数组的属性次序是这样的，
// 首先是数值属性2和10，
// 其次是字符串属性b和a，最后是 Symbol 属性。


// super 关键字
// this关键字总是指向函数所在的当前对象，
// ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
const proto = {
    foo: 'hello'
};

const obj = {
    foo: 'world',
    find() {
        return super.foo;
    }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"


// 对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。

// super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

// 报错
const obj = {
    foo: super.foo
}

// 报错
const obj = {
    foo: () => super.foo
}

// 报错
const obj = {
    foo: function () {
        return super.foo
    }
}

// 上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，
// 这里的super都没有用在对象的方法之中。
// 第一种写法是super用在属性里面，
// 第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。

// 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。



// JavaScript 引擎内部，
// super.foo等同于Object.getPrototypeOf(this).foo（属性）
// 或Object.getPrototypeOf(this).foo.call(this)（方法）。
const proto = {
    x: 'hello',
    foo() {
        console.log(this.x);
    },
};

const obj = {
    x: 'world',
    foo() {
        super.foo();
    }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"

// super.foo指向原型对象proto的foo方法，
// 但是绑定的this却还是当前对象obj，因此输出的就是world。



// 对象的扩展运算符

// 解构赋值
// 对象的解构赋值用于从一个对象取值，
// 相当于将目标对象自身的所有可遍历的（enumerable）、
// 但尚未被读取的属性，分配到指定的对象上面。
// 所有的键和它们的值，都会拷贝到新对象上面。

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

// 上面代码中，变量z是解构赋值所在的对象。
// 它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。
// 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，
// 就会报错，因为它们无法转为对象
。
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误


// 扩展运算符的解构赋值，不能复制继承自原型对象的属性。
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined

// 上面代码中，对象o3复制了o2，
// 但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3

// 上面代码中，变量x是单纯的解构赋值，所以可以读取对象o继承的属性；
// 变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，
// 所以变量z可以赋值成功，变量y取不到值。
// ES6 规定，变量声明语句之中，如果使用解构赋值，
// 扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式，
// 所以上面代码引入了中间变量newObj，如果写成下面这样会报错。