# slot分发

在使用组件的时候我们可能遇到这种情况



    <dmui is="button">
        <div>
            把该内容插入组件中
        </div>
    </dmui>

为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为**内容分发**。

### 单个slot

除非子组件模板包含至少一个 `<slot>` 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。

**假定button组件有一下模板:**



    <template>
        <div class="button">
            <div class="button-header"></div>
            <slot></slot>
            <div class="button-footer"></div>
        </div>
    </template>
    
**使用组件模板:**
    
    
    <dmui is="button">
        haha
        <h1>this is content title</h1>
        <p>this is content</p>
    </dmui>


**渲染结果:**


    <div class="button">
        <div class="button-header"></div>
        haha
        <h1>this is content title</h1>
        <p>this is content</p>
        <div class="button-footer"></div>
    </div>

### 具名slot

`<slot>` 元素可以用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。

仍然可以有一个匿名 slot ，它是默认 slot ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。

**假定button组件有一下模板:**

    
        
    <template>
        <div class="button">
            <div class="button-header">
                <slot name="header-cont"></slot>
            </div>
            <slot></slot>
            <div class="button-footer">
                <slot name="footer-cont"></slot>
            </div>
        </div>
    </template>

**使用组件模板:**


    <dmui is="button">
        <div slot="header-cont">
            this is header content
        </div>
        haha
        <h1>this is content title</h1>
        <p>this is content</p>
        <div slot="footer-cont">
            this is footer content
        </div>
    </dmui>
    
**渲染结果:**


    <div class="button">
        <div class="button-header">
            <div slot="header-cont">
                this is header content
            </div>
        </div>
        haha
        <h1>this is content title</h1>
        <p>this is content</p>
        <div class="button-footer">
            <div slot="footer-cont">
                this is footer content
            </div>
        </div>
    </div>


### text

`<dmui>`组件中,文本是默认插入到未命名的slot中的，如果需要文本插入命名slot中，则需要使用`<text>`标签。

**模板**


    <template>
	<div class="header">
		<h2><slot name="h2"></slot></h2>
		<p><slot></slot></p>
	</div>
    </template>
    
**使用组件**

    <dmui src="/components/header/header">
        <text slot="h2">这是标题</text>
        haha
    </dmui>

**渲染结果**

    <div class="header" vm-xx="dudu">
        <h2>这是标题</h2>
        <p>
            haha
        </p>
    </div>


