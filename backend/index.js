const express=require('express')
const app=express()
const cors=require('cors')
app.use(express.json())
app.use(cors())
require('dotenv').config(); 

const nodemailer = require("nodemailer");


app.post('/sendMail',function(req,res){
    const { name, email, mobile, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

     
      
          const info = transporter.sendMail({
              from:email, // sender address
              to: process.env.GMAIL_USER, // list of receivers
              subject:`Mail Sent From ${email} and name is ${name}`, // Subject line
              html: `<div><strong>Mobile Number:</strong> ${mobile}</div><div><strong>Know More:</strong> ${message}</div> <br>
              <p><strong>Best regards,</strong></p>
              <p><strong>${name}</strong></p>
              `, },
            function (error, info) {
              if(error){
                  console.log(error)
                  res.send("Error")
              }else{
                  console.log(info)
                  res.send("Success")

                    const autoMail = transporter.sendMail({
                    from:process.env.GMAIL_USER, // sender address
                    to: email, // list of receivers
                    subject:`Hi ${name} We Recieved Your Mail`, // Subject line
                    html: `<p><strong>We Will Reach Out Soon as Possible</strong></p>
                    <p><strong>Best regards,</strong></p>
                    <p><strong>Error Makes Clever</strong></p>`, // plain text body
                  })
              }
          }
          );
      
})

  






app.listen(4000)