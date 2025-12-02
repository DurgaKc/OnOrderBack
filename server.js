const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDB")
const cors = require("cors")

const PORT=process.env.PORT || 3000
connectDb()

// ✅ Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(cors({
  origin: [
    'https://onlinefoodorderfront.onrender.com',  // Your frontend
    'http://localhost:5173'  // Local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


// Serve uploaded images
app.use(express.static("public"));

app.use("/",require("./routes/user"))
app.use("/items",require("./routes/items"))
app.use("/order",require("./routes/order"))

app.listen(PORT,(err)=>{
    console.log(`app is running on port ${PORT}`)
})