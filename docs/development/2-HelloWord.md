## 写着前面

学习一门新的语言或者生态首先肯定是从 HelloWord 开始。

可以使用微软官方的脚手架[vscode-generator-code](https://github.com/Microsoft/vscode-generator-code)来生成项目结构，脚手架的使用我们后面再来介绍，先来熟悉一下项目结构。

## 脚手架的使用

安装脚手架：

```bash
npm install -g yo generator-code
```

然后 cd 到你的工作目录，运行`yo code`：

![img](https://qn.huat.xyz/mac/202402211543846.png)

根据向导一步步选择即可，没啥好说的，运行完后就生成了一个干净的可以直接`F5`运行的`vscode`插件工程了。

## HelloWorld

### 项目结构

项目结构其实很简单，主要是清单文件`package.json`以及`extension.js`这个插件入口文件：

![img](https://qn.huat.xyz/mac/202402211541266.png)

`package.json`部分关键内容如下（已省略其它）

```json
{
  // 扩展的激活事件
  "activationEvents": ["onCommand:extension.sayHello"],
  // 入口文件
  "main": "./src/extension",
  // 贡献点，vscode插件大部分功能配置都在这里
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World"
      }
    ]
  }
}
```

`src/extension.js`内容如下：

```js
const vscode = require("vscode");

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function (context) {
  console.log("恭喜，您的扩展“vscode-plugin-demo”已被激活！");
  // 注册命令
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.sayHello", function () {
      vscode.window.showInformationMessage("Hello World!");
    })
  );
};

/**
 * 插件被释放时触发
 */
exports.deactivate = function () {
  console.log("您的扩展“vscode-plugin-demo”已被释放！");
};
```

### 解读

- `main`定义了整个插件的主入口；
- 我们在`contributes.commands`里面注册了一个名为`extension.sayHello`的命令，并在`src/extension.js`中去实现了它（弹出一个`Hello World`的提示）；
- 但是仅仅这样还不够，命令虽然定义了，但是 vscode 还不知道啥时候去执行它，还需要在`activationEvents`添加上`onCommand:extension.sayHello`用来告诉 vscode，当用户执行了这个命令操作时去执行前面我们定义的内容；
- 除了`onCommand`之外，还有`onView`、`onUri`、`onLanguage`等等，具体我们后面会详细讲到。

### 运行调试

默认情况下，工程已经帮我们配置好了调试相关参数（有兴趣的可以查看`.vscode/launch.json`文件的写法），只需要到调试面板选中要调试的项目(仅仅是第一次需要，后续会自动记住上次调试的项目)，然后按下`F5`就会弹出一个新的 vscode 窗口：

![img](https://qn.huat.xyz/mac/202402211541556.png)

这个新窗口已经加载了我们的插件，窗口标题会注明`扩展开发主机`，对于只有单显示器的同学来说，很容易写着写着就忘了哪个是主窗口，哪个是新窗口，所以可以通过这个来区分。

![img](https://qn.huat.xyz/mac/202402211542700.png)

**先插句话**：

> 为了描述方便，我们约定，后续把新弹出来的那个窗口叫`新窗口`，之前老的那个叫`旧窗口`。

然后按下`Ctrl+Shift+P`，输入`HelloWorld`执行对应命令，当你发现右下角弹出了`HelloWorld`的提示时，恭喜你，你已经掌握了你人生第 109 种新语言了，哈哈，开个玩笑。

### 添加右键菜单和快捷键

上面由于我们只是注册了命令，没有添加菜单或快捷键，调用不方便，所以我们现在添加一下。

打开`package.json`，按照下述方式添加：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World"
      }
    ],
    // 快捷键绑定
    "keybindings": [
      {
        "command": "extension.sayHello",
        "key": "ctrl+f10",
        "mac": "cmd+f10",
        "when": "editorTextFocus"
      }
    ],
    // 设置菜单
    "menus": {
      "editor/context": [
        {
          "when": "editorFocus",
          "command": "extension.sayHello",
          "group": "navigation"
        }
      ]
    }
  }
}
```

然后重新运行插件，在编辑器的右键可以看到如下菜单：

![img](https://qn.huat.xyz/mac/202402211542323.png)

这里我们暂时不对配置项做过渡解读，后面会有专门篇章来介绍`package.json`文件的写法。

### 重新加载

如果修改了扩展代码，想重新加载的话，可以直接在新窗口上按下`Ctrl+R`来快速重新加载，也可以先停止，然后再按`F5`。
