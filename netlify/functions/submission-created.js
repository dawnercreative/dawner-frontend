import querystring from 'querystring';
import sgMail from '@sendgrid/mail';

export async function handler(event, context) {
    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    // Create the email message
    const msg = {
        to: process.env.EMAIL,
        from: process.env.EMAIL,
        subject: 'New Submission',
        text: event.body,
    };



    try {
        const response = await sgMail.send(msg);
        console.log('Email sent', { response });
        return {
            statusCode: 302,
            headers: {
                Location: '/thankyou',
            },
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Email could not be sent' }),
        };
    }
}