// src/components/ProductCardRenderer.jsx (Dynamic grid_layout supported)
import React from 'react';

const ProductCardRenderer = ({ cardData }) => {
  if (!cardData || !cardData.cards || cardData.cards.length === 0) return null;

  const { cards, grid_layout } = cardData;

  // Default 3x3 layout agar grid_layout missing ho
  const defaultGridCols = 3;

  // grid_layout format: "2x3" ya "1x4"
  let cols = defaultGridCols;
  if (grid_layout && typeof grid_layout === "string" && grid_layout.includes("x")) {
    const parts = grid_layout.toLowerCase().split("x");
    const parsedCols = parseInt(parts[1]);
    if (!isNaN(parsedCols) && parsedCols > 0) {
      cols = parsedCols;
    }
  }

  const gridColsClass = `grid grid-cols-${cols} gap-6`;

  return (
    <div className={gridColsClass}>
      {cards.map((card, index) => (
        <div
          key={index}
          className="border-t-4 border-green-600 rounded-lg shadow-lg overflow-hidden bg-white p-5 flex flex-col h-full"
        >
          {/* Image (if exists) */}
          {card.image_base64 && (
            <img
              src={card.image_base64}
              alt={card.title || `Card image ${index + 1}`}
              className="w-full h-32 object-contain mb-4"
            />
          )}

          {/* Title */}
          <h4 className="text-lg font-extrabold text-green-700 mb-3">
            {card.title}
          </h4>

          {/* Properties */}
          {card.properties && (
            <div className="text-sm text-gray-700 space-y-1 mt-auto">
              <ul className="list-disc list-inside ml-2">
                {card.properties.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCardRenderer;
