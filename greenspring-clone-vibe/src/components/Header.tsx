import { Phone, Mail, ChevronDown, Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import logo from "/assets/big-logo.jpeg";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavigationDropdown from "./LandingPage/NavigationDropdown";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "./ui/tooltip";

const languages = [
  { code: "en", name: "English", countryCode: "GB" },
  { code: "ja", name: "日本語", countryCode: "JP" },
  { code: "ko", name: "한국어", countryCode: "KR" },
  { code: "fr", name: "Français", countryCode: "FR" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "es", name: "Español", countryCode: "ES" },
  { code: "it", name: "Italiano", countryCode: "IT" },
  { code: "pt", name: "Português", countryCode: "PT" },
  { code: "ar", name: "عربي", countryCode: "SA" },
  { code: "bg", name: "Български", countryCode: "BG" },
  { code: "th", name: "ไทย", countryCode: "TH" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [productsDropdownItems, setProductsDropdownItems] = useState<
    { label: string; href: string }[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        const categories = Object.keys(data);
        const dropdownItems = categories.map((category) => ({
          label: category,
          href: `/products/category/${category}`,
        }));
        setProductsDropdownItems(dropdownItems);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const companyDropdownItems = [
    { label: t("company_dropdown.factory_certificates"), href: "/factory-and-certificate" },
    { label: t("company_dropdown.meet_our_team"), href: "/meet-our-team" },
    { label: t("company_dropdown.what_can_we_do"), href: "/what-can-we-do" },
    { label: t("company_dropdown.innovation_service"), href: "/innovation-service" },
    { label: t("company_dropdown.quality_rd"), href: "/quality-rd" },
  ];

  // const productsDropdownItems = [
  //   { label: t("products_dropdown.botanical_extracts"), href: "/products/botanical-extracts" },
  //   { label: t("products_dropdown.natural_sweeteners"), href: "/products/sweeteners" },
  //   { label: t("products_dropdown.functional_ingredients"), href: "/products/functional-ingredients" },
  //   { label: t("products_dropdown.custom_solutions"), href: "/products/custom-solutions" },
  // ];

  const selectedLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
<header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      {/* ✅ Top Bar - hidden on mobile */}
      <div className="hidden sm:block bg-header-bg text-white py-1 sm:py-0 sm:px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-nowrap text-sm">{t("phone")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{t("email")}</span>
            </div>
          </div>
          <div className="sm:flex items-center hidden  space-x-4">
            {/* Language Switch Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-white hover:bg-white/10">
                  <ReactCountryFlag
                    countryCode={selectedLanguage.countryCode}
                    svg
                    style={{ width: "1.2em", height: "1.2em" }}
                  />
                  <span>{selectedLanguage.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onSelect={() => changeLanguage(lang.code)}
                    className="flex items-center space-x-2"
                  >
                    <ReactCountryFlag
                      countryCode={lang.countryCode}
                      svg
                      style={{ width: "1.2em", height: "1.2em" }}
                    />
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          <div className="flex space-x-2">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/profile.php?id=61550521295046"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">f</span>
  </a>

   <a
    href="https://x.com/Sbiotech2?t=A9HPgMjIGBbTtZpNCy3e1w&s=09"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">x</span>
  </a>


  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/shree-sai-biotech-bb7305205?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">in</span>
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@shreesaibiotech"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">yt</span>
  </a>

  {/* Pinterest */}
  <a
    href="https://in.pinterest.com/shreesaibiotech/?actingBusinessId=1108448664445334126"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">p</span>
  </a>

  {/* VK */}
  <a
    href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=rvv01w9"
    target="_blank"
    rel="noopener noreferrer"
    className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/40 transition"
  >
    <span className="text-xs font-semibold">ig</span>
  </a>
</div>

          </div>
        </div>
      </div>

      {/* ✅ Navigation Bar */}
      <div className="bg-nav-bg shadow-md py-2 ">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Shree Sai Biotech" className="h-12 py-2 object-contain w-auto" />
          
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-4 text-sm mx-1">
            <a href="/" className="text-primary font-medium hover:text-primary-dark transition-colors text-sm">{t("home")}</a>
            <NavigationDropdown title={t("about_us")} items={companyDropdownItems} route="/why-choose-us" />
            <NavigationDropdown title={t("products")}  navigateById={true} items={productsDropdownItems} route={"/products"} />
            <a href="/sweeteners" className="text-foreground text-sm hover:text-primary transition-colors">{t("Enzymes")}</a>
            <a href="#" className="text-foreground text-sm hover:text-primary transition-colors">{t("news")}</a>
            <a href="#" className="text-foreground text-sm hover:text-primary transition-colors">{t("knowledge")}</a>
            <a href="/contact-us" className="text-foreground text-sm hover:text-primary transition-colors">{t("contact_us")}</a>
          </nav>

          <div className="hidden lg:block">
          <div className="flex items-center gap-4">
  <Button
    onClick={() => navigate("/contact-us")}
    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium"
  >
    {t("feedback")}
  </Button>
<Tooltip content={t("search product")}>
    <Link to="/product-search">

  <Search  className="cursor-pointer"/>
  </Link></Tooltip>
</div>

          </div>

          {/* ✅ Mobile Hamburger + Language Switcher */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Language Switch Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <ReactCountryFlag
                    countryCode={selectedLanguage.countryCode}
                    svg
                    style={{ width: "2em", height: "2em" }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onSelect={() => changeLanguage(lang.code)}
                    className="flex items-center space-x-2"
                  >
                    <ReactCountryFlag
                      countryCode={lang.countryCode}
                      svg
                      style={{ width: "2em", height: "2em" }}
                    />
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Toggle Button */}
            <button
              className="text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
      {mobileOpen && (
  <div className="lg:hidden mt-4 space-y-4">
    <a href="/" className="block text-primary font-medium">{t("home")}</a>

    {/* Dropdowns open on click */}
    <NavigationDropdown title={t("about_us")} items={companyDropdownItems} route="/why-choose-us" />
    <NavigationDropdown title={t("products")} items={productsDropdownItems} route={"/products"} />

    <a href="#" className="block text-foreground">{t("sweeteners")}</a>
    <a href="#" className="block text-foreground">{t("news")}</a>
    <a href="#" className="block text-foreground">{t("knowledge")}</a>
    <a href="/contact-us" className="block text-foreground">{t("contact_us")}</a>

    <Button className="w-full bg-primary hover:bg-primary-dark text-white rounded-md font-medium">
      {t("feedback")}
    </Button>
  </div>
)}

      </div>
    </header>
  );
};

export default Header;