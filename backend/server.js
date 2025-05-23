const express = require("express");
const errorHandler = require("./middlewares/errorHandler"); 
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();


const app = express();
connectDB();
const port = process.env.PORT || 5000;

//to parse json data
app.use(express.json());
//to parse urlencoded data
app.use(express.urlencoded({ extended: false }));

//error handling middleware
app.use(errorHandler);

/*
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); */


// app.get("/api/contacts", (req, res) => {
//     res.status(200).json({ message: "get all contacts"});
// });
//gonna use something else instead of the above code
app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

