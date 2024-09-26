import { useState, ChangeEvent, useRef, useCallback } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import Slider from 'react-slick'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@/ui/components/TextField/TextField'
import { AMOUNT_OPTIONS, WORDPRESS_API_PATHS } from '@/config/constants'
import CheckboxField from '@/ui/components/CheckboxField/CheckboxField'
import SuccessMessage from '@/ui/components/SuccessMesasge/SuccessMessage'
import { schema } from '../ApplyForFinancingDefault/schema'
import Button from '@/ui/components/Button/Button'
import styles from './ApplyForFinancingModalForm.module.scss'

interface IApplyForFinancingModalForm {
  className?: string
}

interface IFormInput {
  name: string
  business_name: string
  business_objectives?: string
  email: string
  amount_of_financing_requested: string
  average_of_monthly_sales: string
  phone: string
}

const fieldsBySteps: Record<number, Array<keyof IFormInput>> = {
  0: ['amount_of_financing_requested'],
  1: ['average_of_monthly_sales'],
  2: ['name', 'business_name'],
  3: ['phone', 'email'],
}

const ApplyForFinancingModalForm = ({
  className,
}: IApplyForFinancingModalForm) => {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })

  const sliderRef = useRef<Slider | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false)
  const [submittedError, setSubmittedError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  // State to track focus status for each field. Initially, all fields are not focused.
  const [isFocused, setIsFocused] = useState({
    name: false,
    business_name: false,
    email: false,
    phone: false,
  })

  const settings = {
    accessibility: false,
    swipe: false,
    touchMove: false,
    fade: true,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: classNames(styles['form-slider'], 'modal-slider'),
    arrows: false,
    customPaging: (i: number) => {
      return (
        <span className={classNames(styles['dot-item'], 'modal-slider-dot')}>
          {i + 1}
        </span>
      )
    },
    dots: true,
    dotsClass: classNames(styles['form-slider-dots'], 'modal-slider-dots'),
  }

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target
      setValue(name as keyof IFormInput, e.target.value)
      await trigger(name as keyof IFormInput)
    },
    [setValue, trigger],
  )

  // Function that triggers on blur (losing focus). It updates the focus state based on whether the field has a value.
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setIsFocused((prev) => ({
      ...prev,
      [name]: !!getValues(name as keyof IFormInput),
    }))
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.business_objectives = ''
    setIsSubmitting(true)
    axios
      .post(
        `${process.env.WORDPRESS_API_URL!}/${WORDPRESS_API_PATHS.save}/save-financial`,
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
              phone: false,
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
      })
  }

  const handleNext = useCallback(async () => {
    const currentFields =
      fieldsBySteps[currentSlide as keyof typeof fieldsBySteps]

    const isValid = await trigger(currentFields)

    if (isValid && Object.keys(errors).length === 0) {
      sliderRef.current?.slickNext()
      setCurrentSlide((prevState) => prevState + 1)
    }
  }, [currentSlide, errors, trigger])

  const handlePrevious = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      sliderRef.current?.slickPrev()
      setCurrentSlide((prevState) => prevState - 1)
    }
  }, [errors])

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setValue(name as keyof IFormInput, value)
      clearErrors(name as keyof IFormInput)
    },
    [clearErrors, setValue],
  )

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames(styles['form'], className)}
      >
        <Slider
          ref={(slider) => {
            sliderRef.current = slider
          }}
          {...settings}
        >
          <div className={styles['form-step']}>
            <p className={classNames(styles['form-step-title'])}>
              What&apos;s the amount of financing requested?
            </p>
            <div
              className={classNames(
                styles['form-step-body'],
                styles['checkboxes'],
              )}
            >
              {AMOUNT_OPTIONS.map((option, index) => (
                <CheckboxField
                  {...register('amount_of_financing_requested')}
                  key={`financing-checkbox-0-${index}`}
                  option={option}
                  onChange={handleCheckboxChange}
                />
              ))}
              {errors.amount_of_financing_requested?.message ? (
                <span className={styles['form-error']}>
                  {errors.amount_of_financing_requested.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className={styles['form-step']}>
            <p className={classNames(styles['form-step-title'])}>
              What&apos;s your average monthly sales?
            </p>
            <div
              className={classNames(
                styles['form-step-body'],
                styles['checkboxes'],
              )}
            >
              {AMOUNT_OPTIONS.map((option, index) => (
                <CheckboxField
                  {...register('average_of_monthly_sales')}
                  key={`financing-checkbox-1-${index}`}
                  option={option}
                  onChange={handleCheckboxChange}
                />
              ))}
              {errors.average_of_monthly_sales?.message ? (
                <span className={styles['form-error']}>
                  {errors.average_of_monthly_sales.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className={styles['form-step']}>
            <p className={classNames(styles['form-step-title'])}>
              Tell us about yourself
            </p>
            <div className={styles['form-step-body']}>
              <TextField
                {...register('name')}
                className={styles['form-body-grid-item']}
                placeholder="Full Name"
                error={errors.name?.message}
                isFocused={isFocused['name']}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
              />
              <TextField
                {...register('business_name')}
                className={styles['form-body-grid-item']}
                placeholder="Business Name"
                error={errors.business_name?.message}
                isFocused={isFocused['business_name']}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles['form-step']}>
            <p className={classNames(styles['form-step-title'])}>
              How can we connect?
            </p>
            <div className={styles['form-step-body']}>
              <TextField
                {...register('phone')}
                className={styles['form-body-grid-item']}
                placeholder="Phone Number"
                error={errors.phone?.message}
                isFocused={isFocused['phone']}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
              />
              <TextField
                {...register('email')}
                className={styles['form-body-grid-item']}
                placeholder="Email"
                error={errors.email?.message}
                isFocused={isFocused['email']}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>
        </Slider>
        {submittedError ? (
          <p className={classNames(styles['form-error'], styles['static'])}>
            {submittedError}
          </p>
        ) : null}
        <div className={styles['form-navigation']}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            className={classNames(
              styles['form-navigation-item'],
              styles['prev'],
              currentSlide === 0 ? styles['hidden'] : '',
            )}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className={classNames(
              styles['form-navigation-item'],
              styles['next'],
              currentSlide === 3 ? styles['hidden'] : '',
            )}
          >
            Next
          </Button>
          <Button
            className={classNames(
              styles['form-action'],
              currentSlide !== 3 ? styles['hidden'] : '',
            )}
            type="submit"
          >
            {isSubmitting ? (
              <div className={styles['form-action-icon']}>
                <Image src="/animated-spinner.svg" alt="submitting" fill />
              </div>
            ) : null}
            Submit
          </Button>
        </div>
      </form>
      {isSubmittedSuccess ? <SuccessMessage type="financing" /> : null}
    </>
  )
}

export default ApplyForFinancingModalForm
