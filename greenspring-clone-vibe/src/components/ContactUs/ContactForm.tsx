import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "../ui/use-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message:
      "Welcome to send inquiry! We are a factory supplier of natural plant active ingredients. Request free samples now!*",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePhoneChange = (value?: string) => {
    setFormData({ ...formData, phone: value || "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ title: "Error❌", description: "Name is required." });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: "Error❌", description: "Email is required." });
      return;
    }
    if (!isValidPhoneNumber(formData.phone)) {
      toast({ title: "Error❌", description: "Please enter a valid phone number." });
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        "service_9f3gre7",
        "template_wmmrnmq",
        templateParams,
        "gEoEzEVindFqGKHWm"
      )
      .then(
        () => {
          toast({
            title: "Success✅",
            description: "Message sent successfully!",
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            subject: "",
            message:
              "Hi! Shree Sai Biotech, I want to know more about your products. Can you please provide more details?",
          });
        },
        (err) => {
          console.log("FAILED...", err);
          toast({
            title: "Error❌",
            description: "Failed to send message. Please try again.",
            variant: "destructive",
          });
        }
      );
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
            placeholder="Your Name:*"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail:*"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
          <PhoneInput
            international
            defaultCountry="IN"
            name="phone"
            placeholder="Phone/WhatsApp:*"
            value={formData.phone}
            onChange={handlePhoneChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
          <input
            type="text"
            name="company"
            placeholder="Company:"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject:"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:ring-2 focus:ring-green-600 outline-none"
        />

        <textarea
          name="message"
          rows={5}
          value={formData.message}
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
