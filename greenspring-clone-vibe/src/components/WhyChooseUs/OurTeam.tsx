import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import PageBanner from '../PageBanner'

const OurTeam = () => {
     const team = [
    {
      name: "Qiang Hua",
      role: "CEO",
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/20231113105109ea0887ba935e4cb18a817797df6bc9e5.jpg?size=1600x0",
    },
    {
      name: "Jady",
      role: "Vice General Manager",
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/2023111310520592067729e3ff4af5b66033d4b3d3bc97.jpg?size=x0",
    },
   
    {
      name: "Yan Liang",
      role: "Quality Control",
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/20231113105109ea0887ba935e4cb18a817797df6bc9e5.jpg?size=1600x0",
    },
     {
      name: "Cassie Zhao",
      role: "Sales Director",
      img: "https://www.greenspringshop.com/Content/uploads/2023389378/2023111310520592067729e3ff4af5b66033d4b3d3bc97.jpg?size=x0",
    },
  ];
  return (
 <>
      <Header />
      <PageBanner
        title={"Meet Our Team"}
        breadcrumb={"About Us / Meet Our Team"}
        backgroundImage="https://www.greenspringshop.com/uploads/202318070/ImgScroll/ba202302141100313844589.jpg?size=1920x300"
      />
    <section className="pb-12 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h3 className="text-sm font-semibold text-center text-gray-700 uppercase tracking-widest">
          Meet With The World's Leading Supplier Team Of Plant Active Ingredients
        </h3>
        <h2 className="text-2xl font-bold text-center my-2">
          Our Executive Team
        </h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mb-10 rounded"></div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md rounded-md overflow-hidden text-center"
            >
              {/* Image */}
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-[380px] object-contain"
              />

              {/* Curve Shape */}
              <div className="relative">
               

                {/* Text */}
                <div className="relative mt-2 pb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      <Footer />
    </>
      )
}

export default OurTeam