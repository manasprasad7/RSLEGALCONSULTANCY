const express = require("express");
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;

//middleware

app.use(express.static('public'));
app.use(express.json())

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/contactform.html')
})

app.post('/', (req,res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'manasclass7@gmail.com',
            pass: 'manas07122001'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'manasclass7@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject} `,
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log('ERROR');
            res.send('error');
        }
        else{
            console.log('Email sent : '+ info.response);
            res.send('SUCCESS')
        }
    })
})

app.listen(PORT,() => {
     console.log(`Server Running On PORT  ${PORT}`)
})
