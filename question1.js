//          ---------1. Make a api for phone number login-----------------

//        a. Make add Customer api for customer, assume admin is adding customer ..
//          use the input params validation, code commenting, logging and check for
//          duplicates where required .


//                  !!!!!!!! I M P O R T E N T!!!!!!
//              Dear sir/madam,
//                     Use a new TWilio Account.






require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const { body, validationResult } = require('express-validator');
const client = require('twilio')(process.env.ACCOUNTSID,process.env.AUTH_TOKEN);
const jwt = require('jsonwebtoken');
const admin = require('./models/admin');
const customer = require('./models/customer');






const port = process.env.PORT || 3000;

// Require db ..

require("./db/conn");


//Login With Number And Otp ...
app.post('/api/login', [body('number').trim().isLength(12).withMessage('Number Must be started with 91 and 12 digits')], async (req, res)=>{
    try {
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.send(error)
        console.log(error);
        return;
    }

    const data = await client.verify.services(process.env.SERVICEID).verifications
   .create({
       to:`+${req.body.number}`,
       channel: req.body.channel
   })
  
   res.status(200).send({message:"otp send", data});
   console.log({message:"otp send", data});

       
        
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

//Verify Login Otp..
app.post('/api/login/verifyotp',[body('number').trim().isLength(12).withMessage('Number Must be started with 91 and 12 digits')], async (req, res)=>{
    try {

        const error = validationResult(req)
        if(!error.isEmpty()){
            res.send(error)
            console.log(error);
            return;
        }

        const data = await  client
        .verify
        .services(process.env.SERVICEID)
        .verificationChecks
        .create({
            to:`+${req.body.number}`,
            code:req.body.code
        }) ;
        if(data.status ==="approved"){
            const number = req.body.number;
            console.log(number);
            const adata = await admin.findOne({number});
            console.log(adata);
     
            const token = await adata.generateAuthToken();
            //console.log(token);
     res.status(200).send({toekn:token,message:"login successfull"});
        }
        
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

//Register  ... 
app.post('/api/register/sendotp',[body('number').trim().isLength(12).withMessage('Number Must be started with 91 and 12 digits')], async (req, res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.send(error)
            console.log(error);
            return;
        }


        const data = await client.verify.services(process.env.SERVICEID).verifications
        .create({
            to:`+${req.body.number}`,
            channel: req.body.channel
        })
       
        res.status(200).send(`otp send ${data}`);
        console.log(data);
       res.send(otpres);
    } catch (err) {
         console.log(err);
         res.status(400).send(err)
    }
})

//Verify Register Otp...
app.post('/api/register/verifyotp',[body('number').trim().isLength(12).withMessage('Number Must be started with 91 and 12 digits')], async (req, res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.send(error)
            console.log(error);
            return;
        }
        const data = await  client
        .verify
        .services(process.env.SERVICEID)
        .verificationChecks
        .create({
            to:`+${req.body.number}`,
            code:req.body.code
        }) ;

       if(data.status ==="approved"){
       const adata = new admin({
           number:req.body.number       
       })
       const token = await adata.generateAuthToken();
       const sdata = await adata.save();
       //console.log(sdata);
       res.status(200).send({token:token,message:"user create successfully"});
     }
   else{
         res.send('Otp not valid.');
   }
    } catch (err) {
         console.log(err);
         res.status(400).send(err)
    }
})


//Add castomer...

app.post('/api/castomer',[body('email').trim().isEmail().withMessage("Email must be a valid Email").normalizeEmail().toLowerCase()], async (req, res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.send(error)
            console.log(error);
            return;
        }


        const {email, Name, subjects, token} = req.body;

        if (!email || !Name || !subjects || !token){
            return res.status(400).json({error:"Please Fill the data"});
        }

        const verifyToken = jwt.verify(token, "mynameistanmoybarmanfromfalakata");


       if(verifyToken){
       const adata = new customer({
           Name:req.body.Name,       
           email:req.body.email,      
           subjects:req.body.subjects       
       })
       const sdata = await adata.save();
       //console.log(sdata);
       res.status(200).send({customer:sdata,message:"customer created successfully"});
     }
   else{
         res.send('token not valid.');
   }
    } catch (err) {
         console.log(err);
         res.status(400).send(err)
    }
})



app.listen(port, ()=>{
    console.log(`listen at port-${port}`);
});
