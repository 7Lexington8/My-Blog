import { useMemo } from 'react'
import type { ReactNode } from 'react'

// 轻量 Markdown 渲染器：支持标题、代码块、列表、引用、分割线、段落
// 行内支持 **加粗** *斜体* `代码` [链接](url)

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // 依次匹配 链接 / 加粗 / 斜体 / 行内代码
  const pattern = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    const key = `${keyPrefix}-${i++}`
    if (m[1]) {
      nodes.push(
        <a key={key} href={m[3]} target="_blank" rel="noreferrer"
          className="text-primary underline underline-offset-4 hover:opacity-80">
          {m[2]}
        </a>,
      )
    } else if (m[4]) {
      nodes.push(<strong key={key} className="font-semibold text-foreground">{m[5]}</strong>)
    } else if (m[6]) {
      nodes.push(<em key={key}>{m[7]}</em>)
    } else if (m[8]) {
      nodes.push(
        <code key={key} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          {m[9]}
        </code>,
      )
    }
    last = pattern.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function Markdown({ content }: { content: string }) {
  const blocks = useMemo(() => {
    const lines = content.split('\n')
    const out: ReactNode[] = []
    let i = 0
    let key = 0
    while (i < lines.length) {
      const line = lines[i]

      // 代码块
      if (line.trim().startsWith('```')) {
        const lang = line.trim().slice(3)
        const buf: string[] = []
        i++
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          buf.push(lines[i])
          i++
        }
        i++
        out.push(
          <div key={key++} className="group relative my-5 overflow-hidden rounded-xl border border-border bg-zinc-950 dark:bg-zinc-900">
            {lang && (
              <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">{lang}</div>
            )}
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
              <code>{buf.join('\n')}</code>
            </pre>
          </div>,
        )
        continue
      }

      // 标题
      const h3 = line.match(/^###\s+(.*)/)
      const h2 = line.match(/^##\s+(.*)/)
      if (h2) {
        out.push(
          <h2 key={key++} className="mt-10 mb-4 border-b border-border pb-2 text-2xl font-bold tracking-tight">
            {renderInline(h2[1], `h2-${key}`)}
          </h2>,
        )
        i++
        continue
      }
      if (h3) {
        out.push(
          <h3 key={key++} className="mt-8 mb-3 text-xl font-semibold tracking-tight">
            {renderInline(h3[1], `h3-${key}`)}
          </h3>,
        )
        i++
        continue
      }

      // 分割线
      if (/^---+\s*$/.test(line.trim())) {
        out.push(<hr key={key++} className="my-8 border-border" />)
        i++
        continue
      }

      // 引用
      if (line.trim().startsWith('>')) {
        const buf: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          buf.push(lines[i].trim().replace(/^>\s?/, ''))
          i++
        }
        out.push(
          <blockquote key={key++} className="my-5 border-l-4 border-primary/60 bg-muted/50 px-4 py-3 italic text-muted-foreground rounded-r-lg">
            {renderInline(buf.join(' '), `q-${key}`)}
          </blockquote>,
        )
        continue
      }

      // 有序列表
      if (/^\s*\d+\.\s+/.test(line)) {
        const items: string[] = []
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*\d+\.\s+/, ''))
          i++
        }
        out.push(
          <ol key={key++} className="my-4 list-decimal space-y-2 pl-6">
            {items.map((it, j) => (
              <li key={j}>{renderInline(it, `ol-${key}-${j}`)}</li>
            ))}
          </ol>,
        )
        continue
      }

      // 无序列表
      if (/^\s*-\s+/.test(line)) {
        const items: string[] = []
        while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*-\s+/, ''))
          i++
        }
        out.push(
          <ul key={key++} className="my-4 list-disc space-y-2 pl-6 marker:text-primary">
            {items.map((it, j) => (
              <li key={j}>{renderInline(it, `ul-${key}-${j}`)}</li>
            ))}
          </ul>,
        )
        continue
      }

      // 空行
      if (line.trim() === '') {
        i++
        continue
      }

      // 段落（聚合连续非空行）
      const buf: string[] = []
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        !lines[i].trim().startsWith('#') &&
        !lines[i].trim().startsWith('>') &&
        !lines[i].trim().startsWith('```') &&
        !/^\s*[-\d]/.test(lines[i])
      ) {
        buf.push(lines[i].trim())
        i++
      }
      out.push(
        <p key={key++} className="my-4 leading-8 text-foreground/90">
          {renderInline(buf.join(' '), `p-${key}`)}
        </p>,
      )
    }
    return out
  }, [content])

  return <article className="text-[15px] sm:text-base">{blocks}</article>
}
