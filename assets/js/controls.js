const input = document.querySelector('[type="color"]');
const inputRange = document.querySelector('[type="range"]');
// const selectLineCap = document.querySelector("select");

function setWidth(width) {
  fabCanvas.myProps.width = parseInt(width, 10);
  fabCanvas.freeDrawingBrush.width = fabCanvas.myProps.width;
  inputRange.value = fabCanvas.myProps.width;
}

function setColor(color) {
  // Use the selected color
  fabCanvas.myProps.color = input.value;
  if (fabCanvas.myProps.mode === "draw")
    fabCanvas.freeDrawingBrush.color = color;
}

function setBackground(url) {
  fabCanvas.cstmSetBackground(url);
}

// function changeBackground() {
//   var select = document.getElementById("background-select");
//   var canvas = document.getElementById("pageCanvas");
//   var ctx = canvas.getContext("2d");

//   var selectedValue = select.value;
//   var imagePath = "";

//   if (selectedValue === "img1") {
//     imagePath = "prototyp.png";
//   } else if (selectedValue === "img2") {
//     imagePath = "prototype.png";
//   } else if (selectedValue === "img3") {
//     imagePath = "#";
//   }

//   // canvas.style.backgroundImage = 'url(' + imagePath + ')';
//   return imagePath;
// }
