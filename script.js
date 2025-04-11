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

function responderVoz(texto) {
  let respuesta = '';

  if (texto.includes('madrid')) {
    respuesta = 'Hoy el Real Madrid ganó 2 a 0 con doblete de Vinicius.';
  } else if (texto.includes('barça') || texto.includes('barcelona')) {
    respuesta = 'El Barça empató 1 a 1 en un partido muy igualado.';
  } else if (texto.includes('fórmula 1') || texto.includes('formula 1')) {
    respuesta = 'En la Fórmula 1, Verstappen sigue líder con 15 puntos de ventaja.';
  } else {
    respuesta = 'No tengo información para eso aún, pero muy pronto la tendrás aquí.';
  }

  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(respuesta);
  utter.lang = 'es-ES';
  synth.speak(utter);
}
