import CustomCursor from './components/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './features/home/Hero';
import Stats from './features/home/Stats';
import Services from './features/home/Services';
import Portfolio from './features/home/Portfolio';
import Testimonials from './features/home/Testimonials';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
