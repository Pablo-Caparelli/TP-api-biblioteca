const list = document.getElementById("booksList");

const fetchingBooks = async () => {
  const response = await fetch("http://localhost:1235/api/books");
  const responseToJson = await response.json();

  list.innerHTML = "";

  responseToJson.data.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = book.titulo;
    list.appendChild(li);
  });
};

fetchingBooks();
