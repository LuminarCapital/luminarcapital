import axios from 'axios'
import { WORDPRESS_API_PATHS } from '@/config/constants'

export const getPost = async (id: number) => {
  return await axios.get(
    `${process.env.WORDPRESS_API_URL!}/${WORDPRESS_API_PATHS.fetch}/posts/${id}`,
  )
}
