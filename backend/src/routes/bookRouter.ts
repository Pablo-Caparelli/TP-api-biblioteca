import { Router } from "express";
import { Book } from "../models/bookModel";
import {
  addNewBook,
  deleteBook,
  getAllBooks,
  updateBook,
  getBookById,
} from "../controllers/bookController";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);

bookRouter.post("/", addNewBook);

bookRouter.delete("/:id", deleteBook);

bookRouter.patch("/:id", updateBook);

bookRouter.get("/:id", getBookById);

export { bookRouter };
