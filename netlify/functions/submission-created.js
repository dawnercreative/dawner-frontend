import querystring from 'querystring';
const sgMail = require('@sendgrid/mail')

export async function handler(event, context) {
    // Parse the form data'
    const formData = querystring.parse(event.body);
    console.log({ formData })

    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    // Create the email message
    const msg = {
        to: process.env.EMAIL, // Change to your recipient
        from: process.env.EMAIL, // Change to your verified sender
        subject: 'New Submission', // Subject line
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`, // formatted text body
    };

    // Send the email
    try {
        await sgMail.send(msg);
        console.log('Email sent');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Email could not be sent' }),
        };
    }
}