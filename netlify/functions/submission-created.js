import { createTransport } from 'nodemailer';

export async function handler(event, context) {

    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // your gmail account from Netlify environment variable
            pass: process.env.EMAIL_PASSWORD // your gmail password from Netlify environment variable
        }
    });

    let mailOptions = {
        from: process.env.EMAIL, // sender address
        to: process.env.EMAIL, // list of receivers
        subject: 'New Submission', // Subject line
        text: JSON.stringify({ event, context }), // plain text body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions)

    return {
        statusCode: 302,
        headers: {
            Location: `${process.env.BASE_URL}/thankyou`,
            'Cache-Control': 'no-cache' // Forcing browsers to always follow redirects
        },
        body: JSON.stringify({ event, context }),
    };
}