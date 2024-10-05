import React, { useState } from 'react'
import ImageDropzone from '@/components/ImageDropzone';
import { FileWithPath } from 'react-dropzone';
import Image from 'next/image';
import { uploadFile } from '@/components/utils/uploadFile';
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

