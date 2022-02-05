import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export function Button({ isOutlined = false, ...rest }: Props): JSX.Element {
  return (
    <button
      className={`${styles.container} ${isOutlined ? styles.outlined : ''}`}
      type="button"
      {...rest}
    />
  )
}
