// script.js - Funcionalidades dinámicas de Sportsfire

// === Tweets en vivo ===
const tweetsStream = document.getElementById("tweets-stream");

const expertos = [
  "FabrizioRomano",
  "Nico_Abatel",
  "ShamsCharania",
  "JorgeCalabres",
  "SkySportsNews"
];

async function cargarTweets() {
  tweetsStream.innerHTML = "<p>Cargando tweets recientes...</p>";
  try {
    const tweetsHTML = expertos.map((usuario) => `
      <iframe
        src="https://twitframe.com/show?url=https://twitter.com/${usuario}"
        width="100%"
        height="200"
        frameborder="0"
        scrolling="no"
      ></iframe>
    `).join("");
    tweetsStream.innerHTML = tweetsHTML;
  } catch (error) {
    tweetsStream.innerHTML = "<p>Error al cargar tweets.</p>";
  }
}

setInterval(cargarTweets, 300000); // actualiza cada 5 minutos
cargarTweets();


// === Asistente de voz ===
function activarVoz() {
  const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  reconocimiento.lang = "es-ES";

  reconocimiento.onstart = () => {
    alert("🎙️ Dime qué noticia quieres escuchar, por ejemplo: '¿Qué ha pasado en el Barça hoy?'");
  };

  reconocimiento.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    buscarYLeerNoticia(texto);
  };

  reconocimiento.start();
}

function buscarYLeerNoticia(texto) {
  const noticiaDemo = `Hoy en Sportsfire: ${texto}. El equipo ha mostrado gran nivel en el partido más reciente.`;

  const sintesis = new SpeechSynthesisUtterance(noticiaDemo);
  sintesis.lang = "es-ES";
  sintesis.pitch = 1;
  sintesis.rate = 1;

  speechSynthesis.speak(sintesis);
}
function activarVoz() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'es-ES';
  recognition.start();

  recognition.onresult = function(event) {
    const query = event.results[0][0].transcript.toLowerCase();
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
