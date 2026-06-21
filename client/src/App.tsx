import { useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import { Routes , Route } from 'react-router-dom'
import getUserDetails from './lib/getuserdetails'
 
type Props = {}

const App = (props: Props) => {

  useEffect(()=>{
   
    getUserDetails() ;
    
  },[]);


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