// ES5 的对象属性名都是字符串，这容易造成属性名的冲突。
// 比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式）
// ，新方法的名字就有可能与现有方法产生冲突。
// 如果有一种机制，保证每个属性的名字都是独一无二的就好了，
// 这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。


// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 它属于 JavaScript 语言的原生数据类型之一，
// 其他数据类型是：undefined、null、布尔值（Boolean）、
// 字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）。


// Symbol 值通过Symbol()函数生成。
// 这就是说，对象的属性名现在可以有两种类型，
// 一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
// 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

let s = Symbol();
typeof s
// Symbol

// Symbol()函数前不能使用new命令，否则会报错。
// 这是因为生成的 Symbol 是一个原始类型的值，不是对象，
// 所以不能使用new命令来调用。另外，由于 Symbol 值不是对象，
// 所以也不能添加属性。基本上，它是一种类似于字符串的数据类型。

// Symbol()函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。
// 这主要是为了在控制台显示，或者转为字符串时，比较容易区分。

let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

// s1和s2是两个Symbol值。如果不参加参数，它们在控制台的输出都是Symbol()
// 不利于区分。有了参数后，就等于为它们加上了描述，输出时候就可以分清楚，
// 是哪一个值

// 如果Symbol的参数是一个对象，就会调用该对象的tostring方法，将其转化为字符串，
// 然后才生成一个Symbol值

const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
sym // Symbol(abc)

// Symbol()函数的参数只是表示对，当前Symbol值的描述
// ，因此相同参数的Symbol函数的返回值是不相等的。

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

// s1和s2都是symbol()函数的返回值，而且参数相同，但是它们是不相等的。
// 事实上，如果调用100次Symbol会等到100个互不相等对的值


// Symbol值不能与其他类型的值进行运算，会报错。
let sym = Symbol('My symbol');
"your symbol is" + sym
    // TypeError: can't convert symbol to string
    `your symbol is ${sym}`
// TypeError: can't convert symbol to string

// Symbol 值可以显式转为字符串
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'


// Symbol 值也可以转为布尔值，但是不能转为数值。
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
    // ...
}

Number(sym) // TypeError
sym + 2 // TypeError


// 作为属性名的Symbol
// 由于每一个 Symbol 值都是不相等的，
// 这意味着只要 Symbol 值作为标识符，用于对象的属性名，
// 就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，
// 能防止某一个键被不小心改写或覆盖。

let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
    [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

// Symbol 值作为对象属性名时，不能用点运算符。
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"


// 上面代码中，因为点运算符后面总是字符串，
// 所以不会读取mySymbol作为标识名所指代的那个值，
// 导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。
// 同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
let s = Symbol();

let obj = {
    [s]: function (arg) { ... }
};

obj[s](123);

// 采用增强的对象写法，上面代码的obj对象可以写得更简洁一些。

let obj = {
    [s](arg) { ... }
  };

//   Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
const log = {};

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

// 另外一个例子
const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();

function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Error('Undefined color');
    }
}
// 常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，
// 因此可以保证上面的switch语句会按设计的方式工作。
// 还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。


// 实例：消除魔术字符串
// 魔术字符串指的是，在代码中出现、与代码形成强耦合的某一个具体的字符串或者数值。
// 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替
function getArea(shape, options) {
    let area = 0;

    switch (shape) {
        case 'Triangle'://魔术字符串
            area = .5 * options.width * options.height;
            break;
        /* more code */
    }
    return area;
}
getArea('Triangle', { width: 100, height: 100 });//魔术字符串

// 上面代码中，字符串Triangle就是一个魔术字符串。
// 它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。


// 常用的消除魔术字符串的方法，就是把它写成一个变量。
const shapeType = {
    triangle: 'Triangle'
};

function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });

// 如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要
// ，只要确保不会跟其他shapeType属性的值冲突即可。
// 因此，这里就很适合改用 Symbol 值。

const shapeType = {
    triangle: Symbol()
};

// 上面代码中，除了将shapeType.triangle的值设为一个 Symbol，其他地方都不用修改。




// 实例：模块的 Singleton 模式
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例

