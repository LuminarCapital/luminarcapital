import { ChangeEvent, useCallback, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MultiValue, SingleValue } from 'react-select'
import TextField from '@/ui/components/TextField/TextField'
import Button from '@/ui/components/Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import TextAreaField from '@/ui/components/TextField/TextAreaField'
import axios from 'axios'
import {
  AMOUNT_OPTIONS,
  EMAIL_SUBJECT,
  WORDPRESS_API_PATHS,
} from '@/config/constants'
import SuccessMessage from '@/ui/components/SuccessMesasge/SuccessMessage'
import SelectField from '@/ui/components/SelectField/SelectField'
import { IOption } from '@/types'
import { browserSendEmail } from '@/utils/email/bowserSendEmail'
import Skeleton from 'react-loading-skeleton'
import styles from './ApplyForFinancingDefault.module.scss'
import { messages } from '@/config/messages'
import PPMessage from '@/ui/components/PPMessage/PPMessage'

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
    setValue,
    clearErrors,
    trigger,
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
        `${process.env.WORDPRESS_API_URL!}/${WORDPRESS_API_PATHS.save}/save-financial`,
        data,
      )
      .then(async (response) => {
        if (response.data.success && response.status === 200) {
          // Send email notification to admin
          await browserSendEmail({
            subject: EMAIL_SUBJECT.FINANCING,
            htmlMessage: messages.admin(data),
          })
          // Send email notification to user
          await browserSendEmail({
            to: data.email,
            subject: EMAIL_SUBJECT.FINANCING,
            htmlMessage: messages.user(),
          })

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
        }, 5000)
      })
  }

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target
      setValue(name as keyof IFormInput, e.target.value)
      await trigger(name as keyof IFormInput)
    },
    [setValue, trigger],
  )

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
              onChange={handleChange}
            />
            <TextField
              {...register('business_name')}
              className={styles['form-body-grid-item']}
              placeholder="Business Name"
              error={errors.business_name?.message}
              isFocused={isFocused['business_name']}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              {...register('phone')}
              className={styles['form-body-grid-item']}
              placeholder="Phone Number"
              error={errors.phone?.message}
              isFocused={isFocused['phone']}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              {...register('email')}
              className={styles['form-body-grid-item']}
              placeholder="Email"
              error={errors.email?.message}
              isFocused={isFocused['email']}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!isSubmittedSuccess ? (
              <>
                <SelectField
                  className={styles['form-body-grid-item']}
                  options={AMOUNT_OPTIONS}
                  placeholder="Amount of financing requested"
                  onChange={(newValue) =>
                    handleSelectChange(
                      newValue,
                      'amount_of_financing_requested',
                    )
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
              </>
            ) : (
              <>
                <div className={styles['form-body-grid-item']}>
                  <Skeleton height="40rem" />
                </div>
                <div className={styles['form-body-grid-item']}>
                  <Skeleton height="40rem" />
                </div>
              </>
            )}
          </div>

          <TextAreaField
            {...register('business_objectives')}
            placeholder="Describe your business objectives!"
            isFocused={isFocused.business_objectives}
            onBlur={handleBlur}
          />
          <PPMessage />
          <Button
            className={styles['form-action']}
            type="submit"
            disabled={isSubmitting}
          >
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
