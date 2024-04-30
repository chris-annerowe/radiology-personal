import React from 'react'

const Layout = ({children}:{children : React.ReactNode}) => {
  return (
    <div className='h-screen background-light850_dark100 relative'>
        {children}
    </div>
  )
}

export default Layout