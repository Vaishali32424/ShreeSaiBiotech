import React from 'react'
import Header from '../../Header'
import PageBanner from '../../PageBanner'
import Footer from '../../Footer'
import QualityAssurance from './QualityAssurance'
import Advantage from './Advantage'
import ProductInfo from '../Innovation&Service/ProductInfo'

const QualityNRnD = () => {
  return (
  <><Header /><PageBanner
      title={"Quality & R&D"}
      breadcrumb={"About Us / Quality & R&D"}
        backgroundImage="assets/quality-n-r-d.jpeg"/>
      <section className="px-20 ">
<QualityAssurance/>
<Advantage/>
<ProductInfo/>

      </section><Footer /></>
    )
}

export default QualityNRnD