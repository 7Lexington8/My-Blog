import { Link } from 'react-router'
import { ArrowRight, Code2, Cpu, Sigma } from 'lucide-react'
import { posts, allTags } from '@/data/posts'
import PostCard from '@/components/PostCard'

export default function Home() {
  const sorted = [...posts].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1
    return b.date.localeCompare(a.date)
  })
  const latest = sorted.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <p className="mb-3 font-mono text-sm text-primary">$ whoami</p>
        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          随便记录杂感
          <br />
          与学习心得。
        </h1>
        <p className="mb-8 max-w-xl leading-relaxed text-muted-foreground">
          这里是我的个人博客，记录了我在学习和生活方面的一些心得体会和经验分享。希望能对你有所帮助，也欢迎交流与讨论。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            阅读文章 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            关于我
          </Link>
        </div>
      </section>

      {/* 方向标签 */}
      <section className="grid gap-4 pb-12 sm:grid-cols-3">
        {[
          { icon: Code2, title: 'C++ / 编程', desc: '指针、内存与底层机制' },
          { icon: Cpu, title: '嵌入式', desc: 'Keil、智能小车与电赛' },
          { icon: Sigma, title: '数学建模', desc: '优化算法与论文复盘' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5">
            <Icon className="mb-3 h-6 w-6 text-primary" />
            <h3 className="mb-1 font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>

      {/* 最新文章 */}
      <section className="pb-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">最新文章</h2>
          <Link to="/posts" className="flex items-center gap-1 text-sm text-primary hover:underline">
            全部 {posts.length} 篇 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {latest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 标签云 */}
      <section className="pb-16">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">标签</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Link
              key={tag}
              to={`/posts?tag=${encodeURIComponent(tag)}`}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              # {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
