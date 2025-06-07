import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcrypt';
import { z } from "zod";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import path from "path";
import { ContentModel, UserModel,LinkModel,TagModel } from "./db";
import { randomBytes } from "crypto";
import { userMiddleware } from "./middleware";

dotenv.config({ path: path.resolve(__dirname, "../.env") }); 

const app = express();
// Middleware to parse JSON requests
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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

app.post("/api/v1/logout", userMiddleware, async (req:any, res:any) => {
  try {
    // The token will be invalidated by removing it from the client
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error" });
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
    const { link, type, title, tags } = req.body;

    if (!link || !type || !title) {
      return res.status(411).json({ error: "Missing required fields" });
    }

    //get user id from middlewares
    if(!req.userId)
    {
      console.log(req.userId)
      return res.status(411).json({ error: "USERID cannot be fetched from middleare" });
    }

    // Process tags - split by comma and trim whitespace
    const processedTags = tags ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : [];
    console.log("Processed Tags: ", processedTags);

    // Create or find tags and get their ObjectIds
    const tagIds = await Promise.all(
      processedTags.map(async (tagName: string) => {
        // Find existing tag or create new one
        const tag = await TagModel.findOneAndUpdate(
          { title: tagName },
          { title: tagName },
          { upsert: true, new: true }
        );
        return tag._id;
      })
    );

    await ContentModel.create({
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
});

app.get("/api/v1/content",userMiddleware, async(req, res) => {
  //@ts-ignore
  const userId=req.userId;
  const content = await ContentModel.find({ userId: userId })
    .populate("userId", "username")
    .populate("tags", "title"); // Populate tags and only get the title field

    res.send({content});
});

app.delete("/api/v1/content", userMiddleware, async (req:any, res:any) => {
  try {
    const { contentId } = req.body;
    // @ts-ignore
    const userId = req.userId;

    if (!contentId) {
      return res.status(400).json({ error: "Content ID is required" });
    }

    const result = await ContentModel.deleteOne({ _id: contentId, userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Content not found or unauthorized" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


function random(length: number): string {
  return randomBytes(length).toString("hex").slice(0, length);
}

app.post("/api/v1/brain/share", userMiddleware, async (req:any, res:any) => {
  try {
    const contentId  = req.body.contentId;
    const share=req.body.share;

    // @ts-ignore
    const userId = req.userId;

    if (!contentId || typeof share !== "boolean") {
      return res.status(400).json({ error: "contentId and share flag are required" });
    }

    if (share) {
      // Check if link already exists for this content and user
      const existingLink = await LinkModel.findOne({ userId, contentId });
      if (existingLink) {
        return res.json({ hash: existingLink.hash });
      }

      const hash = random(10);
      await LinkModel.create({ userId, contentId, hash });
      return res.json({ hash });
    } else {
      await LinkModel.deleteOne({ userId, contentId });
      return res.json({ message: "Link removed" });
    }
  } catch (error) {
    console.error("Share link error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/api/v1/brain/share/:hash", async (req:any, res:any) => {
  try {
    const { hash } = req.params;
    console.log("Received hash: ",hash);

    const link = await LinkModel.findOne({ hash });
    if (!link) {
      return res.status(404).json({ error: "Invalid or expired link" });
    }

    const content = await ContentModel.findOne({ _id: link.contentId })
      .populate("userId", "username")  // Populate username from userId
      .populate("tags", "title");      // Populate tag titles

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.json({ content });
  } catch (error) {
    console.error("Shared content error:", error);
    res.status(500).json({ error: "Server error" });
  }
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
