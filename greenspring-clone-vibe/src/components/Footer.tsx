import { Globe, ChevronDown, Locate, Mail, MessageCircle, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import ContactSidebar from "./LandingPage/ContactSidebar";
import logo from "/assets/logo.jpeg";
import QRCode from "/assets/QR-code.png";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { getAllCategories } from "@/Services/Productscrud";
const MAX_CATEGORIES_TO_SHOW = 9; 
export default function Footer() {
  const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(); 
                const categoryNames = response?.data?.map(category => category.name);
                setCategories(categoryNames);
                
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                toast({ 
                    title: "Error", 
                    description: "Could not load categories.", 
                    variant: "destructive" 
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    const listToDisplay = categories?.length > 0 ? categories : [];

    const visibleCategories = listToDisplay?.slice(0, MAX_CATEGORIES_TO_SHOW);
  const phoneNumber = "+918989496905";
const email = "info@shreesaibiotech.com";
const address =
  "2nd Floor, Ms-A, Shop A 212, VIP Marg, Mall Godown Road, New Siyaganj, Indore - 452007, Madhya Pradesh, India";
  return (
    <><footer className="bg-gray-100 text-gray-700">
      {/* Top CTA Section */}
      <div className="bg-green-700 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg font-semibold mb-4 md:mb-0 text-center md:text-left">
            Free quotes for all your ingredient and custom manufacturing needs
          </p>
          <a
            href="/contact-us"
            className="bg-white text-green-700 font-bold py-2 px-4 rounded hover:bg-green-50 transition"
            title="Contact Us"
          >
            CONTACT US
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-12 border-t border-gray-300 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <a href="/" title="Shree Sai Biotech">
              <img
                src={logo}
                className="mb-4 w-32" />
            </a>
            <p className="text-sm">
              We have more than 5,000 kinds of products, and not all of them
              are listed on our website. Please contact us if you cannot find
              it on our site.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-4 text-xl text-white">
              <div className="flex items-center space-x-4">

                    <div className="flex space-x-2">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/profile.php?id=61550521295046"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">f</span>
  </a>
   <a
    href="https://x.com/Sbiotech2?t=A9HPgMjIGBbTtZpNCy3e1w&s=09"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">x</span>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/shree-sai-biotech-bb7305205?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">in</span>
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@shreesaibiotech"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">yt</span>
  </a>

  {/* Pinterest */}
  <a
    href="https://in.pinterest.com/shreesaibiotech/?actingBusinessId=1108448664445334126"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">p</span>
  </a>

  {/* VK */}
  <a
    href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=rvv01w9"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">ig</span>
  </a>
</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Home", "/"],
                ["About Us", "/about-us"],
                ["Products", "/products"],
                ["Enzymes", "/sweeteners"],
                ["Product List", "/products"],
                ["News", "/news"],
                ["Knowledge", "/knowledge"],
                ["Contact Us", "/contact-us"],
                ["Feedback", "/contact-us"],
              ].map(([label, link]) => (
                <li key={label}>
                  <a href={`${link}`} className="hover:underline">
                    <i className="iconfont icon-youjiantou mr-2" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Categories</h3>
            <ul className="space-y-2 text-sm">
                {visibleCategories.map((label) => (
                    <li key={label}>
                        <a 
                            href={`/products/category/${label}`} 
                            className="hover:underline"
                        >
                            <i className="iconfont icon-youjiantou mr-2" />
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        
          </div>

          {/* Contact Info & QR Code */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Contact Us</h3>
            <p className="text-sm mb-2">
              <span className="font-semibold">Address:</span><br />
2nd Floor, Ms-A, Shop A 212, VIP Marg, Mall Godown Road, New Siyaganj, Indore - 452007, Madhya Pradesh, India        </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:+91-8989496905" className="text-white hover:underline">
+91-8989496905              </a>
            </p>
            <p className="text-sm mb-4">
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:info@shreesaibiotech.com" className="text-white hover:underline">
                info@shreesaibiotech.com
              </a>
            </p>

          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Scan QR</h3>
            <div>
              <img
                src={QRCode}
                alt="QR Code"
                className="w-32 h-32 object-contain"
                loading="lazy" />
            </div>
          </div>
        </div>


        {/* Footer Bottom */}
        <div className="mt-8 border-t pt-4 text-center text-sm text-white">
          Copyright 1988 © SHREE SAI BIOTECH. All Rights Reserved.
        </div>
      </div>

      {/* Mobile Buttons */}
     <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-inner flex justify-around py-2 z-50 border-t border-gray-200">
      {/* WhatsApp */}
      <button
        onClick={() =>
          window.open(`https://wa.me/${phoneNumber.replace(/\D/g, "")}`, "_blank")
        }
        className="flex flex-col items-center text-xs text-gray-700 hover:text-green-600"
      >
        <FaWhatsapp className="text-2xl text-green-600" />
        <p>WhatsApp</p>
      </button>

      {/* Email */}
      <button
        onClick={() => (window.location.href = `mailto:${email}`)}
        className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600"
      >
        <Mail className="text-2xl text-blue-600" />
        <p>Email</p>
      </button>
 <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-center text-xs"
        >
        <ArrowUp className="text-2xl text-green-700" />
          <p>Top</p>
        </button>
      {/* Message */}
      <button
        onClick={() => (window.location.href = `sms:${phoneNumber}`)}
        className="flex flex-col items-center text-xs text-gray-700 hover:text-green-700"
      >
        <MessageCircle className="text-2xl text-green-700" />
        <p>Message</p>
      </button>

      {/* Location */}
      <button
        onClick={() =>
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
            "_blank"
          )
        }
        className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-700"
      >
        <Locate className="text-2xl text-blue-700" />
        <p>Location</p>
      </button>
    </div>
    </footer><ContactSidebar /></>

  );
}
