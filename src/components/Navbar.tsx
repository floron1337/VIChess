"use client"
import { Focus, Github, Home, LogIn, Menu, PenTool, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const pathname = usePathname()
    const [expandedMenu, setExpandedMenu] = useState(false)

    return (
        <nav className={`bg-neutral-950 py-2 px-16 flex justify-between items-center border-b ${expandedMenu && 'flex-col'}`}>
            <Link href="/" className='flex gap-4 items-center ease hover:scale-105'>
                <Image src={'/static/img/logo.png'} alt='logo' width={25} height={25}/>
                <h1 className='text-white text-3xl font-bold'>VIChess</h1>
            </Link>

            {!expandedMenu && <button className='text-white hidden max-xl:flex' onClick={()=>setExpandedMenu(true)}><Menu className='size-12'/></button>}
            
            {expandedMenu && 
                <div className='text-white flex-col items-start gap-8 mt-8 hidden max-xl:flex'>
                    <Link href='/' className='flex gap-2 items-center ease hover:scale-105'><Home/> HOME</Link>
                    <Link href='/scan' className='flex gap-2 items-center ease hover:scale-105'><Focus />SCAN</Link>
                    <Link href='/build' className='flex gap-2 items-center ease hover:scale-105'><Image src={'/static/icons/chessboard.svg'} alt='chessboard' width={20} height={20}/>BUILD BOARD</Link>
                    <Link href='/fen' className='flex gap-2 items-center ease hover:scale-105'><PenTool />ENTER FEN</Link>
                    <Link target='_blank' href='https://github.com/floron1337/VIChess/blob/main/README.md' className='text-white flex items-center text-xl gap-2 ease bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-2xl font-semibold'>
                        PROJECT GIT <Github />
                    </Link>
                    <button className='ml-auto mr-auto' onClick={()=>setExpandedMenu(false)}><X className='size-12'/></button>
                </div>
            }
            
            <div className='text-white gap-16 flex items-center text-xl max-xl:gap-6 max-xl:hidden'>
                <Link href='/' className='flex gap-2 items-center ease hover:scale-105'><Home/> HOME</Link>
                <Link href='/scan' className='flex gap-2 items-center ease hover:scale-105'><Focus />SCAN</Link>
                <Link href='/build' className='flex gap-2 items-center ease hover:scale-105'><Image src={'/static/icons/chessboard.svg'} alt='chessboard' width={20} height={20}/>BUILD BOARD</Link>
                <Link href='/fen' className='flex gap-2 items-center ease hover:scale-105'><PenTool />ENTER FEN</Link>
            </div>
            <Link target='_blank' href='https://github.com/floron1337/VIChess/blob/main/README.md' className='text-white flex items-center text-xl gap-2 ease bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-2xl font-semibold max-xl:hidden'>
                PROJECT GIT <Github />
            </Link>
        </nav>
    )
}

export default Navbar
