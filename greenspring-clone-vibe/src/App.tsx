import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs/WhyChooseUs";
import FactoryNCertificate from "./components/WhyChooseUs/Factory&certificates/FactoryNCertificate";
import OurTeam from "./components/WhyChooseUs/OurTeam";
import InovationNService from "./components/WhyChooseUs/Innovation&Service/InovationNService";
import QualityNRnD from "./components/WhyChooseUs/QualityNRnd/QualityNRnD";
import WhatWeCanDo from "./components/WhyChooseUs/WhatCanWeDo/WhatWeCanDo";
import ContactUs from "./components/ContactUs/ContactUs";
import Products from "./components/Products/Products";
import Sweetners from "./components/Sweetners/Sweetners";
import ProductSearch from "./components/LandingPage/ProductSearch";
import ProductsDetailsPage from "./components/Products/ProductDetail";
import ProductsPage from "./components/Products/ProductsPage";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ProductDisplay from "./components/ViewProduct.tsx/ProductDisplay";
import PayloadPreview from "./components/ViewProduct.tsx/PayloadPreview";
import ProductForm from "./components/CreateProduct/ProductForm";
import Dashboard from "./components/Dashboard/Dashboard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route
            path="/factory-and-certificate"
            element={<FactoryNCertificate />}
          />
          <Route path="/meet-our-team" element={<OurTeam />} />
          <Route path="/what-can-we-do" element={<WhatWeCanDo />} />
          <Route path="/innovation-service" element={<InovationNService />} />
          <Route path="/quality-rd" element={<QualityNRnD />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/sweeteners" element={<Sweetners />} />
                    <Route path="/product-search" element={<ProductSearch />} />
        {/* <Route path="/products/:id" element={<ProductsDetailsPage />} /> */}
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/view-product" element={<PayloadPreview />} />
            <Route path="/dashboard" element={<Dashboard />} />
<Route path="/add-product" element={<ProductForm />} />
<Route path="/view/:productId" element={<ProductDisplay />} />
          <Route path="/edit-product/:productId" element={<ProductForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
