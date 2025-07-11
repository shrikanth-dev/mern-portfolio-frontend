import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

//Only exports a constant, no React component
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
















// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// type Theme = 'light' | 'dark'

// interface ThemeContextType {
//   theme: Theme
//   toggleTheme: () => void
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light')

//   useEffect(() => {
//     document.body.className = theme
//     localStorage.setItem('theme', theme)
//   }, [theme])

//   const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

//   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
// }

// export const useTheme = (): ThemeContextType => {
//   const context = useContext(ThemeContext)
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider')
//   }
//   return context
// }
