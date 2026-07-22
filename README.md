# DevLog — 我的个人技术博客

React + TypeScript + Vite + Tailwind CSS 构建的纯静态博客。
**零服务器、零数据库、零费用**：文章在代码里，评论在 GitHub 仓库里，访问量用不蒜子。

## 目录结构（只需要关心这几个）

```
src/
├── config.ts        ← 站点配置：昵称、GitHub、邮箱、评论系统
├── data/posts.ts    ← 所有文章都在这里（发文章就改这个文件）
├── pages/           ← 页面（首页、文章列表、文章详情、关于）
└── components/      ← 组件（一般不用动）
```

## 一、本地运行（改代码时用）

```bash
# 1. 安装 Node.js（LTS 版）：https://nodejs.org
# 2. 在项目文件夹里打开终端，第一次运行：
npm install
# 3. 启动开发服务器：
npm run dev
# 4. 浏览器打开 http://localhost:3000，改代码会自动刷新
```

## 二、部署到互联网（一次性，约 10 分钟）

1. 注册 [GitHub](https://github.com) 账号，新建一个**公开**仓库（如 `my-blog`）
2. 安装 [Git](https://git-scm.com)，在项目文件夹里执行：
   ```bash
   git init
   git add .
   git commit -m "我的博客"
   git remote add origin https://github.com/你的用户名/my-blog.git
   git push -u origin main
   ```
3. 注册 [Vercel](https://vercel.com)（用 GitHub 账号登录），点 **Add New Project**，
   选中 `my-blog` 仓库，直接点 **Deploy**（所有设置保持默认）
4. 等 1 分钟，你会得到一个 `xxx.vercel.app` 域名，这就是你的博客地址

> 以后每次 `git push`，Vercel 会自动重新部署，不用任何其他操作。

## 三、开启评论区（一次性，约 5 分钟）

评论用 [Giscus](https://giscus.app/zh-CN)，数据存在你自己的 GitHub 仓库里：

1. 完成上面的部署（仓库必须是公开的）
2. 打开你的仓库 → **Settings** → 勾选 **Discussions**
3. 打开 <https://github.com/apps/giscus> 点 **Install**，授权给 `my-blog` 仓库
4. 打开 <https://giscus.app/zh-CN>，填入 `你的用户名/my-blog`，
   页面下方会生成一段代码，把其中 4 个值填进 `src/config.ts`：
   - `data-repo` → `repo`
   - `data-repo-id` → `repoId`
   - `data-category` → `category`
   - `data-category-id` → `categoryId`
5. `git push`，评论区就出现了。管理评论直接在 GitHub 仓库的 Discussions 里操作

## 四、日常发文章（最常做的事）

打开 `src/data/posts.ts`，在数组最前面加一条：

```ts
{
  id: 'my-new-post',           // 网址的一部分，用英文短横线命名，不能重复
  title: '文章标题',
  date: '2026-07-24',
  tags: ['标签1', '标签2'],
  summary: '一句话摘要，显示在卡片上',
  content: `
正文写在这里，支持 Markdown：
## 小标题
**加粗**  \`代码\`  - 列表  > 引用
\`\`\`cpp
代码块
\`\`\`
`,
},
```

然后：

```bash
git add .
git commit -m "新文章：文章标题"
git push
```

等 1 分钟，网站自动更新。

## 五、常见问题

- **改个人信息**（GitHub、邮箱、站名）：`src/config.ts`
- **改"关于我"页面**：`src/pages/About.tsx`
- **访问量数字不显示**：不蒜子是免费公共服务，偶尔抽风，刷新或等等就好
- **想在本地看评论**：Giscus 在 localhost 也能用，配好 config.ts 就行
- **构建报错**：先 `npm install`，再 `npm run build` 看具体错误信息
