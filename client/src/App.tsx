import { useTheme } from "./context/ThemeContext"

type Props = {}

const App = (props: Props) => {
   const { theme, toggleTheme } = useTheme();
  return (
     <button onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  )
}

export default App