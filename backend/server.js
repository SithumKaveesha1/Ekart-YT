import express from "express";
import'dotenv/config'
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";


const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute)
//http://localhost:8000/api/v1/user/register

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
  });
