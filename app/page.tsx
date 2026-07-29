import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Trusted from '@/components/home/Trusted';
import Story from '@/components/home/Story';
import VirtualOffice from '@/components/home/VirtualOffice';
import AIEmployees from '@/components/home/AIEmployees';
import Workflow from '@/components/home/Workflow';
import Architecture from '@/components/home/Architecture';
import Security from '@/components/home/Security';
import Results from '@/components/home/Results';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import FullWidthImageSection from '@/components/home/Hero/Image';

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Hero />
              {/* <FullWidthImageSection /> */}

        {/* <Trusted />
        <Story />
        <VirtualOffice />
        <AIEmployees />
        <Workflow />
        <Architecture />
        <Security />
        <Results />
        <Testimonials />
        <CTA /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
