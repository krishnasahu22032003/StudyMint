import DashboardHeader from "../components/ui/DashboardHeader";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const DashboardPage = () => {
  const { userData } = useSelector((state: RootState) => state.user);

  const handleSignOut = () => {
    console.log("Sign out clicked");

    // call logout API
    // dispatch(clearUserData())
    // navigate("/")
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