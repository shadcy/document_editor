




// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d');
// const input = document.querySelector('[type="color"]');
// const inputRange = document.querySelector('[type="range"]');
// const selectLineCap = document.querySelector('select');
// const clear = document.querySelector('button');

// ctx.lineJoin = 'round';
// ctx.lineCap = 'round';
// ctx.lineWidth = 10;
// ctx.strokeStyle = input.value;

// let isDrawing = false;
// let lastX = 0;
// let lastY = 0;


// function draw(e) {
//     if (!isDrawing) return;
//     ctx.beginPath();
//     ctx.moveTo(lastX, lastY);
//     ctx.lineTo(e.offsetX, e.offsetY);
//     ctx.stroke();
//     [lastX, lastY] = [e.offsetX, e.offsetY];
// }

// function handleUpdate() {
//     ctx.lineWidth = this.value
//     ctx.lineCap = this.value;
//     ctx.strokeStyle = this.value;

//     console.log(`${this.name}: ${this.value}`);
// }

// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// canvas.addEventListener('mousedown', (e) => {
//     isDrawing = true;
//     [lastX, lastY] = [e.offsetX, e.offsetY];
// });

// canvas.addEventListener('mousemove', draw);
// canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mouseout', () => isDrawing = false);
// input.addEventListener('change', handleUpdate);
// inputRange.addEventListener('change', handleUpdate)
// selectLineCap.addEventListener('change', handleUpdate);
// clear.addEventListener('click', clearCanvas)

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



let mousePos = {
    x: 0,
    y: 0
};
let onCanvas = false;

window.addEventListener('mousemove', draw);
window.addEventListener('mousedown', mousePosition);
window.addEventListener('mouseenter', mousePosition);

window.addEventListener('pointermove', draw);
window.addEventListener('pointerdown', mousePosition);
window.addEventListener('pointerenter', mousePosition);

function mousePosition(e) {
    mousePos.x = e.offsetX;
    mousePos.y = e.offsetY;
}


function draw(e) {
    if (e.buttons !== 1) {
        mousePosition(e);
        return;
    }

    if (document.elementFromPoint(e.clientX, e.clientY) != canvas) {
        onCanvas = false;
        mousePosition(e);
        return;
    }

    if (!onCanvas) {
        onCanvas = true;
        mousePosition(e);
        return;
    }

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#aeae00';
    ctx.lineWidth = 5;
    ctx.moveTo(mousePos.x, mousePos.y);
    mousePosition(e);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}




// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');








const input = document.querySelector('[type="color"]');
const inputRange = document.querySelector('[type="range"]');
const selectLineCap = document.querySelector('select');
const clear = document.querySelector('button');
const textInput = document.querySelector('#text-input');
const textButton = document.querySelector('#text-button');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.strokeStyle = input.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineWidth = inputRange.value;
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function handleUpdate() {
    ctx.lineWidth = inputRange.value;
    ctx.lineCap = selectLineCap.value;
    ctx.strokeStyle = input.value;

    console.log(`${this.name}: ${this.value}`);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addText(hello) {
    ctx.font = '30px Arial';
    ctx.fillText(textInput.value, 50, 50);
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
input.addEventListener('change', handleUpdate);
inputRange.addEventListener('change', handleUpdate);
selectLineCap.addEventListener('change', handleUpdate);
clear.addEventListener('click', clearCanvas);
textButton.addEventListener('click', addText);





function changeBackground() {
    var select = document.getElementById('background-select');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var selectedValue = select.value;
    var imagePath = '';

    if (selectedValue === 'img1') {
        imagePath = 'prototyp.png';
    } else if (selectedValue === 'img2') {
        imagePath = 'prototype.png';
    } else if (selectedValue === 'img3') {
        imagePath = '#';
    }

    // canvas.style.backgroundImage = 'url(' + imagePath + ')';
    return imagePath;
}

