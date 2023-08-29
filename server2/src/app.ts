import express from "express";
import cors from "cors";
import itemsRouter from "./routes/items.js";

export const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

const router = express.Router();

router.use("/items", itemsRouter);

app.use("/api", router);

app.listen(3000, () => console.log("Server berhasil dijalankan di port 3000."));
