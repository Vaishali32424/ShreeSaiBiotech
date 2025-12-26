import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { createContactApi } from "@/Services/ContactDetails";

interface PhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
  productName: string;
}

const PhoneNumberModal: React.FC<PhoneNumberModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  productName,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();

  const [error, setError] = useState("");

const handleSubmit = async () => {
  if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
    setError("");

    try {
      const payload = {
        phoneNumber: phoneNumber,
                product_name: productName, 
              email  };

      const res = await createContactApi(payload);

      console.log("API response:", res);

      onSubmit(phoneNumber);
      setPhoneNumber(undefined);

    } catch (error) {
      console.error("API Error:", error);
      setError("Something went wrong. Please try again.");
    }
  } else {
    setError("Please enter a valid phone number.");
  }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">View Description</h2>
    <p className="mb-4">
<span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis">
    To view the full description for{" "}
    <span
      className="font-semibold text-nowrap"
      dangerouslySetInnerHTML={{
        __html: productName,
      }}
    ></span>
  </span>
  <br />
  Please enter your phone number.
</p>
        <div className="mb-4">
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            international
            defaultCountry="IN"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
          <input
            type="email"
            name="email"
            placeholder="E-mail*"
            required
            value={email}
            onChange={setEmail}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
        <div className="flex justify-end gap-4 my-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberModal;
