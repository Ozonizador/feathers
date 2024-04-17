import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { Formidable } from "formidable";

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);

// Handles POST requests to /api
export default async function POST(request, res) {
  console.log("dealing with request");

  const data = await new Promise((resolve, reject) => {
    const form = new Formidable();

    form.parse(request, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  const email = data.fields.email;
  const name = data.fields.name;
  const message = data.fields.message;
  const phone = data.fields.phone;

  const mailData = {
    from: "info@unihosts.pt",
    to: "info@unihosts.pt",
    subject: `Unihosts: Contacto de ${name}`,
    html: `
          <p>Email: ${email}</p>
          <p>Telemóvel: ${phone}<p>
          <p>${message}</p>
          `,
  };

  try {
    await mail.send(mailData);

    res.status(200).json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }

  return res.json({ message: "Success: email was sent" });
}
