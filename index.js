// app.js
require('dotenv').config();


const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const cors = require('cors'); // Import the cors package
const PORT = process.env.PORT || 3000;
app.use(cors()); // Enable CORS for all routes
const twilio = require('twilio');
app.use(bodyParser.json());

// POST route to handle incoming data and send WhatsApp message
app.post("/api/data", async (req, res) => {
  try {
    // Verify Twilio credentials are available
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      throw new Error('Twilio credentials not found. Check environment variables.');
    }
    console.log(req.body);
    // Extract data from request body
    const { to, body } = req.body;

    // Initialize Twilio client
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    // Create a WhatsApp message
    const message = await client.messages.create({
      from: `whatsapp:${+14155238886}`, // Twilio WhatsApp number
      body: body,
      to: `whatsapp:${+91+to}` // Recipient's WhatsApp number
    });

    // Log the message SID (optional)
    console.log('Message SID:', message.sid);

    // Respond with success message
    res.status(200).json({ message: 'WhatsApp message sent successfully!' });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.message);
    res.status(500).json({ error: 'Failed to send WhatsApp message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
