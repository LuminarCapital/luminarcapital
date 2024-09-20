import classNames from 'classnames'
import styles from './ApplyForFinancingDefault.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@/ui/components/TextField/TextField'
import Button from '@/ui/components/Button/Button'

interface IApplyForFinancingDefault {
  className?: string
}

interface IFormInput {
  name: string
  business_name: string
  email: string
  amount_of_financing_requested: string
  average_of_monthly_sales: string
  phone: string
  business_objectives: string
}

const ApplyForFinancingDefaultForm = ({
  className,
}: IApplyForFinancingDefault) => {
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('onSubmit, data ', data)
  }

  return (
    <div className={classNames(styles['form'], className)}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form-body']}>
        <TextField {...register('name')} placeholder="Full Name" />
        <TextField {...register('business_name')} placeholder="Business Name" />
        <TextField {...register('email')} placeholder="Email" />
        <TextField
          {...register('amount_of_financing_requested')}
          placeholder="Amount of financing requested"
        />
        <TextField
          {...register('average_of_monthly_sales')}
          placeholder="What's your average monthly sales?"
        />
        <TextField {...register('phone')} placeholder="Phone Number" />
        <TextField
          {...register('business_objectives')}
          placeholder="Describe your business objectives!"
        />
        <Button className={styles['form-action']} onClick={() => onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ApplyForFinancingDefaultForm
