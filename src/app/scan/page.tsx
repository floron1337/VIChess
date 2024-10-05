import React from 'react'
import { Metadata } from 'next';
import Scan from './scan';

export const metadata: Metadata = {
    title: "Scan Chessboard | VIChess",
    description: "Upload your game board images and let our advanced AI analyze your moves, offering real-time insights and strategies to help you improve your chess skills.",
};

export default function ScanPage(){
    return (
        <Scan/>
    )
}

