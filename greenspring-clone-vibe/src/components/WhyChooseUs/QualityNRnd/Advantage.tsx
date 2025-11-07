import React from "react";

const advantages = [
  {
    title: "Great quality ensured",
    description:
      "Our quality team and laboratory is your quality team,your laboratory.We are dedicated to providing clients with the highest quality nutritional ingredients to make the best possible products. This mission starts by ensuring that high standards are met at every step of the supply chain.",
    type: "text",
  },
  {
    image:
    "https://www.greenspringshop.com/Content/uploads/2023389378/20231018170441f8cf08d12b4b4ba6ba0decaa57515140.jpg?size=350x0",
    type: "image",
  },
  {
    image:
    "https://www.greenspringshop.com/Content/uploads/2023389378/202310181705068517ef5472274530a325fbb0b384571c.jpg?size=x0",
    type: "image",
  },
  {
    title: "Deliver to your hand",
    description:
      "If you have no experience of importing products to your company, don’t worry, we can help you do your local customs clearance for you. So the goods will be delivered to your hand directly. For example, we now do custom clearance for Europe, USA, etc",
    type: "text",
  },
  {
    image:
    "https://www.greenspringshop.com/Content/uploads/2023389378/2023101817045204ec92113236405fabdb6467bfcfdca1.jpg?size=350x0",
    type: "image",
  },
  {
    title: "Most affordable price",
    description:
      "Lower your purchase cost.The factory direct supply, and warehouse stock service,could lower your purchase cost,logistic cost, customer clearance cost,etc.Wide wide products range, we can provider you many products with small quantity per single order, which saving repeated logistic cost and custom clearance costs for you.",
    type: "text",
  },
];


const OurAdvantage = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* Title */}
      <h2 className="text-center text-xl font-bold mb-6 flex items-center">
        <span className="flex-grow border-t border-gray-300"></span>
        <span className="px-4">Our Advantage</span>
        <span className="flex-grow border-t border-gray-300"></span>
      </h2>

      {/* Row 1 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 items-start text-center">
        {/* Left Image */}
        <img
          src={advantages[1].image}
          alt="Deliver"
          className="w-full h-[250px] object-cover rounded"
        />

        {/* Center Text */}
        <div className="px-4">
          <h3 className="text-blue-600 font-bold text-lg mb-2">
            {advantages[0].title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {advantages[0].description}
          </p>
        </div>

        {/* Right Image */}
        <img
          src={advantages[2].image}
          alt="Low Price"
          className="w-full h-[250px] object-cover rounded"
        />
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-3 gap-6 items-start text-center">
        {/* Left Text */}
        <div className="px-4">
          <h3 className="text-blue-600 font-bold text-lg mb-2">
            {advantages[3].title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {advantages[3].description}
          </p>
        </div>

        {/* Middle Image */}
        <img
          src={advantages[4].image}
          alt="Lab"
          className="w-full h-[250px] object-cover rounded"
        />

        {/* Right Text */}
        <div className="px-4">
          <h3 className="text-blue-600 font-bold text-lg mb-2">
            {advantages[5].title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {advantages[5].description}
          </p>
        </div>
      </div>
    </div>
  );
};


export default OurAdvantage;
