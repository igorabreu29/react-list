import { List } from "./components/list";
import { Sun } from 'lucide-react'
import { useTheme } from "./hooks/use-theme";

export function App() {
  const { theme, setTheme } = useTheme()

  function handleTheme() {
    if (theme === 'dark') {
      setTheme('white')
      localStorage.setItem('theme', JSON.stringify('white'))
      return
    }
    setTheme('dark')
    localStorage.setItem('theme', JSON.stringify('dark'))
  }

  return (
    <div
      data-theme={theme === 'white'}
      className="flex items-start justify-center h-full relative min-h-screen bg-zinc-950 text-white data-[theme=true]:bg-zinc-200 data-[theme=true]:text-black transition-colors"
    >
      <div className='z-20 flex items-center justify-start flex-col gap-8 max-w-[26rem] w-full h-full overflow-hidden pt-16 px-4'>
        <div className='flex items-center justify-between w-full'>
          <h1 className="tracking-widest text-3xl font-bold">TODO</h1>
          <button aria-label="Button" onClick={handleTheme}>
            <Sun size={24} />
          </button>
        </div>
        <List />
      </div>
    </div>
  )
}