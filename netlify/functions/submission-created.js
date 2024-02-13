import { createTransport } from 'nodemailer';

export async function handler(event, context) {

    let transporter = createTransport({
        host: "smtpout.secureserver.net", // GoDaddy SMTP host
        secure: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: process.env.EMAIL, // your GoDaddy email from Netlify environment variable
            pass: process.env.EMAIL_PASSWORD // your GoDaddy email password from Netlify environment variable
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
            "Access-Control-Allow-Origin": "https://www.dawnercreative.com", // Allow CORS from your site
            "Access-Control-Allow-Headers": "Content-Type",
            'Cache-Control': 'no-cache' // Forcing browsers to always follow redirects
        },
        body: JSON.stringify({ event, context }),
    };
}