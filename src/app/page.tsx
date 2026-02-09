

import { HoverExpand_002 } from "@/components/ui/skiper-ui/skiper53";
import ScrollTextSection from "@/components/ScrollTextSection";
import BentoGallery from "@/components/BentoGallery";
import BrandTitle from "@/components/BrandTitle";
import Footer from "@/components/Footer";
import PinnedScrollGallery from "@/components/PinnedScrollGallery";
import NailCustomizer from "@/components/NailCustomizer";

const images = [
  {
    src: "/nails/cherry red and white hearts.jpg",
    alt: "Cherry red and white hearts",
    code: "# 01",
  },
  {
    src: "/nails/pink and silver glitter frfench tips.jpg",
    alt: "Pink and silver glitter french tips",
    code: "# 02",
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
    price: "\u20B998",
    image: "/nails/cherry red and white hearts.jpg",
    href: "/collection/signature",
  },
  {
    title: "The Classics",
    subtitle: "clean, solid & effortlessly chic",
    price: "\u20B979",
    image: "/nails/pink and silver glitter frfench tips.jpg",
    href: "/collection/classics",
  },
  {
    title: "Made For You",
    subtitle: "tell us your dream design",
    price: "\u20B9129",
    image: "/nails/nude base white flower at bottom on all.jpg",
    href: "/collection/custom",
  },
];


export default function Home() {
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center bg-[#f5f4f3]">
        <BrandTitle />
        <HoverExpand_002 images={images} className="" />
      </div>
      <PinnedScrollGallery items={pinnedItems} />
      <NailCustomizer />
      <Footer />
    </>
  );
}
