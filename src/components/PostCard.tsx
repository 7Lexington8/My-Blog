import { Link } from 'react-router'
import { CalendarDays, Pin } from 'lucide-react'
import type { Post } from '@/data/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/posts/${post.id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {post.pinned && (
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Pin className="h-3 w-3" /> 置顶
          </span>
        )}
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
        <CalendarDays className="h-3.5 w-3.5" />
        {post.date}
      </p>
    </Link>
  )
}
