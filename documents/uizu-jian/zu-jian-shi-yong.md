# 组件使用

* **引用ui组件标签**


    <dmui></dmui>或<dmui/>


* **属性 is ,指向功能组件**


    <dmui is="button"></dmui>或者<dmui is="button"/>


* **属性 src,指向业务组件** 


    <dmui src="/header"></dmui>或者<dmui src="/header">

*这里注意，src的路径以当前项目根目录为相对路径，组件嵌套也是以根目录为相对路径*

* **其他属性**

dmui标签上除is属性的其他属性都会出现在template模板的首个标签中。如下：



    <dmui is="button" id="btn" data-role="haha"></dumi>

data-role是自定义属性，打包生成一下情况:



    <div class="button" id="btn" data-role="haha">
        <div class="button-header"></div>
        <div class="button-footer"></div>
    </div>