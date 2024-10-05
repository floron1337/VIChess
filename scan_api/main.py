from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import urllib.request
from PIL import Image

from processing import process

app = FastAPI()

# Define the list of allowed origins (you can add more if needed)
origins = [
    "http://localhost:3000",  # Next.js frontend
    # You can add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can specify allowed methods like GET, POST, etc.
    allow_headers=["*"],  # You can specify allowed headers if needed
)

class Point(BaseModel):
    x: float
    y: float

class AnnotatedImage(BaseModel):
    img_name: str
    board_corners: List[Point]

def download_image(img_name):
    img_url = "http://localhost:3000/temp/uploads/" + img_name
    urllib.request.urlretrieve(img_url, img_name)

@app.post("/api/scan")
async def scan_endpoint(body: AnnotatedImage):
    download_image(body.img_name)
    boardFen = process(body.img_name, body.board_corners)
    return {"boardFen": boardFen}
