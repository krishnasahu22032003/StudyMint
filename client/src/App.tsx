import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import PaymentSuccess from "./pages/PaymentSuccess";
import type { RootState } from "./redux/store";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import getUserDetails from "./lib/getuserdetails";
import AppLayout from "./layouts/AppLayout";
import HistoryPage from "./pages/HistoryPage";
import NotesPage from "./pages/NotesPage";
import PricingPage from "./pages/PricingPage";
import PaymentFailed from "./pages/PaymenFailed";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ContactPage from "./pages/ContactPage";

type Props = {};

const App = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails(dispatch);
  }, [dispatch]);

  const { userData } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <Toaster
        richColors
        position="top-center"
      />

      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              userData ? (
                <Navigate
                  to="/dashboard"
                  replace
                />
              ) : (
                <LandingPage />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              userData ? (
                <DashboardPage />
              ) : (
                <Navigate
                  to="/"
                  replace
                />
              )
            }
          />
          <Route
            path="/history"
            element={
              userData ? (
                <HistoryPage />
              ) : (
                <Navigate
                  to="/"
                  replace
                />
              )
            }
          />
          <Route
            path="/notes"
            element={
              userData ? (
                <NotesPage />
              ) : (
                <Navigate
                  to="/"
                  replace
                />
              )
            }
          />
          <Route
            path="/pricing"
            element={
              userData ? (
                <PricingPage />
              ) : (
                <Navigate
                  to="/"
                  replace
                />
              )
            }
          />
        </Route>
        <Route
          path="/payment-failed"
          element={<PaymentFailed />}
        />
        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />

        <Route
  path="/privacy-policy"
  element={<PrivacyPolicy/>}
/>

<Route
  path="/terms-and-conditions"
  element={<TermsAndConditions/>}
/>

<Route
  path="/refund-policy"
  element={<RefundPolicy/>}
/>

<Route
  path="/contact"
  element={<ContactPage/>}
/>

      </Routes>
    </>
  );
};

export default App;