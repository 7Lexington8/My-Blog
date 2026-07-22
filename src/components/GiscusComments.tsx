import { useEffect, useRef } from 'react'
import { MessageSquare, Settings } from 'lucide-react'
import { siteConfig } from '@/config'

// Giscus 评论组件：评论数据存储在你自己的 GitHub 仓库 Discussions 中
// 未配置时显示设置引导，配置后自动加载真实评论区
export default function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const g = siteConfig.giscus
  const configured = Boolean(g.repo && g.repoId && g.categoryId)

  useEffect(() => {
    if (!configured || !containerRef.current) return
    const container = containerRef.current
    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', g.repo)
    script.setAttribute('data-repo-id', g.repoId)
    script.setAttribute('data-category', g.category)
    script.setAttribute('data-category-id', g.categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute(
      'data-theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    )
    script.setAttribute('data-lang', 'zh-CN')
    container.appendChild(script)
  }, [configured, g.repo, g.repoId, g.category, g.categoryId])

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
        <MessageSquare className="h-5 w-5 text-primary" />
        评论
      </h2>

      {configured ? (
        <div ref={containerRef} className="giscus" />
      ) : (
        <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground">
          <p className="mb-2 flex items-center gap-2 font-medium text-foreground">
            <Settings className="h-4 w-4 text-primary" />
            评论区尚未激活（一次性配置，约 5 分钟）
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>把代码推送到你自己的 GitHub 公开仓库</li>
            <li>
              打开{' '}
              <a href="https://giscus.app/zh-CN" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
                giscus.app
              </a>
              ，按页面指引填写仓库信息
            </li>
            <li>把生成的 repo、repoId、categoryId 填进 <code className="rounded bg-muted px-1 font-mono">src/config.ts</code></li>
            <li>重新部署，评论区自动出现（数据在你自己的仓库里）</li>
          </ol>
        </div>
      )}
    </section>
  )
}
