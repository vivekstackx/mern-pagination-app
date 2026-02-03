// server.js
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cors from 'cors'

const app = express();
dotenv.config();
 
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}))
 
connectDB();
  

app.use('/api/v1' , userRoutes) 

 
// Global 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find ${req.originalUrl} on this server`
  }); 
});


app.use((err, req, res, next) => {
  console.error(err.stack); 

  res.status(err.statusCode || 500).json({ 
    status: "error",
    message: err.message || "Something went wrong!",
  });
   
});

 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server connected.");
}); 