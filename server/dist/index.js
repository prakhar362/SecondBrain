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
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
app.use(express_1.default.json());
//zod validation
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(32),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8)
        .max(20)
        .regex(/[A-Z]/, "Must include at least one uppercase letter")
        .regex(/[a-z]/, "Must include at least one lowercase letter")
        .regex(/[0-9]/, "Must include at least one number")
        .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
});
// Routes
app.get('/', (req, res) => {
    res.send("Server working ! Hello from server");
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({ error: "Invalid input", details: result.error.format() });
        }
        const { username, email, password } = result.data;
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            return res.status(403).json({ error: "User already exists with this username" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.UserModel.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(200).json({ message: "Signed up" });
    }
    catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Server error" });
    }
}));
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
