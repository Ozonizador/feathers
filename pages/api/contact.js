import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { Formidable } from "formidable";

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

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

  // create transporter object
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailData = {
    from: { name: name, address: email },
    to: "info@unihosts.pt",
    subject: `Unihosts: Contacto de ${name}`,
    html: `
          <p>${message}</p>
          `,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
        res.status(500).json({ message: "COULD NOT SEND MESSAGE" });
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  return res.json({ message: "Success: email was sent" });
}
