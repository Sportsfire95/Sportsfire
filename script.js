function activarVoz() {
  console.log("Asistente activado");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'es-ES';
  recognition.start();

  recognition.onresult = function(event) {
    const query = event.results[0][0].transcript.toLowerCase();
    console.log("Has dicho:", query);
    responderVoz(query);
  };

  recognition.onerror = function(event) {
    alert("Error al reconocer voz: " + event.error);
  };
}

async function responderVoz(texto) {
  let respuesta = '';

  if (texto.includes('madrid') || texto.includes('real madrid')) {
    respuesta = 'Hoy el Real Madrid ha entrenado con todos sus titulares. En breve más noticias.';
  } else if (texto.includes('barça') || texto.includes('barcelona')) {
    respuesta = 'El Barça prepara su próximo partido de liga con varias bajas importantes.';
  } else if (texto.includes('últimas noticias') || texto.includes('qué ha pasado') || texto.includes('noticias deportivas')) {
    respuesta = await obtenerNoticiasDeportivas();
  } else {
    respuesta = 'Estoy aprendiendo más cada día. Pronto podré decirte aún más cosas.';
  }

  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(respuesta);
  utter.lang = 'es-ES';
  synth.speak(utter);
}

async function obtenerNoticiasDeportivas() {
  try {
    const respuesta = await fetch('https://newsapi.org/v2/top-headlines?category=sports&language=es&apiKey=e641c212093f4ff3b0b7709ac39a5606');
    const datos = await respuesta.json();

    if (datos.articles && datos.articles.length > 0) {
      const primeraNoticia = datos.articles[0].title;
      return 'Última noticia deportiva: ' + primeraNoticia;
    } else {
      return 'No encontré noticias deportivas actuales ahora mismo.';
    }
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    return 'Hubo un problema al obtener las noticias en este momento.';
  }
}

