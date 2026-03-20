import express from "express";
import'dotenv/config'
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";


const app = express();

const PORT = 8005; 

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
//http://localhost:8000/api/users/register

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
  });
