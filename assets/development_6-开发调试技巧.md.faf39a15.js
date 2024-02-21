import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.b5e70fdf.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"development/6-开发调试技巧.md","lastUpdated":1708503635000}'),p={name:"development/6-开发调试技巧.md"},o=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>在介绍完一些比较简单的内容点之后，我觉得有必要先和大家介绍一些开发中遇到的一些细节问题以及技巧，特别是后面一章节将要介绍 WebView 的知识，这个坑会比较多，避免大家走弯路。</p><h2 id="开发方式" tabindex="-1">开发方式 <a class="header-anchor" href="#开发方式" aria-label="Permalink to &quot;开发方式&quot;">​</a></h2><p>最理想的方式是准备双显示器，一个写代码，一个运行插件，实践证明这种方式开发效率会提升很多，每次修改完代码之后直接<code>Ctrl+R</code>重新加载即可，非常方便。</p><h2 id="日志查看" tabindex="-1">日志查看 <a class="header-anchor" href="#日志查看" aria-label="Permalink to &quot;日志查看&quot;">​</a></h2><p>就我目前遇到的情况来看，vscode 日志主要有这 5 种：</p><h3 id="旧窗口的调试控制台" tabindex="-1">旧窗口的调试控制台 <a class="header-anchor" href="#旧窗口的调试控制台" aria-label="Permalink to &quot;旧窗口的调试控制台&quot;">​</a></h3><p>扩展里的<code>console.log()</code>日志一般输出在这里，但是有很大的限制，结构稍微深一点的对象在这里了就显示不了：</p><blockquote><p>Unable to log remote console arguments Output omitted for an object that cannot be inspected (Error: [sxei.vscode-plugin-demo]: Proposed API is only available when running out of dev or with the following command line switch: --enable-proposed-api sxei.vscode-plugin-demo)</p></blockquote><p>这里只能看成是新窗口开发者控制台日志的一种快捷显示，以下是旧窗口调试控制台显示的内容：</p><p><img src="https://qn.huat.xyz/mac/202402211549672.png" alt="img"></p><p>而对应的内容在新窗口的开发者控制台显示如下：</p><p><img src="https://qn.huat.xyz/mac/202402211549148.png" alt="img"></p><p>可以看到，结构较深的对象即使在控制台也无法显示，目前发现的唯一比较好的方法就是在输出的地方打一个断点，然后运行的时候会自动卡在这里，鼠标悬停就可以查看对象的内容。</p><p><img src="https://qn.huat.xyz/mac/202402211549927.png" alt="img"></p><h3 id="新窗口的调试控制台" tabindex="-1">新窗口的调试控制台 <a class="header-anchor" href="#新窗口的调试控制台" aria-label="Permalink to &quot;新窗口的调试控制台&quot;">​</a></h3><p>一般没什么扩展相关日志会输出在这里。</p><h3 id="旧窗口的开发者控制台" tabindex="-1">旧窗口的开发者控制台 <a class="header-anchor" href="#旧窗口的开发者控制台" aria-label="Permalink to &quot;旧窗口的开发者控制台&quot;">​</a></h3><p>快捷键<code>Ctrl+Alt+I</code>，这里一般显示 vscode 本身一些日志，和扩展相关的不会显示在这里，所以这个也不用太多关心。</p><h3 id="新窗口的开发者控制台" tabindex="-1">新窗口的开发者控制台 <a class="header-anchor" href="#新窗口的开发者控制台" aria-label="Permalink to &quot;新窗口的开发者控制台&quot;">​</a></h3><p>快捷键也是<code>Ctrl+Alt+I</code>，不记得的可以从<code>帮助</code> -&gt; <code>切换开发人员工具</code>找到。这个控制台很重要，有时候如果发现你的代码莫名其妙没生效，很有可能是报错了，这种报错是不会显示在<code>旧窗口调试控制台</code>的，如果你不知道到这里来查看日志，那么你只能一脸懵逼的到处乱试了，调试控制台只打印常规日志，语法错误并不会显示在这里。</p><p>例如，我在跳转定义实现前人为制造一个错误：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">provideDefinition</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">document</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">position</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">token</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">aaf</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fileName</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">fileName</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 省略其它代码</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>运行后就会发现点击跳转不生效，但是也没有什么报错提示，此时只能打开控制台查看才能发现问题：</p><p><img src="https://qn.huat.xyz/mac/202402211549974.png" alt="img"></p><h3 id="webview-控制台" tabindex="-1">WebView 控制台 <a class="header-anchor" href="#webview-控制台" aria-label="Permalink to &quot;WebView 控制台&quot;">​</a></h3><p><code>WebView</code>我们会在下一章节介绍，这里先提一下。<code>Webview</code>的控制台比较特殊，需要特殊的命令才能打开，按下<code>Ctrl+Shift+P</code>然后执行<code>打开Webview开发工具</code>，英文版应该是<code>Open Webview Developer Tools</code>：</p><p><img src="https://qn.huat.xyz/mac/202402211549570.png" alt="img"></p><p>开发时我们把它当成一个普通的网页来看就好了。</p><h2 id="调试" tabindex="-1">调试 <a class="header-anchor" href="#调试" aria-label="Permalink to &quot;调试&quot;">​</a></h2><p>vscode 插件的调试非常简单方便，只需要在需要调试的地方打个断点，然后按<code>F5</code>执行即可：</p><p><img src="https://qn.huat.xyz/mac/202402211550284.png" alt="img"></p><p>几个调试快捷键：</p><ul><li><code>F5</code>运行</li><li><code>Ctrl+F2</code>停止运行</li><li><code>F6</code>下一步跳过（类似于 Chrome 的<code>F10</code>）</li><li><code>F5</code>下一步跳入</li><li><code>F8</code>跳过</li></ul><h2 id="如何快速找到我想找的内容" tabindex="-1">如何快速找到我想找的内容 <a class="header-anchor" href="#如何快速找到我想找的内容" aria-label="Permalink to &quot;如何快速找到我想找的内容&quot;">​</a></h2><p>刚开始只能先大概对整个 vscode 的 api 有一个大概了解，了解了之后就大概清楚一般什么功能会怎么实现，该去什么地方找，所有的 vscode 的 api 都可以在<code>vscode.d.ts</code>文件里面找到：</p><p><img src="https://qn.huat.xyz/mac/202402211550084.png" alt="img"></p><p>不得不佩服，正规大型项目的注释写的真的不是一般的详细，<a href="https://code.visualstudio.com/docs/extensionAPI/vscode-api" target="_blank" rel="noreferrer">官网的 API 文档</a>肯定也是基于这个自动生成的，反正把这个<code>ts</code>文件吃透了，基本上你想实现什么功能要怎么实现都了如指掌了。</p><h2 id="查看插件存放目录" tabindex="-1">查看插件存放目录 <a class="header-anchor" href="#查看插件存放目录" aria-label="Permalink to &quot;查看插件存放目录&quot;">​</a></h2><p>插件安装后根据操作系统不同会放在如下目录：</p><ul><li>Windows 系统：<code>%USERPROFILE%\\.vscode\\extensions</code></li><li>Mac/Linux：<code>~/.vscode/extensions</code></li></ul><p>想要学习查看其它插件的代码可以找到这个目录：</p><p><img src="https://qn.huat.xyz/mac/202402211550797.png" alt="img"></p><h2 id="一些个人经验分享" tabindex="-1">一些个人经验分享 <a class="header-anchor" href="#一些个人经验分享" aria-label="Permalink to &quot;一些个人经验分享&quot;">​</a></h2><h3 id="调试控制台日志不可靠" tabindex="-1">调试控制台日志不可靠 <a class="header-anchor" href="#调试控制台日志不可靠" aria-label="Permalink to &quot;调试控制台日志不可靠&quot;">​</a></h3><p>vscode 有一个很坑爹的地方，这里特别要注意，当 require 一个 function 进来并打印输出时，虽然打印在控制台显示为 null，但其实是有值的，不知道的人很容易被误导，直接就是被这个现象骗了很久，<strong>切记切记</strong>！</p><p>test-require-function.js：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testRequireFunction</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">b</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">进入testRequireFunction方法</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> testRequireFunction</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>extension.js</code>：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">exports.</span><span style="color:#82AAFF;">activate</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">testFn</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">require</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./test-require-function</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">testFn</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// vscode的日志输出不可靠，这里竟然会打印null？！</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">testFn</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 1, 2</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>输出结果：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">null</span></span>
<span class="line"><span style="color:#FFCB6B;">进入testRequireFunction方法</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="代码为什么没生效" tabindex="-1">代码为什么没生效 <a class="header-anchor" href="#代码为什么没生效" aria-label="Permalink to &quot;代码为什么没生效&quot;">​</a></h3><p>代码没生效一般从这几个地方去查找：</p><ul><li><code>activationEvents</code>里面添加了吗？开发的时候如果老是忘记可以直接设置成<code>*</code>；</li><li>代码是不是报错了？如前文所说，很多错误是不会暴露出来的，需要手动打开控制台查看；</li><li>代码是不是忘记引入了？有时候拆分多个文件之后可能忘了引入；</li><li>逻辑是不是写错了？最好的办法就是 debug，这是找问题最快的方法；</li><li>版本冲突</li></ul><p>这里重点说一下最后面的版本冲突，这个甚至可以说是 vscode 本身的一些 bug，经常发现代码莫名其妙地没生效，怎么调试都不对，后来发现运行的根本就不是我们正在开发的那个版本，特别是当你的插件已经发了一版到应用市场并安装后，本地再按 F5 运行，理论上说 debug 运行的会覆盖已安装的，但有时候还是会出现异常情况，所以为了以防万一，当出现这种情况时可以先把已经安装的给卸载。</p><p>还有一个问题就是，有时候明明安装了版本更加新的那个，结果运行的却是旧的，打开扩展目录会发现很多并存的同名不同版本插件，或者可能先是通过 vsix 方式安装了一个版本，然后又从应用市场安装一个，总之解决这类问题最好的方法就是：先卸载再安装，实在不行手动去插件目录删除之！</p><h3 id="打开文件" tabindex="-1">打开文件 <a class="header-anchor" href="#打开文件" aria-label="Permalink to &quot;打开文件&quot;">​</a></h3><p>打开文件是<code>vscode.window.showTextDocument</code>而不是<code>vscode.workspace.openTextDocument</code>，这个根据字面意思很容易搞错，原来老外也有命名不准确的时候啊，哈哈。</p><ul><li><code>vscode.workspace.openTextDocument</code>仅仅是加载文档并返回一个<code>TextDocument</code>对象，但是并不在 vscode 中打开；</li><li><code>vscode.window.showTextDocument</code>则是在 vscode 中打开一个文档；</li></ul><p>其实：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">workspace</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">openTextDocument</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">someFilePath</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">document</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showTextDocument</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">editor</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 可以操作文档的editor对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>等价于：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showTextDocument</span><span style="color:#A6ACCD;">(vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Uri</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">file</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">someFilePath</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">editor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 可以操作文档的editor对象</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="工程根目录的获取" tabindex="-1">工程根目录的获取 <a class="header-anchor" href="#工程根目录的获取" aria-label="Permalink to &quot;工程根目录的获取&quot;">​</a></h3><p>被这个问题踩过很多次坑，所有重点介绍一下。</p><p>有的人的 vscode 工作空间是这样的，每一个工程一个个地单独拖入：</p><p><img src="https://qn.huat.xyz/mac/202402211550430.png" alt="img"></p><p>也有的人是直接用打开文件夹的方式把存放代码的父文件夹给打开：</p><p><img src="https://qn.huat.xyz/mac/202402211550276.png" alt="img"></p><p>但是如果此时你点击<code>将工作区另存为</code>保存了工作区之后就变成这样了（请注意图标的变化）：</p><p><img src="https://qn.huat.xyz/mac/202402211550930.png" alt="img"></p><p>所以，即便拿到了某个文件的完整路径也不好获取这个文件的工程路径，因为不知道工作区的这个文件夹名字是你的工程名还是存放工程的父文件夹的名字。</p><p>已知：</p><ul><li>vscode 以前有一个<code>vscode.workspace.rootPath</code>，由于后来 vscode 支持 multipleRoot 模式，所以这个字段已经过时作废了。</li><li><code>vscode.workspace.workspaceFolders</code>可以获取当前工作区所有根文件夹数组；</li></ul><p>之前我写了一个简单粗暴的获取工程目录方式：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 获取当前所在工程根目录，有3种使用方法：&lt;br&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * getProjectPath(uri) uri 表示工程内某个文件的路径&lt;br&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * getProjectPath(document) document 表示当前被打开的文件document对象&lt;br&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * getProjectPath() 会自动从 activeTextEditor 拿document对象，如果没有拿到则报错</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">*</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">document</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#82AAFF;">getProjectPath</span><span style="color:#A6ACCD;">(document) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">document</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">document</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">activeTextEditor</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">activeTextEditor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">document</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">document</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">showError</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">当前激活的编辑器不是文件或者没有文件被打开！</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currentFile</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">fsPath</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">projectPath</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">workspaceFolders</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">workspace</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">workspaceFolders</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">item</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">uri</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">path</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">workspaceFolders</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">workspaceFolders</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">vscode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">workspace</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">rootPath</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">rootPath</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">workspaceFolders</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">files</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readdirSync</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">rootPath</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">workspaceFolders</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">files</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">filter</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">name</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;font-style:italic;">^</span><span style="color:#A6ACCD;">\\.</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">test</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">name</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">rootPath</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// vscode.workspace.rootPath会不准确，且已过时</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// return vscode.workspace.rootPath + &#39;/&#39; + this._getProjectName(vscode, document);</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">workspaceFolders</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">folder</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">currentFile</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">folder</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">projectPath</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">folder</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">projectPath</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">showError</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">获取工程根路径异常！</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">projectPath</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>这种方式生效的前提是，如果是按照第一种方式存放工作空间的，工程的数目必须大于等于 2，但是这种判断方式不用说肯定会不准确。</p><p>后来换成了另外一种方式，考虑到工作接触到的项目无论是 node 端还是前端都会有<code>package.json</code>文件在根目录，所以就根据哪个文件夹有这个文件来判断，也只能是这样了。</p>`,79),e=[o];function t(c,r,y,F,i,D){return a(),n("div",null,e)}const C=s(p,[["render",t]]);export{A as __pageData,C as default};
