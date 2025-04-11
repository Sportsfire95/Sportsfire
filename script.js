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

  if (texto.includes('madrid') || texto.includes('real madrid')) {
    const opciones = [
      'El Real Madrid ha ganado 3 a 1 con goles de Bellingham y Vinicius.',
      'Hoy el Madrid jugó contra el Sevilla y empató 2 a 2.',
      'El Real Madrid se prepara para el clásico del próximo domingo.'
    ];
    respuesta = elegirAleatoria(opciones);
  } else if (texto.includes('barça') || texto.includes('barcelona')) {
    const opciones = [
      'El FC Barcelona ganó por la mínima frente al Betis.',
      'Lewandowski marcó el gol de la victoria para el Barça.',
      'El Barça se mantiene segundo en la tabla tras la victoria de hoy.'
    ];
    respuesta = elegirAleatoria(opciones);
  } else if (texto.includes('fórmula 1') || texto.includes('formula 1') || texto.includes('f1')) {
    const opciones = [
      'En Fórmula 1, Verstappen sigue dominando tras ganar en Australia.',
      'Checo Pérez consiguió el segundo puesto esta semana.',
      'Ferrari ha tenido problemas de fiabilidad en la última carrera.'
    ];
    respuesta = elegirAleatoria(opciones);
  } else if (texto.includes('últimas noticias')) {
    respuesta = 'Puedes encontrar las últimas noticias deportivas justo en la portada de Sportsfire.';
  } else {
    respuesta = 'No tengo esa información aún, pero pronto podrás preguntarme de todo. ¡Seguimos mejorando!';
  }

  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(respuesta);
  utter.lang = 'es-ES';
  synth.speak(utter);
}

function elegirAleatoria(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}
