import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/use/": [
    {
      text: "Yao 使用文档",
      collapsed: false,
      items: [
        { text: "概览", link: "/use/简介" },
        { text: "安装", link: "/use/安装" },
        { text: "自动补全", link: "/use/自动补全" },
        { text: "自动导入", link: "/use/自动导入" },
        { text: "代码片段", link: "/use/代码片段" },
        { text: "内置 zzui 官网", link: "/use/zzui" },
        { text: "自定义设置", link: "/use/自定义设置" },
      ],
    }
  ],
  "/development/": [
    {
      text: "vscode插件开发",
      collapsed: false,
      items: [
        { text: "概览", link: "/development/1-概览" },
        { text: "HelloWord", link: "/development/2-HelloWord" },
        { text: "package.json详解", link: "/development/3-packagejson" },
        { text: "命令菜单快捷键", link: "/development/4-命令菜单快捷键" },
        { text: "跳转到定义自动补全悬停提示", link: "/development/5-跳转到定义自动补全悬停提示" },
        { text: "开发调试技巧", link: "/development/6-开发调试技巧" },
        { text: "webView", link: "/development/7-webView" },
        { text: "代码片段设置自定义欢迎页", link: "/development/8-代码片段设置自定义欢迎页" },
        { text: "常用API总结", link: "/development/9-常用API总结" },
        { text: "打包发布升级", link: "/development/10-打包发布升级" },
      ],
    }
  ]
};
