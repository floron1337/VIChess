// components/ImageDropzone.tsx
"use client"

import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { ChevronRight, Github, RotateCcw, Upload } from 'lucide-react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/components/utils/uploadFile';
import Link from 'next/link';

interface ImageDropzoneProps {
  onFileAccepted?: (file: File) => void;
}

const Scan: React.FC<ImageDropzoneProps> = ({ onFileAccepted }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [acceptedFile, setAcceptedFile] = useState<File | null>(null)
  const router = useRouter()

  const generateFileName = (originalName: string) => {
    const uuid = Date.now() + Math.floor(Math.random() * 1000)
    const extension = originalName.split('.').pop()
    return `${uuid}.${extension}`
  }

  // Ensure that `onDrop` has a valid fallback behavior
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    const file = acceptedFiles[0];
    if (file) {
      const newFile = new File([file], generateFileName(file.name), { type: file.type })
      const previewUrl = URL.createObjectURL(newFile);
      setPreview(previewUrl);
      setAcceptedFile(newFile)
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, // Always pass a defined function here
    accept: {
      'image/*': [] // Accept only image file types
    },
    maxFiles: 1,
  });
  
  const handleFileAccept = async () => {
    if(acceptedFile){
      const formData = new FormData()
      formData.append('file', acceptedFile)
      const ok = await uploadFile(formData)
      
      if(ok){
        router.push(`/annotate?img=${acceptedFile.name}`)
      }
      
    }
  }

  return (
    <main className="flex justify-center pb-16 bg-gradient-dark flex-1">
        <div className="w-2/3 flex gap-12 p-24 border-l-2 border-b-2 text-white items-center max-lg:w-auto flex-col max-lg:p-8">
            <div className='flex flex-col w-full h-full'>
                {!preview && 
                <>
                    <div className='text-center mb-8'>
                        <h1 className='text-4xl'>Chessboard Image Analysis</h1>
                        <p className='text-sm'>Advanced AI Computer Vision for Image Recognition</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-4 mb-2'>
                    <h3 className='text-xl font-semibold'>!IMPORTANT: This feature will not work in the online example.</h3>
                    <h4>On your local machine, make sure the API Endpoint is active.</h4>
                    <Link target="_blank" href="https://github.com/floron1337/VIChess/blob/main/README.md" className='bg-cyan-600 hover:bg-cyan-700 ease px-4 py-2 flex gap-2 rounded-2xl'>
                        READ MORE <Github/>
                    </Link>
                    </div>
                </>
                }
            
                <form
                    {...getRootProps()}
                    className='p-20 flex flex-col items-center justify-center border-dashed border-2 w-full h-full cursor-pointer rounded-2xl'
                >
                    <input {...getInputProps()}/>
                    
                    {preview ? (
                    <div className='flex flex-col items-center gap-4'>
                        <h3 className='text-3xl'>Image Preview</h3>
                        <Image
                        src={preview}
                        alt="Preview"
                        width={400}
                        height={300}
                        />
                    </div>
                    ) : 
                    <>
                    {isDragActive ? (
                        <h1 className='text-2xl'>Drop the image here...</h1>
                    ) : (
                        <div className='flex flex-col items-center justify-center gap-4 hover:gap-8 hover:font-semibold ease w-full h-full'> 
                        <Upload className='size-8'/>
                        <h1 className='text-xl'>Drop an image here, or click to select one</h1>
                        </div>
                    )}
                    </>
                    }
                </form>
            
                {preview && 
                    <div className='flex flex-col items-center mt-8'>
                        <h1 className='text-4xl'>Everything&apos;s good?</h1>
                        <p className='text-sm'>Make sure that all chess pieces and board corners are visible.</p>
                        <div className='mt-4 flex gap-4'>
                            <button onClick={()=>setPreview(null)} className='flex gap-2 px-4 py-2 border rounded-2xl hover:bg-white hover:text-black ease'>
                            Try Again <RotateCcw />
                            </button>
                            <button onClick={handleFileAccept} className='flex gap-2 px-4 py-2 rounded-2xl bg-cyan-600 hover:bg-cyan-700 hover:gap-4 ease'>
                            Proceed <ChevronRight />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    </main>
  );
};

export default Scan;
