async function cargarNoticiasFeed() {
  const contenedor = document.getElementById('noticias-feed');
  contenedor.innerHTML = 'Cargando noticias...';

  try {
    const respuesta = await fetch('https://newsapi.org/v2/top-headlines?country=es&category=sports&pageSize=8&apiKey=e641c212093f4ff3b0b7709ac39a5606');
    const datos = await respuesta.json();

    if (!datos.articles || datos.articles.length === 0) {
      contenedor.innerHTML = '<p>No hay noticias disponibles en este momento.</p>';
      return;
    }

    contenedor.innerHTML = '';
    datos.articles.forEach(noticia => {
      const div = document.createElement('div');
      div.classList.add('noticia');

      div.innerHTML = `
        <img src="${noticia.urlToImage || 'https://via.placeholder.com/300x160?text=Sin+Imagen'}" alt="Imagen noticia" />
        <h3>${noticia.title}</h3>
        <a href="${noticia.url}" target="_blank">Leer más</a>
      `;
      contenedor.appendChild(div);
    });

  } catch (error) {
    contenedor.innerHTML = '<p>Error al cargar las noticias.</p>';
    console.error('❌ Error al cargar noticias:', error);
  }
}

document.addEventListener('DOMContentLoaded', cargarNoticiasFeed);
