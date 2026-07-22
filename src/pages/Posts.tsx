import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Search } from 'lucide-react'
import { posts, allTags } from '@/data/posts'
import PostCard from '@/components/PostCard'

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag') ?? ''
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...posts]
      .sort((a, b) => {
        if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1
        return b.date.localeCompare(a.date)
      })
      .filter((p) => {
        const tagOk = !activeTag || p.tags.includes(activeTag)
        const qOk =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
        return tagOk && qOk
      })
  }, [activeTag, query])

  const toggleTag = (tag: string) => {
    if (tag === activeTag) {
      searchParams.delete('tag')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ tag })
    }
  }

  return (
    <div className="py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">全部文章</h1>
      <p className="mb-8 text-muted-foreground">共 {posts.length} 篇，持续更新。</p>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题或正文…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                tag === activeTag
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
            >
              # {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-muted-foreground">没有找到匹配的文章，换个关键词试试。</p>
      )}
    </div>
  )
}
