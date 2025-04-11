function activarVoz() {
  const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  reconocimiento.lang = 'es-ES';
  reconocimiento.interimResults = false;

  reconocimiento.start();

  reconocimiento.onresult = (event) => {
    const comando = event.results[0][0].transcript.toLowerCase();
    procesarComando(comando);
  };

  reconocimiento.onerror = (event) => {
    alert("Error con el reconocimiento de voz: " + event.error);
  };
}

function procesarComando(texto) {
  let respuesta = "Lo siento, aún estoy aprendiendo a responder eso.";

  if (texto.includes("madrid")) {
    respuesta = "Hoy el Real Madrid entrenó en Valdebebas y prepara el próximo partido contra el Barcelona.";
  } else if (texto.includes("barcelona")) {
    respuesta = "El FC Barcelona ha confirmado la recuperación de Pedri para el próximo encuentro.";
  } else if (texto.includes("últimas noticias")) {
    respuesta = "Puedes ver las últimas noticias deportivas en la portada de Sportsfire.";
  }

  const voz = new SpeechSynthesisUtterance(respuesta);
  voz.lang = 'es-ES';
  speechSynthesis.speak(voz);
}
