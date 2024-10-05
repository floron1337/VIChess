'use client'
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { Focus, PenTool, Play } from 'lucide-react';
import { validateFen } from 'chess.js';
import { useRouter } from 'next/navigation';

const Fen = () => {
    const router = useRouter()
    const [fenPosition, setFenPosition] = useState('');

    const handleEvaluateButtonClick = () => {
        const {
            ok
        } = validateFen(fenPosition);

        if(ok)
            router.push(`/evaluate?fen=${fenPosition.replaceAll(' ', '_')}`)
        else
            alert('Current position is invalid!')
    }
    
    return (
        <main className="flex justify-center pb-16 bg-gradient-dark flex-1">
            <div className="w-2/3 flex gap-24 p-24 border-l-2 border-b-2 text-white items-center max-lg:w-auto max-lg:flex-col max-lg:p-8">
                <PenTool className='size-[16rem] max-md:hidden'/>
                <div>
                    <h1 className='text-5xl max-lg:text-3xl'>Enter the FEN of your game</h1>
                    <h3>FEN stands for Forsyth–Edwards Notation</h3>
                    <br/>
                    <p className='text-xl max-lg:text-base'>
                        Get started analysing games by entering the FEN Code of your game.
                    </p>
                    <br/>
                    <div className='flex flex-col gap-8'>
                        <input value={fenPosition} onChange={(e: { target: { value: any; }; })=>setFenPosition(e.target.value)} className='max-lg:flex-auto h-8 rounded px-2 text-black'></input>
                        <button 
                        onClick={handleEvaluateButtonClick}
                        className='mx-auto w-auto border-2 text-white px-4 py-2 rounded-2xl flex items-center gap-2 hover:gap-3 ease hover:text-black hover:bg-white'
                        >
                        <div className='flex flex-col items-start'>
                            <h1 className='text-3xl font-semibold'>Start Analysis</h1>
                            <p>Let Stockfish do its magic.</p>
                        </div>
                        <Play className='size-16'/>
                    </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Fen
