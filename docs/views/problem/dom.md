<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-06 10:36:38
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-06 15:05:21
-->
# dom事件机制

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
event.stopImmediatePropagation  既可以阻止事件冒泡，又能阻止元素同事件类型的其他监听器触发  
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

事件委托（事件代理）  
可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件