import React from "react";

const PackagingShippingAndQC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-black">
      {/* ================= Packaging & Shipping ================= */}
      <h2 className="font-semibold text-lg mb-4">
        Packaging & Shipping (Chart Summary)
      </h2>

      {/* Packaging Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border border-green-700 text-sm">
          <thead>
            <tr className="border-b border-green-700">
              <th className="border-r border-green-700 px-3 py-2 text-left">
                Packaging Type
              </th>
              <th className="border-r border-green-700 px-3 py-2 text-left">
                Specification
              </th>
              <th className="border-r border-green-700 px-3 py-2 text-left">
                Shelf Life
              </th>
              <th className="px-3 py-2 text-left">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-green-700">
              <td className="border-r border-green-700 px-3 py-2">
                Aluminum Foil Bags
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                1kg/bag, 5kg/bag
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                24 months
              </td>
              <td className="px-3 py-2">
                Small orders, sample delivery
              </td>
            </tr>

            <tr className="border-b border-green-700">
              <td className="border-r border-green-700 px-3 py-2">
                Cardboard Drums
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                25kg/drum, 50kg/drum (with PE liner)
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                36 months
              </td>
              <td className="px-3 py-2">
                Bulk industrial orders
              </td>
            </tr>

            <tr>
              <td className="border-r border-green-700 px-3 py-2">
                Custom Packaging
              </td>
              <td className="border-r border-green-700 px-3 py-2">
100 GM-1.KGS-5.KGS-10.KGS              </td>
              <td className="border-r border-green-700 px-3 py-2">
                24 months
              </td>
              <td className="px-3 py-2">Retail-ready products</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Shipping Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border border-green-700 text-sm">
          <thead>
            <tr className="border-b border-green-700">
              <th className="border-r border-green-700 px-3 py-2 text-left">
                Shipping Method
              </th>
              <th className="border-r border-green-700 px-3 py-2 text-left">
                Delivery Time
              </th>
              <th className="border-r border-green-700 px-3 py-2 text-left">
                Regions
              </th>
              <th className="px-3 py-2 text-left">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-green-700">
              <td className="border-r border-green-700 px-3 py-2">
                Air Freight
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                3–7 days
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                Global (urgent orders)
              </td>
              <td className="px-3 py-2">Higher</td>
            </tr>

            <tr className="border-b border-green-700">
              <td className="border-r border-green-700 px-3 py-2">
                Sea Freight
              </td>
              <td className="border-r border-green-700 px-3 py-2">
               Kandla Port , Nhava Sheva Port
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                Large bulk orders
              </td>
              <td className="px-3 py-2">Lower</td>
            </tr>

            <tr className="border-b border-green-700">
              <td className="border-r border-green-700 px-3 py-2">
                Express (DHL/FedEx)
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                2–5 days
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                Samples, small orders (&lt;50kg)
              </td>
              <td className="px-3 py-2">Highest</td>
            </tr>
                 <tr>
              <td className="border-r border-green-700 px-3 py-2">
Express Domestic Inddai-DTDC-DHL-ALL              </td>
              <td className="border-r border-green-700 px-3 py-2">
                2–3 days
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                Samples, small orders (&lt;50kg)
              </td>
              <td className="px-3 py-2">Highest</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= Production Process ================= */}
      <h2 className="font-semibold text-lg mb-4">
        Production Process Flowchart with Matrail
      </h2>
      <p>Collection Centers - Procurement on Pre-set QualityParameters.</p>

      <ul className="list-disc pl-6 space-y-2 text-sm mb-12">
        <li>
          <strong>Raw Material Quality Control :</strong> The raw material is checked thoroughly for physical parameters for fungus, 
          soil and dust is segregated and sorted material is taken to shed for its drying with sufficient airflow.
        </li>
        <li>
          <strong>Herbal Extraction on Pilot Plant for Validation:</strong> The validated raw material is taken to a pilot plant for the study of its contents and quality of contents in the herbs before taking a commercial batch for extraction.
        </li>
        <li>
          <strong>Finished Product Quality Control Analysis:</strong> We have a modern and scientific Quality Control laboratory having the latest equipment like HPLC, GC, and UV Spectrometer, etc. for estimation of active ingredients.
        </li>
        <li>
          <strong>Sterilization:</strong> UV + high-pressure processing (HPP) to eliminate pathogens (microbial count 100 CFU/g).
        </li>
        <li>
          <strong>Quality Inspection:</strong>  Lab tests for nutrients, moisture, and contaminants (passed before packaging).
        </li>
       
      </ul>

      {/* ================= Quality Control ================= */}
      <h2 className="font-semibold text-lg mb-4">Quality Control</h2>

      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>
          Shree Sai Biotech  Biotech sources and procures raw herbs through buy back arrangement with farmers and trusted sources.
        </li>
        <li>
        Identification of the correct raw material source and active principles, control of heavy metals, pesticides, aflatoxins and microbial count.
        </li>
        <li>
        Our passionate team of researchers and innovators are transforming how holistic health is achieved, using robust bioavailable active ingredients to create dietary and food supplements and complementary health medicine.
        </li>
        <li>
       Raw material quality is essential. We have a multi-layered quality management system in place to ensure that  raw materials collected or contract grown for manufacturing comply with GACP (Good Agricultural and Collection Practices). We follow a rigorous testing regime for all raw materials and finished products.
        </li>
      </ul>
    </section>
  );
};

export default PackagingShippingAndQC;
