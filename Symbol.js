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