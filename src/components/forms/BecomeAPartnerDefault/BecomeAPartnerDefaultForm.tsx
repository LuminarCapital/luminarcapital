import classNames from 'classnames'
import { useForm, SubmitHandler } from 'react-hook-form'
import TextField from '@/ui/components/TextField/TextField'
import styles from './BecomeAPartnerDefault.module.scss'
import Button from '@/ui/components/Button/Button'

interface IBecomeAPartnerDefault {
  className?: string
}

interface IFormInput {
  name: string
  email: string
  company_name: string
  phone: string
}

const BecomeAPartnerDefaultForm = ({ className }: IBecomeAPartnerDefault) => {
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('onSubmit, data ', data)
  }

  return (
    <div className={classNames(styles['form'], className)}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form-body']}>
        <TextField {...register('name')} placeholder="Full Name" />
        <TextField {...register('email')} placeholder="Email" />
        <TextField {...register('company_name')} placeholder="Company Name" />
        <TextField {...register('phone')} placeholder="Phone Number" />
        <Button className={styles['form-action']} onClick={() => onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default BecomeAPartnerDefaultForm
