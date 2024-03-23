const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const postRoute=require('./routes/details')
app.use(express.json());

//database
const connectDB=async()=>{
    try{
        await mongoose.connect(
          process.env.DATABASE
        );
        console.log("database is connected successfully!")
    }
    catch(err){
        console.log(err)
    }
};


app.use("/api/dex",postRoute)

app.listen(5000, () => {
  connectDB();
  console.log("app is running on port " + 5000);
});
