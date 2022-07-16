const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    subjects:{
        type:Array,
        required: true
    }

 });

 
 const customer = new mongoose.model('customer', customerSchema);

 module.exports = customer;

