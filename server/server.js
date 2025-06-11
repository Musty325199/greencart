import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import { stripeWebhooks } from './controllers/orderController.js';



const app = express()
const port = process.env.PORT || 4000;

await connectDB()

// Allowed multiple origins
const allowedOrigins = ['http://localhost:5173', 'https://greencart-frontend-six.vercel.app']

app.post("/stripe", express.raw({type: 'application/json'}), stripeWebhooks)

// Middleware Configuration
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get("/", (req, res)=> res.send("API is Working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)





app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})  