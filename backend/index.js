const express = require("express") ;
const mongoose = require('mongoose')
const cors = require('cors');
let routes=require("./routes/product");
const path = require('path');


const app= express();
app.use(cors())
app.use(express.json())
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const DB_URL="mongodb://0.0.0.0:27017/ecommerce"
mongoose.connect(DB_URL).then(successful=>{
    console.log("connected to db")
}).catch(err=>
    console.log("failed connection",err)
)

app.listen(3000,()=>console.log('Server is up on 3000'));
