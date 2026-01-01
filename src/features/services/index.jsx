import ServiceHeroWithGrid from './ServicesHeroWithGrid';
import ProcessDetailed from './ProcessDetailed';
import WhyChooseUs from './WhyChooseUs';
import TechStack from './TechStack';
import Pricing from './Pricing';
import AllServices from './AllServices';

export default function ServicesPage() {
  return (
    <div className="bg-night">
      <ServiceHeroWithGrid />
      <AllServices />
      <ProcessDetailed />
      <WhyChooseUs />
      <TechStack />
      <Pricing />
    </div>
  );
}
