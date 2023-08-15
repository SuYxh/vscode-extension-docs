## 自动导入

> 当在 template 中键入 zz-ui 组件的时候，会自动导入键入的组件并且自动use

## 整体流程

![](http://qn.huat.xyz/mac/20210925155348.png)





## 难点

1、什么时机进行导入？

应该在键入组件的时候导入，但是目前没有找到相关的钩子，需要在组件导入后，在组件开始标签内部通过空格进行触发导入，等待优化。



2、确定导入位置？

 通过精确定位 `script`标签、`@zz-common/zz-ui` 、`Vue.use()`、 ` import Vue` 等实现



3、如何实现导入？

通过 `window.activeTextEditor.edit(editBuilder => {})` API实现导入



4、细节处理：比如针对特殊的组件进行特殊处理，比如`button` 、结尾是否需要添加分号等

## 实现

`app.ts` 中的 `importTag()` 方法

