import React from 'react'
import Header from '../../Header'
import PageBanner from '../../PageBanner'
import Footer from '../../Footer'
import InfoSection from './InfoSection'
import ProductInfo from './ProductInfo'

const InovationNService = () => {
  return (
 <>
      <Header />
      <PageBanner
        title={"Inovation & Service"}
        breadcrumb={"About Us / Inovation & Service"}
        backgroundImage="https://www.greenspringshop.com/uploads/202318070/ImgScroll/ba202302091333040720578.jpg?size=1920x300"
      />
    <section className="px-20 bg-gray-50">
    <InfoSection/>
    <ProductInfo/>
    </section>
      <Footer />
    </> 
     )
}

export default InovationNService

