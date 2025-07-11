# VIChess 
A sleek, open-source chess analyzer powered by Stockfish. Upload your game board images and let advanced AI analyze your moves, offering real-time insights and strategies to help improve your chess skills. This project is a solo showcase of full-stack development and machine learning experiments.

<img width="1916" height="992" alt="Screenshot from 2025-07-11 16-08-51" src="https://github.com/user-attachments/assets/9349a371-db08-4d26-b2bd-4b7ab5958d4b" />
<img width="1916" height="992" alt="Screenshot from 2025-07-11 16-08-51" src="https://github.com/user-attachments/assets/50c522a4-8e9b-4ab8-9907-6ad34587c0a9" />
<li> Project link: <a href="https://vichess.vercel.app/">vichess.vercel.app</a> </li>

---

## Features
- **Scan Board**  
  Upload a photo or scan a real chessboard with your camera to detect piece placement.
- **Manual Board Editor**  
  Recreate any chess position manually for analysis.
- **FEN Input**  
  Paste a FEN string to instantly load and analyze any position.
- **Stockfish Engine Integration**  
  Analyze positions using one of the strongest open-source chess engines.

---

## Why VIChess?
- Combines real-world board scanning with engine analysis for seamless experience.
- Fully open source and free—no registration needed.
- Built by a developer as a technical showcase.
- Extensible project with potential for UI/UX improvements, better storage, engine and model tweaks, etc.

---

## Tech Stack
- **Frontend:** Next.js, React  
- **Backend:** FastAPI (Python)  
- **Computer Vision:** YOLOv8 (Ultralytics) to detect pieces from images  
- **Chess Engine:** Stockfish via Web Worker  

---

## Getting Started

### Frontend
```bash
git clone https://github.com/floron1337/VIChess.git
cd VIChess
npm install
npm run dev
```

### Backend Setup (Scan API)

- Navigate into the backend directory and set up the environment:

```bash
cd scan_api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

- Download a Chess Piece Recognition Model
You’ll need a trained YOLOv8 model to detect chess pieces:

    - [Original Model](https://onedrive.live.com/?authkey=%21AF%2Du7EjxE%5FFIkco&id=D75A1BACEEF1CA04%2168580&cid=D75A1BACEEF1CA04&parId=root&parQt=sharedby&o=OneUp) - Bigger

    - [Personal Model](https://1drv.ms/u/s!Aiwhxuyy_4jca2Jx8DmDG_L2C1o?e=Eu3LKf) - Custom for my board

- Place the model in the scan_api folder.

- Then start the FastAPI server:

```bash
fastapi dev main.py
```

Now, the full VIChess app is functional, including image scanning and AI-based analysis.

## Known Issues

- The AI model has lower accuracy with boards it hasn’t seen before — custom training is recommended.

- Images are stored locally; a cloud storage solution (like AWS S3 or Firebase) would be more reliable.

- API access is unprotected — should implement authentication and rate limiting for production use.

- The Stockfish Web Worker has compatibility issues with Next.js. Consider creating a dedicated backend service for Stockfish.

## Inspiration & Credits
- Dr Shai Nissan's [real-life-chess-vision](https://github.com/shainisan/real-life-chess-vision)

- [React Chessboard](https://github.com/Clariity/react-chessboard/tree/main)

## Contribution
This project is open source and contributions are welcome! You can:

- Improve detection accuracy with better-trained YOLO models

- Refactor the frontend or backend code

- Add PGN export/import

- Build ELO tracking and player profiles

- Improve UI and mobile responsiveness

- Localize the app for multiple languages

---

**Don't forget to star the project if you've enjoyed my work here!**
