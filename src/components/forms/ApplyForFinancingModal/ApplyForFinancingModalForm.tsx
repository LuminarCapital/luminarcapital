import { useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'
import Slider from 'react-slick'
import TextField from '@/ui/components/TextField/TextField'
import SlickNextArrowPagination from '@/ui/components/Carousel/SlickArrowPagination/SlickNextArrowPagination'
import SlickPrevArrowPagination from '@/ui/components/Carousel/SlickArrowPagination/SlickPrevArrowPagination'
import styles from './ApplyForFinancingModalForm.module.scss'
import { AMOUNT_OPTIONS } from '@/config/constants'
import CheckboxField from '@/ui/components/CheckboxField/CheckboxField'

interface IApplyForFinancingModalForm {
  className?: string
}

interface IFormInput {
  name: string
  business_name: string
  email: string
  amount_of_financing_requested: string
  average_of_monthly_sales: string
  phone: string
}

const ApplyForFinancingModalForm = ({
  className,
}: IApplyForFinancingModalForm) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>()

  // State to track focus status for each field. Initially, all fields are not focused.
  const [isFocused, setIsFocused] = useState({
    name: false,
    business_name: false,
    email: false,
    phone: false,
  })

  const settings = {
    fade: true,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: classNames(styles['form-slider'], 'modal-slider'),
    nextArrow: <SlickNextArrowPagination />,
    prevArrow: <SlickPrevArrowPagination />,
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

  // Function that triggers on blur (losing focus). It updates the focus state based on whether the field has a value.
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setIsFocused((prev) => ({
      ...prev,
      [name]: !!getValues(name as keyof IFormInput),
    }))
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('data ', data)
  }
  console.log('getValues() ', getValues())
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(styles['form'], className)}
    >
      <Slider {...settings}>
        <div className={styles['form-step']}>
          <p className={classNames(styles['form-step-title'])}>
            What&apos;s the amount of financing requested?
          </p>
          <div className={styles['form-step-body']}>
            {AMOUNT_OPTIONS.map((option, index) => (
              <CheckboxField
                {...register('amount_of_financing_requested')}
                key={`financing-checkbox-0-${index}`}
                option={option}
              />
            ))}
          </div>
        </div>
        <div className={styles['form-step']}>
          <p className={classNames(styles['form-step-title'])}>
            What&apos;s your average monthly sales?
          </p>
          <div className={styles['form-step-body']}>
            {AMOUNT_OPTIONS.map((option, index) => (
              <CheckboxField
                {...register('average_of_monthly_sales')}
                key={`financing-checkbox-1-${index}`}
                option={option}
              />
            ))}
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
            />
            <TextField
              {...register('business_name')}
              className={styles['form-body-grid-item']}
              placeholder="Business Name"
              error={errors.business_name?.message}
              isFocused={isFocused['business_name']}
              onBlur={handleBlur}
              autoComplete="off"
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
            />
            <TextField
              {...register('email')}
              className={styles['form-body-grid-item']}
              placeholder="Email"
              error={errors.email?.message}
              isFocused={isFocused['email']}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
        </div>
      </Slider>
      {/*<Button className={styles['form-action']} type="submit">*/}
      {/*  Submit*/}
      {/*</Button>*/}
    </form>
  )
}

export default ApplyForFinancingModalForm
