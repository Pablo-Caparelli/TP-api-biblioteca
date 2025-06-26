const form = document.querySelector("form");
const section = document.getElementById("booksList");
const btnSubmit = document.getElementById("btn-submit");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const añoInput = document.getElementById("año");
const generoInput = document.getElementById("genero");
const disponibleInput = document.getElementById("disponible");

let isEditing = false;
let idToEdit = null;

const fetchingBooks = async () => {
  try {
    const response = await fetch("http://localhost:1235/api/books");
    const responseToJson = await response.json();

    section.innerHTML = "";

    responseToJson.data.reverse().forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("book");
      div.innerHTML = `<h2>${book.titulo}</h2>
        <p><b>Autor</b>: ${book.autor}</p>
        <p><b>Año de publicación</b>: ${book.año}</p>
        <p><b>Género</b>: ${book.genero}</p>
        <p><b>Disponible</b>: ${book.disponible}</p>
        <div class="cont-btn">
          <button onclick="updateBook('${book._id}', '${book.titulo}', '${book.autor}', '${book.año}', '${book.genero}', '${book.disponible}')" class="btn-update">Actualizar libro</button>
          <button onclick="deleteBook('${book._id}')" class="btn-delete">Borrar libro</button>
          <button onclick="getBookById('${book._id}')" class="btn-getId">Obtener libro por ID</button>
        </div>
        `;
      section.appendChild(div);
    });
  } catch (error) {
    const div = document.createElement("div");
    div.classList.add("error");
    div.innerHTML =
      "<h2 style='color: red; text-align: center;'>Error al traer los libros</h2>";
    section.insertAdjacentElement("afterend", div);
    console.log("Error al traer los datos");
  }
};

const addNewBook = async (e) => {
  e.preventDefault();

  try {
    const bookData = {
      titulo: tituloInput.value,
      autor: autorInput.value,
      año: Number(añoInput.value),
      genero: generoInput.value,
      disponible: disponibleInput.value,
    };

    if (isEditing === false) {
      await fetch("http://localhost:1235/api/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: { "Content-Type": "application/json" },
      });
      alert("📚 El Libro fue agregado con éxito");
    } else {
      await fetch("http://localhost:1235/api/books/" + idToEdit, {
        method: "PATCH",
        body: JSON.stringify(bookData),
        headers: { "Content-Type": "application/json" },
      });
      alert("✏️ El Libro se actualizó correctamente");
    }

    // tituloInput.value = titulo;
    // autorInput.value = autor;
    // añoInput.value = año;
    // generoInput.value = genero;
    // disponibleInput.value = disponible;

    form.reset();

    isEditing = false;
    idToEdit = null;
    btnSubmit.textContent = "Agregar libro";

    await fetchingBooks();
  } catch (error) {
    const div = document.createElement("div");
    div.classList.add("error");
    div.innerHTML =
      "<h2 style='color: red; text-align: center;'>Error al intentar agregar un libro</h2>";
    section.insertAdjacentElement("afterend", div);
    console.log("Error al intentar agregar un libro");
  }
};

const deleteBook = async (id) => {
  try {
    if (confirm("¿Estás seguro que querés borrar este libro?")) {
      const response = await fetch("http://localhost:1235/api/books/" + id, {
        method: "DELETE",
      });
      alert("🗑️ El Libro fue borrado con éxito");

      fetchingBooks();
    }
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (id, titulo, autor, año, genero, disponible) => {
  isEditing = true;
  idToEdit = id;
  btnSubmit.textContent = "Editar libro";

  tituloInput.value = titulo;
  autorInput.value = autor;
  añoInput.value = año;
  generoInput.value = genero;
  disponibleInput.value = disponible;
};

const getBookById = async (id) => {
  try {
    const response = await fetch("http://localhost:1235/api/books/" + id, {
      method: "GET",
    });

    const data = await response.json();

    console.log("Respuesta completa:", data);

    if (!response.ok || !data.success) {
      alert("No se encontró el libro");
      return;
    }

    const libro = data.data;

    tituloInput.value = libro.titulo;
    autorInput.value = libro.autor;
    añoInput.value = libro.año;
    generoInput.value = libro.genero;
    disponibleInput.value = String(libro.disponible);

    // Alert con todos los datos
    alert(
      `📚 Libro encontrado con éxito:\n\n` +
        `📖 Título: ${libro.titulo}\n` +
        `✍️ Autor: ${libro.autor}\n` +
        `📅 Año: ${libro.año}\n` +
        `🏷️ Género: ${libro.genero}\n` +
        `✅ Disponible: ${libro.disponible}`
    );

    form.reset();

    fetchingBooks();
  } catch (error) {
    console.log("Error al buscar el libro:", error.message);
    alert("Hubo un error al buscar el libro");
  }
};

form.addEventListener("submit", addNewBook);

fetchingBooks();
