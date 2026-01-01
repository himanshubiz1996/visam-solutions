import CustomCursor from './components/CustomCursor';
import Navbar from './components/layout/Navbar';
import Hero from './features/home/Hero';
import Stats from './features/home/Stats';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
      </main>
    </>
  );
}

export default App;
