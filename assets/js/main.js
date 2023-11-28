const BACKGROUND_COLOR = "rgba(0,0,0,0)";

const fabCanvas = new fabric.Canvas("pageCanvas", {
  isDrawingMode: true,
  backgroundColor: BACKGROUND_COLOR,
  perPixelTargetFind: true,
  myProps: {
    mode: "draw",
    color: "black",
    width: 5,
  },
});

fabCanvas.cstmSetBackground("pdf/prototyp.png");

function redoState() {
  fabCanvas.freeDrawingBrush =
    fabCanvas.myProps.mode === "erase"
      ? new fabric.EraserBrush(fabCanvas)
      : new fabric.PencilBrush(fabCanvas);

  fabCanvas.freeDrawingBrush.width = fabCanvas.myProps.width;
  fabCanvas.freeDrawingBrush.color =
    fabCanvas.myProps.mode === "draw"
      ? fabCanvas.myProps.color
      : "rgba(0,0,0,0)";

  document.querySelectorAll(".modeBtn").forEach((btn) => {
    btn.classList.remove("current");
  });
  document
    .getElementById(`${fabCanvas.myProps.mode}Btn`)
    .classList.add("current");
}

document.getElementById("drawBtn")?.addEventListener("click", () => {
  fabCanvas.isDrawingMode = true;
  fabCanvas.myProps.mode = "draw";
  fabCanvas.freeDrawingBrush.color = "black"; // Set drawing color
  redoState();
});

document.getElementById("objecteraseBtn")?.addEventListener("click", () => {
  fabCanvas.isDrawingMode = true;
  fabCanvas.myProps.mode = "objecterase";
  fabCanvas.freeDrawingBrush.color = "rgba(0,0,0,0)"; // Set eraser color (white to match fabCanvas background)
  redoState();
});

document.getElementById("eraseBtn")?.addEventListener("click", () => {
  fabCanvas.isDrawingMode = true;
  fabCanvas.myProps.mode = "erase";
  fabCanvas.freeDrawingBrush.color = BACKGROUND_COLOR; // Set eraser color (white to match fabCanvas background)
  redoState();
});

document.getElementById("undoBtn")?.addEventListener("click", () => {
  fabCanvas.cstmUndo();
});

document.getElementById("redoBtn")?.addEventListener("click", () => {
  fabCanvas.cstmRedo();
});

fabCanvas.on("mouse:move", function (options) {
  if (
    fabCanvas.myProps.mode === "objecterase" &&
    (options.e.buttons & 1) === 1
  ) {
    // When in Erase mode, remove the object (stroke) at the clicked position
    const target = fabCanvas.findTarget(options.e, false);
    fabCanvas.remove(target);
  }
});

redoState(); //Set the initial value
