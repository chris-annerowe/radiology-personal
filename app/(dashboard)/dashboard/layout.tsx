import React from 'react'

const Layout = ({children}:{children : React.ReactNode}) => {
  return (
    <div className='background-light850_dark100 relative'>
        {children}
    </div>
  )
}

export default Layout