const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 550;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR; // 그리는 선의 색
ctx.lineWidth = 5.0; // 선의 두께
ctx.fillStyle = INITIAL_COLOR // 색이 변경되기 위해 비워둠


let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true; // painting 시작
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){ // 캔버스 위에 마우스가 있고, painting이 실행되지 않았을 때
    // console.log("creating path in", x, y);
    ctx.beginPath(); // path = 선
    ctx.moveTo(x, y); // path를 만들면 x,y좌표로 path를 옮긴다.
  } else { // painting이 실행되었을 때,
    // console.log("creating line in", x, y);
    ctx.lineTo(x, y); // path의 이전 위치에서 지금 위치까지 선을 만든다.
    ctx.stroke(); //현재의 sub-path(lineTo)를 현재의 stroke-style로 획을 긋는다.
  }
}


function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const value = event.target.value;
  ctx.lineWidth = value;
}



function handleModeClick(){
  if (filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "PAINT"
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick(){
  if (filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  } 
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL("image/png");  
  const link = document.createElement("a");
  link.href = image
  link.download = "image_PaintJS";
  link.click()
  console.log(link)
}

if (canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
/*Array를 만들고 colors를 찾는다. 각 colors는 forEach로 실행되어 addEventListener("click", handleColorClick)
을 호출 __ color 는 아무거나 써도 된다. */

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}