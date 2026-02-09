import CollectionPageLayout from "@/components/CollectionPageLayout";

const signatureItems = [
  { id: "s1", img: "/nails/cherry red and white hearts.jpg", name: "Cherry Red Hearts", height: 500 },
  { id: "s2", img: "/nails/french tips with cherries.jpg", name: "Cherry French Tips", height: 420 },
  { id: "s3", img: "/nails/pink heart nails.jpg", name: "Pink Hearts", height: 550 },
  { id: "s4", img: "/nails/nude base white flower at bottom on all.jpg", name: "White Flower Garden", height: 600 },
  { id: "s5", img: "/nails/Cherry Blossom Dream Long Almond Shaped Beige and Burgundy Press On Nail Set with Beautiful Cherry Design.jpg", name: "Cherry Blossom Dream", height: 450 },
  { id: "s6", img: "/nails/french with red hearts.jpg", name: "French Red Hearts", height: 380 },
  { id: "s7", img: "/nails/frenchh with just cherry on to on all fingers.jpg", name: "Cherry French", height: 500 },
  { id: "s8", img: "/nails/Kawaii red and white Polka Dots Press on Nails Long Almond Nails Custom Nail French Tip - Etsy (1).jpg", name: "Kawaii Polka Dots", height: 550 },
  { id: "s9", img: "/nails/red with white heart on middle, white bgm and red heart on ring.jpg", name: "Heart Accent Set", height: 400 },
  { id: "s10", img: "/nails/regular french with some red hearts.jpg", name: "Classic Hearts French", height: 350 },
  { id: "s11", img: "/nails/White and Valentine Red Polka Dot with Minimal Heart over French Tip Press-Ons.jpg", name: "Valentine Polka", height: 480 },
  { id: "s12", img: "/nails/pink oval with cherry red design.jpg", name: "Cherry Oval Art", height: 520 },
];

export default function SignatureCollection() {
  return (
    <CollectionPageLayout
      title="The Signature Collection"
      subtitle="handcrafted 2d art on every nail"
      price="₹98"
      items={signatureItems}
    />
  );
}
