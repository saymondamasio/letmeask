import { useContext } from 'react'
import { HiOutlineLightBulb as Light } from 'react-icons/hi'
import { ThemeContext } from '../../contexts/ThemeContext'
import styles from './styles.module.scss'

export function ThemeSwitcher() {
  const { toggleTheme } = useContext(ThemeContext)

  function handleChange() {
    toggleTheme()
  }

  return (
    <button className={styles.container} onClick={handleChange}>
      <Light size={32} />
    </button>
  )
}
