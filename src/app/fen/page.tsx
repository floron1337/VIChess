import React from 'react'
import Fen from './fen'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Enter Fen | VIChess",
    description: "Enter your game FEN for VIChess to analyze.",
};

const FenPage = () => {
  return (
    <Fen/>
  )
}

export default FenPage
