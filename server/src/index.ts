import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { z } from "zod";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import path from "path";
import { ContentModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";

dotenv.config({ path: path.resolve(__dirname, "../.env") }); 

const app = express();
app.use(express.json());

//zod validation
const signupSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z
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

app.post("/api/v1/signup", async (req:any, res:any) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(411).json({ error: "Invalid input", details: result.error.format() });
    }

    const { username, email, password } = result.data;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ error: "User already exists with this username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Signed up" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/v1/login", async (req:any, res:any) => {
  const useremail=req.body.email;
  const password=req.body.password;

  //find both username and email in DB:
  const user=await UserModel.findOne({
    email:useremail,
  });

   if(!user)
   {
    return res.status(403).json({ error: "Wrong email or password" });
   }
 
  const passwordMatch=bcrypt.compareSync(password,user.password)
  if(passwordMatch)
  {
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    res.json({token});
  }
  else{
    return res.status(403).json({ error: "Wrong email or password" });
  }
});

app.post("/api/v1/content",userMiddleware, async (req:any, res:any) => {
  try{
    const { link, type, title } = req.body;

    if (!link || !type || !title) {
      return res.status(411).json({ error: "Missing required fields" });
    }

  //get user id from middlewares
  if(!req.userId)
  {
    console.log(req.userId)
    return res.status(411).json({ error: "USERID cannot be fetched from middleare" });
  }
  await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId , // userId is added by the middleware.
        tags: [] // Initialize tags as an empty array.
    });
    res.json({ message: "Content added Successfully" }); // Send success response.
    }
    catch (error) {
    console.error("content addition error:", error);
    res.status(500).json({ error: "Server error" });
    }
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
