import { BookOpen, Cpu, Mail, Trophy } from 'lucide-react'
import { siteConfig } from '@/config'

export default function About() {
  return (
    <div className="py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">关于我</h1>
      <p className="mb-10 text-muted-foreground">一个正在路上的工科生。</p>

      <div className="space-y-5 leading-8 text-foreground/90">
        <p>
          你好，我是这个博客的作者，一名信息工程专业的大一学生。
          目前在啃 C++ 数据结构、大学物理和数学建模这三座大山，
          也在慢慢往嵌入式和芯片的方向摸索。
        </p>
        <p>
          我相信两件事：一是<strong>输出倒逼输入</strong>，写不出来的理解都是假理解；
          二是<strong>长期主义</strong>，每天进步一点点，一年后回头看会很吓人。
          这个博客就是这两件事的试验田。
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: BookOpen,
            title: '正在学习',
            items: ['C++ 数据结构与算法', '高等数学 / 大学物理', '凸优化与启发式算法'],
          },
          {
            icon: Cpu,
            title: '技术方向',
            items: ['嵌入式开发（Keil / STM32）', '数字 IC 与射频 IC（关注中）', 'NumPy 科学计算'],
          },
          {
            icon: Trophy,
            title: '正在打怪',
            items: ['全国大学生数学建模竞赛', '电子设计竞赛（智能小车）', '英语六级'],
          },
          {
            icon: Mail,
            title: '找到我',
            items: [`GitHub：${siteConfig.github.replace('https://github.com/', '@')}`, `邮箱：${siteConfig.email}`, '博客文章底部评论区'],
          },
        ].map(({ icon: Icon, title, items }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{title}</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground">
        想改这个页面的内容？直接编辑 <code className="rounded bg-muted px-1.5 py-0.5 font-mono">src/pages/About.tsx</code>；
        想加文章？在 <code className="rounded bg-muted px-1.5 py-0.5 font-mono">src/data/posts.ts</code> 里加一条数据就行。
      </div>
    </div>
  )
}
