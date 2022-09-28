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