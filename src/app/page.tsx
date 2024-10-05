import { Focus, Github, PenTool, SquarePlus } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VIChess",
  description: "Upload your game board images and let our advanced AI analyze your moves, offering real-time insights and strategies to help you improve your chess skills.",
};

export default function Home() {
  return (
    <>
      <main className="flex justify-center items-center pb-16 bg-gradient-dark">
        <div className="w-2/3 flex gap-24 p-24 border-l-2 border-b-2 text-white items-center max-xl:w-auto max-lg:flex-col max-lg:p-8 max-xl:mx-4">
          <Image src='/static/img/logo.png' alt='logo' width={200} height={200}/>
          <div>
            <h1 className='text-5xl max-lg:text-3xl'>Welcome to VIChess</h1>
            <h3>Powered by Stockfish</h3>
            <br/>
            <p className='text-xl max-lg:text-base'>
              Upload your game board images and let our advanced AI analyze your moves,
              offering real-time insights and strategies to help you improve your chess skills. 
            </p>
            <br/>
            <div className='flex gap-8 max-2xl:flex-col'>
              <Link href="/scan" className='flex gap-4 items-center bg-cyan-600 px-4 py-2 rounded-2xl ease hover:bg-cyan-700'>
                <Focus className='size-20'/>
                <div>
                  <h1 className='text-2xl font-semibold'>SCAN BOARD</h1>
                  <p className='text-sm'>
                    Use your camera to analyze chess games
                  </p>
                </div>
              </Link>
              <Link href="/build" className='flex gap-4 items-center bg-board px-4 py-2 rounded-2xl ease hover:bg-board-hover'>
                <Image src={'/static/icons/chessboard.svg'} alt='chessboard' width={70} height={70}/>
                <div>
                  <h1 className='text-2xl font-semibold'>ANALYZE</h1>
                  <p className='text-sm'>
                    Build your board manually for analyis.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <section className="flex justify-center py-16 bg-gradient-dark text-white">
        <div className='w-2/3 flex gap-24 border-t-2 border-b-2 border-r-2 p-8 items-center max-xl:w-auto max-xl:mx-4 max-lg:flex-col-reverse max-lg:gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-4xl'>Scan and analyze games</h1>
            <br/>
            <p className='text-lg'>
              Upload your game board images and let our advanced AI analyze your moves,
              offering real-time insights and strategies to help you improve your chess skills. 
            </p>
            <br/>
            <div className='flex max-lg:justify-center'>
              <Link href="/scan" className='flex gap-4 items-center px-4 py-2 rounded-2xl ease border-2 hover:text-black hover:bg-white'>
                <Focus className='size-20'/>
                <div>
                  <h1 className='text-2xl font-semibold'>SCAN BOARD</h1>
                  <p className='text-sm'>
                    Use your camera to analyze chess games
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <Image src='/static/img/scan.jpg' alt='' width={800} height={800} className="w-1/2 max-lg:w-full"/>
        </div>
      </section>
      <section className="flex justify-center py-16 bg-gradient-dark text-white">
        <div className='w-2/3 flex gap-24 border-t-2 border-b-2 border-l-2 p-8 items-center max-xl:w-auto max-lg:flex-col max-xl:mx-4 max-lg:gap-4'>
          <Image src='/static/img/manual.jpg' alt='' width={800} height={800} className="w-1/2 max-lg:w-full"/>
          <div className='flex flex-col'>
            <h1 className='text-4xl'>Manually place pieces</h1>
            <br/>
            <p className='text-lg'>
              Manually build your chessboard for Stockfish, currently the best Chess Engine, to analyze. <br/>
              Use this tool to improve your chess game.
            </p>
            <br/>
            <div className='flex max-lg:justify-center'>
              <Link href="/build" className='flex gap-4 items-center bg-board px-4 py-2 rounded-2xl ease hover:bg-board-hover'>
                <Image src={'/static/icons/chessboard.svg'} alt='chessboard' width={60} height={60}/>
                <div>
                  <h1 className='text-2xl font-semibold'>MANUAL EDIT</h1>
                  <p className='text-sm'>
                    Manually place pieces to analyze chess pieces
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center py-16 bg-gradient-dark text-white">
        <div className='w-2/3 flex gap-24 border-t-2 border-b-2 border-r-2 p-8 items-center max-xl:w-auto max-xl:mx-4 max-lg:flex-col-reverse max-lg:gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-4xl'>Enter a FEN string</h1>
            <br/>
            <p className='text-lg'>
              Enter the FEN of your game for us to analyze. The FEN of a game is a code that encodes basic information about your position.
            </p>
            <br/>
            <div className='flex max-lg:justify-center'>
              <Link href="/fen" className='flex gap-4 items-center bg-cyan-600 px-4 py-2 rounded-2xl ease hover:bg-cyan-700'>
                <PenTool className='size-20'/>
                <div>
                  <h1 className='text-2xl font-semibold'>ENTER FEN</h1>
                  <p className='text-sm'>
                    Use a FEN string to analyze your game
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <Image src='/static/img/fen.jpg' alt='' width={800} height={800} className="w-1/2 max-lg:w-full"/>
        </div>
      </section>
      <section className="flex justify-center pb-16 bg-gradient-dark text-white">
        <div className='w-2/3 flex flex-col border-2 p-8 items-center max-xl:w-full max-xl:mx-4'>
          <h1 className='text-4xl font-semibold max-lg:text-xl'>Read the project documentation</h1>
          <p>VIChess is an open source project, free to use and improve. If you like my work, buy me a coffe :)</p>
          <br/>
          <div className='flex gap-8 max-lg:flex-col'>
            <Link href='/' className='text-white flex items-center text-xl gap-2 ease hover:bg-cyan-700 bg-cyan-600 px-8 py-2 rounded-2xl font-semibold'>
              GITHUB <Github />
            </Link>
            <Link href='/' className='text-white flex items-center text-xl gap-2 ease hover:bg-board-hover bg-board px-8 py-2 rounded-2xl font-semibold'>
              CONTRIBUTE <SquarePlus />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
