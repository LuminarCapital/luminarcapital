import { NextApiResponse, NextApiRequest } from 'next'
import { sendEmail } from '@/utils/email'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { subject, htmlMessage } = req.body

    const response = await sendEmail({
      subject,
      htmlMessage,
    })
    res.status(200).json({ success: true, response, error: null })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, response: null, error: error as Error })
  }
}

export default handler
