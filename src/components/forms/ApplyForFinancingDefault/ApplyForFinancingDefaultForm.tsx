import { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@/ui/components/TextField/TextField'
import Button from '@/ui/components/Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import TextAreaField from '@/ui/components/TextField/TextAreaField'
import axios from 'axios'
import { WORDPRESS_API_PATHS } from '@/config/constants'
import styles from './ApplyForFinancingDefault.module.scss'

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
  business_objectives?: string
}

const ApplyForFinancingDefaultForm = ({
  className,
}: IApplyForFinancingDefault) => {
  // Using useForm hook with yupResolver to validate the form based on a schema
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  // State to track focus status for each field. Initially, all fields are not focused.
  const [isFocused, setIsFocused] = useState({
    name: false,
    business_name: false,
    email: false,
    amount_of_financing_requested: false,
    average_of_monthly_sales: false,
    phone: false,
    business_objectives: false,
  })

  // Function that triggers on blur (losing focus). It updates the focus state based on whether the field has a value.
  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target
    setIsFocused((prev) => ({
      ...prev,
      [name]: !!getValues(name as keyof IFormInput),
    }))
  }

  // Function that handles form submission
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsSubmitting(true)
    axios
      .post(
        `${process.env.WORDPRESS_API_URL!}/${WORDPRESS_API_PATHS.rest}/save-financial`,
        data,
      )
      .then((response) => {
        // TODO: display success message
        console.log(response)
        reset()
        setIsFocused({
          name: false,
          business_name: false,
          email: false,
          amount_of_financing_requested: false,
          average_of_monthly_sales: false,
          phone: false,
          business_objectives: false,
        })
      })
      .catch((err) => {
        // TODO: display error message
        console.log('error', err)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  // Array of field configurations. Each object contains the field's name, placeholder text, and any error messages.
  const fields: { name: string; placeholder: string; error?: string }[] = [
    { name: 'name', placeholder: 'Full Name', error: errors.name?.message },
    {
      name: 'business_name',
      placeholder: 'Business Name',
      error: errors.business_name?.message,
    },
    { name: 'email', placeholder: 'Email', error: errors.email?.message },
    {
      name: 'amount_of_financing_requested',
      placeholder: 'Amount of financing requested',
      error: errors.amount_of_financing_requested?.message,
    },
    {
      name: 'average_of_monthly_sales',
      placeholder: "What's your average monthly sales?",
      error: errors.average_of_monthly_sales?.message,
    },
    {
      name: 'phone',
      placeholder: 'Phone Number',
      error: errors.phone?.message,
    },
  ]

  return (
    <div className={classNames(styles['form'], className)}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form-body']}>
        <div className={styles['form-body-grid']}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              {...register(field.name as keyof IFormInput)}
              className={styles['form-body-grid-item']}
              placeholder={field.placeholder}
              error={field.error}
              isFocused={isFocused[field.name as keyof IFormInput]}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
          ))}
        </div>

        <TextAreaField
          {...register('business_objectives')}
          placeholder="Describe your business objectives!"
          isFocused={isFocused.business_objectives}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        <Button className={styles['form-action']} type="submit">
          {isSubmitting ? (
            <div className={styles['form-action-icon']}>
              <Image src="/animated-spinner.svg" alt="submitting" fill />
            </div>
          ) : null}
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ApplyForFinancingDefaultForm