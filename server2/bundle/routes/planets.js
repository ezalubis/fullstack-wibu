"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planets = [
    {
        id: 1,
        name: "Mercury",
        diameter: 4879,
        description: "Mercury is the 1st planet in our Solar System.",
    },
    {
        id: 2,
        name: "Venus",
        diameter: 12104,
        description: "Venus is the 2nd planet in our Solar System.",
    },
    {
        id: 3,
        name: "Earth",
        diameter: 12756,
        description: "Earth is the 3rd planet in our Solar System.",
    },
    {
        id: 4,
        name: "Mars",
        diameter: 6792,
        description: "Mars is the 4th planet in our Solar System.",
    },
    {
        id: 5,
        name: "Jupiter",
        diameter: 142984,
        description: "Jupiter is the 5th planet in our Solar System.",
    },
    {
        id: 6,
        name: "Saturn",
        diameter: 120536,
        description: "Saturn is the 6th planet in our Solar System.",
    },
    {
        id: 7,
        name: "Uranus",
        diameter: 51118,
        description: "Uranus is the 7th planet in our Solar System.",
    },
    {
        id: 8,
        name: "Neptune",
        diameter: 49528,
        description: "Neptune is the 8th planet in our Solar System.",
    },
    {
        id: 9,
        name: "Pluto",
        diameter: 2370,
        description: "Pluto is the 9th planet in our Solar System.",
    },
];
const router = express_1.default.Router();
// semua
router.get("/", (_req, res) => {
    res.json(planets.map((planet) => {
        return { id: planet.id, name: planet.name, diameter: planet.diameter };
    }));
});
// satu berdasarkan ID
router.get("/:id", (req, res) => {
    const planet = planets.find((p) => p.id === parseInt(req.params.id));
    if (planet) {
        res.json(planet);
    }
    else {
        res.status(404);
        res.send("Planet tidak ditemukan.");
    }
});
exports.default = router;
