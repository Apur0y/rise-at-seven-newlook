import CustomCursor from './components/CustomCursor';
import AnnouncementBar from './components/home/AnnouncementBar';
import Navbar from './components/Navbar';
import Banner from './components/home/Banner';
import AgencyBehind from './components/home/AgencyBehind';
import AboutUs from './components/home/AboutUs';
import FeaturedWork from './components/home/FeaturedWork';
import OurServices from './components/home/OurServices';
import SendUsBrief from './components/home/SendUsBrief';
import LegacyInMaking from './components/home/LegacyInMaking';
import WhatsNew from './components/home/WhatsNew';
import ReadyToRise from './components/home/ReadyToRise';
import Footer from './components/home/Footer';
import SmoothScroll from './components/SmoothScroll';
import SendBrief from './components/home/SendBrief';
import LegacyIn from './components/home/LegacyIn';
import TheFeaturedWork from './components/home/TheFeaturedWork';
import Step1 from './components/home/TestFeatured';

export default function App() {
  return (
    
    <div className="min-h-screen bg-stone-100">
      <SmoothScroll>
      <CustomCursor />
      <AnnouncementBar />
      <Navbar />
      <Banner />
      <AgencyBehind />
      <AboutUs />
      {/* <FeaturedWork /> */}
      {/* <TheFeaturedWork/> */}
      <Step1/>
      <OurServices />
      <SendUsBrief />
      <LegacyIn/>
      <SendBrief/>
      <WhatsNew />
      <ReadyToRise />
      <Footer />
      </SmoothScroll>
    </div>
  );
}