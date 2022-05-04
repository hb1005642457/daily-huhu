<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-08 09:44:43
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-12 09:41:05
-->
# vue双向绑定机制
defineReactive中新定义的dep是为了存模板中data声明的变量的watcher  
watcher如果isRender为true 记录的是每个组件的更新渲染函数，如果不传，则可以为watch和computed分别建立监听和lazy监听