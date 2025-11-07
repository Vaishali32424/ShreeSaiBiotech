import Header from "@/components/Header";
import HeroSection from "@/components/LandingPage/HeroSection";
import ContactSidebar from "@/components/LandingPage/ContactSidebar";
import { ProductCarousel } from "@/components/LandingPage/ProductCarousel";
import AboutSection from "@/components/LandingPage/AboutSection";
import HotProducts from "@/components/LandingPage/HotProducts";
import HomeContact from "@/components/LandingPage/HomeContact";
import ProductMarketSection from "@/components/LandingPage/ProductMarketSection";
import LatestCaseSection from "@/components/LandingPage/LatestCaseSection";
import LatestNews from "@/components/LandingPage/LatestNews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
            {/* <ProductCarousel /> */}
            <AboutSection/>
            <HotProducts/>
            <HomeContact/>
            <ProductMarketSection/>
            <LatestCaseSection/>
            <div  className="w-full h-[300px] bg-[#F5F5F5]"></div>
            <LatestNews/>
            <Footer />
      <ContactSidebar />
    </div>
  );
};

export default Index;
