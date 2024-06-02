// Import required modules
const express = require('express');
const nodeMailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Initialize express app
const app = express();
const PORT = 3000;
console.log(`process.env.NODE_ENV==='development' : ${process.env.NODE_ENV==='development'}`)
/**
 * Middleware to set headers for CORS (Cross-Origin Resource Sharing)
 * Allows requests from specified origin
 */
app.use((req, res, next) => {
    console.log(process.env.NODE_ENV)
    // if(process.env.NODE_ENV==='development'){
    //     console.log(`NODE_ENV = ${process.env.NODE_ENV}`)
    //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500'); // Uncomment for local development
    // } else {
    //     res.setHeader('Access-Control-Allow-Origin', 'https://fsalazar88.github.io'); // Replace with your front-end origin if different
    // }
    res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV==='development' ? 'http://localhost:5500' : 'https://fsalazar88.github.io'); // Uncomment for local development
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow GET and POST methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
    next();
});

/**
 * Middleware to parse JSON and URL-encoded request bodies
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * GET endpoint to check server status
 * Responds with a simple message indicating the server is running
 */
app.get('/', (req, res) => {
    res.send("Server is running")
})

/**
 * POST endpoint to handle email sending to a specified gmail account
 * Expects 'name', 'email', and 'message' in the request body
 */
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com', // SMTP server hostname (e.g., Gmail)
        port: 465, // SMTP port
        secure: true, // Use SSL
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

    try{
        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:' + info.response);
        res.status(200).json('Email sent successfully: ' + info.response);
    } catch (error) {
        console.log("Error sending email: " + error)
        res.status(500).json({ error: 'Failed to send email', details: error.toString() });
    } 
});

/**
 * Start the express server and listen on the specified port
 */
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;