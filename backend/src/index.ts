import express from "express";

process.loadEnvFile();

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`);
});
