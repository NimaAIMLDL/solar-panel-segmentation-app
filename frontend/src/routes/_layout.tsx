import { Outlet, createFileRoute } from '@tanstack/react-router'
import Sidebar from '@/components/sidebar'
import {
  AppLayoutContainer,
  AppHeader,
  AppBody,
  AppFooter,
} from '@/components/custom/AppLayoutContainer'
import ThemeSwitch from '@/components/theme-switch'

import GitHubIcon from '@/assets/github-icon.svg'

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="relative min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <AppLayoutContainer>
          <AppHeader className="flex justify-between items-center">
            <div className="text-sm font-bold text-muted-foreground truncate">
              PV Segmentation App
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/NimaAIMLDL/solar-panel-segmentation-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repo"
                className="hover:opacity-80 transition"
              >
                <img
                  src={GitHubIcon}
                  alt="GitHub"
                  className="w-5 h-5 dark:invert"
                />
              </a>
              <ThemeSwitch />
            </div>
          </AppHeader>
          <div className="flex-1 overflow-auto flex flex-col">
            <AppBody className="flex-1">
              <Outlet />
            </AppBody>
            <AppFooter />
          </div>
        </AppLayoutContainer>
      </div>
    </div>
  )
}
