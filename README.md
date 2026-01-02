To run the app:

🔐 Firebase API Key Setup (Required)

This project uses Firebase for authentication and database services.
You must add your own Firebase API keys before running the app.

Step 1: Create a Firebase Project

Go to the Firebase Console

Create a new project

Add a Web App to the project

Copy the Firebase configuration values

Step 2: Add your Firebase API keys to .env

Paste your Firebase credentials in the following format:

REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

Step 4: How firebase.js uses .env

The firebase.js file is already configured to read values from .env.

Example (firebase.js):

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

Step 5: Run the app

After adding your API keys:

npm install
npm start

About the app:

🍽️ Food Delivery Web Application

A modern Food Delivery Web App built using React, Firebase, and React Router, allowing users to browse restaurants, add food items to cart, place orders, and track their order history — all with a clean and responsive UI.

🚀 Features

🔐 User Authentication (Firebase Auth)

🍴 Browse Restaurants & Menus

🔍 Search restaurants or menu items

🛒 Add / Remove items from Cart

📦 Place Orders & View Order History

💾 Persistent Cart & Orders using Local Storage

🎨 Modern UI with inline CSS (no external UI libraries)

📱 Responsive design

🧰 Tech Stack

Frontend: React.js

Routing: React Router DOM

Backend / Database: Firebase Firestore

Authentication: Firebase Authentication

State Management: React Context API

Storage: Browser Local Storage

Create a .env file in the root directory and add:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id


🔥 Firebase Setup

Create a Firebase project

Enable:

Authentication (Email/Password)

Firestore Database


▶️ Running the App Locally
npm install
npm start

🌍 Deployment

You can deploy this app on:

GitHub Pages

Vercel

Netlify


📌 Future Enhancements

Online payment integration

Admin dashboard for restaurant owners

Real-time order status updates

Order cancellation & refunds

Ratings & reviews

👩‍💻 Author

Kavina A C
Full Stack Developer | MERN | Firebase | React
