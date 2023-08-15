import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "使用文档",
    link: "/use/",
    activeMatch: "^/use",
  },
  {
    text: "Yao 源码解析",
    link: "/analysis/",
    activeMatch: "^/analysis",
  },
  {
    text: "开发指南",
    link: "/development/",
    activeMatch: "^/development",
  },
  {
    text: "常用插件",
    link: "/plugin/",
    activeMatch: "^/plugin",
  },
  {
    text: "快捷键",
    link: "/shortcutkey/",
    activeMatch: "^/shortcutkey",
  },
  {
    text: "ZZUI",
    link: "https://fe.zhuanspirit.com/common/6.x/@zz-common/zz-ui/#/zh-CN/button",
  },
];
