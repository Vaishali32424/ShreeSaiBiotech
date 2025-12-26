import React from 'react'
import Header from '../../Header'
import PageBanner from '../../PageBanner'
import Footer from '../../Footer'
import CardsSection from './CardSection'
import InfoSection from './InfoSection'
import ProductInfo from './ProductInfo'

const WhatWeCanDo = () => {
  return (
 <>
      <Header />
      <PageBanner
        title={"What We Can Do"}
        breadcrumb={"About Us / What We Can Do"}
        backgroundImage="assets/what-can-we-do.jpeg"
      />
    <section className="px-20 ">
      <InfoSection/>
    <CardsSection/>
    <ProductInfo/>
    </section>
      <Footer />
    </>
      )
}

export default WhatWeCanDo


