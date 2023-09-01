const express=require('express');
const dotenv = require("dotenv").config(); //loads environment variables from a .env file into process.env
const cors = require('cors');
const dbConnection=require('./config/dbConnection'); //DB connection
const io=require("./controllers/ChatSocket");


const app= express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//--------------------------Routes-------------------------- !
const userAuth=require("./routes/UserAuthRoute.js");
const userRoute=require("./routes/UserRoute");

app.use("/",userAuth); //User registration and login
app.use("/user",userRoute); 

io.listen(3001, () => {
    console.log('server started');
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}!`)
    dbConnection();
})  