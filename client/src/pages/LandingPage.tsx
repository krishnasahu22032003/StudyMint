import About from "../components/landing/About";
import Features from "../components/landing/Features";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";


const LandingPage = () => {
  return (
    <main className="min-h-screen">
<Header/>
<Hero/>
<Features/>
<About/>
    </main>
  );
};

export default LandingPage;