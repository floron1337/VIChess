import React from 'react'
import Build from './build'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Manually place pieces | VIChess",
    description: "Place Chess pieces manually and send the game to Stockfish for analysis.",
};

const BuildPage = () => {
    return (
        <Build/>
    )
}

export default BuildPage
