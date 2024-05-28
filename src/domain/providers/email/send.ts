import { Resend } from 'resend'
import { render } from '@react-email/render'
import { BookingTemplate } from './templates/booking/BookingTemplate'

const apiKey = process.env.RESEND_API_KEY

export const sendEmail = async (data: Record<string, any>) => {
  const { email, ...booking } = data

  try {
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Aloja Fácil <no-reply@alojafacil.dev>',
      to: email,
      subject: 'Booking successful!',
      html: render(BookingTemplate({ booking } as any)),
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
