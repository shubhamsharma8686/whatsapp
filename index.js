// app.js
require('dotenv').config();


const express = require("express");
const app = express();

const cors = require('cors'); // Import the cors package
const PORT = process.env.PORT || 3000;
app.use(cors()); // Enable CORS for all routes

app.post("/api/data", (req, res) => {
  res.send("Hello, Node.js!");
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const formData = req;
  console.log('Received Form Data:', formData);
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: "Hello, there!",
      mediaUrl: ['https://demo.twilio.com/owl.png'],
      to: "whatsapp:+919319722106",
    })
    .then((message) => console.log(message.sid));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
