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
        backgroundImage="assets/factory-n-certificate.jpeg"
      />
    <section className="px-20 ">
       <OurFactory/>
       <Certificates/>
      </section>
      <Footer />
    </>  )
}

export default FactoryNCertificate