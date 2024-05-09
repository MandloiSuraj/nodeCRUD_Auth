const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.databaseURL).then(()=>{
    console.log("Connected to database")
}).catch((error)=>{
    console.error("Error connecting to mongodb",error);
});



