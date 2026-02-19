import { Navbar } from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ValueProposition from "@/components/home/ValueProposition";
import FeaturedDesigners from "@/components/home/FeaturedDesigners";
import HowItWorks from "@/components/home/HowItWorks";
import WaitlistForm from "@/components/home/WaitlistForm";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <FeaturedDesigners />
        <HowItWorks />
        <WaitlistForm />
        <Footer />
      </main>
    </>
  );
}
