<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-07 19:06:43
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-07 19:47:07
-->
# settimeout去实现setInterval
* 1
```js
let timer = null
const mockInterval = (function(){
  return function _settimeout(fn,time) {
    timer = setTimeout(()=>{
      fn()
      clearTimeout(timer)
      _settimeout(fn,time)
    },time)
  }
})()

clearTimeout(timer)
```
* 2
```js
window.idarr = [0];
function _setInterval(fun, time) {
    var id = setTimeout(function() {
        _setInterval(fun, time);
        fun();
        clearTimeout(id);
    }, time);
    window.idarr.pop();
    window.idarr.push(id);
    return window.idarr;
}
function _clearInterval(id) {
    clearTimeout(id[0]);
}
```