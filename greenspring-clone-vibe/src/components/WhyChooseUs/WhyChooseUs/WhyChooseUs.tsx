import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import PageBanner from "../../PageBanner";
import CompanyIntro from "./CompanyIntro";
import Cards from "./Cards";
import FactorySection from "./FactorySection";
import CultureAndContact from "./CultureAndContact";

const WhyChooseUs = () => {
  return (
    <>
      <Header />
      <PageBanner
        title={"About Us"}
        breadcrumb={"About Us"}
        backgroundImage="https://www.greenspringshop.com/uploads/202318070/ImgScroll/ba202311291047529283660.jpg?size=1280x281"
      />
    <section className="px-20 ">
        <CompanyIntro />
        <Cards/>
        <FactorySection/>
        <CultureAndContact showCards={true}/>
      </section>
      <Footer />
    </>
  );
};

export default WhyChooseUs;
