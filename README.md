<h1 align="center">🛒 QuickPick – Smart Grocery Shopping Platform</h1>

<p align="center">
  A modern MERN-stack grocery shopping platform that blends 
  <b>recipe-based shopping</b>, <b>traditional grocery browsing</b>, 
  <b>smart cart automation</b>, and <b>online payments</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Fullstack-green" />
  <img src="https://img.shields.io/badge/React-Vite-blue" />
  <img src="https://img.shields.io/badge/Node-Express-yellow" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-success" />
  <img src="https://img.shields.io/badge/Stripe-Payments-blueviolet" />
  <img src="https://img.shields.io/badge/Cloudinary-Images-lightgrey" />
</p>

---

## 🌟 Live Demo

| Service | URL |
|--------|-----|
| **Frontend** | https://quickpick-wx52.vercel.app |

---

## 📌 About the Project

QuickPick is a smart grocery shopping platform built using the **MERN stack**.  
It supports traditional grocery shopping and **recipe-based shopping**, where selecting a recipe automatically fetches all required ingredients.

### 🔥 Highlights
- Full authentication system (JWT)  
- Product & Category browsing  
- Recipe-based grocery suggestions  
- Smart cart and quantity management  
- Online Checkout with Stripe  
- Email notifications using Resend API  
- Image uploads with Cloudinary  
- Admin dashboard for managing products, categories, and orders  
- Fully deployed frontend & backend  

---

## 🚀 Features

### 👤 User Features
- Login / Register  
- Browse products & categories  
- Auto-generated grocery list from recipes  
- Add to cart / Remove from cart  
- Checkout using Stripe  
- View order history  
- Email confirmations on order success  

### 🛠️ Admin Features
- Add/update/delete products  
- Upload product images using Cloudinary  
- Manage categories  
- Manage customer orders  
- Store dashboard with data insights  

### 🔐 Security
- JWT authentication  
- Protected API routes  
- CORS protection  
- Secure Stripe webhook handling  

---

# 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- React Router  
- Axios  
- TailwindCSS (or Custom CSS)  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Cloudinary SDK  
- Resend Email API  
- Stripe Payments  

### **Deployment**
- Vercel (Frontend)  
- Vercel (Backend)  

---

# 🔑 Environment Variables

### 🌐 Client (`client/.env`)
VITE_API_URL=<your-backend-url>
VITE_STRIPE_PUBLIC_KEY=<stripe-public-key>


### 🖥️ Server (`server/.env`)
MONGODB_URI=<mongodb-uri>

SECRET_KEY_ACCESS_TOKEN=<jwt-access-secret>
SECRET_KEY_REFRESH_TOKEN=<jwt-refresh-secret>

FRONTEND_URL=<frontend-url>

CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET_KEY=<cloudinary-secret>

RESEND_API=<resend-api-key>

STRIPE_SECRET_KEY=<stripe-secret-key>
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY=<stripe-webhook-secret>

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Niyatinagar/Quickpick.git
cd Quickpick


cd client
npm install
npm run dev


cd ../server
npm install
npm start
