import React, { useState } from "react";
import {
  FaApple,
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaBlender,
  FaPlane,
  FaSmile,
  FaMotorcycle,
} from "react-icons/fa";
import "../styles/toggleHeader.css";

export const categories = [
  { name: "Grocery", icon: <FaApple /> },
  { name: "Mobiles", icon: <FaMobileAlt /> },
  {
    name: "Fashion",
    icon: <FaTshirt />,
    subcategories: [
      {
        name: "Men Top Wear",
        subcategories: [
          "All",
          "Men's T-Shirts",
          "Men's Casual Shirts",
          "Men's Formal Shirts",
          "Men's Kurtas",
          "Men's Ethnic Sets",
          "Men's Blazers",
          "Men's Raincoat",
          "Men's Windcheaters",
          "Men's Suit",
          "Men's Fabrics",
        ],
      },
      {
        name: "Men Bottom Wear",
        subcategories: [
          "All",
          "Men's Jeans",
          "Men's Trousers",
          "Men's Trackpants",
          "Men's Shorts",
          "Men's Cargos",
          "Men's Threefourths",
          "Men's Pyjamas & Loungepants",
          "Men's Dhoti",
          "Men's Ethnic Pyjama",
        ],
      },
      {
        name: "Women Ethnic",
        subcategories: [
          "All",
          "Woman Sarees",
          "Woman Kurta & Kurtis",
          "Woman Kurta Sets & Salwar Sets",
          "Ethnic Dresses",
          "Woman Dress Materials",
          "Woman Gowns",
          "Woman Lehenga Cholis",
          "Woman Leggings & Patialas",
          "Woman Palazzos & Shararas",
          "Woman Blouse",
          "Woman Dupatta",
        ],
      },
      {
        name: "Men FootWear",
        subcategories: [
          "All",
          "Men's Sports Shoes",
          "Men's Casual Shoes",
          "Men's Sandals & Floaters",
          "Men's Slippers & Flip Flops",
          "Men's Formal Shoes",
          "Men's Ethnic Shoes",
          "Shoe Care",
        ],
      },
      {
        name: "Woman Footwear",
        subcategories: [
          "All",
          "Woman Flats",
          "Woman Heels",
          "Woman Wedges",
          "Woman Slipper Flip Flops",
          "Woman Casual Shoes",
          "Woman Sports Shoes",
          "Woman Ballerinas",
          "Woman Ethnic Shoes",
          "Woman Sneakers",
          "Woman Walking Shoes",
          "Woman Boots",
        ],
      },
      {
        name: "Watches and Accessories",
        subcategories: [
          "All",
          "Men & Woman Watches",
          "Men & Woman Sunglasses",
          "Wallets",
          "Men & Woman Belts",
          "Men Fashion Jewellery",
          "Preclous Articles",
          "Kids Accessories",
          "Woman Fashion Jewellery",
        ],
      },
      {
        name: "Woman Western",
        subcategories: [
          "All",
          "Woman Tops",
          "Woman Dresses",
          "Woman T-shirts & Polo T-shirts",
          "Woman Jeans",
          "Woman Nighties & Night Dresses",
          "Woman Nightsuit",
          "Woman Track Pants",
          "Woman Trouser",
          "Woman Jumpsuit",
          "Woman Shapewear",
          "Woman Sports Bra",
        ],
      },
      {
        name: "Bags, Suitcases & Luggage",
        subcategories: [
          "All",
          "Bags & Backpacks",
          "Suitcases & Trolleys",
          "Rucksacks",
          "Handbags",
          "Slingbags",
          "Woman's Clutches & Wallets",
          "Messenger Bags",
          "Travel Accessories",
        ],
      },
      {
        name: "Kids",
        subcategories: [
          "All",
          "Girls Dresses",
          "Boys & Girls Tshirts",
          "Boys & Girls Combosets",
          "Boys & Girls Ethnic Wear",
          "Boys & Girls Jeans",
          "Boys & Girls Shorts",
          "Boys & Girls Trackpants",
          "Boys & Girls Innerwear",
          "Infant Wear",
          "Kids Sliper Flip Flops",
          "Kids Sports Shoes",
        ],
      },
      {
        name: "Essentials",
        subcategories: [
          "All",
          "Men;s Briefs & Trunks",
          "Men's Vests",
          "Men's Boxers",
          "Woman Lingerie Sets",
          "Woman Bra",
          "Woman Panty",
          "Woman Sarees",
          "Woman Kurtas",
          "Woman Kurta Sets & Salwar Sets",
          "Boys Innerwear",
          "Girls Innerwear",
          "Woman Slipper Flip Flops",
        ],
      },
      {
        name: "Winter",
        subcategories: [
          "All",
          "Men,s Jackets",
          "Men's Sweatshirts",
          "Men's Sweaters",
          "Men's Thermals",
          "Woman's Jackets",
          "Woman's Sweatshirts",
          "Woman's Sweaters & Cardigans",
          "Woman's Shrugs",
          "Kids Sweatshirts",
          "Woman Kurtas",
          "Boy's Innerwear",
          "Kids Jackets",
        ],
      },
    ],
  },
  {
    name: "Electronics",
    icon: <FaTshirt />,
    subcategories: [
      {
        name: "Audio",
        subcategories: [
          "All",
          "BlueTooth Headphones",
          "Wired Headphones",
          "True Wireless Earbuds",
          "Bluetooth Speakers",
          "Soundbars",
          "Home Theatres",
          "TV Streaming Device",
          "Remote Control",
          "DTH Set top box",
          "Headphones Pouch & Case Covers",
        ],
      },
      "Electronics GST Store",
      {
        name: "Cameras & Accessories",
        subcategories: [
          "All",
          "DSLR & Mirrorless",
          "Sports & Action",
          "Point & Shoot",
          "Instant Cameras",
          "Comcorders",
          "Camera Tripods",
          "Camera Lenses",
          "Drone",
          "Flashes",
          "Gimbals",
          "Binoculars",
          "Other Camera Accessories",
        ],
      },
      {
        name: "Computer Peripherals",
        subcategories: [
          "All",
          "Printers",
          "Monitors",
          "Projectors",
          "Portable Projectors",
          "Ink Cartridges",
          "Ink Bttles",
          "Receipt Printers",
          "Lamination Machines",
          "Note Counting Machines",
          "Barcode Sceaners",
          "Currency Datectors",
        ],
      },
      {
        name: "Gaming",
        subcategories: [
          "All",
          "Gaming Consoles",
          "Gaming Mouse",
          "Gaming Keyboards",
          "Gamepads",
          "Games",
          "Accessory Kits",
          "Gaming Accessories Combo",
          "Gaming Mousepads",
          "Membership Cards",
          "Controllers",
          "Other Gaming Accessories",
          "Gaming Components",
        ],
      },
      {
        name: "Health & Personal Care",
        subcategories: [
          "All",
          "Trimmers",
          "Shavers",
          "Hair Staighteners",
          "Hair Dryers",
          "Epilators",
          "Glucometers And Accessories",
          "Blood Pressure Moniters",
          "Digital Thermometers",
          "Weighing Scales",
          "Massagers",
          "Nebulizers",
          "Vaporizers",
        ],
      },
      {
        name: "Laptop Accessories",
        subcategories: [
          "All",
          "Mouse",
          "Laptop Keyboards",
          "Router",
          "Data Cards",
          "UPS",
          "USB Gadgrts",
          "Security Software",
          "Laptop Battery",
          "Laptop Adapter",
          "Wireless USB Adapter",
          "Processor",
          "Other Accessories",
        ],
      },
      {
        name: "Laptop & desktop",
        subcategories: [
          "All",
          "Laptops",
          "Gamings Laptop",
          "Desktop PCs",
          "All In One PCs",
          "Mini PCs",
          "Tower PCs",
          "PC Finder",
        ],
      },
      {
        name: "MobileAccessory",
        subcategories: [
          "All",
          "Plain Cases",
          "Designer Cases",
          "Screen Guards",
          "Camera Lens Protectors",
          "Tablet Accessories",
          "MobileCable",
          "MobileChargingMobileCharger",
          "MobilePouches",
          "MobileFlash",
          "MobileHolder",
          "MobileUSBGadget",
          "Mobiles Accessories Combos",
        ],
      },
      {
        name: "Powerbank",
        subcategories: ["All", "Powerbank"],
      },
      {
        name: "Smart Home Automation",
        subcategories: [
          "All",
          "Smart Assistants",
          "Smart Lights",
          "Smart Cameras",
          "Smart Switches",
          "Smart Door Locks",
          "MobileCable",
          "Sensors & Alarms",
        ],
      },
      {
        name: "Smart Wearables",
        subcategories: ["All", "Smart Bands", "Smart Glasses"],
      },
      {
        name: "Storage",
        subcategories: [
          "All",
          "MobileMemoryCard",
          "ComputerStoragePendrive",
          "MobileStoragePendrive",
          "ExternalHardDrive",
          "InternalHardDrive",
        ],
      },
      {
        name: "Tablets",
        subcategories: [
          "All",
          "Tablets With Call Facility",
          "Tablets Without Call Facility",
        ],
      },
    ],
  },
  {
    name: "Home & Furniture",
    icon: <FaCouch />,
    subcategories: [
      {
        name: "Home Furnishings",
        subcategories: [
          "All",
          "Bed Linens",
          "Bedsheets",
          "Blankets",
          "Curtains & Accessories",
          "Bath lilen",
          "Floor Coverings",
          "Cushions & Pillows",
          "Kitchen Linen Sets",
          "Table Linen Sets",
          "Sofa & Curtain fabrics",
          "Branded Collections",
        ],
      },
      "Furniture",
      {
        name: "Living Room Furniture",
        subcategories: [
          "All",
          "Sofas Sets & Sectionals",
          "Tv Units",
          "Dining Sets",
          "Sofa Beds",
          "Recliners",
          "Living Room Chairs",
          "Cabinet & Drawers",
          "Bookshelves",
          "Shoe Racks",
        ],
      },
      {
        name: "Kitchen & Dining",
        subcategories: [
          "All",
          "Cookware",
          "Knives, Choppers & Cutters",
          "Gas Stoves & Accessories",
          "Kitchen Tools",
          "Tableware & Dinnerware",
          "Containers & Kitchen Storage",
          "Barware",
          "BakeWare",
          "Handjuicers & Grinders",
          "Disposable Supplies",
          "Outdoor Cooking",
        ],
      },
      {
        name: "Bedroom Furniture",
        subcategories: [
          "All",
          "Mattresses",
          "Beds",
          "Wardrobes",
          "Side Tables",
          "TV Units",
          "Office Tables",
          "Office Chairs",
          "Bookshelves",
          "Bar Cabinets",
          "Bar Stools",
          "Rocking Chairs",
          "Benches",
        ],
      },
      "Space Savings Furniture",
      {
        name: "Home Decor",
        subcategories: [
          "All",
          "Lightings",
          "Stickers & Wallpapers",
          "Paintings & Posters",
          "Clocks",
          "Showpieces & Decoratives",
          "Wall Decor",
          "Flowers & Vases",
          "Home Fragrances",
          "Windchimes & Dream catcher",
          "Photo frames & Albums",
          "Diyas, Candles & Holders",
          "Frstive & Gifting",
        ],
      },
      {
        name: "Tools & Utility",
        subcategories: [
          "All",
          "Hand Tools",
          "Power Tools",
          "Measuring Tools",
          "Home Storage & Organizers",
          "Umbrellas",
          "Appliance Trolley & Stands",
          "Cloth Dryer Stand",
          "Appliance Filter & Cartridges",
          "Laundary Organization",
          "Lock & Security",
          "Fire & Personal Safety",
          "Paint Supplies & Equipments",
        ],
      },
      "Work Space Furniture",
      "Kids Furniture",
      {
        name: "Lightings & Electricals",
        subcategories: [
          "All",
          "Bulbs",
          "Emergency Lights",
          "Torches",
          "Tubelights",
          "Extension Cords",
          "Outdoor Lamps",
          "Batteries",
          "Electricalwire",
          "ElectricalSocket",
          "ElecticalDoorBell",
          "Solar Lights, Panels & Batteries",
          "Electrical Hardware",
        ],
      },
      {
        name: "Cleaning & Bath",
        subcategories: [
          "All",
          "Mops",
          "Cleaning Supplies",
          "House Hold supplies",
          "Air Fresheners",
          "Cleaning Gloves",
          "Liquid DeterGents",
          "Taps & Faucet",
          "Toothbrush holder",
          "Bathroom Rack & shelves",
          "Shower Heads",
          "Bath & Kitchen Fittings",
          "Bathroom Accesorries",
        ],
      },
      {
        name: "Pets & Gardening",
        subcategories: [
          "All",
          "Plant Seeds",
          "Soil Manure",
          "Pots & Planters",
          "Garden tool set",
          "Waterings Equipments",
          "Dog Essentials",
          "Cat Essentials",
          "Fish & Aquatic",
          "Pet Grooming & Hygiene",
          "Pet Toys",
          "Pet Health & Safety",
        ],
      },
    ],
  },
  { name: "Appliances", icon: <FaBlender /> },
  { name: "Flight Bookings", icon: <FaPlane /> },
  { name: "Beauty, Toys & More", icon: <FaSmile /> },
  {
    name: "Two Wheelers",
    icon: <FaMotorcycle />,
    subcategories: ["Petrol Vehicles", "Electric Vehicles"],
  },
];

