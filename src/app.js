const canvas = document.querySelector("canvas");

const onXAxis = 10;
const onYAxis = 10;

const padding = 80;
const halfPadding = padding / 2;

canvas.width = 960 + padding;
canvas.height = 640 + padding;

// Fill out the data randomly
let data1 = []
let data2 = []

let timers = []
let holdValue = 0;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#DCDDDE";
ctx.fillStyle = "#696969";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "16px Monospace";

function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function drawGrids() {
  ctx.beginPath();

  let index = onYAxis;
  let xAxis = 0;
  let yAxis = 0;
  while (xAxis < canvas.height) {
    ctx.moveTo(halfPadding, xAxis + halfPadding);
    ctx.lineTo(canvas.width - halfPadding, xAxis + halfPadding);

    index--;

    xAxis += (canvas.height - padding) / onYAxis;
  }

  index = 0;

  while (yAxis < canvas.width) {
    ctx.moveTo(yAxis + halfPadding, halfPadding);
    ctx.lineTo(yAxis + halfPadding, canvas.height - halfPadding);
    index++;

    yAxis += (canvas.width - padding) / onXAxis;
  }

  ctx.stroke();
}

function drawYLegends(arr) {
  let index = arr.length - 1;
  x = 0;
  ctx.fillStyle = "#DCDDDE";
  while (x < canvas.height) {
    ctx.fillText(arr[index], 0, x + halfPadding);
    index--;

    x += (canvas.height - padding) / onYAxis;
  }
}

function drawXLegends(from) {
  let index = 0;
  y = 0;
  ctx.fillStyle = "#DCDDDE";
  while (y < canvas.width) {
    ctx.fillText(from + index, y + halfPadding, canvas.height);
    index++;

    y += (canvas.width - padding) / onXAxis;
  }
}

function drawChart(data, from) {
  ctx.beginPath();
  const width = (canvas.width - padding) / 10;
  const height = (canvas.height - padding) / 10;

  for (let index = 0; index < onXAxis; index++) {
    ctx.moveTo(
      halfPadding + width * index,
      halfPadding + height * (10 - data[index + from])
    );
    ctx.lineTo(
      halfPadding + width * (index + 1),
      halfPadding + height * (10 - data[index + from + 1])
    );
  }
  ctx.stroke();
}

function clearXLegends() {
  ctx.fillStyle = "#696969";
  ctx.fillRect(
    halfPadding,
    canvas.height - halfPadding,
    canvas.width - halfPadding,
    canvas.height - halfPadding
  );
}

for (let index = 0; index < 100; index++) {
  data1.push(generateRandomNumber(2, 8));
  data2.push(generateRandomNumber(2, 8));
}

function execute(from) {
  ctx.fillStyle = "#696969";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#DCDDDE";

  drawGrids();

  drawYLegends([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  drawXLegends(from);
  
  ctx.strokeStyle = "#FFB1C1";
  drawChart(data1, from);

  ctx.strokeStyle = "#4BC0C0";
  drawChart(data2, from);

  holdValue = from;
}

function startScrolling(startInterval) {
  for (let i = startInterval; i < 90; i++) {
    timers.push(setTimeout(function timer() {
      execute(i);
    }, (i - startInterval) * 100));
  }
}

function onClickRun() {
  startScrolling(1);
  changeButtonState('Run');
  changeButtonState('Play');
  changeButtonState('Stop');
}

function changeButtonState(btnText) {
  const btnElement = document.getElementById(btnText);
  if (btnElement.disabled) {
    console.log(btnText)
    btnElement.classList.remove("grayBtn");
    if (btnText == 'Play') {
      btnElement.classList.add("playBtn");
    }
    else if (btnText == 'Stop') {
      btnElement.classList.add('stopBtn');
    }
    btnElement.disabled = false;
  }
  else {
    console.log(btnText)
    btnElement.disabled = true;
    btnElement.classList.add("grayBtn");
  }
}

function onClickPlayPause() {
  const btnText = document.getElementById('Play').innerText;
  if (btnText == 'Play') {
    onClickPlay();
  }
  else {
    onClickPause();
  }
  changeLabels();
}

function onClickPlay() {
  startScrolling(holdValue);
  holdValue = 0;
}

function changeLabels() {
  console.log("Hello CHange Lables");
  let element = document.getElementById("Play");
  console.log(element)

  if (element.innerText == 'Play') {
    element.innerText = 'Pause';
  }
  else {
    element.innerText = 'Play';
  }
}

function onClickPause() {
  console.log("Paused");
  console.log(holdValue);
  for (let currTimer = 0; currTimer < timers.length; currTimer++) {
    clearTimeout(timers[currTimer])
  }
}

function onClickStop() {
  for (let currTimer = 0; currTimer < timers.length; currTimer++) {
    clearTimeout(timers[currTimer])
  }
  holdValue = 0;
  changeButtonState('Run');
  let element = document.getElementById("Play");
  element.innerText = 'Pause';
  resetGraph();
  
}

function resetGraph() {
  execute(0);
  changeButtonState('Play');
  changeButtonState('Stop');
}

resetGraph();