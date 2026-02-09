import CollectionPageLayout from "@/components/CollectionPageLayout";

const customItems = [
  { id: "m1", img: "/nails/Vday nails #valentines #vdaygiftsforher….jpg", name: "Valentine's Special", height: 500 },
  { id: "m2", img: "/nails/Kawaii Brown Polka Dots Press on Nails Long Almond Nails Custom Nail French Tip - Etsy.jpg", name: "Kawaii Brown Dots", height: 550 },
  { id: "m3", img: "/nails/cherry red, french on two with cherry red star on frenchies.jpg", name: "Star French Custom", height: 420 },
  { id: "m4", img: "/nails/cherry red, hearts.jpg", name: "Cherry Heart Custom", height: 400 },
  { id: "m5", img: "/nails/Rebellious Rose Makeup _ Elevate Your Style With, 24pcs_Set Short Oval Bow And Polka Dot Nails Design _ Color_ Red_White _ Size_ Os.jpg", name: "Rebellious Rose Set", height: 500 },
  { id: "m6", img: "/nails/heart french red.jpg", name: "Heart French Red", height: 550 },
];

export default function CustomCollection() {
  return (
    <CollectionPageLayout
      title="Made For You"
      subtitle="tell us your dream design"
      price="₹129"
      items={customItems}
    />
  );
}
