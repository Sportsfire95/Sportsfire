document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  const apiKey = "e641c212093f4ff3b0b7709ac39a5606";
  const url = `https://newsapi.org/v2/top-headlines?category=sports&language=es&pageSize=5&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.articles || data.articles.length === 0) {
        newsContainer.innerHTML = "<p>No hay noticias disponibles en este momento.</p>";
        return;
      }

      const noticias = data.articles.map((article) => {
        return `
          <div class="noticia" style="margin-bottom: 20px; padding: 10px; background-color: #f4f4f4; border-radius: 10px;">
            <h3>${article.title}</h3>
            <p>${article.description || "Sin descripción disponible."}</p>
            <a href="${article.url}" target="_blank">Leer más</a>
          </div>
        `;
      });

      newsContainer.innerHTML = noticias.join("");
    })
    .catch((error) => {
      newsContainer.innerHTML = "<p>Error al cargar noticias.</p>";
      console.error("Error cargando noticias:", error);
    });
});
