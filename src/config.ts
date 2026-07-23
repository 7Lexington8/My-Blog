// ============================================================
// 站点配置：你的个人信息都集中在这里，改完重新部署即可生效
// ============================================================

export const siteConfig = {
  // 站点名称（导航栏左上角）
  name: 'Lexington\'s Blog',
  // 页脚标语
  slogan: '学问笃实生光辉',
  // 你的链接
  github: 'https://github.com/7Lexington8', // ← 改成你的 GitHub 主页
  email: '2732558008@qq.com', //              ← 改成你的邮箱

  // ----------------------------------------------------------
  // 评论系统 Giscus 配置（评论数据存在你自己的 GitHub 仓库里）
  // 配置方法见 README.md 第 3 步，在 https://giscus.app/zh-CN 填写表单后，
  // 把生成的 4 个值粘贴到下面即可
  // ----------------------------------------------------------
  giscus: {
    repo: '7Lexington8/My-Blog',
    repoId: 'R_kgDOTgeidQ',
    category: 'General',
    categoryId: 'DIC_kwDOTgeidc4DBxbv',
  },
}
