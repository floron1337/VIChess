# VIChess
[https://vichess.vercel.app/](https://vichess.vercel.app/)

![image](https://i.ibb.co/LknGVQg/manual.jpg)
### Built by Florin Venis, Web Developer

Upload your game board images and let our advanced AI analyze your moves, offering real-time insights and strategies to help you improve your chess skills.

This project is built by only one developer, solely to demonstrate his skills.

Feel free to build upon and improve this project, giving credit where it is due.
## Inspiration, Credits
https://github.com/shainisan/real-life-chess-vision

https://github.com/Clariity/react-chessboard/tree/main

# Getting Started

### Frontend
This project uses NextJS as its Frontend framework.

- First, download all the required modules (in this example we'll be using nodeJS, but yarn, pnpm and bun are also accepted):


```sh
npm install
```

- After installing all the required modules, to start up the project run:
```sh
npm run dev

```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Everything in the project except the Scan page is working now!

### Backend
This project uses FastAPI to receive and process images. For the AI Image processing, we are using YOLOv8 from Ultralytics. Read more about the image processing part by reading [Shai Nisan's Repository](https://github.com/shainisan/real-life-chess-vision).

- Start by accessing the `/scan_api` folder

- Install all the API requirements (create a Virtual Environment first):
```
pip install -r requirements.txt
```

- Download and drop into the folder `/scan_api` an AI model for your Chessboard:

    - [Original Model](https://onedrive.live.com/?authkey=%21AF%2Du7EjxE%5FFIkco&id=D75A1BACEEF1CA04%2168580&cid=D75A1BACEEF1CA04&parId=root&parQt=sharedby&o=OneUp) - Bigger

    - [Personal Model](https://1drv.ms/u/s!Aiwhxuyy_4jca2Jx8DmDG_L2C1o?e=Eu3LKf) - Custom for my board

- Now, to get the API running:

```
fastapi dev main.py
```

And you're done, VIChess is now fully working.

# Known issues
- The AI Model has a very low accuracy for boards it hasn't seen before. That's why I've trained a new Model for my own board which is all right.

- The images need a better place to be stored, like AWS (or an equivalent).

- The access to the API should be regulated to prevent attacks.

- NextJS has a problem with the Stockfish Web Worker. Maybe think of another API just for Stockfish.