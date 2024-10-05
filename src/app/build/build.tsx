'use client'
import { Chess, Square, validateFen, PieceSymbol, Color } from 'chess.js';
import { Check, FlipVertical2, Play, RotateCcw, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { Chessboard, ChessboardDnDProvider, SparePiece } from 'react-chessboard'
import { Piece as ReactChessboardPiece } from 'react-chessboard/dist/chessboard/types';

const Build = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryFen = searchParams.get('fen')?.replaceAll('_', ' ')

    //const game = useMemo(() => new Chess(queryFen && validateFen(queryFen) ? queryFen : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), []);
    const game = useMemo(() => new Chess(), []);
    if(queryFen){
        game.load(queryFen, {skipValidation: true})
    }

    const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
    const [fenPosition, setFenPosition] = useState(game.fen());
    const [boardWidth, setBoardWidth] = useState(360);
    const [startingColor, setStartingColor] = useState(game.turn())

    const getPieceType = (piece: ReactChessboardPiece) => {
        return piece[1].toLowerCase() as PieceSymbol
    }

    const getPieceColor = (piece: ReactChessboardPiece) => {
        return piece[0].toLowerCase() as Color
    }

    const handleSparePieceDrop = (piece: ReactChessboardPiece, targetSquare: Square) => {
        const type = getPieceType(piece)
        const color = getPieceColor(piece)

        const success = game.put({
          type,
          color
        }, targetSquare);
        if (success) {
          setFenPosition(game.fen());
        } else {
          alert(`The board already contains ${color === "w" ? "WHITE" : "BLACK"} KING`);
        }
        return success;
    };

    const handlePieceDrop = (sourceSquare: Square, targetSquare: Square, piece: ReactChessboardPiece) => {
        const type = getPieceType(piece)
        const color = getPieceColor(piece)

        // this is hack to avoid chess.js bug, which I've fixed in the latest version https://github.com/jhlywa/chess.js/pull/426
        game.remove(sourceSquare);
        game.remove(targetSquare);
        const success = game.put({
          type,
          color
        }, targetSquare);
        if (success) setFenPosition(game.fen());
        return success;
    }

    const handlePieceDropOffBoard = (sourceSquare: Square) => {
        game.remove(sourceSquare);
        setFenPosition(game.fen());
    };

    const handleFenInputChange = (e: { target: { value: any; }; }) => {
        const fen = e.target.value;
        const {
          ok
        } = validateFen(fen);
        setFenPosition(fen);

        if (ok) {
          game.load(fen);
          setFenPosition(game.fen());
        }
    };

    const handleEvaluateButtonClick = () => {
        const {
            ok
        } = validateFen(fenPosition);

        if(ok)
            router.push(`/evaluate?fen=${fenPosition.replaceAll(' ', '_')}`)
        else
            alert('Current position is invalid!')
    }

    const setStartingColorFEN = (color: Color) => {
        const currentFen = fenPosition
        const fenParts = currentFen.split(' ')
        fenParts[1] = color
        setFenPosition(fenParts.join(' '))
        setStartingColor(color)
    }

    const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

    return (
        <main className='flex flex-col items-center justify-center flex-1 bg-gradient-dark max-lg:pt-8'>
            <div className='w-[30vw] max-lg:w-[80vw] py-8'>
                <ChessboardDnDProvider>
                    <div className='flex gap-4 justify-center bg-white rounded-t-2xl'>
                        {pieces.slice(6, 12).map(
                            piece => <SparePiece key={piece} piece={piece as ReactChessboardPiece} width={boardWidth / 8} dndId="ManualBoardEditor" />
                        )}
                    </div>
                    <Chessboard 
                        onBoardWidthChange={setBoardWidth} 
                        id="ManualBoardEditor" 
                        boardOrientation={boardOrientation} 
                        position={game.fen()} 
                        onSparePieceDrop={handleSparePieceDrop} 
                        onPieceDrop={handlePieceDrop} 
                        onPieceDropOffBoard={handlePieceDropOffBoard} 
                        dropOffBoardAction="trash" 
                    />
                    <div className='flex gap-4 justify-center bg-black rounded-b-2xl'>
                        {pieces.slice(0, 6).map(
                            piece => <SparePiece key={piece} piece={piece as ReactChessboardPiece} width={boardWidth / 8} dndId="ManualBoardEditor" />
                        )}
                    </div>
                    <br/>
                    <div className='text-white flex gap-4 items-center justify-center max-lg:flex-col'>
                        <div className='flex items-center justify-center bg-board px-4 py-2 rounded-2xl gap-2 max-lg:w-full'>
                            <h3 className='text-sm text-white'>Starting Color</h3>
                            <div className='flex gap-2'>
                                <button onClick={() => setStartingColorFEN('w')} className='w-10 h-10 bg-white rounded-xl flex items-center justify-center'><Check className={`text-black ease ${startingColor !== 'w' && 'opacity-0'}`}/></button>
                                <button onClick={() => setStartingColorFEN('b')} className='w-10 h-10 bg-black rounded-xl flex items-center justify-center'><Check className={`text-white ease ${startingColor !== 'b' && 'opacity-0'}`}/></button>
                            </div>
                        </div>
                        <button className='bg-cyan-600 hover:bg-cyan-700 ease px-4 py-2 rounded-2xl flex gap-2 justify-center items-center text-sm max-lg:w-full' onClick={() => {
                            game.reset();
                            setFenPosition(game.fen());
                            }}>
                                Start position <RotateCcw />
                        </button>
                        <button className='bg-cyan-600 hover:bg-cyan-700 ease px-4 py-2 rounded-2xl flex gap-2 justify-center items-center text-sm max-lg:w-full' onClick={() => {
                            setBoardOrientation(boardOrientation === "white" ? "black" : "white");
                        }}>
                            Flip board <FlipVertical2 />
                        </button>
                        <button className='bg-red-600 hover:bg-red-700 ease px-4 py-2 rounded-2xl flex gap-2 justify-center items-center text-sm max-lg:w-full' onClick={() => {
                            game.clear();
                            setFenPosition(game.fen());
                        }}>
                            Clear board <Trash2 />
                        </button>
                    </div>
                    <br/>
                    <h2 className='text-white text-3xl'>Your game FEN</h2>
                    <input value={fenPosition} onChange={handleFenInputChange} placeholder="Paste FEN position to start editing" className='w-full max-lg:flex-auto h-8 rounded px-2'/>
                    <br/><br/>
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
                    <p className='text-xs text-white text-center'>NOTE: VIChess uses your device resources to calculate the best moves.</p>
                </ChessboardDnDProvider>
            </div>
        </main>
    )
}

export default Build
