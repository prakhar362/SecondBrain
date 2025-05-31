import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") }); 

const app = express();

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
async function main() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connection successful");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err: any) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
