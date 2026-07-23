import { BookOpen, Cpu, Mail, Trophy } from 'lucide-react'
import { siteConfig } from '@/config'

export default function About() {
  return (
    <div className="py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">关于我</h1>
      <p className="mb-10 text-muted-foreground"></p>

      <div className="space-y-5 leading-8 text-foreground/90">
        <p>
          你好，我是这个博客的作者。建这个Blog主要是记录一些想法、累积一些知识.
          
        </p>
        <p>
          目前还是苦命的通信大二，你车信院最痛苦的一年......
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: BookOpen,
            title: '正在学习',
            items: ['AI算法与系统', '数电模电', '复变概统'],
          },
          {
            icon: Cpu,
            title: '技术愿景',
            items: ['数字IC（观望中）', 'AI芯片', '嵌入式'],
          },
          {
            icon: Trophy,
            title: '竞赛愿景',
            items: ['电赛', '数模', '大英赛'],
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
        止于至善 <code className="rounded bg-muted px-1.5 py-0.5 font-mono"></code>；
         <code className="rounded bg-muted px-1.5 py-0.5 font-mono"></code> 。
      </div>
    </div>
  )
}
