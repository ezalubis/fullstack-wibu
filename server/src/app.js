import express from "express";
import cors from "cors";
// import itemsRouter from "./routes/items.js";
import path from "path";
import multer from "multer";
import bcrypt from "bcryptjs";
import { client } from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

export const app = express();
const router = express.Router();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/img");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        path.parse(file.originalname).name +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });
  
  // const upload = multer({ storage: storage });/
app.use(cors({ origin: "http://localhost:5173" }));

router.get("/akun", async (req, res)=>{
    try{
      const data = await client.query("SELECT *FROM account");
      res.send(data.rows)
    }catch(error){
      res.send("kosong")
    }
  })
  // register
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);
  try{
    await client.query(
        `INSERT INTO account (username,password,store_name,code_store) VALUES ('${req.body.username}','${hash}','${req.body.store_name}','${req.body.code_store}')`
        );
      res.json({message:"pepek"})
  }catch(error){
    res.status(500).send("error disini, " + error);
  }
});
  // login
router.post("/login", async (req,res)=>{
    try{
      const account = await client.query(`SELECT * FROM account WHERE username='${req.body.username}' `)
      if(account.rows){
        if(await bcrypt.compare(req.body.password, account.rows[0].password)){
          res.json({
            token: jwt.sign(account.rows[0], "bociljenong"),
            account:account.rows[0],
          });
        }else{
          res.json("Password yang kamu masukkan salah!!!")
        }
      }else{
        res.json("Akun tidak ditemukan!!!")
      }
    }catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  
  })
  
  // middleware otentikasi
router.use((req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const account = jwt.verify(token, "bociljenong");
        req.account = account;
        next();
      } catch {
        res.status(401);
        res.send("Token salah.");
      }
    } else {
      res.status(401).json({error:"woy Token belum diisi su."});
    }
  });
  
router.get("/me", (req, res) => {
    res.json(req.account);
  });
  
  // import express from "express";
  // import { client} from "../db.js";
  // import multer from "multer";
  // import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, path.join(__dirname,'../public/images'))
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname)
  //   },
  // })  
  const upload = multer({ storage:storage  });
  const items = [
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
  ];

  // const router = express.Router();
  router.post("/all", async (_req, res) => {
    for await (const item of items) {
      await client.query(
        `INSERT INTO produk (name, price,img, description) VALUES ('${item.name}', ${item.price}, '${item.link}','${item.description}')`
      );
    }
    res.send("Semua berhasil disimpan.");
  });

  // semua
  // router.get("/", (_req, res) => {
  //   res.json(
  //     items.map((item) => {
  //       return { id:item.id, name: item.name, price: item.price, link:item.link, description:item.description};
  //     })
  //   );
  // });
  router.get("/items",async(_req,res)=>{
    try{
      const results= await client.query("SELECT * FROM produk WHERE id>14");
      res.json(results.rows);
    }catch(error){
      console.log("error disini bang messi : ", error);
    }
  })
  router.post("/items/upload", upload.single("img"),async (req,res)=>{
    try{
      await client.query(`INSERT INTO produk (name, price , img , description,store_name, rating) VALUES ('${req.body.name}', ${req.body.price}, '${req.file.filename}','${req.body.description}','${req.body.store_name}','${req.body.rating}')`);
      res.status(201).send({message:"berhasil disimpan"});
    }catch(error){
      res.send("salahhh");
      console.log("error disini bang messi : ", error);
    }
  })


  router.get("/items/:id", async (req, res) => {
    try{
      const results = await client.query(`SELECT * FROM produk WHERE id = ${req.params.id}`)
      res.json(results.rows[0]);
    }catch(error){
      res.status(401).send('error');
    }
    
  });

  // const bcrypt = require('bcrypt');

  router.put("/items/:id", async (req, res) => {
    try {
      let imgFilename = '';
  
      if (req.file) {
        imgFilename = req.file.filename;
      }
  
      const { name, price, description, store_name, rating } = req.body;
  
      if (!name) {
        return res.status(400).json("Name is required"); // Menangani jika name kosong
      }
  
      await client.query(
        `UPDATE produk 
         SET name = $1, price = $2, img = $3, description = $4, store_name = $5, rating = $6 
         WHERE id = $7`,
        [name, price, imgFilename, description, store_name, rating, req.params.id]
      );
      console.log(req.body.name);
  
      res.status(200).json("Done");
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json("An error occurred");
    }
  });
  
  
  
  // router.put("/:id",(req,res)=>{
  //   try{
  //     let index = items.find((i)=> i.id === parseInt(req.params.id))
  //     index = req.body
  //     res.send(index)
  //   }catch(error){
  //     console.log('error:',error)
  //   }
  // })
  // router.post("/login",(req,res)=>{

  // })
  router.post("/komen",async(req,res)=>{
    try{
      await client.query(
        `INSERT INTO komen (pengirim,komen, store_name, produk, created_at) VALUES ('${req.body.pengirim}','${req.body.komen}','${req.body.store_name}','${req.body.produk}',now())`
      )
      res.status(200).json("Berhasil Komen Bang messi");
    }catch(error){
      console.log("error bang",error);
    }
  })
  router.put("/komen/:id",async(req,res)=>{
    try{
      await client.query(
        `UPDATE komen SET komen = '${req.body.komen}' created_at = now() WHERE id = '${req.params.id}' )`
      )
      res.status(200).json("Berhasil Komen Bang messi");
    }catch(error){
      console.log("error bang",error);
    }
  })
  router.get("/komen/get",async(req,res)=>{
    try{
      const results = await client.query(
        'SELECT * FROM komen INNER JOIN produk ON komen.store_name=produk.store_name WHERE komen.produk = produk.name'
      )
      res.status(200).json(results.rows);
    }catch(error){
      console.log("error bang",error);
    }
  })
  router.delete("/del/komen/:id", async(req,res)=>{
    try{
    await client.query(`DELETE FROM komen WHERE id='${req.params.id}'`);
    res.status(200).json({message:"Berhasil Dihapus"});
    }catch(error){
      console.log("Error:", error);
    }
  });
  export default router;



// router.use("/items", itemsRouter);
app.use("/api", router);
app.listen(3000, () => console.log("Server berhasil dijalankan di port 3000."));