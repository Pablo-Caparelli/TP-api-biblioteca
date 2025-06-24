import { Book } from "../models/bookModel";
import { Request, Response } from "express";

const getAllBooks = async (
  request: Request,
  response: Response
): Promise<any> => {
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
};

const addNewBook = async (req: Request, res: Response): Promise<any> => {
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
};

const deleteBook = async (req: Request, res: Response): Promise<any> => {
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
};

const updateBook = async (req: Request, res: Response): Promise<any> => {
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
};

export { getAllBooks, addNewBook, deleteBook, updateBook };
