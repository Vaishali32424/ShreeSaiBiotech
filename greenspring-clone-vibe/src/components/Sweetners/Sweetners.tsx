import React from 'react'
import Header from '../Header'
import PageBanner from '../PageBanner'
import Footer from '../Footer'
import CultureAndContact from '../WhyChooseUs/WhyChooseUs/CultureAndContact'
import ProductsPage from '@/components/Products/ProductsPage'
import CompanyAdvantage from './CompanyAdvantage'
import SugarReductionPage from './SugarReductionPage'
import ComparisonTable from './ComparisonTable'
import SweetenerPage from './SweetnersPage'
import IndustrySolutions from './IndustrySolutions'
import AdvantageOfSweetner from './AdvantageOfSweetner'
import CompoundSolutionGuide from './CompoundSolutionGuide'
import ProductCenter from './ProductCenter'

const Products = () => {
  return (
 <>
      <Header />
      <PageBanner
        title={"Sweetner"}
        breadcrumb={"Sweetner"}
        backgroundImage="assets/farminggg.jpeg"
      />
      <section className='px-20'>
<CompanyAdvantage />
<SugarReductionPage />
<SweetenerPage/>
<ComparisonTable />
<IndustrySolutions/>
<AdvantageOfSweetner />
<CompoundSolutionGuide />
<ProductCenter/>
</section>
      <Footer />
    </>
      )
}

export default Products