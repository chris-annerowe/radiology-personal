import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react';
import ThemeSwitch from '@/components/themeSwitch';

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
        <ThemeSwitch/>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="/dashboard/daybook">
              Daybook
            </SidebarItem>
            <SidebarItem href="/dashboard/accessioning" >
              Accessioning
            </SidebarItem>
            <SidebarItem href="/dashboard/pos" >
              Payment
            </SidebarItem>
            <SidebarItem href="/dashboard/patient">
              Patient Management
            </SidebarItem>
            <SidebarItem href="/dashboard/studies" >
              Studies
            </SidebarItem>
            <SidebarItem href="/dashboard/admin" >
              Administration
            </SidebarItem>
            <SidebarItem href="/dashboard/configuration" >
              System Configuration
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </aside>
  )
}

export default Sidebar2