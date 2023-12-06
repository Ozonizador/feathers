const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendMessage = async (req, res) => {
  const body = JSON.parse(req.body);
  try {
    await client.messages.create({
      to: body.number,
      from: "+1 302 261 5427",
      body: body.message,
    });

    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }
};

export default sendMessage;