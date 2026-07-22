import { Link, useParams } from 'react-router'
import { ArrowLeft, CalendarDays, Tag } from 'lucide-react'
import { posts } from '@/data/posts'
import Markdown from '@/components/Markdown'
import PostCard from '@/components/PostCard'
import GiscusComments from '@/components/GiscusComments'

export default function PostDetail() {
  const { id } = useParams()
  const post = posts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h1 className="mb-4 text-2xl font-bold">文章不存在</h1>
        <Link to="/posts" className="text-primary hover:underline">
          返回文章列表
        </Link>
      </div>
    )
  }

  const related = posts.filter((p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t))).slice(0, 2)

  return (
    <div className="py-12">
      <Link
        to="/posts"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> 全部文章
      </Link>

      <header className="mb-10">
        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            {post.tags.map((t, i) => (
              <span key={t}>
                <Link to={`/posts?tag=${encodeURIComponent(t)}`} className="hover:text-primary">
                  {t}
                </Link>
                {i < post.tags.length - 1 && '、'}
              </span>
            ))}
          </span>
        </div>
      </header>

      <Markdown content={post.content} />

      {/* key 保证切换文章时评论区重新加载对应文章的讨论 */}
      <GiscusComments key={post.id} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-6 text-xl font-bold">相关阅读</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
