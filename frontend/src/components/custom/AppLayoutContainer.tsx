import * as React from 'react'
import { cn } from '@/lib/utils'

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AppLayoutContainer = ({ className, ...props }: LayoutProps) => {
  return (
    <div
      className={cn('flex flex-col min-h-screen bg-background text-foreground', className)}
      {...props}
    />
  )
}

export const AppHeader = ({ className, ...props }: LayoutProps) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-14 flex items-center justify-between px-6 bg-background shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export const AppBody = ({ className, ...props }: LayoutProps) => {
  return (
    <main
      className={cn('flex-1 pt-4 px-4 py-6 md:px-8', className)}
      {...props}
    />
  )
}

export const AppFooter = () => (
  <footer className='w-full text-center text-sm text-muted-foreground py-4 border-t mt-4'>
    © 2025 PV Segmentation App ·{' '}
    <a
      href='https://github.com/NimaAIMLDL/solar-panel-segmentation-app'
      className='underline'
      target='_blank'
      rel='noreferrer'
    >
      View Source on GitHub
    </a>
  </footer>
)
