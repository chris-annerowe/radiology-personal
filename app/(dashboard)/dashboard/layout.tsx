import ThemeSwitch from '@/components/themeSwitch'
import Sidebar from '@/ui/dashboard/layout/sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen background-light850_dark100 relative'>
      <Sidebar />
      <div className="p-4 pt-16 sm:ml-64">
        {children}
      </div>
    </div>
  )
}

export default Layout