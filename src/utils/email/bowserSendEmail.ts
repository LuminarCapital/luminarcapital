import axios from 'axios'
import { ISendEmail } from '@/utils/email/index'

export const browserSendEmail = async ({
  subject,
  htmlMessage,
}: ISendEmail) => {
  htmlMessage = `
    <h3 style="font-family: Arial, Helvetica;">Hello!</h3>
    <p style="font-family: Arial, Helvetica;">A new request has just been submitted through the website and has been successfully saved in the admin panel.</p>
    <p style="font-family: Arial, Helvetica;">Please log in to the <a href="https://admin.luminarcapital.com/wp-admin/" target="_blank">admin dashboard</a> to review the details.</p>
    <p style="font-family: Arial, Helvetica;">Thank you!</p>
    <p style="font-family: Arial, Helvetica; margin-bottom: 0;">Best regards,</p>
    <p style="font-family: Arial, Helvetica; margin-top: 0;">Luminar Capital Team</p>
`

  return await axios.post('/api/email', { subject, htmlMessage })
}
