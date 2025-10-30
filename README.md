# Mock E-Com Cart (Vibe Commerce) 

## Structure
- backend/  (Express + MongoDB)
- frontend/ (React)

## Backend - Run locally
1. Open terminal in `backend folder`:
   ```
   cd backend
   npm install
   ```
2. Seed and start:
   ```
   npm run seed
   npm start
   ```
3. API:
   - GET http://localhost:5000/api/products
   - GET http://localhost:5000/api/cart
   - POST http://localhost:5000/api/cart  { productId, qty }
   - DELETE http://localhost:5000/api/cart/:id
   - POST http://localhost:5000/api/checkout  { cartItems, name, email }

## Frontend - Run locally
1. Open terminal in `frontend folder`:
   ```
   cd frontend
   npm install
   npm start
   ```
2. The app runs at http://localhost:3000 and talks to the backend at http://localhost:5000

## Notes
- The project uses a local MongoDB by default. If you don't want to install MongoDB, create a free cluster on MongoDB Atlas and update `backend/.env` with the connection string.
- The frontend is a minimal Create-React-App structure. If you don't have `react-scripts`, run `npx create-react-app .` inside the frontend folder then overwrite files with the project files provided.

Good luck! Record a 1-2 minute demo showing: product listing, add/remove items, checkout, and receipt.
