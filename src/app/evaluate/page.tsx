import React, { Suspense } from 'react'
import Evaluation from './evaluation'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Stockfish Game Evaluation | VIChess",
  description: "Given a Chess game, VIChess uses Stockfish to analyze and evaluate positions, giving you the best move you can make at any point in the game. Use VIChess responsibly, only to better your skills.",
};

const EvaluationPage = () => {
    return (
      <Suspense>
        <Evaluation/>
      </Suspense>
    )
}

export default EvaluationPage
