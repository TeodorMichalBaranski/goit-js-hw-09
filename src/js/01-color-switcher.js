const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let randomColorBg;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtnEl.addEventListener('click', () => {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
  randomColorBg = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log(getRandomHexColor());
  }, 1000);
});

stopBtnEl.addEventListener('click', () => {
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
  clearInterval(randomColorBg);
  console.log('stopped');
});
