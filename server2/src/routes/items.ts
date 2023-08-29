
import express from "express";
import { client, connectToDatabase } from "../db.js";
interface Items {
  id:number;
  name : string ;
  price: number;
  link:string;
  description:string;
}
const items: Items[] = [
  {
    id: 1,
    name: "Anya Forger Costumes",
    price: 250000,
    link:"https://i5.walmartimages.com/asr/e65996c0-fea0-4b3a-a45b-e3cb0d4bb9ef.057a77f69568b67adb3003fbfd286734.jpeg",
    description: "Anime SPY X FAMILY Anya Forger Cute Cosplay Costume Dress Uniform Wig SPYXFAMILY Halloween Carnival Party Aldult Kids Clothes(Costume without Wig,S)",
  },
  {
    id: 2,
    name: "Shinobu kochou Costumes",
    price: 425000,
    link:"https://img.joomcdn.net/e00bbbacd111d76f5db725004145435f788e5582_original.jpeg",
    description: "Adult Kids Anime Demon Slayer Kimetsu No Yaiba Kochou Shinobu Cosplay Costume Kimono Halloween Clothes",
  },
  {
    id: 3,
    name: "Zero Two Special Costumes",
    price: 550000,
    link:"https://cdn.costumewall.com/wp-content/plugins/image-hot-spotter/images/ZeroTwoCosplayCostume.jpg",
    description: "Zero Two is the chief heroine and a very important character of the Japanese animated series Darling in the Franxx.",
  },
  {
    id: 4,
    name: "Hinata Special Costumes",
    price: 350000,
    link:"https://i5.walmartimages.com/asr/4e0c2884-1a51-4df9-8e34-82f0546219d4.22bdeae40915742c7d7d5a2ef0426a06.jpeg",
    description: "Womens Anime Costume Hyuga Hinata Clothes Purple Coat",
  },
  // {
  //   id: 5,
  //   name: "Jupiter",
  //   price: 250000,
  //   link:"https://i5.walmartimages.com/asr/e65996c0-fea0-4b3a-a45b-e3cb0d4bb9ef.057a77f69568b67adb3003fbfd286734.jpeg",
  //   description: "Anime SPY X FAMILY Anya Forger Cute Cosplay Costume Dress Uniform Wig SPYXFAMILY Halloween Carnival Party Aldult Kids Clothes(Costume without Wig,S)",
  // },
  // {
  //   id: 6,
  //   name: "Saturn",
  //   price: 250000,
  //   link:"https://i5.walmartimages.com/asr/e65996c0-fea0-4b3a-a45b-e3cb0d4bb9ef.057a77f69568b67adb3003fbfd286734.jpeg",
  //   description: "Anime SPY X FAMILY Anya Forger Cute Cosplay Costume Dress Uniform Wig SPYXFAMILY Halloween Carnival Party Aldult Kids Clothes(Costume without Wig,S)",
  // },
  // {
  //   id: 7,
  //   name: "Uranus",
  //   price: 250000,
  //   link:"https://i5.walmartimages.com/asr/e65996c0-fea0-4b3a-a45b-e3cb0d4bb9ef.057a77f69568b67adb3003fbfd286734.jpeg",
  //   description: "Anime SPY X FAMILY Anya Forger Cute Cosplay Costume Dress Uniform Wig SPYXFAMILY Halloween Carnival Party Aldult Kids Clothes(Costume without Wig,S)",
  // },
  // {
  //   id: 8,
  //   name: "Neptune",
  //   price: 250000,
  //   link:"https://i5.walmartimages.com/asr/e65996c0-fea0-4b3a-a45b-e3cb0d4bb9ef.057a77f69568b67adb3003fbfd286734.jpeg",
  //   description: "Anime SPY X FAMILY Anya Forger Cute Cosplay Costume Dress Uniform Wig SPYXFAMILY Halloween Carnival Party Aldult Kids Clothes(Costume without Wig,S)",
  // },
  // {
  //   id: 9,
  //   name: "Pluto",
  //   price: 250000,
  //   link:"https://i5.walmartimages.com/asr/e65996c0-fea0-4b3a-a45b-e3cb0d4bb9ef.057a77f69568b67adb3003fbfd286734.jpeg",
  //   description: "Anime SPY X FAMILY Anya Forger Cute Cosplay Costume Dress Uniform Wig SPYXFAMILY Halloween Carnival Party Aldult Kids Clothes(Costume without Wig,S)",
  // },
];

const router = express.Router();

// semua
// router.get("/", (_req, res) => {
//   res.json(
//     items.map((item) => {
//       return { id:item.id, name: item.name, price: item.price, link:item.link, description:item.description};
//     })
//   );
// });
router.get("/",async(_req,res)=>{
  try{
    await connectToDatabase();
    const results= await client.query("SELECT * FROM produk");
    res.send(results.rows[0]);
  }catch(error){
    console.log("error disini bang messi : ", error);
  }
})


router.get("/:id", (req, res) => {
  const item = items.find((p) => p.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.send("Barang Tidak Ditemukan.");
  }
});
router.put("/:id",(req,res)=>{
  try{
    let index = items.find((i)=> i.id === parseInt(req.params.id))
    index = req.body
    res.send(index)
  }catch(error){
    console.log('error:',error)
  }
})
router.post("/login",(req,res)=>{

})


export default router;
