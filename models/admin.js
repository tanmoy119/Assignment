const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    number:{
        type:Number,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

 });

 adminSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, "mynameistanmoybarmanfromfalakata" );
        this.tokens = this.tokens.concat({token})
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

 
 const admin = new mongoose.model('admin', adminSchema);

 module.exports = admin;

