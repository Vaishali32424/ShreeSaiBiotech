import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import PageBanner from '../PageBanner'

const OurTeam = () => {
     const team = [
       {
      name: "Ankita",
      role: "Director",
      img: "/assets/no-user.webp",
    },
     {
      name: "Anil",
      role: "Director",
      img: "/assets/no-user.webp",
    },
    {
      name: "Mr. Navin",
      role: "CEO",
      img: "/assets/no-user.webp",
    },
   
    {
      name: "Rajesh",
      role: "General Manager",
      img: "/assets/no-user.webp",
    },
   
     {
      name: "Preet",
      role: "Quality Control",
      img: "/assets/no-user.webp",
    },
     {
      name: "Rajesh",
      role: "Sales  Executive",
      img: "/assets/no-user.webp",
    },
      {
      name: "Reena",
      role: "Sales  Executive",
      img: "/assets/no-user.webp",
    },
     {
      name: "Rani",
      role: "Sales  Executive",
      img: "/assets/no-user.webp",
    },
  
  
  ];
  return (
 <>
      <Header />
      <PageBanner
        title={"Meet Our Team"}
        breadcrumb={"About Us / Meet Our Team"}
        backgroundImage="assets/Teams/teams-banner.jpeg"
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
                className="w-[240px] h-[250px] object-cover mx-auto mt-4 "
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