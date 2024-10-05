'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, RotateCcw } from 'lucide-react';

interface Point {
    x : number;
    y : number
}

interface ImageRef {
    image: HTMLImageElement;
    offsetX: number;
    offsetY: number;
    scaledWidth: number;
    scaledHeight: number;
    originalWidth: number;
    originalHeight: number;
}

export default function Annotate(){
    const searchParams = useSearchParams()
    const router = useRouter()
    const paramsImg = searchParams.get('img')

    if(!paramsImg)
        router.back()

    const imageLocation = `/temp/uploads/${paramsImg}`
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const imageRef = useRef<ImageRef | null>(null);
    const [points, setPoints] = useState<Point[]>([])
    const [boardCorners, setBoardCorners] = useState<Point[]>([])

    const reloadImage = () => {
        const canvas = canvasRef.current
        if(!canvas) return

        const ctx = canvas.getContext('2d')
        if(!ctx) return

        const image = new Image()
        image.src = imageLocation
        image.onload = () => {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
      
            // Calculate the scale factor if the canvas size is different from the image
            const scaleX = canvasWidth / image.width;
            const scaleY = canvasHeight / image.height;
      
            // Optionally maintain aspect ratio by using the smaller scale
            const scale = Math.min(scaleX, scaleY);
      
            // Get the new width and height of the image on the canvas
            const scaledWidth = image.width * scale;
            const scaledHeight = image.height * scale;
      
            // Center the image on the canvas
            const offsetX = (canvasWidth - scaledWidth) / 2;
            const offsetY = (canvasHeight - scaledHeight) / 2;
      
            // Draw the scaled image
            ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear any previous drawings
            ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
      
            // Save the image reference
            imageRef.current = {
              image,
              offsetX,
              offsetY,
              scaledWidth,
              scaledHeight,
              originalWidth: image.width,
              originalHeight: image.height,
            };
        };
    }

    useEffect(() => {
        reloadImage();
    }, [])

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if(points.length >= 4)
            return

        const canvas = canvasRef.current;
        if(!canvas) return

        const ctx = canvas.getContext('2d');
        if(!ctx) return

        const pointX = event.pageX - canvas.offsetLeft
        const pointY = event.pageY - canvas.offsetTop
        const point: Point = {
            x: pointX,
            y: pointY
        }

        ctx.fillStyle = "rgb(8, 145, 178)"
        ctx.lineWidth = 10
        ctx.strokeStyle = "rgb(8, 145, 178)"
        ctx.beginPath();
        ctx.fillRect(pointX - 10, pointY - 10, 20, 20);
        
        const pointsCount = points.length
        if(pointsCount > 0){
            ctx.moveTo(points[pointsCount - 1].x, points[pointsCount - 1].y);
            ctx.lineTo(pointX, pointY);
        }

        if(pointsCount === 3){
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(pointX, pointY);
        }

        ctx!.stroke();     
        setPoints([...points, point])
    }

    const handleResetButton = () => {
        setPoints([])
        reloadImage()
    }

    const handleSubmit = () => {
        if(!imageRef || !imageRef.current || points.length !== 4) return;

        const { offsetX, offsetY, scaledWidth, scaledHeight, originalWidth, originalHeight } = imageRef.current;

        setBoardCorners([])
        points.forEach(point => {
            const imageX = Math.round(((point.x - offsetX) / scaledWidth) * originalWidth); 
            const imageY = Math.round(((point.y - offsetY) / scaledHeight) * originalHeight);
            setBoardCorners([...boardCorners, {x: imageX, y: imageY}])
        });
        sendData(boardCorners)
    }

    const sendData = async(board_corners: Point[]) => {
        const response = await fetch('http://127.0.0.1:8000/api/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                img_name: paramsImg,
                board_corners
            })
        })
        const data = response.json().then((result) => {
            router.push(`/build?fen=${result.boardFen}_w_KQkq_-_0_1`)
        })
    }

    return (
        <main className="flex justify-center pb-16 bg-gradient-dark flex-1">
            <div className="w-2/3 flex gap-4 p-24 border-l-2 border-b-2 text-white items-center flex-col max-lg:p-8 max-lg:w-full overflow-hidden">
                <canvas
                    width={800}
                    height={500}
                    onClick={handleCanvasClick}
                    ref={canvasRef}
                />

                {points.length === 4 ? 
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl max-lg:text-2xl'>Ready to send?</h1>
                    <p>Almost done.</p>
                    <div className='mt-4 flex gap-4 max-lg:flex-col'>
                        <button onClick={handleResetButton} className='flex gap-2 px-4 py-2 border rounded-2xl hover:bg-white hover:text-black ease'>
                        Try Again <RotateCcw />
                        </button>
                        <button onClick={handleSubmit} className='flex gap-2 px-4 py-2 rounded-2xl bg-cyan-600 hover:bg-cyan-700 hover:gap-4 ease'>
                        Proceed <ChevronRight />
                        </button>
                    </div>
                </div>  : <h1 className='text-3xl max-lg:text-xl'>Please click on the 4 corners of the board</h1>}
            </div>
        </main>
    )
}

