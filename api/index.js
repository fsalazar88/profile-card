const express = require('express');
const nodeMailer = require('nodemailer');
require('dotenv').config(); // Import environment variables
// const http = require('http');

const app = express();
// const server = http.createServer(app);
const PORT = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://fsalazar88.github.io'); // Replace with your front-end origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req, res) => {
//     res.send("Server is running")
// })

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com', // Replace with your provider's hostname if different
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to send email', details: error.toString() });
        } else {
            console.log('Email sent: ' + info.response)
            res.status(200).json('Email sent: ' + info.response);
        }
    });

    // async function send() {
    //     try{
    //         let info = await transporter.sendMail(mailOptions);
    //         console.log('Email sent: ' + info.response)
    //         res.status(200).json('Email sent: ' + info.response);
    //     } catch (error) {
    //             console.log("Error sending email: " + error)
    //             res.status(500).json({ error: 'Failed to send email', details: error.toString() });
    //     } 
    // }
    // send();
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;



