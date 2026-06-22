import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from '../components/ui/DashboardHeader'
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../redux/store';
import signOutUser from "../lib/handleSignOut";
import TopicForm from '../components/ui/TopicForm';
import { useState } from 'react';

type Props = {}

const NotesPage = (props: Props) => {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState("")
    const { userData } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good morning"
            : hour < 17
                ? "Good afternoon"
                : "Good evening";

    const handleSignOut = async () => {
        await signOutUser(dispatch, navigate);
    };

    const handleHistory = () => {
        navigate("/history")
    };

    const handleBuyCredits = () => {
        navigate("/pricing");
    }

    if (!userData) return null;

    const firstName = userData.name?.split(" ")[0] ?? "there";

    return (
        <div className="min-h-screen bg-bg">
            <DashboardHeader
                userName={userData.name}
                credits={userData.credits}
                onSignOut={handleSignOut}
                onBuyCredits={handleBuyCredits}
                onHistory={handleHistory}
            />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 pb-20">

            

                <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
            </main>
        </div>
    )
}

export default NotesPage