import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Activity, Moon, Sun, Menu, X, Github, Rss, TerminalSquare } from 'lucide-react'
import { siteConfig } from '@/config'

const navItems = [
  { to: '/', label: '首页' },
  { to: '/posts', label: '文章' },
  { to: '/about', label: '关于' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TerminalSquare className="h-5 w-5" />
            </span>
            <span className="text-lg">{siteConfig.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => setDark((d) => !d)}
              className="ml-2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="切换主题"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>

          <div className="flex items-center gap-1 sm:hidden">
            <button
              onClick={() => setDark((d) => !d)}
              className="rounded-md p-2 text-muted-foreground"
              aria-label="切换主题"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-md p-2 text-muted-foreground"
              aria-label="菜单"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border/60 px-4 py-2 sm:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm ${
                    isActive ? 'bg-accent font-medium' : 'text-muted-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6">{children}</main>

      <footer className="mt-20 border-t border-border/60">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>
            © 2026 {siteConfig.name} · {siteConfig.slogan}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <span className="flex items-center gap-1">
              <Rss className="h-4 w-4" /> 持续更新中
            </span>
            {/* 不蒜子自动填充下面两个数字 */}
            <span id="busuanzi_container_site_pv" className="flex items-center gap-1">
              <Activity className="h-4 w-4" /> 总访问 <span id="busuanzi_value_site_pv">…</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
