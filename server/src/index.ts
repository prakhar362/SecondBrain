import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

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
console.log("PORT",process.env.PORT )

// MongoDB connection and server start
async function main() {
    try {
        const mongoUrl = process.env.MONGO_URL;

        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        await mongoose.connect(mongoUrl as string);
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });

    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

main();
