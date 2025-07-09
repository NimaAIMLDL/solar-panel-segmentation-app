import { createFileRoute } from '@tanstack/react-router'
import ProjectInfoContent from '@/components/charts/ProjectInfoContent'

export const Route = createFileRoute('/_layout/project-info')({
  component: ProjectInfoPage,
})

function ProjectInfoPage() {
  return <ProjectInfoContent />
}

export default ProjectInfoPage
