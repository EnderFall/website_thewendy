require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname))); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // From .env file
        pass: process.env.EMAIL_PASS  // From .env file
    }
});

// Test the email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    console.log('📧 Received email request:', req.body);
    
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER, // Use your email as sender
        replyTo: email, // Allow replies to the form submitter
        to: process.env.EMAIL_USER, // Send to yourself
        subject: `Website Contact: ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `,
        text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nSubmitted at: ${new Date().toLocaleString()}`
    };

    try {
        console.log('📤 Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        console.log('📬 Preview URL:', nodemailer.getTestMessageUrl(info));
        
        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully!' 
        });
    } catch (error) {
        console.error('❌ Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email. Please try again later.',
            error: error.message 
        });
    }
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});