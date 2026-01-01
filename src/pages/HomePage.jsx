import { lazy } from 'react';
const Hero = lazy(() => import('../features/home/Hero'));
const Services = lazy(() => import('../features/home/Services'));
const Portfolio = lazy(() => import('../features/home/Portfolio'));
const Testimonials = lazy(() => import('../features/home/Testimonials'));
const Stats = lazy(() => import('../features/home/Stats'));
const BlogPreview = lazy(() => import('../features/home/BlogPreview'));
const FAQ = lazy(() => import('../features/home/FAQ'));
const CTA = lazy(() => import('../features/home/CTA'));

export default function HomePage() {
  return (
    <div className="bg-night">
      <Hero />           {/* Hook + Attention */}
      <Services />       {/* What we offer */}
      <Portfolio />      {/* Social proof - Best work */}
      <Stats />          {/* Numbers that impress */}
      <Testimonials />   {/* Client reviews */}
      <BlogPreview />    {/* Thought leadership */}
      <FAQ />            {/* Answer doubts */}
      <CTA />            {/* Final call to action */}
    </div>
  );
}
