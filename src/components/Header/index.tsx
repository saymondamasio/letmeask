import { ReactNode, useContext } from 'react'
import { Link } from 'react-router-dom'
import logoDark from '../../assets/images/logo-dark.svg'
import logo from '../../assets/images/logo.svg'
import { ThemeContext } from '../../contexts/ThemeContext'
import { ThemeSwitcher } from '../ThemeSwitcher'
import styles from './styles.module.scss'

interface Props {
  children: ReactNode
  classContainer?: string
}

export default function Header({ children, classContainer }: Props) {
  const { theme } = useContext(ThemeContext)
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link to="/">
          {theme === 'dark' ? (
            <img src={logoDark} alt="Letmeask" />
          ) : (
            <img src={logo} alt="Letmeask" />
          )}
        </Link>
        <div className={classContainer}>
          <ThemeSwitcher />
          {children}
        </div>
      </div>
    </header>
  )
}
