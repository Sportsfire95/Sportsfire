// script.js

function activarVoz() {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(
    "Bienvenido a Sportsfire. Puedes explorar las últimas noticias deportivas en cada sección o preguntarme por un equipo o jugador."
  );
  utter.lang = "es-ES";
  synth.speak(utter);
}

// Simular carga de tweets (contenido ficticio por ahora)
document.addEventListener("DOMContentLoaded", () => {
  const stream = document.getElementById("tweets-stream");
  stream.innerHTML = `
    <ul>
      <li><strong>@FabrizioRomano:</strong> Confirmado: El nuevo fichaje estrella del Real Madrid llega mañana.</li>
      <li><strong>@Nico_Abatel:</strong> Última hora en el mercado: cambios en la plantilla del Barça.</li>
      <li><strong>@SportsFire:</strong> ¡Revive en 3D el golazo de la jornada!</li>
    </ul>
  `;
});
