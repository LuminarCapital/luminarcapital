import nodemailer, { TransportOptions } from 'nodemailer'
import striptags from 'striptags'

export interface ISendEmail {
  subject: string
  htmlMessage?: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as TransportOptions)

export const sendEmail = async ({ subject, htmlMessage = '' }: ISendEmail) => {
  return await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject,
    text: striptags(htmlMessage),
    html: htmlMessage,
  })
}
