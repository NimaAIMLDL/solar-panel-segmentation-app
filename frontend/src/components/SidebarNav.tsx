import { Link, useMatchRoute } from '@tanstack/react-router'
import { LayoutGrid, Brain, Info, User } from 'lucide-react'

const links = [
  { title: 'Home', href: '/', icon: <LayoutGrid /> },
  { title: 'PV Segmentation', href: '/segmentation', icon: <Brain /> },
  { title: 'Project Info', href: '/project-info', icon: <Info /> },
  { title: 'About Me', href: '/about-me', icon: <User /> },
]

export default function SidebarNav() {
  const matchRoute = useMatchRoute()

  return (
    <nav className='flex flex-col gap-4 px-4 pt-6'>
      {links.map(({ href, title, icon }) => {
        const isActive = matchRoute({ to: href!, pending: false }) !== false

        return (
          <Link
            key={href}
            to={href}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground ${
              isActive ? 'bg-accent text-accent-foreground font-semibold' : ''
            }`}
          >
            {icon}
            {title}
          </Link>
        )
      })}
    </nav>
  )
}
