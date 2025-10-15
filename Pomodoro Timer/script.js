let minutosBase = 25;
let intervaloID = null;

const body = document.getElementById("tomato-body");
const display = document.getElementById("displayTimer");
const startButton = document.getElementById("start-Button");
const pauseButton = document.getElementById("start-Pause");
const shortButton = document.getElementById("short-button");
const tomatoButton = document.getElementById("tomato-button");
const longButton = document.getElementById("long-button");
const buttons = document.querySelectorAll(".button");
const containerTimer = document.getElementById("containerTimer");
const tomatoTitle = document.getElementById("tomatoTitle");
const favicon = document.getElementById("favicon");
const imgTomato = document.getElementById("imgTomato");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const idButton = e.target.id;

    if (idButton === "tomato-button") {
      document.body.style.backgroundColor = "rgb(186, 73, 73)";
      containerTimer.style.backgroundColor = "rgba(157, 65, 65, 1)";
      const tomatoRed = "img/redtomato.png";
      favicon.href = tomatoRed;
      imgTomato.src = tomatoRed;

      tomatoButton.style.backgroundColor = "rgb(178, 76, 76)";
      shortButton.style.backgroundColor="rgba(157, 65, 65, 1)";
      longButton.style.backgroundColor="rgba(157, 65, 65, 1)";

    }
    if (idButton === "short-button") {
      document.body.style.backgroundColor = "#0e5384ff";
      containerTimer.style.backgroundColor = "#175a89ff";
      const tomatoBlue = 'img/bluetomato.png';
      favicon.href = tomatoBlue;
      imgTomato.src = tomatoBlue;

      tomatoButton.style.backgroundColor = "#175a89ff";
      shortButton.style.backgroundColor="#2873aaff";
      longButton.style.backgroundColor="#175a89ff";


    }
    if (idButton === "long-button") {
      document.body.style.backgroundColor = "#107645ff";
      containerTimer.style.backgroundColor = "#156940ff";
      const tomatoGreen = "img/greentomato.png";
      favicon.href = tomatoGreen;
      imgTomato.src = tomatoGreen;

      tomatoButton.style.backgroundColor = "#156940ff";
      shortButton.style.backgroundColor="#156940ff";
      longButton.style.backgroundColor="#208856ff";

    }
  });
});

function calcularDuracaoSegundos() {
  return minutosBase * 60;
}

let tempoRestante = calcularDuracaoSegundos();

function tomatoTimer() {
  minutosBase = 25;
  tomatoTitle.textContent = "25:00";
  resetTimer();
}

function shortTimer() {
  minutosBase = 5;
  tomatoTitle.textContent = formatarTempo;
  tomatoTitle.textContent = "05:00";
  resetTimer();
}

function longTimer() {
  minutosBase = 15;
  tomatoTitle.textContent = "15:00";
  resetTimer();
}
function formatarTempo(totalSegundos) {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;

  const minFormatado = String(minutos).padStart(2, "0");
  const segFormatado = String(segundos).padStart(2, "0");

  return `${minFormatado}:${segFormatado}`;
}

function atualizarTimer() {
  tempoRestante--;

  display.textContent = formatarTempo(tempoRestante);
  tomatoTitle.textContent = formatarTempo(tempoRestante);

  if (tempoRestante <= 0) {
    pararTimer();
    alert(`O seu tempo de ${minutosBase} Minutos acabou.`);
  }
}

function toggleTimer() {
  if (intervaloID !== null) {
    pausarTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (intervaloID !== null) return;

  if (tempoRestante <= 0) {
    tempoRestante = calcularDuracaoSegundos();
    display.textContent = formatarTempo(tempoRestante);
  }

  intervaloID = setInterval(atualizarTimer, 1000);
  startButton.textContent = "PAUSE";
  pauseButton.style.opacity = 0;
  pauseButton.style.pointerEvents = "none";

  const soundOn = document.getElementById("soundOn");
  soundOn.volume = 0.2;
  soundOn.play();

}

function pausarTimer() {
  if (intervaloID === null) {
    return;
  } else {
    clearInterval(intervaloID);
    intervaloID = null;
    startButton.textContent = "START";
    pauseButton.style.opacity = 1;
    pauseButton.style.pointerEvents = "auto";

    
    const soundOff = document.getElementById("soundOff");
    soundOff.volume = 0.2;
    soundOff.play();
  }
}

function resetTimer() {
  
  clearInterval(intervaloID);
  intervaloID = null;
  startButton.textContent = "START";

  tempoRestante = calcularDuracaoSegundos();
  display.textContent = formatarTempo(tempoRestante);

  pauseButton.style.opacity = 0;
  pauseButton.style.pointerEvents = "none";

}

function pararTimer() {
  clearInterval(intervaloID);
  intervaloID = null;
  startButton.disabled = false;
  
}

display.textContent = formatarTempo(tempoRestante);

pauseButton.style.opacity = 0;
pauseButton.style.pointerEvents = "none";

startButton.addEventListener("click", toggleTimer);
pauseButton.addEventListener("click", resetTimer);
pauseButton.addEventListener("click", () => {
  const soundReset = document.getElementById("soundReset");
  soundReset.volume = 0.2;
  soundReset.play();
});
shortButton.addEventListener("click", shortTimer);
tomatoButton.addEventListener("click", tomatoTimer);
longButton.addEventListener("click", longTimer);
