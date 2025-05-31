"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app = (0, express_1.default)();
// Middleware (if needed)
// app.use(express.json());
// Routes
app.get('/', (req, res) => {
    res.send("Server working test");
});
app.post("/api/v1/signup", (req, res) => {
    res.send("Signup route");
});
app.post("/api/v1/login", (req, res) => {
    res.send("Login route");
});
app.post("/api/v1/content", (req, res) => {
    res.send("Content POST route");
});
app.get("/api/v1/content", (req, res) => {
    res.send("Content GET route");
});
app.delete("/api/v1/content", (req, res) => {
    res.send("Content DELETE route");
});
app.post("/api/v1/brain/share", (req, res) => {
    res.send("Brain share route");
});
app.get("/api/v1/brain/:sharLink", (req, res) => {
    res.send(`Brain link for ${req.params.sharLink}`);
});
// Define the port
const port = process.env.PORT || 3000;
console.log("PORT", process.env.PORT);
// MongoDB connection and server start
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongoUrl = process.env.MONGO_URL;
            if (!mongoUrl) {
                throw new Error("MONGO_URL is not defined in environment variables");
            }
            yield mongoose_1.default.connect(mongoUrl);
            console.log("Connected to MongoDB");
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        }
    });
}
main();
