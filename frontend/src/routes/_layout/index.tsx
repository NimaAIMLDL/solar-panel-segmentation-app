import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_layout/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      {/* ─────── Project Overview ─────── */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Photovoltaic Panel Segmentation & Power Estimation
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This demo showcases an AI-powered system for detecting and analyzing photovoltaic (PV)
          panels in aerial imagery. It includes a deep learning segmentation app, visualization of
          PV-related metrics, and supporting project documentation.
        </p>
      </section>

      {/* ─────── Navigation Cards ─────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="PV Segmentation App"
          description="Run the deep learning model on aerial imagery and view segmentation results."
          href="/segmentation"
        />
        <DashboardCard
          title="Project Info"
          description="See details about the dataset, training, augmentation, and methodology."
          href="/project-info"
        />
        <DashboardCard
          title="About Me"
          description="Get to know the developer behind this project and find contact links."
          href="/about-me"
        />
      </section>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  href: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, href }) => (
  <Link
    to={href}
    className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md hover:border-blue-500 transition-all group"
  >
    <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{title}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
    <div className="flex items-center gap-1 text-blue-500 font-medium group-hover:underline">
      Go to {title} <ArrowRight className="w-4 h-4" />
    </div>
  </Link>
)

export default Dashboard
