const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (req, res) => {
  const body = JSON.parse(req.body);
  const dynamicTemplateData = body.data;
  try {
    await mail.send({
      to: body.email,
      from: "notifications@unihosts.pt",
      templateId: body.templateId,
      dynamicTemplateData: dynamicTemplateData
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

export default sendMail;