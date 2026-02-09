import { HoverExpand_002 } from "@/components/ui/skiper-ui/skiper53";

const images = [
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
    alt: "Elegant manicure design",
    code: "# 01",
  },
  {
    src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&h=600&fit=crop",
    alt: "Luxurious nail art",
    code: "# 02",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=600&fit=crop",
    alt: "Professional nail care",
    code: "# 03",
  },
  {
    src: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&h=600&fit=crop",
    alt: "Creative nail designs",
    code: "# 04",
  },
  {
    src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&h=600&fit=crop",
    alt: "Stylish nail polish",
    code: "# 05",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
    alt: "Beautiful nail finish",
    code: "# 06",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f4f3]">
      <HoverExpand_002 images={images} className="" />
    </div>
  );
}
