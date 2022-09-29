//1.在函数体中，非显式或隐式简单调用函数时，
// 在严格模式下，函数内的this会被绑定到undefined上，
// 在非严格模式下，则会被绑定到全局对象window/global上。

// 2.一般使用new方法调用构造函数时，
// 构造函数内的this会被绑定到新创建的对象上。

// 3.一般通过call/apply/bind方法显式调用函数时，
// 函数体内的this会被绑定到指定参数的对象上。

// 4.一般通过上下文对象调用函数时，函数体内的this会被绑定到该对象上。

// 5.在箭头函数中，this的指向是由外层（函数或全局）作用域来决定的。


// 真实环境的具体情况


// 全局环境中的this
function f1() {
    console.log(this)
}
function f2() {
    'use strict'
    console.log(this)
}

f1()
// window
f2()
// undefined
// 函数在浏览器全局环境中简单调用


const foo = {
    bar: 10,
    fn: function () {
        console.log(this)
        console.log(this.bar)
    }
}
var fn1 = foo.fn
fn1()
//window
//  undefined
// 虽然fn函数在foo对象中用来作为对象的方法，但是在赋值给fn1之后
// fn1仍然是在window的全局环境中执行的。等价于
// console.log(window)
// console.log(window.bar)

//上题变种
const foo = {
    bar: 10,
    fn: function () {
        console.log(this)
        console.log(this.bar)
    }
}
foo.fn()
// {bar:10,fn:f}
// 10
// 此时this指向的是最后调用它的对象，在foo.fn()语句中，this指向foo对象
// 在执行函数时不考虑显式绑定，如果函数中的this是被上一级的对象所调用的，
// 那么this指向的就是上一级的对象；否则就是全局环境



结合上下文对象调用的this
const student = {
    name: 'lucas'
    fn: function () {
        return this
    }
}
console.log(student.fn() == student)
// true

// 当存在更复杂的调用关系是，如以下代码中的嵌套关系，this会指向最后调用它的对象，因此输出将会是Mike

const person = {
    name: 'lucas',
    brother: {
        name: 'Mike',
        fn: function () {
            return this.name
        }
    }
}
console.log(person.brother.fn()
)
// Mike


const o1={
    text:'o1',
    fn: function () {
        return this.text
    }
}
const o2={
    text:'o2',
    fn: function () {
        return o1.fn()
    }
}
const o3={
    text:'o3',
    fn: function () {
        var fn=o1.fn
        return fn()
    }
}
console.log(o1.fn())//我的答案 o1
console.log(o2.fn())//我的答案 undefined
console.log(o3.fn())//我的答案 window

//第一个ol不难理解
//第二个console中的的 o2.fn()最终调用的还是o1.fn(),因此运行结果仍然是o1
//最后一个console中的o3.fn()通过var fn=o1.fn的赋值进行了“裸奔”调用，因此这里的this指向window，运行结果当然是undefined

const o1={
    text:'o1',
    fn: function () {
        return this.text
    }
}
const o2={
    text:'o2',
    fn: o1.fn
}
console.log(o2.fn)
// o2

// this指向最后调用它的对象。
// 在上面的代码中，提前进行了赋值操作，将函数fn挂载到o2对象上，fn最终作为o2对象的方法被调用。



//通过bind、call、apply改变this指向
// 以上方法的区别

// 它们都是用来改变相关函数this指向，但是call和apply是直接进行相关函数调用的；
// bind不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的this指向，开发者可以手动调用它。
// 再说的具体一点，就是call和apply之间的区别主要体现在参数设定上

// 代码总结的区别

//1 
const target{}
fn.call(target,'arg1','arg2')

//2
const target{}
fn.apply(target,['arg1','arg2'])

//3
const target{}
fn.bind(target,'arg1','arg2')()



const foo={
    name:'lucas',
    logName:function(){
        console.log(this.name)
    }
}
const bar={
    name:'mike'
}
console.log(foo.logName.call(bar))

//mike





//构造函数和this
function Foo(){
    this.bar="lucas"
}
const instance=new Foo()
console.log(instance.bar)
//lucas

// new操作符调用构造函数时具体做了什么？
// 1.创建一个新的对象
// 2.将构造函数的this指向这个新的对象
// 3.为这个对象添加属性、方法等。
// 4.最终返回新的对象。
// ↓代码表述
var obj={}
obj._proto_=Foo.prototype
Foo.call(obj)

// 如果在构造函数中出现了显式return的情况，可分为以下2中场景。

// 场景1
function Foo(){
    this.user="lucas"
    const o={}
    return o
}
const instance=new Foo()
console.log(instance.user)
// undefined

//场景2
function Foo(){
    this.user="lucas"
    return 1
}
const instance=new Foo()
console.log(instance.user)
// lucas
// 如果构造函数中显式返回一个值，且返回的是一个对象（返回复杂类型）,那么this就指向这个返回对的对象；
// 如果返回的不是一个对象（返回基本类型），那么this仍然指向实例。





// 显式与隐式
// 显式原型：prototype
// 隐式原型：__proto__

// 在js中万物皆对象，方法(Function)是对象，方法的原型（Function.prototype）是对象，

// 对象具有属性（__proto__）称为隐式原型，对象的隐式原型指向构造该对象的构造函数的显式原型。
// 方法(Function)是一个特殊的对象，除了和其他对象一样具有__proto__属性以外，
// 它还有一个自己特有的原型属性(prototype)，这个属性是一个指针，指向原型对象。
// 原型对象也有一个属性叫constructor，这个属性包含一个指针，指向原构造函数。

// 注意：通过Function.prototype.bind方法构造出来的函数没有prototype属性。
// 注意：Object.prototype.这个对象的是个例外，它的__proto__值为null。

// 2.二者的关系
// 隐式原型指向创建这个对象 的函数 的prototype

// a.通过对象字面量的方式。
var person={
    name:"Tom"
}

// b.通过new的方式创建
//创建一个构造函数
function person(name){
    this.name=name
}
//创建一个构造函数的实例
var person1=new person;

// c.通过Object.creat()方式创建

// 但是本质上3种方法都是通过new的方式创建的。

// 其中通过Object.creat(o)创建出来的对象他的隐式原型指向o。
// 通过对象字面量的方式创建的对象他的隐式原型指向Object.prototype。
// 构造函数function person本质上是由Function构造函数创建的，它是Function的一个实例。
// 原型对象本质上是由Object构造函数创建的。内置函数Array Number等也是有Function构造函数创建的。

//通过new的方式
person1.__proto__===person.prototype //true
person.prototype.__proto__===Object.prototype //true
Object.__proto__===Function.prototype //true
//内置函数
Array.__proto__===Function.prototype //true
Array.prototype.__proto__===Object.prototype //true

// Function的__proto__指向其构造函数Function的prototype；
// Object作为一个构造函数(是一个函数对象!!函数对象!!),所以他的__proto__指向Function.prototype；
// Function.prototype的__proto__指向其构造函数Object的prototype；
// Object.prototype的__prototype__指向null（尽头）；