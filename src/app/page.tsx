

import { HoverExpand_002 } from "@/components/ui/skiper-ui/skiper53";
import ScrollTextSection from "@/components/ScrollTextSection";
import BentoGallery from "@/components/BentoGallery";
import BrandTitle from "@/components/BrandTitle";
import Footer from "@/components/Footer";
import PinnedScrollGallery from "@/components/PinnedScrollGallery";
import NailCustomizer from "@/components/NailCustomizer";
import { Skiper30 } from "@/components/ui/skiper-ui/skiper30";
import ScrollIndicator from "@/components/ScrollIndicator";

const images = [
  {
    src: "/nails/cherry red and white hearts.jpg",
    alt: "Cherry red and white hearts",
    code: "# 01",
  },
  {
    src: "/scroll2.jpeg",
    alt: "French with bow on every finger",
    code: "# 03",
  },
  {
    src: "/nails/pink heart nails.jpg",
    alt: "Pink heart nails",
    code: "# 04",
  },
  {
    src: "/nails/nude base white flower at bottom on all.jpg",
    alt: "Nude base white flower design",
    code: "# 05",
  },
  {
    src: "/nails/Cherry Blossom Dream Long Almond Shaped Beige and Burgundy Press On Nail Set with Beautiful Cherry Design.jpg",
    alt: "Cherry blossom dream nails",
    code: "# 06",
  },
];

const pinnedItems = [
  {
    title: "The Signature Collection",
    subtitle: "handcrafted 2d art on every nail",
    price: "\u20B9149",
    image: "/nails/cherry red and white hearts.jpg",
    href: "/collection/signature",
  },
  {
    title: "The Classics",
    subtitle: "clean, solid & effortlessly chic",
    price: "\u20B999",
    image: "/nails/french tips with cherries.jpg",
    href: "/collection/classics",
  },
  {
    title: "Made For You",
    subtitle: "tell us your dream design",
    price: "\u20B9149",
    image: "/nails/nude base white flower at bottom on all.jpg",
    href: "https://ig.me/m/fresh.ons",
  },
];


export default function Home() {
  return (
    <>
      <div className="relative flex flex-col lg:flex-row min-h-screen bg-[#f5f4f3]">
        {/* Hero content — right on desktop, first on mobile */}
        <div className="order-1 lg:order-2 flex-1 flex flex-col items-center justify-center relative min-h-[70vh] lg:min-h-screen pt-20 pb-16  px-4 lg:py-0">
          <BrandTitle />
          <HoverExpand_002 images={images} className="" />
        </div>

        {/* Nail Customizer — left on desktop, second on mobile */}
        <div className="order-2 lg:order-1 flex items-center justify-center lg:w-[480px] lg:border-r lg:border-[#e8e0e0]">
          <NailCustomizer />
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>
       <Skiper30/>
       
      <PinnedScrollGallery items={pinnedItems} />
     
      <Footer />
    </>
  );
}
