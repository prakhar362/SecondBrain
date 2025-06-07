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
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const crypto_1 = require("crypto");
const middleware_1 = require("./middleware");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
// Middleware to parse JSON requests
app.use((0, cors_1.default)({
    origin: 'https://neuronest-lemon.vercel.app', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
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
app.post("/api/v1/logout", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // The token will be invalidated by removing it from the client
        res.json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Server error" });
    }
}));
app.post("/api/v1/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const useremail = req.body.email;
    const password = req.body.password;
    //find both username and email in DB:
    const user = yield db_1.UserModel.findOne({
        email: useremail,
    });
    if (!user) {
        return res.status(403).json({ error: "Wrong email or password" });
    }
    const passwordMatch = bcrypt_1.default.compareSync(password, user.password);
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        return res.status(403).json({ error: "Wrong email or password" });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type, title, tags } = req.body;
        if (!link || !type || !title) {
            return res.status(411).json({ error: "Missing required fields" });
        }
        //get user id from middlewares
        if (!req.userId) {
            console.log(req.userId);
            return res.status(411).json({ error: "USERID cannot be fetched from middleare" });
        }
        // Process tags - handle both string and array inputs
        let processedTags = [];
        if (tags) {
            if (typeof tags === 'string') {
                processedTags = tags.split(',').map((tag) => tag.trim()).filter(Boolean);
            }
            else if (Array.isArray(tags)) {
                processedTags = tags.map((tag) => tag.trim()).filter(Boolean);
            }
        }
        console.log("Processed Tags: ", processedTags);
        // Create or find tags and get their ObjectIds
        const tagIds = yield Promise.all(processedTags.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
            // Find existing tag or create new one
            const tag = yield db_1.TagModel.findOneAndUpdate({ title: tagName }, { title: tagName }, { upsert: true, new: true });
            return tag._id;
        })));
        yield db_1.ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: tagIds // Store the array of tag ObjectIds
        });
        res.json({ message: "Content added Successfully" });
    }
    catch (error) {
        console.error("content addition error:", error);
        res.status(500).json({ error: "Server error" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({ userId: userId })
        .populate("userId", "username")
        .populate("tags", "title"); // Populate tags and only get the title field
    res.send({ content });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.body;
        // @ts-ignore
        const userId = req.userId;
        if (!contentId) {
            return res.status(400).json({ error: "Content ID is required" });
        }
        const result = yield db_1.ContentModel.deleteOne({ _id: contentId, userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Content not found or unauthorized" });
        }
        res.json({ message: "Deleted successfully" });
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Server error" });
    }
}));
function random(length) {
    return (0, crypto_1.randomBytes)(length).toString("hex").slice(0, length);
}
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        const share = req.body.share;
        // @ts-ignore
        const userId = req.userId;
        if (!contentId || typeof share !== "boolean") {
            return res.status(400).json({ error: "contentId and share flag are required" });
        }
        if (share) {
            // Check if link already exists for this content and user
            const existingLink = yield db_1.LinkModel.findOne({ userId, contentId });
            if (existingLink) {
                return res.json({ hash: existingLink.hash });
            }
            const hash = random(10);
            yield db_1.LinkModel.create({ userId, contentId, hash });
            return res.json({ hash });
        }
        else {
            yield db_1.LinkModel.deleteOne({ userId, contentId });
            return res.json({ message: "Link removed" });
        }
    }
    catch (error) {
        console.error("Share link error:", error);
        res.status(500).json({ error: "Server error" });
    }
}));
app.get("/api/v1/brain/share/:hash", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hash } = req.params;
        console.log("Received hash: ", hash);
        const link = yield db_1.LinkModel.findOne({ hash });
        if (!link) {
            return res.status(404).json({ error: "Invalid or expired link" });
        }
        const content = yield db_1.ContentModel.findOne({ _id: link.contentId })
            .populate("userId", "username") // Populate username from userId
            .populate("tags", "title"); // Populate tag titles
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        res.json({ content });
    }
    catch (error) {
        console.error("Shared content error:", error);
        res.status(500).json({ error: "Server error" });
    }
}));
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
