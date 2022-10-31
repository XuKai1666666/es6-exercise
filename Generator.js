基本概念
// Generator 函数是 ES6 提供的一种异步编程解决方案，
// 语法行为与传统函数完全不同。
// 本章详细介绍 Generator 函数的语法和 API，
// 它的异步编程应用请看《Generator 函数的异步应用》一章。

// Generator 函数有多种理解角度。
// 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

// 执行 Generator 函数会返回一个遍历器对象，
// 也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

// 形式上，Generator 函数是一个普通函数，
// 但是有两个特征。一是，function关键字与函数名之间有一个星号；
// 二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

//   上面代码定义了一个 Generator 函数helloWorldGenerator，
//   它内部有两个yield表达式（hello和world），
//   即该函数有三个状态：hello，world 和 return 语句（结束执行）。

//   然后，Generator 函数的调用方法与普通函数一样，
//   也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，
// 该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，
// 也就是上一章介绍的遍历器对象（Iterator Object）。

//   下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
//   也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，
//   直到遇到下一个yield表达式（或return语句）为止。
// 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，
// 而next方法可以恢复执行。
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

// 上面代码一共调用了四次next方法。

// 第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。
// next方法返回一个对象，它的value属性就是当前yield表达式的值hello，
// done属性的值false，表示遍历还没有结束。

// 第二次调用，Generator 函数从上次yield表达式停下的地方，
// 一直执行到下一个yield表达式。
// next方法返回的对象的value属性就是当前yield表达式的值world，
// done属性的值false，表示遍历还没有结束。

// 第三次调用，Generator 函数从上次yield表达式停下的地方，
// 一直执行到return语句（如果没有return语句，就执行到函数结束）。
// next方法返回的对象的value属性，
// 就是紧跟在return语句后面的表达式的值（如果没有return语句，
// 则value属性的值为undefined），done属性的值true，表示遍历已经结束。

// 第四次调用，此时 Generator 函数已经运行完毕，
// next方法返回对象的value属性为undefined，done属性为true。
// 以后再调用next方法，返回的都是这个值。

// 总结一下，调用 Generator 函数，返回一个遍历器对象，
// 代表 Generator 函数的内部指针。
// 以后，每次调用遍历器对象的next方法，
// 就会返回一个有着value和done两个属性的对象。
// value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；
// done属性是一个布尔值，表示是否遍历结束。

// ES6 没有规定，function关键字与函数名之间的星号，
// 写在哪个位置。这导致下面的写法都能通过。

function* foo(x, y) { ··· }
function* foo(x, y) { ··· }
function* foo(x, y) { ··· }
function* foo(x, y) { ··· }

// 由于 Generator 函数仍然是普通函数，
// 所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。



// 异步应用
// 传统方法
// ES6 诞生以前，异步编程的方法，大概有下面四种。

// 回调函数
// 事件监听
// 发布/订阅
// Promise 对象
// Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。

// 异步
// 所谓"异步"，简单说就是一个任务不是连续完成的，
// 可以理解成该任务被人为分成两段，先执行第一段，
// 然后转而执行其他任务，等做好了准备，再回过头执行第二段。

// 比如，有一个任务是读取文件进行处理，
// 任务的第一段是向操作系统发出请求，要求读取文件。
// 然后，程序执行其他任务，等到操作系统返回文件，
// 再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫做异步。

// 相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，
// 所以操作系统从硬盘读取文件的这段时间，程序只能干等着。




// 回调函数
// JavaScript 语言对异步编程的实现，
// 就是回调函数。所谓回调函数，
// 就是把任务的第二段单独写在一个函数里面，
// 等到重新执行这个任务的时候，就直接调用这个函数。
// 回调函数的英语名字callback，直译过来就是"重新调用"。

// 读取文件进行处理，是这样写的。
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
    if (err) throw err;
    console.log(data);
});


// 上面代码中，readFile函数的第三个参数，就是回调函数，
// 也就是任务的第二段。等到操作系统返回了/etc/passwd这个文件以后，回调函数才会执行。

// 一个有趣的问题是，为什么 Node 约定，
// 回调函数的第一个参数，必须是错误对象err（如果没有错误，该参数就是null）？

// 原因是执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。
// 在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。



// Promise
// 回调函数本身并没有问题，
// 它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件，代码如下。
fs.readFile(fileA, 'utf-8', function (err, data) {
    fs.readFile(fileB, 'utf-8', function (err, data) {
        // ...
    });
});

// 不难想象，如果依次读取两个以上的文件，就会出现多重嵌套。
// 代码不是纵向发展，而是横向发展，很快就会乱成一团，无法管理。
// 因为多个异步操作形成了强耦合，只要有一个操作需要修改，
// 它的上层回调函数和下层回调函数，可能都要跟着修改。
// 这种情况就称为"回调函数地狱"（callback hell）。

// Promise 对象就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，
// 允许将回调函数的嵌套，改成链式调用。采用 Promise，连续读取多个文件，写法如下。

var readFile = require('fs-readfile-promise');

readFile(fileA)
    .then(function (data) {
        console.log(data.toString());
    })
    .then(function () {
        return readFile(fileB);
    })
    .then(function (data) {
        console.log(data.toString());
    })
    .catch(function (err) {
        console.log(err);
    });

// 上面代码中，我使用了fs-readfile-promise模块，
// 它的作用就是返回一个 Promise 版本的readFile函数。
// Promise 提供then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。

// 可以看到，Promise 的写法只是回调函数的改进，
// 使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

// Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，
// 不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。


// Generator 函数
// 协程
// 传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。
// 其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

// 协程有点像函数，又有点像线程。它的运行流程大致如下。

// 第一步，协程A开始执行。
// 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
// 第三步，（一段时间后）协程B交还执行权。
// 第四步，协程A恢复执行。
// 上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。

// 举例来说，读取文件的协程写法如下。

function* asyncJob() {
    // ...其他代码
    var f = yield readFile(fileA);
    // ...其他代码
}


// 上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。
// 它表示执行到此处，执行权将交给其他协程。
// 也就是说，yield命令是异步两个阶段的分界线。

// 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，
// 就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。