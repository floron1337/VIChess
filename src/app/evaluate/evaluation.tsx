'use client'
import { Progress } from '@/components/ui/progress'
import Engine from '@/components/utils/engine'
import { Chess, Move, Square, validateFen } from 'chess.js'
import { ChevronLeft, ChevronRight, Cog, FlipVertical2, RotateCcw, History, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { Chessboard, ChessboardDnDProvider } from 'react-chessboard'
import { Arrow, Piece as ReactChessboardPiece } from 'react-chessboard/dist/chessboard/types';
import Image from 'next/image'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Evaluation = () => {
  const searchParams = useSearchParams()
  const initialFen = searchParams.get('fen')?.replaceAll('_', ' ')
  const router = useRouter()

  if(!initialFen || validateFen(initialFen).ok !== true){
    router.back()
  }

  const engine = useMemo(() => new Engine(), []);
  const game = useMemo(() => new Chess(initialFen), []);
  const [chessBoardPosition, setChessBoardPosition] = useState(game.fen());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const [positionEvaluation, setPositionEvaluation] = useState(0);
  const [depth, setDepth] = useState(10);
  const [bestLine, setBestline] = useState("");
  const [possibleMate, setPossibleMate] = useState("");
  const [gameHistory, setGameHistory] = useState<Move[]>([])
  const [currentMove, setCurrentMove] = useState(0)

  function convertCentipawnToScore(centipawnAdvantage: number, turn: string) {
    // Define thresholds
    const centipawnThreshold = 1000; // Beyond this value, the game is essentially won/lost

    // Adjust centipawn based on who's to move
    const adjustedCentipawn = turn === 'w' ? centipawnAdvantage : -centipawnAdvantage;

    // Handle large values (e.g., checkmate in evaluations)
    if (adjustedCentipawn >= centipawnThreshold) {
        return 100; // The player to move has a decisive advantage
    } else if (adjustedCentipawn <= -centipawnThreshold) {
        return 0; // The opponent has a decisive advantage
    }

    // Normalize centipawn to a 0-100 scale
    const score = (adjustedCentipawn + centipawnThreshold) / (2 * centipawnThreshold) * 100;

    // Ensure the score is within the expected range
    return Math.max(0, Math.min(100, score));
  }

  function findBestMove() {
      engine.evaluatePosition(chessBoardPosition, 18);
      engine.onMessage(({
        positionEvaluation,
        possibleMate,
        pv,
        depth
      }) => {
        if (depth && depth < 10) return;
        positionEvaluation && setPositionEvaluation(convertCentipawnToScore(Number(positionEvaluation), game.turn()));
        possibleMate && setPossibleMate(possibleMate);
        depth && setDepth(depth);
        pv && setBestline(pv);
      });
    }
    
    function onDrop(sourceSquare: Square, targetSquare: Square, piece: ReactChessboardPiece) {
      try{
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q"
        });
        setPossibleMate("");
        setChessBoardPosition(game.fen());
        
        // illegal move
        if (move === null) return false;

        if(currentMove == gameHistory.length)
          setGameHistory([...gameHistory, move])
        else
          setGameHistory([...gameHistory.slice(0, currentMove + 1), move])

        setCurrentMove(currentMove + 1)

        engine.stop();
        setBestline("");
        if (game.isGameOver() || game.isDraw()) return false;
        return true;
      }catch(err){
        return false;
      }
    }
    useEffect(() => {
      if (!game.isGameOver() || !game.isDraw()) {
        findBestMove();
      }
    }, [chessBoardPosition]);
    const bestMove = bestLine?.split(" ")?.[0];

    const handleForwardButton = () => {
      try{
        const move = game.move(bestMove);
        setPossibleMate("");
        setChessBoardPosition(game.fen());

        // illegal move
        if (move === null) return false;
        if(currentMove == gameHistory.length)
          setGameHistory([...gameHistory, move])
        else
          setGameHistory([...gameHistory.slice(0, currentMove + 1), move])

        setCurrentMove(currentMove + 1)

        engine.stop();
        setBestline("");
        if (game.isGameOver() || game.isDraw()) return false;
        return true;
      }catch(err){
        return false;
      }
    }

    const handleBackButton = () => {
      game.undo()
      setPossibleMate("");
      setChessBoardPosition(game.fen());
    }

    const updateGameFen = (newFen : string) => {
      game.load(newFen)
      setChessBoardPosition(game.fen())
    }

    const handleReturnButton = () => {
      router.push(`/build?fen=${game.fen().replaceAll(' ', '_')}`)
    }

    const revertToMove = (moveIndex: number) => {
      updateGameFen(gameHistory[moveIndex].after)
      setCurrentMove(moveIndex)
    }

    return (
        <main className='flex flex-row items-center justify-center flex-1 bg-gradient-dark max-lg:pt-8'>
            <div className='w-full py-8 max-md:py-0'>
                <Dialog>
                  <DialogTrigger className='w-full items-center justify-center mb-4 hidden max-md:flex'>
                    <button className='bg-cyan-600 text-white flex gap-2 px-4 py-2 rounded-2xl hover:bg-cyan-700 ease'>
                      Move History
                      <History />
                    </button>
                  </DialogTrigger>
                  <DialogContent className='min-h-20'>
                    <DialogHeader className='flex w-full justify-center h-[12.5vh]'>
                      <DialogTitle>Move History</DialogTitle>
                    </DialogHeader>
                    <div className='overflow-y-auto justify-center inline-flex flex-wrap gap-4 mt-4 h-[70vh]'>
                    {window.innerWidth < 768 && gameHistory.map((move, index)=>
                      <button key={index} className={`text-white flex flex-col items-center cursor-pointer ${index > currentMove && 'opacity-30'}`} onClick={() => revertToMove(index)}>
                        <div className='w-36'>
                          <Chessboard position={move.after} arePiecesDraggable={false} customArrows={[[move.from as Square, move.to as Square, "rgb(8, 145, 178)"]]}/>
                        </div>
                        {`${index + 1}. ${move.san}`}
                      </button>  
                    )}
                    </div>
                    <DialogFooter className='h-[12.5vh] pb-4'>
                      <DialogClose className=''>
                        <button className='text-white px-8 py-2 border rounded-2xl hover:bg-white hover:text-black ease'>
                          <X/>
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <ChessboardDnDProvider>
                    <div className='flex gap-4 items-center justify-center'>
                      <div className='w-[30vw] flex justify-end max-md:w-[5vw]'>
                        <Progress orientation='vertical' className='h-[30vw] max-lg:h-[85vw]' value={positionEvaluation}/>
                      </div>
                      <div className='w-[30vw] max-md:w-[85vw]'>
                        <Chessboard 
                            position={chessBoardPosition}
                            onPieceDrop={onDrop}
                            boardOrientation={boardOrientation}
                            customArrows={bestMove ? [[(bestMove.substring(0, 2) as Square), (bestMove.substring(2, 4) as Square), "rgb(8, 145, 178)"]] : undefined}
                        />
                      </div>
                      <div className='w-[30vw] h-[30vw] bg-black p-8 flex flex-col max-md:hidden'>
                        <h1 className='text-white text-3xl'>Move History</h1>
                        <div className='overflow-y-auto inline-flex flex-wrap gap-4 mt-4'>
                          {window.innerWidth >= 768 && gameHistory.map((move, index)=>
                            <button key={index} className={`text-white flex flex-col items-center cursor-pointer ${index > currentMove && 'opacity-30'}`} onClick={() => revertToMove(index)}>
                              <div className='w-36'>
                                <Chessboard position={move.after} arePiecesDraggable={false} customArrows={[[move.from as Square, move.to as Square, "rgb(8, 145, 178)"]]}/>
                              </div>
                              {`${index + 1}. ${move.san}`}
                            </button>  
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-center py-4 gap-16'>
                      <button className='bg-cyan-600 p-2 rounded-xl hover:bg-cyan-700 ease' onClick={handleBackButton}>
                        <ChevronLeft className='size-8 text-white'/>
                      </button>
                      <button className='bg-cyan-600 p-2 rounded-xl hover:bg-cyan-700 ease' onClick={handleForwardButton}>
                        <ChevronRight className='size-8 text-white'/>
                      </button>
                    </div>
                    <div className='w-[33vw] mx-auto border-t pt-8 mt-4 max-md:w-full max-md:px-8'>
                      <div className='flex gap-2 text-white text-3xl items-center'>
                        <h1>Game Settings</h1> <Cog className='size-8'/>
                      </div>
                      <br/>
                      <div className='flex gap-4 max-md:flex-col'>
                        <button
                          onClick={()=>setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}
                          className='flex gap-2 bg-cyan-600 px-4 py-4 rounded-2xl text-white items-center text-sm ease hover:bg-cyan-700'>
                          Flip Board <FlipVertical2 />
                        </button>
                        <button
                          onClick={()=>{updateGameFen(initialFen!); setGameHistory([])}} 
                          className='flex gap-2 bg-cyan-600 px-4 py-4 rounded-2xl text-white items-center text-sm ease hover:bg-cyan-700'>
                          Revert to Initial Position <RotateCcw />
                        </button>
                        <button
                          onClick={()=>handleReturnButton()}
                          className='flex gap-2 bg-cyan-600 px-4 py-4 rounded-2xl text-white items-center text-sm ease hover:bg-cyan-700'>
                          Return to Edit Mode <Image src={'/static/icons/chessboard.svg'} alt='chessboard' width={20} height={20}/>
                        </button>
                      </div>

                      <br/>
                      <h2 className='text-white text-3xl'>Your game FEN</h2>
                      <input value={chessBoardPosition} disabled className='w-full flex items-center h-8 rounded px-2 bg-neutral-100 cursor-text'/>
                      <br/>
                    </div>
                </ChessboardDnDProvider>
            </div>
        </main>
    )
}

export default Evaluation
