import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import Map from './Map';

export default function ContactPage() {
  return (
    <div className="bg-night">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <Map />
    </div>
  );
}
