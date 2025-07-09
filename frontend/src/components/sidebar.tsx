import SidebarNav from './SidebarNav'
import Logo from '@/assets/mylogo.png'

export default function Sidebar() {
  return (
    <aside className='fixed top-0 left-0 z-40 h-full w-56 border-r bg-background shadow-md'>
      <div className='flex items-center gap-2 h-[var(--header-height)] px-4 border-b'>
        <img src={Logo} className='h-10 object-contain' />
        <span className='text-xs font-bold'>PV Segmentation App</span>
      </div>
      <SidebarNav />
    </aside>
  )
}
