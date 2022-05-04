<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-27 22:57:31
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-27 23:00:50
-->
# Typescript

## TS 的 type 和 interface 的区别
interface和type的区别  
相同点：
1.都可以定义一个对象或函数  
2.都允许继承,interface使用extends实现继承，type使用交叉类型实现继承  
不同点：interface主要是定义对象类型  对对象进行描述
        type是给类型定义别名  type可以声明基本类型  联合类型  交叉类型   元组  interface不行
        interface可以合并 重复声明  type不行