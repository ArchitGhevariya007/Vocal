const express=require('express');
const cors = require('cors');
const dbConnection=require('./config/dbConnection'); //DB connection


const app= express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//--------------------------Routes-------------------------- !
const {register_route}=require("./routes/UserAuthRoute");

app.use("/register",register_route); //User registration



app.listen(port,()=>{
    console.log(`Server running on port ${port}!`)
    dbConnection();
})