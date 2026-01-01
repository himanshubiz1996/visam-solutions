import AboutHero from './AboutHero';
import Mission from './Mission';
import Process from './Process';
import Timeline from './Timeline';
import Team from './Team';
import FounderMessage from './FounderMessage';
import CallToAction from './CallToAction';

export default function AboutPage() {
  return (
    <div className="bg-night">
      <AboutHero />
      <Mission />
      <FounderMessage />
      <Process />
      <Timeline />
      <Team />
      <CallToAction />
    </div>
  );
}
