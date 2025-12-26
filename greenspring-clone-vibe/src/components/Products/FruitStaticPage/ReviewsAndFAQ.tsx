import React, { useState } from "react";

const faqs = [
  {
    q: "What fruits and vegetables do you offer as powder?",
    a: "A: We provide 50+ options, including berries (strawberry, blueberry), greens (spinach, kale), roots (carrot, beetroot), and tropical fruits (mango, banana).",
  },
  {
    q: "Is your fruit and vegetable powder organic?",
    a: "Yes, 80% of our powders are EU/USDA organic certified. Non-organic options are also available at lower prices.",
  },
  {
    q: "What's the minimum order quantity (MOQ)?",
    a: " MOQ is 20kg for standard powders; 50kg for custom blends. Samples (100g-1kg) are available for testing.",
  },
  {
    q: "How long is the shelf life of your fruit and vegetable powder?",
    a: "24 months from production date when stored in a cool, dry place (sealed packaging).",
  },
  {
    q: "Can you provide custom packaging with our logo?",
    a: "Yes, we offer OEM/ODM packaging (sachets, jars, drums) with your branding—minimum 500kg order for custom designs.",
  },
   {
    q: "Do you test for allergens like nuts or gluten?",
    a: "All powders are tested for common allergens (peanut, soy, gluten) via ELISA; results are provided with each order.",
  }, {
    q: "How does your fruit and vegetable powder compare to fresh produce?",
    a: "It’s more shelf-stable, easier to transport, and retains 98% of nutrients (vs. 50-70% in fresh produce after 3 days of storage).",
  },
  {
    q: "What certifications do you hold?",
    a: "ISO 22000, FDA registration, EU organic, HACCP, and Kosher/Halal (available upon request).",
  },
   {
    q: "How long does shipping take to [Country]?",
    a: "For [Country], sea freight takes 20-25 days; air freight takes 5-7 days. Contact us for a precise quote.",
  },
   {
    q: "What if the product doesn’t meet our quality standards?",
    a: "We offer a 100% refund or re-production if third-party tests confirm non-compliance with agreed specifications.",
  },
];

const ReviewsAndFAQ = () => {
  const [open, setOpen] = useState(null);
  const [openIndex, setOpenIndex] = useState(0); // first open like screenshot

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-black">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-[2px] bg-green-700"></div>
          <h2 className="font-semibold text-lg">User Reviews</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Review Card */}
          {[
            {
              text: "The organic spinach powder has a bright color and no off-taste – perfect for our baby food line. Shipment to Germany arrived on time with all docs.",
              name: "Anna",
              role: "Baby Food Manufacturer (Germany)",
              avatar: "👩🏻",
            },
            {
              text: "We've tried 5 suppliers, but this carrot powder retains the most beta-carotene. Our smoothie sales are up 20%.",
              name: "Mike",
              role: "Beverage Brand (USA)",
              avatar: "👨🏻",
            },
            {
              text: "Custom blend of mango + pineapple powder was exactly what we needed. The R&D team adjusted the sweetness in 3 days.",
              name: "",
              role: "Snack Producer",
              avatar: "🧑🏻",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-md shadow-sm p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 text-green-700 mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>

              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                “{review.text}”
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-lg">
                  {review.avatar}
                </div>
                <div>
                  {review.name && (
                    <p className="font-semibold text-sm">{review.name}</p>
                  )}
                  <p className="text-xs text-green-700">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FAQ ================= */}
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-semibold text-lg mb-4">
        FAQ (Frequently Asked Questions)
      </h2>

      <div className="border border-gray-200">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border-b last:border-b-0 border-gray-200"
            >
              {/* QUESTION ROW */}
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex justify-between items-start px-4 py-3 text-left text-sm"
              >
                <span>
                  <strong>Q:</strong> {item.q}
                </span>
                <span className="text-lg leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER (WRAPPED INSIDE SAME BORDER) */}
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
                  <strong>A:</strong> {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
      {/* ================= FOOT NOTE ================= */}
      <p className="text-xs text-gray-600 mt-10 max-w-4xl">
        Find nature fruit powder manufacturers and suppliers in China here.
        We're offering 100% natural products for kosher and halal. Please rest
        assured to wholesale high quality fruit powder at the best price from
        our factory. For free sample, contact us.
      </p>
    </section>
  );
};

export default ReviewsAndFAQ;
