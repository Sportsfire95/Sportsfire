function activarVoz() {
  console.log("🎙️ Asistente activado");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'es-ES';
  recognition.start();

  recognition.onresult = function(event) {
    const query = event.results[0][0].transcript.toLowerCase().trim();
    console.log("🗣️ Has dicho:", query);
    responderVoz(query);
  };

  recognition.onerror = function(event) {
    alert("❌ Error al reconocer voz: " + event.error);
  };
}

async function responderVoz(texto) {
  let respuesta = '';

  if (texto.includes('madrid') || texto.includes('real madrid')) {
    respuesta = 'Hoy el Real Madrid ha entrenado con todos sus titulares. En breve más noticias.';
  } else if (texto.includes('barça') || texto.includes('barcelona')) {
    respuesta = 'El Barça prepara su próximo partido de liga con varias bajas importantes.';
  } else if (
    texto.includes('últimas noticias') ||
    texto.includes('qué ha pasado') ||
    texto.includes('noticias deportivas') ||
    texto.includes('noticias')
  ) {
    respuesta = await obtenerNoticiasDeportivas();
  } else {
    respuesta = 'Lo siento, no entendí bien tu pregunta. Puedes probar diciendo "Últimas noticias deportivas" o el nombre de tu equipo favorito.';
  }

  hablar(respuesta);
}

function hablar(texto) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = 'es-ES';
  synth.speak(utter);
}

async function obtenerNoticiasDeportivas() {
  try {
    const respuesta = await fetch('https://newsapi.org/v2/top-headlines?country=es&category=sports&pageSize=3&apiKey=e641c212093f4ff3b0b7709ac39a5606');
    const datos = await respuesta.json();

    if (datos.articles && datos.articles.length > 0) {
      const titulos = datos.articles.map((articulo, index) => `${index + 1}. ${articulo.title}`).join('. ');
      return 'Últimas noticias deportivas: ' + titulos;
    } else {
      return 'No encontré noticias deportivas actuales en este momento.';
    }
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    return 'Hubo un problema al obtener las noticias. Inténtalo más tarde.';
  }
}
