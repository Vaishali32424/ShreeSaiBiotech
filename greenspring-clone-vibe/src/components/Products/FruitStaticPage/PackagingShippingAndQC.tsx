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
                24 months
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
                OEM/ODM (e.g., 100g sachets)
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                18–24 months
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
                15–30 days (Europe/North America), 25–40 days
                (Oceania/Africa)
              </td>
              <td className="border-r border-green-700 px-3 py-2">
                Large bulk orders
              </td>
              <td className="px-3 py-2">Lower</td>
            </tr>

            <tr>
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
          </tbody>
        </table>
      </div>

      {/* ================= Production Process ================= */}
      <h2 className="font-semibold text-lg mb-4">
        Production Process Flowchart
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-sm mb-12">
        <li>
          <strong>Raw Material Selection:</strong> Hand-picked fruits/vegetables
          from certified farms (tested for ripeness and contaminants).
        </li>
        <li>
          <strong>Cleaning:</strong> Ultrasonic washing to remove pesticides,
          dirt, and bacteria (3-stage filtration).
        </li>
        <li>
          <strong>Pre-Treatment:</strong> Peeling, slicing (uniform 3mm
          thickness) to ensure even drying.
        </li>
        <li>
          <strong>Low-Temperature Drying:</strong> Freeze-drying (-40°C) or
          vacuum drying (40–50°C) to remove 95%+ moisture.
        </li>
        <li>
          <strong>Grinding & Sieving:</strong> Pulverized to 80–200 mesh
          (adjustable), sieved to remove large particles.
        </li>
        <li>
          <strong>Sterilization:</strong> UV + high-pressure processing (HPP) to
          eliminate pathogens (microbial count &lt;100 CFU/g).
        </li>
        <li>
          <strong>Quality Inspection:</strong> Lab tests for nutrients,
          moisture, and contaminants (passed before packaging).
        </li>
        <li>
          <strong>Packaging:</strong> Aseptic filling into airtight containers,
          nitrogen-flushed to prevent oxidation.
        </li>
      </ul>

      {/* ================= Quality Control ================= */}
      <h2 className="font-semibold text-lg mb-4">Quality Control</h2>

      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>
          <strong>Raw Material Checks:</strong> 100% of fruits/vegetables tested
          for pesticides (via LC-MS) and heavy metals (ICP-MS) before processing.
        </li>
        <li>
          <strong>In-Process Testing:</strong> Moisture content (target 3–5%),
          particle size, and color measured at 3 stages (drying, grinding,
          sterilization).
        </li>
        <li>
          <strong>Final Inspection:</strong> Third-party labs (SGS, Intertek)
          verify compliance with FDA 21 CFR, EU 1881/2006, and customer
          customization standards.
        </li>
        <li>
          <strong>Traceability:</strong> Each batch has a QR code linking to farm
          origin, processing date, and test reports.
        </li>
      </ul>
    </section>
  );
};

export default PackagingShippingAndQC;
