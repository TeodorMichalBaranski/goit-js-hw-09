const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let randomColorBg;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtnEl.addEventListener('click', () => {
  randomColorBg = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log(getRandomHexColor());
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
  }, 1000);
});

stopBtnEl.addEventListener('click', () => {
  clearInterval(randomColorBg);
  console.log('stopped');
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
});
