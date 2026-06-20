import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import { Routes , Route } from 'react-router-dom'
 
type Props = {}

const App = (props: Props) => {
  return (
<>
<Routes>
  <Route path='/' element={<LandingPage/>}/>
  <Route path='/auth' element={<AuthPage/>}/>
</Routes>
</>
  )
}

export default App