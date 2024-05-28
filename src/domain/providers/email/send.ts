import { render } from '@react-email/render'
import nodemailer from 'nodemailer'

import { BookingTemplate } from './templates/booking/BookingTemplate'

const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  secureConnection: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
} as any)

export const sendEmail = async (data: Record<string, any>) => {
  const { email, ...booking } = data
  console.info({ email, booking })

  try {
    // const resend = new Resend(apiKey)

    // await resend.contacts.create({
    //   email,
    //   audienceId,
    // })

    // await resend.emails.send({
    await transporter.sendMail({
      from: `Aloja Fácil <${smtpUser}>`,
      to: email,
      subject: 'Booking successful!',
      html: render(BookingTemplate({ booking } as any)),
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
