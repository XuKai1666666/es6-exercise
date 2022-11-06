// 类的由来
// JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
// 上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大
// ，很容易让新学习这门语言的程序员感到困惑。

// ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，
// 作为对象的模板。通过class关键字，可以定义类。

// 基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，
// ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、
// 更像面向对象编程的语法而已。上面的代码用 ES6 的class改写，就是下面这样。
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
// 上面代码定义了一个“类”，可以看到里面有一个constructor()方法，
// 这就是构造方法，而this关键字则代表实例对象。
// 这种新的 Class 写法，本质上与本章开头的 ES5 的构造函数Point是一致的。

// Point类除了构造方法，还定义了一个toString()方法。
// 注意，定义toString()方法的时候，前面不需要加上function这个关键字，
// 直接把函数定义放进去了就可以了。另外，方法与方法之间不需要逗号分隔，加了会报错。

// ES6 的类，完全可以看作构造函数的另一种写法。
class Point {
    // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true


// 上面代码表明，类的数据类型就是函数，类本身就指向构造函数。
// 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
class Bar {
    doStuff() {
        console.log('stuff');
    }
}

const b = new Bar();
b.doStuff() // "stuff"
// 构造函数的prototype属性，在 ES6 的“类”上面继续存在。
// 事实上，类的所有方法都定义在类的prototype属性上面。
class Point {
    constructor() {
        // ...
    }

    toString() {
        // ...
    }

    toValue() {
        // ...
    }
}

// 等同于

Point.prototype = {
    constructor() { },
    toString() { },
    toValue() { },
};
// 上面代码中，constructor()、toString()、toValue()这三个方法，
// 其实都是定义在Point.prototype上面。

// 因此，在类的实例上面调用方法，其实就是调用原型上的方法。
class B { }
const b = new B();

b.constructor === B.prototype.constructor // true
// 上面代码中，b是B类的实例，它的constructor()方法就是B类原型的constructor()方法。
// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
// Object.assign()方法可以很方便地一次向类添加多个方法。
class Point {
    constructor() {
        // ...
    }
}

Object.assign(Point.prototype, {
    toString() { },
    toValue() { }
});

// prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
Point.prototype.constructor === Point // true
// 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

class Point {
    constructor(x, y) {
        // ...
    }

    toString() {
        // ...
    }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

//   上面代码中，toString()方法是Point类内部定义的方法，
//   它是不可枚举的。这一点与 ES5 的行为不一致。

var Point = function (x, y) {
    // ...
};

Point.prototype.toString = function () {
    // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
  // ["constructor","toString"]
//   上面代码采用 ES5 的写法，toString()方法就是可枚举的。