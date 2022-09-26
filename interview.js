// ES6?

// Var(全局) let（代码块） const（代码块，不可变）！

// window

// 箭头函数注意事项


// 模板字符串有什么特性？实现一个类模板字符串的功能


// let page=3;
// let zhaangjie=4;

// let methodStirng=`这本书有${page}页，${zhaangjie}章节`
// console.log(methodStirng) 


// set（类数组） map（类似字典） 区别，各有什么方法。


// class person
// {
//     构造函数
//     {}
//     Age
//     name
//     Location
    
//     skill
        
// }


// Promise 
// Promise 构造函数 是同步执行还是异步执行？ then方法呢？


// setTimeout Promise Async/Await

// Promise 几种状态 ，什么时候触发Catch。


// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve();
//     console.log(2);
// })

// promise.then(() => {
//     console.log(3);
// })

// console.log(4);


// let x=1;
// let y=2;
// [x,y]=[y,x];

// Symbol

// let s = newSet();
// s.add([1]);s.add([1]);
// console.log(s.size); 2


// let s = newSet();
// s.add(1);s.add(1);
// console.log(s.size); 1

let arr=[1,6,2,3,5]
for(let i=0;i<=arr.length;i++){
    for(let j=i+1;j<=arr.length;j++){
        if(arr[i]<arr[j]){
            [arr[i],arr[j]]=[arr[j],arr[i]]
        }
    }
    console.log(arr)
}

forEach、for in、for of三者区别

let arr1=[6,5,4,3,2,1]
let find=4;
let findindex;
let 