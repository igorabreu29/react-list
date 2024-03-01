import { ReactNode, createContext, useState } from "react";

type Theme = 'dark' | 'white'

interface ThemeContextState {
  theme: Theme,
  setTheme: (theme: Theme) => void
}

const initialState: ThemeContextState = {
  theme: 'dark',
  setTheme: () => undefined
}

export const ThemeContext = createContext<ThemeContextState>(initialState)

interface ThemeContextProviderProps {
  children: ReactNode
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storage = localStorage.getItem('theme')
    if (storage) return JSON.parse(storage)
    return 'dark'
  })

  return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
}