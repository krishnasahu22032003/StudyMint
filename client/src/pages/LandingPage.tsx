import About from "../components/landing/About";
import CTA from "../components/landing/CTA";
import Features from "../components/landing/Features";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonial";


const LandingPage = () => {
  return (
    <main className="min-h-screen">
<Header/>
<Hero/>
<Features/>
<About/>
<Testimonials/>
<Pricing/>
<CTA/>
    </main>
  );
};

export default LandingPage;