import{_ as e,o as a,c as t,Q as o}from"./chunks/framework.4dfdaa64.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"analysis/自动导入.md","lastUpdated":1693292835000}'),c={name:"analysis/自动导入.md"},d=o('<h2 id="自动导入" tabindex="-1">自动导入 <a class="header-anchor" href="#自动导入" aria-label="Permalink to &quot;自动导入&quot;">​</a></h2><blockquote><p>当在 template 中键入 zz-ui 组件的时候，会自动导入键入的组件并且自动use</p></blockquote><h2 id="整体流程" tabindex="-1">整体流程 <a class="header-anchor" href="#整体流程" aria-label="Permalink to &quot;整体流程&quot;">​</a></h2><p><img src="http://qn.huat.xyz/mac/20210925155348.png" alt=""></p><h2 id="难点" tabindex="-1">难点 <a class="header-anchor" href="#难点" aria-label="Permalink to &quot;难点&quot;">​</a></h2><p>1、什么时机进行导入？</p><p>应该在键入组件的时候导入，但是目前没有找到相关的钩子，需要在组件导入后，在组件开始标签内部通过空格进行触发导入，等待优化。</p><p>2、确定导入位置？</p><p>通过精确定位 <code>script</code>标签、<code>@zz-common/zz-ui</code> 、<code>Vue.use()</code>、 <code> import Vue</code> 等实现</p><p>3、如何实现导入？</p><p>通过 <code>window.activeTextEditor.edit(editBuilder =&gt; {})</code> API实现导入</p><p>4、细节处理：比如针对特殊的组件进行特殊处理，比如<code>button</code> 、结尾是否需要添加分号等</p><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><p><code>app.ts</code> 中的 <code>importTag()</code> 方法</p>',14),r=[d];function i(p,s,n,l,_,h){return a(),t("div",null,r)}const b=e(c,[["render",i]]);export{m as __pageData,b as default};
