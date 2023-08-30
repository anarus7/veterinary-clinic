const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const cors = require('cors');

const app = express(); // Make sure this line comes before using the app variable
app.use(cors());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'anamaria.ruus93@gmail.com', // Replace with the email address where you want to receive the emails
    from: 'anamaria.ruus93@gmail.com', // Replace with your verified sender email address
    subject: 'Contact Form Submission',
    text: `${name} - ${email} - ${message}`,
    html: `<strong>${name} - ${email} - ${message}</strong>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
