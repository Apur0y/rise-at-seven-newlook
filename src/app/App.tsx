import CustomCursor from './components/CustomCursor';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import AgencyBehind from './components/AgencyBehind';
import AboutUs from './components/AboutUs';
import FeaturedWork from './components/FeaturedWork';
import OurServices from './components/OurServices';
import SendUsBrief from './components/SendUsBrief';
import LegacyInMaking from './components/LegacyInMaking';
import WhatsNew from './components/WhatsNew';
import ReadyToRise from './components/ReadyToRise';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <AnnouncementBar />
      <Navbar />
      <Banner />
      <AgencyBehind />
      <AboutUs />
      <FeaturedWork />
      <OurServices />
      <SendUsBrief />
      <LegacyInMaking />
      <WhatsNew />
      <ReadyToRise />
      <Footer />
    </div>
  );
}