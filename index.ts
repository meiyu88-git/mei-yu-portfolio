import express, { Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage (in production, use a database)
interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  inquiryType: "commission" | "gallery" | "collaboration" | "other";
  createdAt: string;
}

interface Artwork {
  id: number;
  collectionId: number;
  title: string;
  description: string;
  year: number;
  imageUrl: string;
  imageKey?: string;
  videoUrl?: string;
  videoKey?: string;
}

interface Collection {
  id: number;
  name: string;
  description: string;
  slug: string;
  artworks: Artwork[];
}

let inquiries: ContactInquiry[] = [];
let collections: Collection[] = [
  {
    id: 1,
    name: "What Light Remains",
    description: "Primary collection of abstract landscape paintings",
    slug: "what-light-remains",
    artworks: [],
  },
];

let inquiryIdCounter = 1;
let artworkIdCounter = 1;
let collectionIdCounter = 2;

// Helper to send email (using Manus built-in notification API)
async function sendEmail(to: string, subject: string, content: string) {
  try {
    const response = await fetch(
      `${process.env.BUILT_IN_FORGE_API_URL}/notification/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
        },
        body: JSON.stringify({
          to,
          subject,
          content,
          type: "email",
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to send email:", await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // ===== API Routes =====

  // Submit contact inquiry
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, message, inquiryType } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const inquiry: ContactInquiry = {
        id: inquiryIdCounter++,
        name,
        email,
        message,
        inquiryType: inquiryType || "other",
        createdAt: new Date().toISOString(),
      };

      inquiries.push(inquiry);

      // Send email notification to Mei Yu
      const emailContent = `
New Contact Inquiry from ${name}

Email: ${email}
Type: ${inquiryType || "General"}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString()}
      `;

      await sendEmail(
        "mei.yu8899@gmail.com",
        `New ${inquiryType || "General"} Inquiry from ${name}`,
        emailContent
      );

      res.json({
        success: true,
        message: "Thank you for your inquiry. I'll get back to you soon!",
        id: inquiry.id,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  // Get all inquiries (admin)
  app.get("/api/admin/inquiries", (req: Request, res: Response) => {
    // In production, verify authentication here
    res.json(inquiries);
  });

  // Get collections
  app.get("/api/collections", (req: Request, res: Response) => {
    res.json(collections);
  });

  // Get single collection
  app.get("/api/collections/:slug", (req: Request, res: Response) => {
    const collection = collections.find((c) => c.slug === req.params.slug);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.json(collection);
  });

  // Create new collection (admin)
  app.post("/api/admin/collections", (req: Request, res: Response) => {
    try {
      const { name, description, slug } = req.body;

      if (!name || !slug) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if slug already exists
      if (collections.some((c) => c.slug === slug)) {
        return res.status(400).json({ error: "Slug already exists" });
      }

      const collection: Collection = {
        id: collectionIdCounter++,
        name,
        description: description || "",
        slug,
        artworks: [],
      };

      collections.push(collection);
      res.status(201).json(collection);
    } catch (error) {
      console.error("Collection creation error:", error);
      res.status(500).json({ error: "Failed to create collection" });
    }
  });

  // Add artwork to collection (admin)
  app.post(
    "/api/admin/collections/:collectionId/artworks",
    async (req: Request, res: Response) => {
      try {
        const { title, description, year, imageUrl, imageKey, videoUrl } =
          req.body;
        const collectionId = parseInt(req.params.collectionId);

        const collection = collections.find((c) => c.id === collectionId);
        if (!collection) {
          return res.status(404).json({ error: "Collection not found" });
        }

        if (!title || !imageUrl) {
          return res
            .status(400)
            .json({ error: "Title and imageUrl are required" });
        }

        const artwork: Artwork = {
          id: artworkIdCounter++,
          collectionId,
          title,
          description: description || "",
          year: year || new Date().getFullYear(),
          imageUrl,
          imageKey: imageKey || "",
          videoUrl,
        };

        collection.artworks.push(artwork);
        res.status(201).json(artwork);
      } catch (error) {
        console.error("Artwork creation error:", error);
        res.status(500).json({ error: "Failed to create artwork" });
      }
    }
  );

  // Delete artwork (admin)
  app.delete(
    "/api/admin/artworks/:artworkId",
    (req: Request, res: Response) => {
      try {
        const artworkId = parseInt(req.params.artworkId);

        for (const collection of collections) {
          const index = collection.artworks.findIndex((a) => a.id === artworkId);
          if (index !== -1) {
            collection.artworks.splice(index, 1);
            return res.json({ success: true });
          }
        }

        res.status(404).json({ error: "Artwork not found" });
      } catch (error) {
        console.error("Artwork deletion error:", error);
        res.status(500).json({ error: "Failed to delete artwork" });
      }
    }
  );

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
