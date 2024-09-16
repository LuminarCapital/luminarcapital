import { ChangeEvent } from 'react'
import classNames from 'classnames'
import styles from './TextField.module.scss'

interface ITextField {
  className?: string
  type?: 'text' | 'email' | 'password' | 'tel'
  placeholder?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  error?: string | null
}

const TextField = ({
  className,
  type = 'text',
  placeholder,
  value = '',
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
  error = null,
}: ITextField) => {
  return (
    <label className={classNames(styles['textField-container'], className)}>
      <input
        className={classNames(
          styles['textField-item'],
          error ? styles['error'] : null,
        )}
        type={type}
        onChange={onChange}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
      />
      {placeholder ? (
        <span
          className={classNames(
            styles['textField-placeholder'],
            value ? styles['textField-placeholder-active'] : '',
          )}
        >
          {placeholder}
        </span>
      ) : null}
      {error ? (
        <span className={styles['textField-error']}>{error}</span>
      ) : null}
    </label>
  )
}

export default TextField
