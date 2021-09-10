import nodemailer from 'nodemailer';

const appMail = process.env.EMAIL;
const appPassword = process.env.PASSWORD;

const transport = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: appMail,
    pass: appPassword,
  },
};
const transporter = nodemailer.createTransport(transport);

export const sendMail = (email: string, subject: string, content: string) => {
  const mail = {
    from: appMail,
    to: email,
    subject,
    text: content,
  };
  transporter.sendMail(mail);
};
