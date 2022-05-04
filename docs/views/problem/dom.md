<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-06 10:36:38
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-27 23:17:44
-->
# dom
## dom事件机制

dom级别有四个级别 0 1 2 3，dom事件有三个级别：0 2 3

dom 0 级事件 el.onclick = function

dom 2 级事件 el.addEventListener(eName,callback,useCapture)

dom 3 级事件：UI事件（load、scroll），焦点事件(blur，focus) 等等 和自定义的一些事件

事件模型  先捕获再冒泡

dom事件模型分为捕获和冒泡  
捕获阶段：事件从window对象自上而下向目标节点传播  
目标阶段：目标节点正在处理事件阶段  
冒泡阶段：事件从目标节点自下而上至window对象传播

Event对象常见应用
event.preventDefault  可以阻止默认事件行为不触发  
event.stopPropagation  可以阻止冒泡，阻止任何父事件处理程序被执行  
event.stopImmediatePropagation  既可以阻止事件冒泡，又能阻止元素同事件类型的其他监听器触发  阻止事件捕获
event.target 是用户要操作的元素  
event.currentTarget 是程序员要监听的元素  
```js
// 阻止滚动
x.addEventListener('wheel', (e)=>{
  e.preventDefault()
})
x.addEventListener('touchstart', (e)=>{
  e.preventDefault()
})

//css
::-webkit-scrollbar {
    width: 0 !important
}
```

事件委托（事件代理）基于事件冒泡  
可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件 操作对象event.target  
适合使用事件委托的：click，mousedown，mouseup，keydown，keyup，keypress；同时mousemove不好做委托  


## 事件循环 eventloop
是一个执行模型，不同的地方有不同的实现。  
浏览器中h5定义了模型，具体的实现给了厂商  
浏览器的事件循环Event Loop

宏任务队列：settimeout，setInterval，setImmediate，requestAnimationFrame，I/O，UI rendering  
微任务队列：process.nextTick，Promise，Object.observe，MutationObserver 
* 宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
* 微任务队列中所有的任务都会被依次取出来执行，知道microtask queue为空；
* 图中没有画UI rendering的节点，因为这个是由浏览器自行判断决定的，但是只要执行UI rendering，它的节点是在执行完所有的microtask之后，下一个macrotask之前，紧跟着执行UI render。

## 前端跨域如何处理


## canvas 里的图片跨域怎么处理
1.设置image.crossOrigin = 'Annoymous'
anonymous：执行一个cors请求，但是该请求不会发送相关证书，例如cookie。服务器需要相应的设置Access-control-Allow-Origin响应头，图片才是未被污染的  
2.通过给图片路径拼接时间戳的方式，使之实现每次通过画布的图片路径唯一，即可解决图片跨域报错 或者拼接随机数