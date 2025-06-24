import express from "express";
import { Schema, model } from "mongoose";
import { connectMongodb } from "./config/mongo";
import cors from "cors";

process.loadEnvFile();

const PORT = process.env.PORT;

const bookSchema = new Schema({
  titulo: { type: String, required: true, unique: true },
  autor: { type: String, required: true },
  año: { type: Number, required: true },
  genero: { type: String },
  disponible: { type: Boolean, default: true },
});

const Book = model("Book", bookSchema);

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/api/books", async (req, res): Promise<any> => {
  try {
    const body = req.body;
    const { titulo, autor, año, genero, disponible } = body;
    if (!titulo || !autor || !año || !genero || !disponible)
      return res.status(400).json({ success: false, message: "data invalida" });
    const newBook = new Book({ titulo, autor, año, genero, disponible });
    const savedBook = await newBook.save();
    res.status(201).json({
      success: true,
      data: savedBook,
      message: "Libro agregado con éxito",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.delete("/api/books/:id", async (req, res): Promise<any> => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook)
      return res
        .status(404)
        .json({ success: false, message: "Error al borrar el libro" });
    res.json({ success: deletedBook, message: "Libro borrado con éxito" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.patch("/api/books/:id", async (req, res): Promise<any> => {
  try {
    const { titulo, autor, año, genero, disponible } = req.body;
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      { titulo, autor, año, genero, disponible },
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Libro no encontrado" });
    return res.json({
      success: true,
      data: updated,
      message: "Libro actualizado",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: (err as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`);
  connectMongodb();
});
