// Simple test script for email functionality
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing email configuration...');

// Try to load .env file manually
try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
        console.log('✅ .env file loaded');
    }
} catch (error) {
    console.log('ℹ️ No .env file found, using process.env');
}

// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Environment variables not set!');
    console.log('\n💡 Please do one of the following:');
    console.log('1. Create a .env file with:');
    console.log('   EMAIL_USER=your-email@gmail.com');
    console.log('   EMAIL_PASS=your-app-password');
    console.log('\n2. Or set environment variables:');
    console.log('   export EMAIL_USER=your-email@gmail.com');
    console.log('   export EMAIL_PASS=your-app-password');
    console.log('\n3. Or pass them directly:');
    console.log('   EMAIL_USER=your-email@gmail.com EMAIL_PASS=your-app-password node test-email.js');
    process.exit(1);
}

console.log('✅ Environment variables found:');
console.log('   EMAIL_USER:', process.env.EMAIL_USER);
console.log('   EMAIL_PASS:', '•'.repeat(process.env.EMAIL_PASS.length));

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test email configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email configuration error:', error);
        console.log('\n💡 Troubleshooting tips:');
        console.log('1. Make sure 2FA is enabled on your Gmail');
        console.log('2. Generate a new app password for "Mail"');
        console.log('3. Check that the app password is 16 characters');
    } else {
        console.log('✅ Email server is ready to send messages');
        
        // Send a test email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: '✅ Test Email from Contact Form Setup',
            text: 'This is a test email to verify your contact form setup is working correctly!',
            html: `
                <h2>Contact Form Test Successful! 🎉</h2>
                <p>Your contact form email setup is working correctly.</p>
                <p><strong>Next steps:</strong></p>
                <ul>
                    <li>Set up GitHub Secrets with these credentials</li>
                    <li>Push your code to GitHub</li>
                    <li>Enable GitHub Pages</li>
                    <li>Test the live contact form</li>
                </ul>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('❌ Error sending test email:', error);
            } else {
                console.log('✅ Test email sent successfully!');
                console.log('📧 Message ID:', info.messageId);
                console.log('📬 Check your inbox for the test email');
            }
        });
    }
});
