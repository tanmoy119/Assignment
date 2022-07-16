const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/apiDB').then(()=>{
    console.log("connection successful..");
}).catch((err)=>{
    console.log(err);
    console.log("No connection..");
})