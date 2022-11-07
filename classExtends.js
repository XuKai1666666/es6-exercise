// Class 可以通过extends关键字实现继承，
// 让子类继承父类的属性和方法。extends 的写法比 ES5 的原型链继承，要清晰和方便很多。

class Point {
}

class ColorPoint extends Point {
}
// 上面示例中，Point是父类，
// ColorPoint是子类，它通过extends关键字，
// 继承了Point类的所有属性和方法。
// 但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。

// 下面，我们在ColorPoint内部加上代码。

class Point { /* ... */ }

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
// 上面示例中，constructor()方法和toString()方法内部，
// 都出现了super关键字。super在这里表示父类的构造函数，
// 用来新建一个父类的实例对象。

// ES6 规定，子类必须在constructor()方法中调用super()，
// 否则就会报错。这是因为子类自己的this对象，
// 必须先通过父类的构造函数完成塑造，
// 得到与父类同样的实例属性和方法，然后再对其进行加工，
// 添加子类自己的实例属性和方法。如果不调用super()方法，子类就得不到自己的this对象。

class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
// 上面代码中，ColorPoint继承了父类Point，
// 但是它的构造函数没有调用super()，导致新建实例时报错。

// 为什么子类的构造函数，一定要调用super()？
// 原因就在于 ES6 的继承机制，与 ES5 完全不同。
// ES5 的继承机制，是先创造一个独立的子类的实例对象，
// 然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。
// ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，
// 然后再将该对象作为子类的实例，即“继承在前，实例在后”。
// 这就是为什么 ES6 的继承必须先调用super()方法，
// 因为这一步会生成一个继承父类的this对象，没有这一步就无法继承父类。

// 注意，这意味着新建子类实例时，父类的构造函数必定会先运行一次。

class Foo {
  constructor() {
    console.log(1);
  }
}

class Bar extends Foo {
  constructor() {
    super();
    console.log(2);
  }
}

const bar = new Bar();
// 1
// 2
// 上面示例中，子类 Bar 新建实例时，会输出1和2。
// 原因就是子类构造函数调用super()时，会执行一次父类构造函数。

// 另一个需要注意的地方是，在子类的构造函数中，
// 只有调用super()之后，才可以使用this关键字，否则会报错。
// 这是因为子类实例的构建，必须先完成父类的继承，
// 只有super()方法才能让子类实例继承父类。

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
// 上面代码中，子类的constructor()方法没有调用super()之前，
// 就使用this关键字，结果报错，而放在super()之后就是正确的。

// 如果子类没有定义constructor()方法，这个方法会默认添加，
// 并且里面会调用super()。
// 也就是说，不管有没有显式定义，任何一个子类都有constructor()方法。

class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
// 有了子类的定义，就可以生成子类的实例了。

let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
// 上面示例中，实例对象cp同时是ColorPoint和Point两个类的实例，
// 这与 ES5 的行为完全一致。