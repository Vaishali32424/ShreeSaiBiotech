import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaWhatsapp } from "react-icons/fa";
import { Locate, Mail, MessageCircle, Send, User } from "lucide-react";

const ContactSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);

      const now = new Date();
      const time = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate()
      ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      const botMessages = [
        {
          id: Date.now(),
          sender: "bot",
          text: "Hello 👋 Welcome to Shree Sai Biotech! Interested in any product? Let us know right away!",
          time,
        },
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "We specialize in high-quality plant extracts for the food, pharmaceutical, and cosmetics industries. Our products include natural raw materials and customized application solutions, ensuring compliance with various certifications like ISO 9001 and halal.Fda Etc.",
          time,
        },
      
       {
  id: Date.now() + 3,
  sender: "bot",
  text: `Tell No. +91 8989496905 Tell NO.+91 0731 4022477 , +91 98260 94417 , +91 8989929729
Please leave your phone, email, or WhatsApp contact information for further assistance!`,
  time,
},
     {
  id: Date.now() + 3,
  sender: "bot",
  text: `Welcome to send your inquiry! We are a factory supplier of natural plant active ingredients. Request your free samples now!`,
  time,
},

      ];

      botMessages.forEach((msg, index) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, msg]);
        }, index * 1500);
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 800);
  };

 const getBotResponse = (text) => {
  const lower = text.toLowerCase();

  if (lower.includes("hi") || lower.includes("hello")) {
    return "Hello! 👋 How can I assist you today?";
  }
  if (lower.includes("product")) {
    return "We specialize in high-quality plant extracts for food, pharmaceutical, and cosmetics industries.";
  }
  if (lower.includes("contact")) {
    return `📞 You can contact us via the following methods:

• Phone: +91-8989496905
• Email: info@shreesaibiotech.com
• WhatsApp: +91-8989496905
• Address: 2nd Floor, Ms-A, Shop A 212, VIP Marg, Mall Godown Road, New Siyaganj, Indore - 452007, Madhya Pradesh, India

If you have any specific inquiries, feel free to reach out!`;
  }

  return "I'm here to help! Could you please rephrase that?";
};
  const phoneNumber = "+918989496905";
  const email = "info@shreesaibiotech.com";
  const address =
    "2nd Floor, Ms-A, Shop A 212, VIP Marg, Mall Godown Road, New Siyaganj, Indore - 452007, Madhya Pradesh, India";

  return (
    <>
      {/* Sidebar Buttons */}
      <div className="fixed right-0 top-32 hidden z-40 sm:flex flex-col items-center">
        <a
          href="/contact-us"
          className="bg-white rounded-t-full shadow-md flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full mt-2 overflow-hidden border-2 border-green-700 -mb-2">
            <img
              src="https://img01.v15cdn.com/iconfloat/29/online.webp"
              alt="Contact Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-green-700 text-white text-xs font-semibold px-2 py-1 mt-3 w-full text-center">
            CONTACT
          </div>
        </a>

        <div className="flex flex-col space-y-3 mt-1 bg-white shadow-lg rounded-l-lg p-3">
          <button
            onClick={() =>
              window.open(`https://wa.me/${phoneNumber.replace(/\D/g, "")}`)
            }
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
          >
            <FaWhatsapp className="w-5 h-5" />
          </button>
          <div className="text-xs text-center">Whatsapp</div>

          <button
            onClick={() => (window.location.href = `mailto:${email}`)}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
          >
            <Mail className="w-5 h-5" />
          </button>
          <div className="text-xs text-center">Email</div>

          <button
            onClick={() => (window.location.href = "sms:+918989496905")}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-3 rounded-full"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <div className="text-xs text-center">Message</div>

          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`,
                "_blank"
              )
            }
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
          >
            <Locate className="w-5 h-5" />
          </button>
          <div className="text-xs text-center">Location</div>
        </div>
      </div>

      {/* Chat box */}
      <div className="fixed bottom-4 right-0 sm:right-24 z-50">
        {isOpen && (
          <div
            className="
              bg-white shadow-2xl rounded-lg flex flex-col border border-gray-200
              w-[90vw] sm:w-[400px] md:w-[450px] h-[65vh] sm:h-[500px]
            "
          >
            <div className="bg-green-700 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
              <div className="font-semibold text-sm sm:text-base">
                SHREE SAI BIOTECH
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-white hover:text-black"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50 text-sm sm:text-base">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <FaRobot className="mt-1 text-green-700" size={18} />
                  )}
                  <div
                    className={`max-w-[75%] p-2 sm:p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-white border rounded-bl-none"
                    }`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {msg.text}
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === "user"
                          ? "text-gray-100"
                          : "text-gray-400"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <User className="mt-1 text-green-700" size={18} />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-2 border-t flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Write a message..."
                className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-3 py-2 rounded-full hover:bg-green-700"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Floating Chat Button */}
        <div className="fixed bottom-6 right-6 sm:right-10 z-40">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative bg-green-700 hover:bg-white hover:text-green-700 text-white shadow-green-800 p-4 rounded-full shadow-lg transition-all"
          >
            <FaRobot className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactSidebar;
