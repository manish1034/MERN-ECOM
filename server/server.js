const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-routes");
require('dotenv').config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("MongoDB Connected"))
    .catch((err)=> console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
            "Set-Cookie",
            "X-CSRF-TOKEN",
            "X-Requested-With",
        ],
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api /auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
