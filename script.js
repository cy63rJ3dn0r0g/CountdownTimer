const element = document.querySelector(".countDownTimer");
const elTexts = document.querySelectorAll(".text");
const cdText = document.querySelector(".cdText");

let r = 255;
let g = 0;
let b = 0;

setInterval(() => {
  element.style.boxShadow = ` 0 0 100px 20px rgb(${r}, ${g}, ${b})`;
  elTexts.forEach((elText) => (elText.style.color = `rgb(${r},${g},${b})`));
  cdText.style.color = `rgb(${r},${g},${b})`;

  // Increment or decrement the RGB values
  if (r === 255 && g < 255 && b === 0) {
    g++;
  } else if (r > 0 && g === 255 && b === 0) {
    r--;
  } else if (r === 0 && g === 255 && b < 255) {
    b++;
  } else if (r === 0 && g > 0 && b === 255) {
    g--;
  } else if (r < 255 && g === 0 && b === 255) {
    r++;
  } else if (r === 255 && g === 0 && b > 0) {
    b--;
  }
}, 1);

const day = document.querySelector(".day");
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const chooseModule = document.querySelector(".chooseModule");
const countDownModule = document.querySelector(".countDown");
const okBtn = document.querySelector(".ok");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const restartBtn = document.querySelector(".restart");

const dayInMs = 1000 * 60 * 60 *24;

let countDownInterval;

function setCoundownEndDateTime(dateTime) {
  localStorage.setItem("countdownEndDateTime", dateTime);
}

function getCountdownEndDateTime(dateTime) {
  localStorage.getItem("countdownEndDateTime");
}

function countDownHandler(event) {
  event.preventDefault();
  document.querySelector(".chooseModule").style.display = "none";
  document.querySelector(".countDown").classList.add("visible");
  let chosenDate = date.value;
  let chosenTime = time.value;
  let countDownDate = new Date(chosenDate + " " + chosenTime).getTime();
  setCoundownEndDateTime(countDownDate);
  countDownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / dayInMs);
    const hours = Math.floor(
      (distance % dayInMs) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    day.innerHTML = days;
    hour.innerHTML = hours;
    minute.innerHTML = minutes;
    second.innerHTML = seconds;

    if (distance < 0) {
      clearInterval(countDownInterval);
      countDown.innerHTML = "EXPIRED";
      localStorage.removeItem("countdownEndDateTime");
    }
  }, 1000);
}

function stopHandler() {
  clearInterval(countDownInterval);
  console.log("stopped");
}

function resetHandler() {
  clearInterval(countDownInterval);
  day.innerHTML = 0;
  hour.innerHTML = 0;
  minute.innerHTML = 0;
  second.innerHTML = 0;
  document.querySelector(".chooseModule").style.display = "block";
  document.querySelector(".countDown").classList.remove("visible");
  localStorage.removeItem("countdownEndDateTime");
  console.log("reset");
}

function restartHandler() {
  clearInterval(countDownInterval);
  countDownHandler(event);
  console.log("restarted");
};

const countdownEndDateTime = getCountdownEndDateTime();
if(countdownEndDateTime) {
  const now = new Date().getTime();
  const distance = countdownEndDateTime - now;
  if( distance > 0) {
    countDownHandler(event)
  } else {
    localStorage.removeItem("countdownEndDateTime");
  }
}

okBtn.addEventListener("click", countDownHandler);
stopBtn.addEventListener("click", stopHandler);
resetBtn.addEventListener("click", resetHandler);
restartBtn.addEventListener("click", restartHandler);

