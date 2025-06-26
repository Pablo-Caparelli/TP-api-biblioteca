import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    titulo: { type: String, required: true, unique: true },
    autor: { type: String, required: true },
    año: { type: Number, required: true },
    genero: { type: String },
    disponible: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  }
);

const Book = model("Book", bookSchema);

export { Book };
