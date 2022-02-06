import { createContext, ReactNode, useEffect } from 'react'
import { usePersistedState } from '../hooks/usePersistedState'

interface ThemeContextData {
  theme: string
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as ThemeContextData)

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = usePersistedState(
    'theme',
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  )

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
