## 自动补全

> 自动补全实现了对zz-ui组件、某个组件存在的属性、某个属性的可选值进行自动提示，同步zz-ui官网数据

## 整体流程

![](http://qn.huat.xyz/mac/20210925153249.png)



## 核心API

通过`vscode.languages.registerCompletionItemProvider`方法注册自动完成实现，接收3个参数：

- 第一个是要关联的文件类型；
- 第二个是一个对象，里面必须包含`provideCompletionItems`和`resolveCompletionItem`这2个方法；
- 第三个是一个可选的触发提示的字符列表；

参考：https://code.visualstudio.com/api/references/vscode-api#CompletionItemProvider

**案例演示**

## 组件自动提示

![](http://qn.huat.xyz/mac/20210924095002.png)

**提示的内容是怎么出来的？**

就是`provideCompletionItems`方法返回的数组！

### 具体实现

1、 `isTagStart()` 

通过正则进行匹配，其中使用了一个工具方法获取光标之前的输入内容，`getTextBeforePosition()` ,

正则：`tagStartReg: RegExp = /<([\w-]*)$/;`



2、 `notInTemplate()`  获取当前光标所在行，并逐渐递减，判断是否能匹配到 `script` 标签 ，从而判断是否在 模板中 。



3、`getTagSuggestion()` 调用 `buildTagSuggestion()` 函数生成item，填充数组，并返回。 【这遍历的是对象】



4、`buildTagSuggestion(tag, TAGS[tag], id)` 核心函数

![](http://qn.huat.xyz/mac/20210924150016.png)



## 组件属性自动提示

可根据流程图自行查看

![](http://qn.huat.xyz/mac/20210925154400.png)

图上演示的是 `z-cell` 组件所存在的属性和属性相关的信息展示

## 组件属性值自动提示

可根据流程图自行查看

![](http://qn.huat.xyz/mac/20210925154624.png)

图上演示的是 `z-button` 组件 `type` 属性所存在的可选的属性值，并不是所有属性都存在可选值。
