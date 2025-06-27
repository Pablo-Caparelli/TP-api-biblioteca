# 📚 API de Gestión de Libros

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB**, usando **TypeScript** y el patrón de diseño **MVC**. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre una colección de libros. Además, incluye un sencillo frontend con HTML, CSS y JavaScript para interactuar con la API.

## 🚀 Funcionalidades

- Obtener todos los libros
- Obtener un libro por ID
- Agregar un nuevo libro
- Actualizar un libro existente
- Borrar un libro

## ⚙️ Tecnologías usadas

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- HTML, CSS, JavaScript (frontend)
- Patrón MVC

---

## 🛠️ Instalación y ejecución local

### 1️⃣ Clona el repositorio

```bash
git clone https://github.com/Pablo-Caparelli/TP-api-biblioteca.git
cd tu-repositorio

npm install

2️⃣ Instala las dependencias
bash
Copiar
Editar
npm install
3️⃣ Configura las variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega:

ini
Copiar
Editar
PORT=1235
URI_DB=tu_cadena_de_conexion_a_mongodb
💡 Reemplaza tu_cadena_de_conexion_a_mongodb por la URL real de tu base de datos MongoDB.

4️⃣ Ejecuta el proyecto
Si estás en desarrollo:

bash
Copiar
Editar
npm run dev
Si quieres compilar y ejecutar:

bash
Copiar
Editar
npm run build
npm start
5️⃣ Accede a la API
La API estará disponible en:

bash
Copiar
Editar
http://localhost:1235/api/books
Y el frontend (si abres el archivo index.html) podrá consumir esta API.

📌 Notas
Asegúrate de tener un servidor de MongoDB activo (local o en la nube).

El proyecto usa CORS habilitado para facilitar el acceso desde el frontend.

Los endpoints principales son:

GET /api/books → Obtener todos los libros

GET /api/books/:id → Obtener un libro por ID

POST /api/books → Agregar un nuevo libro

PATCH /api/books/:id → Actualizar un libro

DELETE /api/books/:id → Borrar un libro

💡 Autor
Hecho por Pablo Caparelli
```
