# pickabook-prototype

## 🚀 Features
**Easy Upload:** Simple drag-and-drop interface for uploading user photos.
**AI Personalisation:** Uses **InstantID** to preserve facial identity while applying a 3D Pixar-like animation style.
**Real-time Generation:** Connects to Replicate's high-performance GPU cloud for fast results.
**Downloadable Result:** Users can download their personalized avatar for use in storybooks.

## 🛠 Tech Stack

**Frontend:** React.js (Vite), CSS3

**Backend:** Node.js, Express.js

**AI Engine:** Replicate API 

**Deployment:** (Ready for Vercel/Render)

📦 Installation & Setup
Follow these steps to run the project locally.

1. Prerequisites
Node.js installed (v16 or higher)
A Replicate API Token

2. Backend Setup
Navigate to the server folder and install dependencies:

Bash

cd server

npm install

Create a .env file in the server folder and add your Replicate token:

Code snippet
REPLICATE_API_TOKEN=r8_YourTokenHere...

PORT=5000

Start the server:

Bash

node index.js

The backend will run on http://localhost:5000

3. Frontend Setup
Open a new terminal, navigate to the client folder:

Bash

cd client

npm install

npm run dev

The app will run on http://localhost:5173



Prachi Kumari 

prachikumari121203@gmail.com
