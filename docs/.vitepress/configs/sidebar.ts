import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
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
  ],
  "/fe/": [
    {
      text: "JavaScript 基础知识",
      collapsed: false,
      items: [
        { text: "数据类型", link: "/fe/javascript/types" },
      ],
    },
    {
      text: "ES6 常用知识点",
      link: "/fe/es6/",
    },
  ],
  "/pit/": [
    {
      text: "踩坑记录",
      // collapsed: false,
      items: [
        { text: "npm 踩坑记录", link: "/pit/npm" },
        { text: "PC 踩坑记录", link: "/pit/pc" },
        { text: "H5 踩坑记录", link: "/pit/h5" },
      ],
    },
  ],
};
