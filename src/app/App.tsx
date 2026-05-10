import CustomCursor from './components/CustomCursor';
import AnnouncementBar from './components/home/AnnouncementBar';
import Navbar from './components/Navbar';
import Banner from './components/home/Banner';
import AgencyBehind from './components/home/AgencyBehind';
import AboutUs from './components/home/AboutUs';
import FeaturedWork from './components/home/FeaturedWork';
import OurServices from './components/home/OurServices';
import SendUsBrief from './components/home/SendUsBrief';
import WhatsNew from './components/home/WhatsNew';
import Footer from './components/home/Footer';
import SmoothScroll from './components/SmoothScroll';
import SendBrief from './components/home/SendBrief';
import LegacyIn from './components/home/LegacyIn';
import TheFeaturedWork from './components/home/TheFeaturedWork';
import ReadyToRise from './components/home/ReadyToRise';
import ReadyToRise0 from './components/home/ReadyToRise0';


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
      <TheFeaturedWork/>
      <OurServices />
      {/* <SendUsBrief /> */}
      {/* <SendBrief/> */}
      {/* <LegacyIn/> */}
      <WhatsNew />
      <ReadyToRise />
      {/* <ReadyToRise0 /> */}
      <Footer />
      </SmoothScroll>
    </div>
  );
}