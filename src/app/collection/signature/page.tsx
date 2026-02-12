import CollectionPageLayout from "@/components/CollectionPageLayout";

const signatureItems = [
  { id: "s1", img: "/nails/the signature collection/cherry red and white hearts.jpg", name: "Cherry Red Hearts", height: 500 },
  { id: "s2", img: "/nails/the signature collection/french tips with cherries.jpg", name: "Cherry French Tips", height: 420 },
  { id: "s3", img: "/nails/the signature collection/pink heart nails.jpg", name: "Pink Hearts", height: 550 },
  { id: "s4", img: "/nails/the signature collection/nude base white flower at bottom on all.jpg", name: "White Flower Garden", height: 600 },
  { id: "s5", img: "/nails/the signature collection/Cherry Blossom Dream Long Almond Shaped Beige and Burgundy Press On Nail Set with Beautiful Cherry Design.jpg", name: "Cherry Blossom Dream", height: 450 },
  { id: "s6", img: "/nails/the signature collection/french with red hearts.jpg", name: "French Red Hearts", height: 380 },
  { id: "s7", img: "/nails/the signature collection/frenchh with just cherry on to on all fingers.jpg", name: "Cherry French", height: 500 },
  { id: "s8", img: "/nails/the signature collection/Kawaii red and white Polka Dots Press on Nails Long Almond Nails Custom Nail French Tip - Etsy (1).jpg", name: "Kawaii Polka Dots", height: 550 },
  { id: "s9", img: "/nails/the signature collection/red with white heart on middle, white bgm and red heart on ring.jpg", name: "Heart Accent Set", height: 400 },
  { id: "s10", img: "/nails/the signature collection/regular french with some red hearts.jpg", name: "Classic Hearts French", height: 350 },
  { id: "s11", img: "/nails/the signature collection/White and Valentine Red Polka Dot with Minimal Heart over French Tip Press-Ons.jpg", name: "Valentine Polka", height: 480 },
  { id: "s12", img: "/nails/the signature collection/pink oval with cherry red design.jpg", name: "Cherry Oval Art", height: 520 },
  { id: "s13", img: "/nails/the signature collection/cherry red with white star on middle and ring finger.jpg", name: "Star Accent Red", height: 460 },
  { id: "s14", img: "/nails/the signature collection/cherry red, french on two with cherry red star on frenchies.jpg", name: "Cherry Star French", height: 430 },
  { id: "s15", img: "/nails/the signature collection/cherry red, hearts.jpg", name: "Cherry Red Hearts Duo", height: 490 },
  { id: "s16", img: "/nails/the signature collection/Chrome Yellow Summer Nails 💅.jpg", name: "Chrome Yellow Summer", height: 510 },
  { id: "s17", img: "/nails/the signature collection/download.jpg", name: "Statement Design", height: 400 },
  { id: "s18", img: "/nails/the signature collection/french with just bow on every finger.jpg", name: "Bow French Tips", height: 470 },
  { id: "s19", img: "/nails/the signature collection/heart french red.jpg", name: "Heart French Red", height: 440 },
  { id: "s20", img: "/nails/the signature collection/Kawaii Brown Polka Dots Press on Nails Long Almond Nails Custom Nail French Tip - Etsy.jpg", name: "Kawaii Brown Polka Dots", height: 530 },


  { id: "s23", img: "/nails/the signature collection/pink square nails.jpg", name: "Pink Square Nails", height: 420 },
  { id: "s24", img: "/nails/the signature collection/Rebellious Rose Makeup _ Elevate Your Style With, 24pcs_Set Short Oval Bow And Polka Dot Nails Design _ Color_ Red_White _ Size_ Os.jpg", name: "Rebellious Rose Polka", height: 500 },
  { id: "s25", img: "/nails/the signature collection/red and white frenchies.jpg", name: "Red & White French", height: 460 },
  { id: "s26", img: "/nails/the signature collection/subtle white flowers.jpg", name: "Subtle White Flowers", height: 540 },
  { id: "s27", img: "/nails/the signature collection/Valentines-day.jpg", name: "Valentine's Day Nails", height: 480 },
];

export default function SignatureCollection() {
  return (
    <CollectionPageLayout
      title="The Signature Collection"
      subtitle="handcrafted 2d art on every single nail 💅"
      price="₹98"
      items={signatureItems}
      showCustomCta
    />
  );
}
