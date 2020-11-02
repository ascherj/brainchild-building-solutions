// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const qs = require('querystring');

function generateContactEmail({ name, email, message }) {
  return `
    <div>
      <h2>Contact form submission</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    </div>
  `;
}

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event) => {
  const body = qs.parse(event.body);

  await transporter.sendMail({
    from: `Brainchild Building Solutions <noreply@brainchildbuildingsolutions.com>`,
    to: 'Jake Ascher <ascherj@gmail.com>',
    subject: 'Contact form submission',
    html: generateContactEmail(body),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
