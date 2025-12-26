import React, { useEffect } from "react";
import { Home } from "lucide-react";

interface BannerProps {
  title: string;
  breadcrumb: string; // e.g. "Why Choose Us / Innovation And Service"
  backgroundImage?: string;
}

const PageBanner: React.FC<BannerProps> = ({
  title,
  breadcrumb,
  backgroundImage = "/default-banner.jpg",
}) => {



  return (
    <div className="w-full mt-[90px]">
      {/* Background Image Strip */}
   <div
  className="w-full  h-auto bg-contain bg-no-repeat bg-center"
/>
<img
  src={backgroundImage}
  className="w-full  object-contain"
  alt=""
/>


      {/* White Strip */}
      <div className="flex justify-between items-center px-20 py-1 bg-white shadow">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 space-x-1">
          <Home size={16} className="text-green-600" />
          <span className="cursor-pointer hover:underline">Home</span>
          <span>/</span>
          <span className="text-gray-700">{breadcrumb}</span>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
