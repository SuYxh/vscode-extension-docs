import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "使用文档",
    link: "/use/",
    activeMatch: "^/use",
  },
  {
    text: "开发指南",
    link: "/development/",
    activeMatch: "^/development",
  },
];
