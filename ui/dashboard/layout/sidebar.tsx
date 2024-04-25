import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex sidebar flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 '>
        <Link href='/patient'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
        >Patient</Link>
        <Link href='/daybook'>Daybook</Link>
        <Link href='/accessioning'>Accessioning</Link>
        <Link href='/studies'>Studies</Link>
        <Link href='/'>Administration</Link>  {/* TODO: not a link, open a submenu*/}
    </div>
  )
}

export default Sidebar