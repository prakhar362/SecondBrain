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
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
// Routes
app.get('/', (req, res) => {
    res.send("Server working ! Hello from server");
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
const port = process.env.PORT || 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.MONGO_URL) {
                throw new Error("MONGO_URL is not defined in environment variables");
            }
            yield mongoose_1.default.connect(process.env.MONGO_URL);
            console.log("MongoDB Connection successful");
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });
        }
        catch (err) {
            console.error("Error:", err.message);
            process.exit(1);
        }
    });
}
main();
