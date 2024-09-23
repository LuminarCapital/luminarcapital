import { ChangeEvent, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@/ui/components/TextField/TextField'
import Button from '@/ui/components/Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import TextAreaField from '@/ui/components/TextField/TextAreaField'
import axios from 'axios'
import { AMOUNT_OPTIONS, WORDPRESS_API_PATHS } from '@/config/constants'
import SuccessMessage from '@/ui/components/SuccessMesasge/SuccessMessage'
import SelectField from '@/ui/components/SelectField/SelectField'
import { IOption } from '@/types'
import { MultiValue, SingleValue } from 'react-select'
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
  const router = useRouter()
  // Using useForm hook with yupResolver to validate the form based on a schema
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false)
  const [submittedError, setSubmittedError] = useState<string | null>(null)

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
        if (response.data.success && response.status === 200) {
          setIsSubmittedSuccess(true)

          setTimeout(() => {
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
          }, 1000)
        }
      })
      .catch((err) => {
        // Set error message and clear it after 3 seconds
        setSubmittedError(err.response.data.message)
        setTimeout(() => setSubmittedError(null), 3000)
      })
      .finally(() => {
        setIsSubmitting(false)
        // Automatically hide the success message after 8 seconds
        setTimeout(() => {
          setIsSubmittedSuccess(false)
          router.reload()
        }, 8000)
      })
  }

  const handleSelectChange = useCallback(
    (
      newValue: SingleValue<IOption> | MultiValue<IOption>,
      fieldName: keyof IFormInput,
    ) => {
      if (Array.isArray(newValue)) {
        // Check if the value is an array (MultiValue), iterate through each option
        newValue.forEach((option) => {
          if ('value' in option) {
            setValue(fieldName, option.value)
          }
        })
      } else {
        // For SingleValue option, log the value
        if (newValue && 'value' in newValue) {
          setValue(fieldName, newValue.value)
        }
      }
      clearErrors(fieldName)
    },
    [clearErrors, setValue],
  )

  return (
    <>
      <div className={classNames(styles['form'], className)}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['form-body']}>
          <div className={styles['form-body-grid']}>
            <TextField
              {...register('name')}
              className={styles['form-body-grid-item']}
              placeholder="Full Name"
              error={errors.name?.message}
              isFocused={isFocused['name']}
              onBlur={handleBlur}
            />
            <TextField
              {...register('business_name')}
              className={styles['form-body-grid-item']}
              placeholder="Business Name"
              error={errors.business_name?.message}
              isFocused={isFocused['business_name']}
              onBlur={handleBlur}
            />
            <TextField
              {...register('email')}
              className={styles['form-body-grid-item']}
              placeholder="Email"
              error={errors.email?.message}
              isFocused={isFocused['email']}
              onBlur={handleBlur}
            />
            <SelectField
              className={styles['form-body-grid-item']}
              options={AMOUNT_OPTIONS}
              placeholder="Amount of financing requested"
              onChange={(newValue) =>
                handleSelectChange(newValue, 'amount_of_financing_requested')
              }
              error={errors.amount_of_financing_requested?.message}
            />
            <SelectField
              className={styles['form-body-grid-item']}
              options={AMOUNT_OPTIONS}
              placeholder="What's your average monthly sales?"
              onChange={(newValue) =>
                handleSelectChange(newValue, 'average_of_monthly_sales')
              }
              error={errors.average_of_monthly_sales?.message}
            />
            <TextField
              {...register('phone')}
              className={styles['form-body-grid-item']}
              placeholder="Phone Number"
              error={errors.phone?.message}
              isFocused={isFocused['phone']}
              onBlur={handleBlur}
            />
          </div>

          <TextAreaField
            {...register('business_objectives')}
            placeholder="Describe your business objectives!"
            isFocused={isFocused.business_objectives}
            onBlur={handleBlur}
          />
          <Button className={styles['form-action']} type="submit">
            {isSubmitting ? (
              <div className={styles['form-action-icon']}>
                <Image src="/animated-spinner.svg" alt="submitting" fill />
              </div>
            ) : null}
            Submit
          </Button>
          {submittedError ? (
            <p className={styles['form-error']}>{submittedError}</p>
          ) : null}
        </form>
      </div>
      {isSubmittedSuccess ? <SuccessMessage type="financing" /> : null}
    </>
  )
}

export default ApplyForFinancingDefaultForm
