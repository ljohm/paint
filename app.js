'use strict';

const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const btns = document.getElementsByTagName("button");
const fill = document.getElementById("jsFill");
const paint = document.getElementById("jsPaint");
const saveBtn = document.getElementById("jsSave");
const shapes = document.getElementById("jsShapes");
const menu = document.querySelector(".menu");
const circleBtn = document.getElementById("jsCircle");
const triangleBtn = document.getElementById("jsTriangle");
const rectangleBtn = document.getElementById("jsRectangle");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

const ctx = canvas.getContext("2d");

let painting = false;
let filling = false;
let drawingCircle = false;
let drawingTriangle = false;
let drawingRectangle = false;
let clicked = false;
let num = 1;

let radius = 50;

let tHalfWidth = 50;
let tHeight = tHalfWidth * 1.73;
let tHalfHeight = tHeight / 2;

let rHalfWidth = 50;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;

function onMenu() {
    menu.classList.add('active');
}

function hideMenu() {
    menu.classList.remove('active');
}

function stopPainting () {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting === false && drawingCircle === false) {
        ctx.beginPath(); 
        ctx.moveTo(x, y); 
    } else if(painting === true) {
        ctx.lineTo(x, y); 
        ctx.stroke(); 
    } else if(drawingCircle === true || drawingTriangle === true || drawingRectangle === true) {
        ctx.moveTo(x, y);
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    if(drawingCircle === true || drawingTriangle === true || drawingRectangle === true) {
        handleSizeChange(size);
    } else {
        ctx.lineWidth = size;
    }
}

function handleSizeChange(size) {
    radius = size * 20;
    tHalfWidth = size * 20;
    rHalfWidth = size * 20;
}

function handleFillClick() {
    filling = true;
    drawingCircle = false;
    btnsControl("jsFill");
}

function handleCanvasClick(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } else if(drawingCircle) {
        ctx.beginPath();
        ctx.arc(`${x}`, `${y}`, `${radius}`, 0, 2 * Math.PI);
        ctx.stroke();
    } else if(drawingTriangle) {
        ctx.beginPath();
        ctx.lineTo(`${x + tHalfWidth}`, `${y + tHalfHeight}`);
        ctx.lineTo(`${x - tHalfWidth}`, `${y + tHalfHeight}`);
        ctx.lineTo(`${x}`, `${y - tHalfWidth}`);
        ctx.closePath();
        ctx.stroke(); 
    } else if(drawingRectangle) {
        ctx.strokeRect(`${x - rHalfWidth}`, `${y - rHalfWidth}`, rHalfWidth * 2, rHalfWidth * 2);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = `noname${num}`;
    link.click();
    num++;
}

function handlePaintClick() {
    filling = false;
    drawingCircle = false;
    drawingTriangle = false;
    drawingRectangle = false;
    btnsControl("jsPaint");
}

function drawCircle() {
    drawingCircle = true;
    drawingTriangle = false;
    drawingRectangle = false;
    painting = false;
    filling = false;
    btnsControl("jsCircle");
}

function drawTriangle() {
    drawingTriangle = true;
    drawingCircle = false;
    drawingRectangle = false;
    painting = false;
    filling = false;
    btnsControl("jsTriangle");
}

function drawRectangle() {
    drawingRectangle = true;
    drawingCircle = false;
    drawingTriangle = false;
    painting = false;
    filling = false;
    btnsControl("jsRectangle");
}

if(canvas) {
    btnsControl("jsPaint");
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

function btnsControl(id) {
    let nowClickedBtn = document.getElementById(`${id}`);
    let alreadyClickedBtn = document.querySelector(".clicked");
    if(!alreadyClickedBtn) {
        alreadyClickedBtn = nowClickedBtn;
    }
    if(alreadyClickedBtn !== nowClickedBtn) {
        document.querySelector(".clicked").classList.remove("clicked");
        document.getElementById(`${id}`).classList.add("clicked");       
    } else if(alreadyClickedBtn === nowClickedBtn) {
        document.getElementById(`${id}`).classList.add("clicked");
    } 
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(fill) {
    fill.addEventListener("click", handleFillClick);
}

if(paint) {
    paint.addEventListener("click", handlePaintClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(shapes) {
    shapes.addEventListener("mousemove", onMenu);
    shapes.addEventListener("mouseleave", hideMenu);
}

if(menu) {
    menu.addEventListener("mousemove", onMenu);
    menu.addEventListener("mouseleave", hideMenu);
}

if(circleBtn) {
    circleBtn.addEventListener("click", drawCircle);
}

if(triangleBtn) {
    triangleBtn.addEventListener("click", drawTriangle);
}

if(rectangleBtn) {
    rectangleBtn.addEventListener("click", drawRectangle);
}