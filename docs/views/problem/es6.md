<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-07 18:46:58
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-15 17:45:44
-->
## set用法 如何去重
set类似数组  但值不能重复  
通过size计算内部元素个数  
与array相互转换
const ary = [...new Set([1,2,1])]  
NaN与NaN不恒等  但是在set中只能存一个

## GraphQL

## 类型强制转换
https://zhuanlan.zhihu.com/p/452417686
* 原始类型转string
number -> '';  
boolean true->'true';  
null -> 'null';  
undefined -> 'undefined';
* 原始类型转number
无数字字符串转 -> NaN;  
boolean true->1,false->0;  
null->0;  
undefined->NaN;  
* 原始类型转boolean
转换为false的： '' 0 -0 NaN null undefined;  
转换为true的： 非空字符串  非0和NaN的数值;
### 对象转原始类型
对象转boolean 直接true  
对象\<obj\> to string是先调用toString(), 并在返回值为对象的时候, 再调用valueOf(). 而对象<\obj\> to number的时候, 调用的顺序相反, 不过其他逻辑基本相同

### 隐式类型转换
#### == 情况下
* 不会发生隐式类型转换的情况
null == undefined -> true;  
A为undefiend或null B为其他类型 false;  
A和B均为对象，比较对象地址是否相等;  
* 发生隐式类型转换
A和B都是除了null和undefiend外的基本类型 且A和B类型不一致 会先转为number再比较;  
A 和 B 其中有一个为对象, 另一个为{string, boolean, number}中的一种. 此时一个为对象, 一个为原始值, 当两者进行相等比较的时候, 会对对象进行 to primitive 的类型转换;  
在隐式类型转换当中, 如果对象发生to primitive操作,总是优先调用[Symbol.toPrimitive]. 如果没有定义则调用valueOf, 在valueOf返回对象的时候, 会继续调用toString
* 关系运算转换
普通的会先转为number再比较
* 运算
除了字符串与数字做相加操作是拼接字符串外，其他在与数字类型做算数运算时，都会先转换成数字（true->1;false->0;null->0;undefined->NaN）