import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect().then(() => {
  console.log("Connected to database");
  const app = express();

  app.use(express.json());

  app.get("/api", (req, res) => {
    res.send("Hello World");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
