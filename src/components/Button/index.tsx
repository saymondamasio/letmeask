import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ ...rest }: Props): JSX.Element {
  return <button className={styles.container} type="button" {...rest} />
}
