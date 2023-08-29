"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const items_js_1 = __importDefault(require("./routes/items.js"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
const router = express_1.default.Router();
router.use("/items", items_js_1.default);
exports.app.use("/api", router);
exports.app.listen(3000, () => console.log("Server berhasil dijalankan di port 3000."));
