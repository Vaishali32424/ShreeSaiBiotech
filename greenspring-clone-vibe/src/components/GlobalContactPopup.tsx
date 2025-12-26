import React, { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "./ui/use-toast";
import { createContactApi } from "@/Services/ContactDetails";
import { useLocation } from "react-router-dom";

const STORAGE_FLAG = "hasVisited";
const STORAGE_DATA = "globalContactData";

const GlobalContactPopup: React.FC = () => {
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState<string | undefined>();
  const [productName, setProductName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setVisible(false);
      return;
    }

    try {
      const flag = localStorage.getItem(STORAGE_FLAG);
      if (!flag) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim())
      return toast({ title: "Error❌", description: "Name is required" });

    if (!mobile || !isValidPhoneNumber(mobile))
      return toast({
        title: "Error❌",
        description: "Enter a valid mobile number",
      });

    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        mobile,
        product_name: productName.trim(),
      };

      await createContactApi(payload);

      localStorage.setItem(STORAGE_DATA, JSON.stringify(payload));
      localStorage.setItem(STORAGE_FLAG, "true");

      toast({
        title: "Success✅",
        description: "Thanks! We will contact you soon.",
      });

      setVisible(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error❌",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">Quick Contact</h3>
          <button
            aria-label="Close"
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={mobile}
              onChange={setMobile}
              className="w-full mt-1 border-2 rounded-md focus:ring-2 focus:ring-green-600 p-2"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name (optional)
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Product name"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send"}
            </button>

            <button
              type="button"
              onClick={() => setVisible(false)}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GlobalContactPopup;
