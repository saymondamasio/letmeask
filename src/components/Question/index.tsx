import cx from 'classnames'
import { ReactNode } from 'react'
import avatar from '../../assets/images/avatar.svg'
import styles from './styles.module.scss'

type Props = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  containerButtonsClass?: string
  isAnswered: boolean
  isHighlighted: boolean
}

export function Question({
  author,
  content,
  children,
  containerButtonsClass,
  isAnswered = false,
  isHighlighted = false,
}: Props) {
  return (
    <div
      className={cx(styles.container, {
        [styles.answered]: isAnswered,
        [styles.highlighted]: isHighlighted && !isAnswered,
      })}
    >
      <p>{content}</p>
      <footer>
        <div className={styles.userInfo}>
          <img
            src={author.avatar}
            alt={author.name}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = avatar)
            }
          />

          <span>{author.name}</span>
        </div>

        <div className={containerButtonsClass}>{children}</div>
      </footer>
    </div>
  )
}
