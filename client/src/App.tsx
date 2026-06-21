import { useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import getUserDetails from './lib/getuserdetails'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import DashboardPage from './pages/DashboardPage'
import { Toaster } from "sonner";

type Props = {}

const App = (props: Props) => {

  const dispatch = useDispatch();

  useEffect(() => {

    getUserDetails(dispatch);

  }, [dispatch]);

  const { userData } = useSelector((state: RootState) => state.user)

  return (
    <>
    <Toaster richColors position='top-center'/>
      <Routes>
        <Route
          path="/"
          element={
            userData
              ? <Navigate to="/dashboard" replace />
              : <LandingPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            userData
              ? <DashboardPage />
              : <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  )
}

export default App