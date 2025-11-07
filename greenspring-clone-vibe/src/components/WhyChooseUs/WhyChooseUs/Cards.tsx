const WhyChooseCard = ({ icon, title, description }) => {
  return (
    <div className="relative group overflow-hidden h-[240px] rounded-lg border p-6 text-left transition-all duration-500">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-green-700 translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

      {/* Bottom Right Mark */}
      <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-100 rounded-tl-lg"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-green-700 group-hover:text-white text-3xl mb-4">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-green-700 group-hover:text-white">
          {title}
        </h3>
        <p className="mt-2 text-gray-600 group-hover:text-gray-100 text-xs">
          {description}
        </p>
      </div>
    </div>
  );
};


// Example usage
const Cards = () => {
  const data = [
    {
      icon: "⭐",
      title: "Deliver to your hand",
      description:
        "If you have no experience of importing products to your company, don't worry, we can help you do your local customs clearance for you. So the goods will be delivered to your hand directly. For example, we now do custom clearance for Europe, USA, etc",
    },
    {
      icon: "❤️",
      title: "Great quality ensured",
      description:
        "ur quality team and laboratory is your quality team,your laboratory.We are dedicated to providing clients with the highest quality nutritional ingredients to make the best possible products. This mission starts by ensuring that high standards are met at every step of the supply chain.",
    },
    {
      icon: "💲",
      title: "Most affordable price",
      description:
        "Lower your purchase cost.The factory direct supply, and warehouse stock service,could lower your purchase cost,logistic cost, customer clearance cost,etc.Wide wide products range, we can provider you many products with small quantity per single order, which saving repeated logistic cost and custom clearance costs for you.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {data.map((item, index) => (
        <WhyChooseCard
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Cards;
