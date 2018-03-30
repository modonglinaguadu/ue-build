# 特殊属性

>   标签中特殊属性

* **is**

dmui中指向组件名称

`<dmui is="xxx">`
* **slot**

dmui内部标签中具名分发内容名

`<div slot="header">`

* **name**

`<template>`组件模板中`<slot>`指向分发的内容

`<slot name="header">`

* **src**

当和img标签使用时表示图片路径，以ganji_sta的根目录为参考路径。

**例子:**

    
    <img src="/src/image/v5/checkmark.png">

当与dmui标签使用时，以当前项目的根目录为参考路径。

* **url**

sass中背景图片路径，和src一样

**例子：**

    background:url('/src/image/v5/checkmark.png');

