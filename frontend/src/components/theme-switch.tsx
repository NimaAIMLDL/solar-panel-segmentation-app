
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from './theme-provider'
import { Button } from './custom/button'
import { useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const color = theme === 'dark' ? '#111827' : '#ffffff'
    const meta = document.querySelector("meta[name='theme-color']")
    meta?.setAttribute('content', color)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
    </Button>
  )
}
