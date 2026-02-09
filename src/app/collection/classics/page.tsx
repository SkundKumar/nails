import CollectionPageLayout from "@/components/CollectionPageLayout";

const classicsItems = [
  { id: "c1", img: "/nails/pink square nails.jpg", name: "Pretty in Pink", height: 400 },
  { id: "c2", img: "/nails/pink and silver gradient.jpg", name: "Pink Silver Gradient", height: 500 },
  { id: "c3", img: "/nails/subtle white flowers.jpg", name: "Subtle White", height: 450 },
  { id: "c4", img: "/nails/pink and silver glitter frfench tips.jpg", name: "Pink Glitter French", height: 520 },
  { id: "c5", img: "/nails/cherry red with white star on middle and ring finger.jpg", name: "Cherry Red Stars", height: 380 },
  { id: "c6", img: "/nails/red and white frenchies.jpg", name: "Red & White French", height: 350 },
  { id: "c7", img: "/nails/Chrome Yellow Summer Nails \ud83d\udc85.jpg", name: "Chrome Yellow Summer", height: 550 },
  { id: "c8", img: "/nails/download.jpg", name: "Classic Nude", height: 400 },
  { id: "c9", img: "/nails/french with just bow on every finger.jpg", name: "Bow French", height: 480 },
];

export default function ClassicsCollection() {
  return (
    <CollectionPageLayout
      title="The Classics"
      subtitle="clean, solid & effortlessly chic"
      price="₹79"
      items={classicsItems}
    />
  );
}
