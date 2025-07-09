import { createFileRoute } from '@tanstack/react-router'
import AboutMeContent from '@/components/charts/AboutMeContent'

export const Route = createFileRoute('/_layout/about-me')({
  component: AboutMePage,
})

function AboutMePage() {
  return <AboutMeContent />
}

export default AboutMePage