// 对于 Node 来说，模块文件可以看成是一个类。
// 怎么保证每次执行这个模块文件，返回的都是同一个实例呢？

// 很容易想到，可以把实例放到顶层对象global。
// mod.js
function A() {
    this.foo = 'hello';
}

if (!global._foo) {
    global._foo = new A();
}

module.exports = global._foo;
// 加载上面的mod.js。
const a = require('./mod.js');
console.log(a.foo);
// 变量a任何时候加载的都是A的同一个实例。


// 全局变量global._foo是可写的，任何文件都可以修改
global._foo = { foo: 'world' };

const a = require('./mod.js');
console.log(a.foo);

// 上面的代码，会使得加载mod.js的脚本都失真。



// 为了防止这种情况出现，我们就可以使用Symbol
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
    this.foo = 'hello';
}

if (!global[FOO_KEY]) {
    global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
// 上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。
global[Symbol.for('foo')] = { foo: 'world' };

const a = require('./mod.js');

// 如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。


// 内置的Symbol值
// 除了定义自己使用的Symbol值歪，
// es6 还提供了11个内置的Syboml值，指向语言内保部使用的方法


// Symbol.hasInstance
// 对象的Symbol.hasInstance属性，指向一个内部方法。
// 当其他对象使用instanceof运算符，判断是否为该对象的实例时，
// 会调用这个方法。比如，foo instanceof Foo在语言内部，
// 实际调用的是Foo[Symbol.hasInstance](foo)。
class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
}

[1, 2, 3] instanceof new MyClass() // true
// 上面代码中，MyClass是一个类，new MyClass()会返回一个实例。
// 该实例的Symbol.hasInstance方法，
// 会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。
class Even {
    static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}

// 等同于
const Even = {
    [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false



// Symbol.isConcatSpreadable
// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，
// 表示该对象用于Array.prototype.concat()时，是否可以展开。
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// 上面代码说明，数组的默认行为是可以展开，
// Symbol.isConcatSpreadable默认等于undefined。
// 该属性等于true时，也有展开的效果。

// 类似数组的对象正好相反，默认不展开。
// 它的Symbol.isConcatSpreadable属性设为true，才可以展开。

let obj = { length: 2, 0: 'c', 1: 'd' };
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']



// Symbol.isConcatSpreadable属性也可以定义在类里面
class A1 extends Array {
    constructor(args) {
        super(args);
        this[Symbol.isConcatSpreadable] = true;
    }
}
class A2 extends Array {
    constructor(args) {
        super(args);
    }
    get [Symbol.isConcatSpreadable]() {
        return false;
    }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]

//   类A1是可展开的，类A2是不可展开的，所以使用concat时有不一样的结果。
// Symbol.isConcatSpreadable的位置差异，
// A1是定义在实例上，
// A2是定义在类本身，效果相同。


// Symbol.species
// 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true
// 上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，
// b和c是a的衍生对象。你可能会认为，b和c都是调用数组方法生成的，
// 所以应该是数组（Array的实例），但实际上它们也是MyArray的实例。
// Symbol.species属性就是为了解决这个问题而提供的。
// 现在，我们可以为MyArray设置Symbol.species属性。

class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
}
// 由于定义了Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，
// 作为构造函数。这个例子也说明，定义Symbol.species属性要采用get取值器。
// 默认的Symbol.species属性等同于下面的写法。
static get[Symbol.species]() {
    return this;
}

class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
}

const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true
// a.map(x => x)生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例。


class T1 extends Promise {
}

class T2 extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}

new T1(r => r()).then(v => v) instanceof T1 // true
new T2(r => r()).then(v => v) instanceof T2 // false
// 上面代码中，T2定义了Symbol.species属性，T1没有。
// 结果就导致了创建衍生对象时（then方法），
// T1调用的是自身的构造方法，而T2调用的是Promise的构造方法。

// Symbol.species的作用在于，实例对象在运行过程中，
// 需要再次调用自身的构造函数时，会调用该属性指定的构造函数。
// 它主要的用途是，有些类库是在基类的基础上修改的，
// 那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。