const ToggleHeader = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const handleMouseEnterCategory = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
  };

  const handleMouseLeaveCategory = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
  };

  const handleMouseEnterSubcategory = (subcategory) => {
    setActiveSubcategory(subcategory);
  };

  return (
    <div className="toggleHeader container">
      <div className="toggleHeader-categories">
        {categories.map((category) => (
          <div
            key={category.name}
            className="toggleHeader-category"
            onMouseEnter={() => handleMouseEnterCategory(category)}
            onMouseLeave={handleMouseLeaveCategory}
          >
            <div className="category-content">
              <span className="category-content-icon">{category.icon}</span>
              <span className="category-content-text">{category.name}</span>
            </div>
            {activeCategory === category && activeCategory.subcategories && (
              <div className="toggleHeader-dropdown">
                {activeCategory.subcategories.map((subcategory, index) => (
                  <div
                    key={index}
                    className="toggleHeader-dropdown-item"
                    onMouseEnter={() =>
                      handleMouseEnterSubcategory(subcategory)
                    }
                  >
                    {subcategory.name || subcategory}
                    {activeSubcategory === subcategory &&
                      activeSubcategory.subcategories && (
                        <div className="nested-dropdown">
                          {activeSubcategory.subcategories.map(
                            (nestedSub, idx) => (
                              <div
                                key={idx}
                                className="toggleHeader-dropdown-item"
                              >
                                {nestedSub}
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleHeader;
