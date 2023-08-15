---
layout: home
layoutClass: "m-home-layout"

hero:
  name: Yao
  text: 内置 GPT4
  tagline: 一款平平无奇的 vscode 插件
  image:
    src: /logo.png
    alt: vscode-extension-docs
  actions:
    - text: 使用文档
      link: /use/
    - text: 开发指南
      link: /development/
      theme: alt
features:
  - icon: 📖
    title: 使用文档
    details: 整理了常用功能的使用介绍，一看就会！
    link: /use/
    linkText: use docs
  - icon: 🐞
    title: 源码解析
    details: 核心功能剖析<br />总有一些奇奇怪怪的问题
    link: /analysis/
    linkText: source
  - icon: 💯
    title: 开发指南
    details: 包学会！
    linkText: development
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

/* .m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
} */
</style>
