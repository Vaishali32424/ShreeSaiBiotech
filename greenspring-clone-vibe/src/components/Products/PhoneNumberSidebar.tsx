import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "../ui/use-toast";
import { createContactApi } from "@/Services/ContactDetails";

const PhoneNumberSidebar = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast({ title: "Error❌", description: "Name is required." });
    }

    if (!formData.email.trim()) {
      return toast({ title: "Error❌", description: "Email is required." });
    }

    if (!isValidPhoneNumber(formData.mobile)) {
      return toast({
        title: "Error❌",
        description: "Enter valid mobile number.",
      });
    }

    setIsSubmitting(true);

    try {
      await createContactApi(formData);

      toast({
        title: "Success✅",
        description: "We have received your query!",
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
      toast({
        title: "Error❌",
        description: "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="w-full shadow-md rounded-md p-4 text-gray-800 sidebar mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">
          Contact Us
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Your Name*"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
          required

        />

        <input
          type="email"
          name="email"
          placeholder="E-mail*"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        <PhoneInput
          international
          defaultCountry="IN"
          value={formData.mobile}
          onChange={handlePhoneChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Mobile / WhatsApp*"
        />

        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
        />

        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Leave a Message"}
        </button>
      </form>
    </aside>
  );
};

export default PhoneNumberSidebar;
