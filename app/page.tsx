'use client'
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // const {theme, systemTheme, setTheme} = useTheme()
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  // const handleTheme = (theme:string) => {
  //   setTheme(theme)
  //   console.log("Redirecting")
  //   redirect('/sign-in')
  // }
  
  // const currentTheme = theme === 'system' ? systemTheme : theme
  return (
    redirect('/sign-in')
    // <div className="grid place-items-center h-screen">
    //   <div>
    //     <h1 className="text-7xl font-bold text-center">
    //       {currentTheme === 'dark' ? 'Dark' : 'Light'}{' '}
    //       <span className="text-purple-600">Mode</span>
    //     </h1>
    //     <p className="dark:text-purple-600 my-8 text-center">
    //       Click the button below to switch mode
    //     </p>
    //     <div className="flex justify-center">
    //       {currentTheme === 'dark' ? (
    //         <button
    //           className="bg-black-700 hover:bg-black w-28 rounded-md border-purple-400 border-2 p-4"
    //           onClick={() => setTheme('light')}
    //         >
    //           {' '}
    //           <Image src="/sun.svg" alt="logo" height={50} width={50} />
    //         </button>
    //       ) : (
    //         <button
    //           className="bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4 hover:bg-gray-300"
    //           onClick={() => handleTheme('dark')}
    //         >
    //           <Image src="/moon.svg" alt="logo" height={50} width={50} />
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
