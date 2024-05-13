import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react';

const Sidebar1 = () => {
  return (
    <div className='flex sidebar flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 '>
      <Link href='/patient'
        className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
      >
        {/* <Image src='/favicon.ico'
            width={23}
            height={23}
            alt="DevFlow"
          /> */}
        Patient
      </Link>
      <Link href='/daybook'
        className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Daybook</Link>
      <Link href='/accessioning'
        className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Accessioning</Link>
      <Link href='/studies'
        className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Studies</Link>
      <Link href='/'
        className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Administration</Link>  {/* TODO: not a link, open a submenu*/}
    </div>
  )
}

const Sidebar2 = () => {
  return (
    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <Sidebar className='h-screen' aria-label="Default sidebar example">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="/dashboard/patient">
              Patient
            </SidebarItem>
            <SidebarItem href="/daybook">
              Daybook
            </SidebarItem>
            <SidebarItem href="/accessioning" >
              Accessioning
            </SidebarItem>
            <SidebarItem href="/studies" >
              Studies
            </SidebarItem>
            <SidebarItem href="/dashboard/configuration" >
              Configuration
            </SidebarItem>
            <SidebarItem href="/" >
              Administration
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </aside>
  )
}

export default Sidebar2