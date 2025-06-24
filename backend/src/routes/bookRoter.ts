import { Router } from "express";
import { Book } from "../models/bookModel";
import {
  addNewBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/bookController";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);

bookRouter.post("/", addNewBook);

bookRouter.delete("/:id", deleteBook);

bookRouter.patch("/:id", updateBook);

export { bookRouter };
