# 组件书写

> 书写一个名为button的组件

* **书写组件**


    <template>
        //组件
    </template>


* **书写规范**
  
template标签内部只能有一个标签包裹。


    demo:
    
    正确: <template><div>xxx</div></template>
    
    错误: <template><div>xxx</div><div>xxx</div></template>

* **class名**


    <template><div class="button"></div></template>


* **组件对应sass中的命名方式**

**sass:**
    
    .button{
        &-header{
            
        }
        &-footer{
            
        }
    }
    
    
**template:**

        
    <template>
        <div class="button">
            <div class="button-header"></div>
            <div class="button-footer"></div>
        </div>
    </template>