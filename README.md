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

⚙️ Environment Variables Setup

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

Add your Firebase config to firebase.js using environment variables

▶️ Running the App Locally
npm install
npm start


The app will run on:

http://localhost:3000

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
