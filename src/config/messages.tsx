import { eachWordToUpperCase } from '@/utils/string/eachWordToUpperCase'

type dataProps = {
  name: string
  email: string
  company_name?: string
  phone: string
  business_name?: string
  amount_of_financing_requested?: string
  average_of_monthly_sales?: string
  business_objectives?: string
}

// eslint-disable-next-line no-unused-vars
type MessageValue = (data?: dataProps) => string

export const messages: { [key: string]: MessageValue } = {
  admin: (data) => {
    let answers: string = ''
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        answers += `<li><b style="font-family: Arial, Helvetica, sans-serif; margin-bottom: 0;">${eachWordToUpperCase(key.split('_').join(' '))}:</b><p style="font-family: Arial, Helvetica, sans-serif; margin-top: 0;">${value}</p></li>`
      }
    }

    return `
    <h3 style="font-family: Arial, Helvetica, sans-serif;">Hello!</h3>
    <p style="font-family: Arial, Helvetica, sans-serif;">A new request has just been submitted through the website and has been successfully saved in the admin panel.</p>
    <h4 style="font-family: Arial, Helvetica, sans-serif;">Details of the Submitted Request:</h4>
    <ul>
    ${answers}
    </ul>
    <p style="font-family: Arial, Helvetica, sans-serif;">Please log in to the <a href="https://admin.luminarcapital.com/wp-admin/" target="_blank">admin dashboard</a> to review the details.</p>
    <p style="font-family: Arial, Helvetica, sans-serif;">Thank you!</p>
    <p style="font-family: Arial, Helvetica, sans-serif; margin-bottom: 0;">Best regards,</p>
    <p style="font-family: Arial, Helvetica, sans-serif; margin-top: 0;">Luminar Capital Team</p>
`
  },
  user: () => {
    return `
  <h3 style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">Hello!</h3>
  <p style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">Thank you for completing the form on our website.</p>
  <p style="font-family: Arial, Helvetica, sans-serif; margin-top: 0; font-size: 11px;">We have successfully received your inquiry and our team will review it shortly.</p>
 
  <p style="font-family: Arial, Helvetica, sans-serif; margin-top: 0; font-size: 11px;">One of our specialists will get in touch with you within 1-2 business days to discuss your request in more detail and provide any necessary information.</p>
  <p style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">We truly appreciate your interest in our services, and we look forward to assisting you!</p>
  <p style="font-family: Arial, Helvetica, sans-serif; margin-bottom: 0; font-size: 11px;">Best regards,</p>
  <p style="font-family: Arial, Helvetica, sans-serif; margin-top: 0; font-size: 11px;"><b>Luminar Capital Team</b></p>
  `
  },
}
