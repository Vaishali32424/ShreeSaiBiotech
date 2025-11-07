import React from 'react'
import Header from '../Header'
import PageBanner from '../PageBanner'
import Footer from '../Footer'
import CultureAndContact from '../WhyChooseUs/WhyChooseUs/CultureAndContact'
import ContactForm from './ContactForm'

const ContactUs = () => {
  return (
 <>
      <Header />
      <PageBanner
        title={"Contact Us"}
        breadcrumb={"Contact Us"}
        backgroundImage="https://www.greenspringshop.com/uploads/201818070/ImgScroll/ba201809191619119760216.jpg?size=2000x362"
      />
      <section className='px-20 mt-10'>
<CultureAndContact showCards={false}/>
<ContactForm/>
</section>
      <Footer />
    </>
      )
}

export default ContactUs