import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export function Button({
  isOutlined = false,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <button
      className={`${styles.container} ${
        isOutlined ? styles.outlined : ''
      } ${className}`}
      type="button"
      {...rest}
    />
  )
}
