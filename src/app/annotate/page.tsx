import React from 'react'
import Annotate from './annotate'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Select Chessboard Corners | VIChess",
    description: "Select the chessboard corners for AI analysis before sending it to our servers.",
};


const AnnotatePage = () => {
    return (
        <Annotate/>
    )
}

export default AnnotatePage
