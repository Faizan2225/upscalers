import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import StatsCards from "./components/StatsCards";
import About from "./components/About";
import Footer from "./components/Footer";
import MenuButton from "./components/MenuButton";

export default function Home() {
  return (
    <>
      <MenuButton />
      <Hero />
      <Services />
      <CaseStudies />
      <StatsCards />
      <About />
      <Footer />
    </>
  );
}
