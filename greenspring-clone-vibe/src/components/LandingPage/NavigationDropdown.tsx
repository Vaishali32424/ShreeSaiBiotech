import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavigationDropdownProps {
  title: string;
  items: DropdownItem[];
  route: string;
  singleColumn?: boolean; // force single column
}

const NavigationDropdown = ({
  title,
  items,
  route,
  singleColumn = false,
}: NavigationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
const getGridCols = () => {
  if (singleColumn || items.length <= 5) return "grid-cols-1 w-[200px]";
  if (items.length <= 12) return "grid-cols-2  w-[900px] ";
  if (items.length <= 24) return "grid-cols-3  w-[900px] ";
  return "grid-cols-4  w-[700px] ";
};




  return (
    <div
      className={`relative ${isMobile ? "w-full" : ""}`}
      onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined}
    >
      <button
        className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors py-2"
        onClick={isMobile ? () => setIsOpen(!isOpen) : undefined}
      >
        <a href={route}>{title}</a>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Desktop Dropdown */}
     {!isMobile && isOpen && (
  <div className="absolute top-7 left-0 mt-1 bg-white shadow-lg rounded-lg border border-border z-50 p-4 max-h-[400px] overflow-y-auto">
    <ul className={`grid gap-2  ${getGridCols()}`}>
      {items.map((item, index) => (
        <li key={index} className="hover:bg-slate-100">
          <a
            href={item.href}
            className="block px-4 py-2 text-foreground hover:text-primary transition-colors text-sm"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}

      {/* Mobile Dropdown */}
      {isMobile && isOpen && (
        <ul className="pl-4 border-l border-slate-200">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavigationDropdown;
