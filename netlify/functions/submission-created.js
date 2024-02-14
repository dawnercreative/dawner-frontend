import querystring from 'querystring';
import sgMail from '@sendgrid/mail';

export async function handler(event, context) {
    // Parse the form data'
    const formData = querystring.parse(event.body);
    console.log({ formData })

    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    // Create the email message
    const msg = {
        to: process.env.EMAIL,
        from: process.env.EMAIL,
        subject: 'New Submission',
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
    };

    await sgMail.send(msg, false, (err, result) => { console.log({ err, result }) });
    // Send the email
    // try {

    //     console.log('Email sent');
    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({ message: 'Email sent' }),
    //     };
    // } catch (error) {
    //     console.error(error);
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify({ message: 'Email could not be sent' }),
    //     };
    // }
}