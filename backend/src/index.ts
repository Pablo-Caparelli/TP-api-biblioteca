import express from "express";
import { Schema, model } from "mongoose";
import { connectMongodb } from "./config/mongo";

process.loadEnvFile();

const PORT = process.env.PORT;

const bookSchema = new Schema({
  titulo: { type: String, required: true, unique: true },
  autor: { type: String, required: true },
  año: { type: Number, required: true },
  genero: { type: String },
  disponible: { type: String, default: true },
});

const Book = model("Book", bookSchema);

const app = express();

app.get("/api/books", async (request, response): Promise<any> => {
  try {
    const books = await Book.find();
    return response.json({
      success: true,
      data: books,
      message: "Obteniendo todos los libros",
    });
  } catch (error) {
    const err = error as Error;
    return response.json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`);
  connectMongodb();
});
