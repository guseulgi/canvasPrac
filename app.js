const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');
const textInput = document.getElementById('text');

const saveBtn = document.getElementById('save');

const lineWidth = document.querySelector('#line-width');
const colorSelector = document.querySelector('#color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));

const fileInput = document.getElementById('file');

const canvas = document.querySelector('canvas');
// canvas 크기 지정
canvas.width = 500;
canvas.height = 500;

// context -> 페인트 브러쉬
const ctx = canvas.getContext("2d"); // 그림을 그릴 수 있는 준비

// 인풋값으로 받아온 값을 라인의 굵기로 지정하기
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';

// fillRect() : 직사각형을 만들고 색을 채우기
// ctx.fillStyle = 'red';
// ctx.fillRect(50, 50, 100, 200);

// strokeRect() : 직사각형 그리기
// ctx.strokeRect(150, 150, 100, 200);

// rect() + fill()
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.fill();

// ctx.beginPath(); // 위와 아래의 rect() 의 경로를 상이하게 만드는 것.

// ctx.fillStyle = 'blue';
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// moveTo(x, y), lineTo(x, y)
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.stroke();
// ctx.fill();

// 집 그리기
// ctx.moveTo(150, 50);
// ctx.lineTo(75, 100);
// ctx.lineTo(225, 100);
// ctx.lineTo(150, 50);

// ctx.moveTo(100, 100);
// ctx.lineTo(100, 180);
// ctx.lineTo(200, 180);
// ctx.lineTo(200, 100);

// ctx.stroke();
////
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 5;
// ctx.strokeRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 30);

// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

// ctx.fillRect(100, 400, 450, 5);

// 사람 그리기
// ctx.fillRect(210, 200, 15, 100);
// ctx.fillRect(350, 200, 15, 100);
// ctx.fillRect(260, 200, 60, 200);

// ctx.arc(290, 120, 50, 1.8*Math.PI, 1.2*Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.arc(270, 120, 8, 0, 2*Math.PI);
// ctx.arc(310, 120, 11, 0, 2*Math.PI);
// ctx.fillStyle = 'white';
// ctx.fill();

// ctx.fillStyle='white';
// ctx.fillRect(280, 145, 20, 10);

// mousemove 이벤트 핸들러
// const colors = [
//   '#ff3838',
//   '#ffb8b8',
//   '#c56cf0',
//   'black',
//   '#32ff7e',
//   '#7efff5',
// ];
// ctx.lineWidth = 2;

// function onClick(evt) {
//   // console.log(evt);

//   ctx.beginPath();
//   ctx.moveTo(400, 400);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(evt.offsetX, evt.offsetY);
//   ctx.stroke();
// } 

// canvas.addEventListener('mousemove', onClick);


// 드래그앤드롭 이벤트로 그림 그리기
let isPainting = false;

function onMove(evt) {
  // 클릭 되었을 때만 그려줄 수 있게끔
  if(isPainting) {
    ctx.lineTo(evt.offsetX, evt.offsetY);
    ctx.stroke();
    return;
  }
  // 마우스의 움직임에 브러쉬는 계속 움직여야 함
  ctx.moveTo(evt.offsetX, evt.offsetY);
}

function onMouseDown() {
  isPainting = true;
}

function onMouseUp() {
  isPainting = false;
  // 각각의 선은 서로 경로가 달라야 한다.
  ctx.beginPath();
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp);

function onLineWidthChange(evt) {
  ctx.lineWidth = evt.target.value;
}

lineWidth.addEventListener('change', onLineWidthChange);

// function onColorChange(evt) {
//   ctx.strokeStyle = evt.target.value;
//   ctx.fillStyle = evt.target.value;
// }
// colorSelector.addEventListener('change', onColorChange);

function onColorClick(evt) {
  ctx.strokeStyle = evt.target.dataset.color;
  ctx.fillStyle = evt.target.dataset.color;
  colorSelector.value = evt.target.dataset.color;
}

colorOptions.forEach(color => color.addEventListener('click', onColorClick));

// Fill 버튼 기능 구현
let isFilling = false;
function onModeClick() {
  if(isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";

  }
}

function onCanvasClick() {
  if(isFilling) {
    ctx.fillRect(0,0, 500, 500);
  }
}

canvas.addEventListener('click', onCanvasClick);
modeBtn.addEventListener('click', onModeClick);

// 리셋 버튼
function onDestroyClick() {
  const question = window.confirm('정말로 모든 그림을 삭제하시겠습니까?');
  if(question === false) return;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 500, 500);
}

destroyBtn.addEventListener('click', onDestroyClick);

// 지우개 버튼
function onEraseBtn() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerHTML = 'Fill';
}

eraserBtn.addEventListener('click', onEraseBtn);

// 파일 받기
function onFileChange(evt) {
  // console.dir(evt.target);
  const file = evt.target.files[0];
  const url = URL.createObjectURL(file);
  // console.log(url);

  const image = new Image(); // <img />
  image.src = url;
  image.onload = function() {
    ctx.drawImage(image, 0, 0, 500, 500);
    fileInput.value = null;
  }
}

fileInput.addEventListener('change', onFileChange);

// 더블 클릭하면 텍스트 들어가게 만들기
function onDoubleClick(evt) {
  const txt = textInput.value;
  if(txt === '') return;

  ctx.save();
  ctx.font = `${ctx.lineWidth * 12}px ` + 'serif';
  ctx.lineWidth = 1;
  ctx.fillText(txt, evt.offsetX, evt.offsetY);
  ctx.restore();
  textInput.value = '';
}

canvas.addEventListener('dblclick', onDoubleClick);

// 저장 버튼 만들기
function onSaveClick() {
  const question = window.confirm('정말로 저장하시겠습니까?');
  if(question === false) return;

  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();

  onDestroyClick();
}

saveBtn.addEventListener('click', onSaveClick);