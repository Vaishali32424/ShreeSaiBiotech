import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "../ui/use-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { createContactApi } from "@/Services/ContactDetails";

const ContactForm = () => {
const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company_name: "",
    subject: "",
    description:
      "Hi! Shree Sai Biotech, I want to know more about your products. Can you please provide more details?",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePhoneChange = (value?: string) => {
    setFormData({ ...formData, mobile: value || "" });
  };

 const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validation
        if (!formData.name.trim()) {
      toast({ title: "Error❌", description: "Name is required." });

            return;
        }
        if (!formData.email.trim()) {
      toast({ title: "Error❌", description: "Name is required." });

            return;
        }
        if (!isValidPhoneNumber(formData.mobile)) {
      toast({ title: "Error❌", description: "Please enter a valid mobile number." });
      return;
    }

        setIsSubmitting(true);
        try {
            await createContactApi(formData);
          
                toast({
                title: "Success✅",
                description: "description sent successfully and saved to database!",
            });

                      setFormData({
                name: "",
                email: "",
                mobile: "",
                company_name: "",
                subject: "",
                description:
                    "Hi! Shree Sai Biotech, I want to know more about your products. Can you please provide more details?",
            });
        } catch (err) {
            console.error("API Submission FAILED:", err);
            toast({
                title: "Error❌",
                description: err.description || "Failed to send description. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className="w-full py-12 flex justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-gray-50 rounded-lg p-8 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name*"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail*"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
          <PhoneInput
            international
            defaultCountry="IN"
            name="mobile"
            placeholder="Mobile/WhatsApp*"
            value={formData.mobile}
            onChange={handlePhoneChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:ring-2 focus:ring-green-600 outline-none"
        />

        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 focus:ring-2 focus:ring-green-600 outline-none"
        ></textarea>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-800 transition"
          >
            LEAVE A MESSAGE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
