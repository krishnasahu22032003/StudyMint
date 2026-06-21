import DashboardHeader from "../components/ui/DashboardHeader";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import signOutUser from "../lib/handleSignOut";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSignOut = async () => {
   
   await signOutUser(
    dispatch,
    navigate
  );

  };

  const handleHistory = () => {
    console.log("handle history")
  }

  const handleBuyCredits = () => {
    console.log("Buy credits clicked");
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen">
      <DashboardHeader
        userName={userData.name}
        credits={userData.credits}
        onSignOut={handleSignOut}
        onBuyCredits={handleBuyCredits}
        onHistory={handleHistory}
      />
    </div>
  );
};

export default DashboardPage;