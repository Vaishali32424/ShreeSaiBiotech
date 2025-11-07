import Header from '@/components/Header'
import PageBanner from '@/components/PageBanner'
import React from 'react'

import OurFactory from './OurFactory'
import Certificates from './Certificates'
import Footer from '@/components/Footer'

const FactoryNCertificate = () => {
  return (
    <>
      <Header />
      <PageBanner
        title={"Factory & Certificates"}
        breadcrumb={"About Us / Factory & Certificates "}
        backgroundImage="https://www.greenspringshop.com/uploads/202318070/ImgScroll/ba202312051137303316768.jpg?size=1200x215"
      />
    <section className="px-20 ">
       <OurFactory/>
       <Certificates/>
      </section>
      <Footer />
    </>  )
}

export default FactoryNCertificate