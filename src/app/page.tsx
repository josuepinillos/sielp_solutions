import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Events } from "@/components/sections/Events";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Events />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
