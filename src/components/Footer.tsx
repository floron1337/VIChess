import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='bg-black flex items-center justify-center text-white'>
            <div className='w-5/6 border-t-2 py-8 flex flex-col items-center max-xl:w-full max-xl:mx-4'>  
                <div className='flex gap-16 items-center max-lg:flex-col max-lg:gap-0'>
                    <div>
                        <Link href="/" className='flex gap-4 items-center ease hover:scale-105'>
                            <Image src={'/static/img/logo.png'} alt='logo' width={25} height={25}/>
                            <h1 className='text-white text-3xl font-bold'>VIChess</h1>
                        </Link>
                        <p className='text-white text-lg'>All rights reserved.</p>
                    </div>
                    <Link href="https://www.florinvenis.com/" target="_blank" className='flex flex-row gap-2 py-4 items-center hover:gap-8 ease'>
                        <div className='flex flex-row gap-2'>
                            <Image src='/static/img/fv_logo.png' alt="" width={60} height={60} />
                            <div className='flex flex-col text-white justify-center'>
                                <h3 className='text-2xl'>FLORIN VENIS</h3>
                                <h4 className="text-sm">PROFESSIONAL DEVELOPER</h4>
                            </div>
                        </div>
                        <ChevronRight className='size-12'/>
                    </Link>
                </div>
                <p className='text-center text-xs'>THIS WEBSITE IS AN EXAMPLE TO SERVE THE PERSONAL PORTFOLIO OF FLORIN VENIS. ALL BUSINESS DETAILS ARE FICTIONAL.</p>
            </div>
            
        </footer>
    )
}

export default Footer
