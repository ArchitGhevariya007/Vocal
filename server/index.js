const express=require('express');
const cors = require('cors');
const dbConnection=require('./config/dbConnection'); //DB connection

const app= express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//--------------------------Routes-------------------------- !
const userAuth=require("./routes/UserAuthRoute.js");

app.use("/",userAuth); //User registration


app.listen(port,()=>{
    console.log(`Server running on port ${port}!`)
    dbConnection();
})  