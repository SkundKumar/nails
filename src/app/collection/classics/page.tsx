import CollectionPageLayout from "@/components/CollectionPageLayout";

const classicsItems = [
  { id: "c1", img: "/classic/BabyPink.jpg.jpeg", name: "Baby Pink", height: 450 },
  { id: "c2", img: "/classic/BlueNails.jpg.jpeg", name: "Blue Nails", height: 500 },
  { id: "c3", img: "/classic/Brown.jpg.jpeg", name: "Brown", height: 420 },
  { id: "c4", img: "/classic/CherryRedNails.jpg.jpeg", name: "Cherry Red", height: 480 },
  { id: "c5", img: "/classic/Pink.jpg.jpeg", name: "Pink", height: 400 },
  { id: "c6", img: "/classic/Purple.jpg.jpeg", name: "Purple", height: 460 },
];

export default function ClassicsCollection() {
  return (
    <CollectionPageLayout
      title="The Classics"
      subtitle="clean, solid & effortlessly chic ✨"
      price="₹99"
      items={classicsItems}
      showCustomCta
    />
  );
}
