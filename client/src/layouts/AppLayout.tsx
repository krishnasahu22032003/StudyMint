import { Outlet } from "react-router-dom";
import Footer from "../components/landing/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}