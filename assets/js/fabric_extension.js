fabric.Canvas.prototype.historyInit = function (addInitial) {
  this.historyUndo = [];
  this.historyRedo = [];

  this.historyNextState = addInitial ? this.historyNext() : undefined;

  if (!this.addedListeners) {
    this.on({
      "object:added": this.historySaveAction.bind(this, "added"),
      "object:removed": this.historySaveAction.bind(this, "removed"),
      "object:modified": this.historySaveAction.bind(this, "modified"),
      "erasing:end": this.historySaveAction.bind(this, "erased"),
    });
    this.addedListeners = true;
  }
};

fabric.Canvas.prototype.historyNext = function () {
  return JSON.stringify(this.toDatalessJSON(this.extraProps));
};

fabric.Canvas.prototype.historySaveAction = function (mode, ...params) {
  if (this.historyProcessing) return;
  if (mode === "added" && this.myProps.mode === "objecterase") return;
  this.historyRedo = [];
  const json = this.historyNextState;
  if (json) this.historyUndo.push(json);
  this.historyNextState = this.historyNext();
};

fabric.Canvas.prototype.cstmUndo = function () {
  this.historyProcessing = true;

  const history = this.historyUndo.pop();
  if (history) {
    if (this.historyNextState) {
      this.historyRedo.push(this.historyNextState);
    }
    this.historyNextState = history;
    this.loadFromJSON(history).renderAll();
    fabCanvas.once("after:render", () => {
      fabCanvas.historyProcessing = false;
    });
  } else {
    this.historyProcessing = false;
  }
};

fabric.Canvas.prototype.cstmRedo = function () {
  this.historyProcessing = true;

  const history = this.historyRedo.pop();
  if (history) {
    if (this.historyNextState) {
      this.historyUndo.push(this.historyNextState);
    }
    this.historyNextState = history;
    this.loadFromJSON(history).renderAll();
    fabCanvas.once("after:render", () => {
      fabCanvas.historyProcessing = false;
    });
  } else {
    this.historyProcessing = false;
  }
};

fabric.Canvas.prototype.cstmSetBackground = function (url) {
  this.historyProcessing = true;
  this.clear();
  this.historyProcessing = false;

  this.historyInit(false);

  const _this = this;
  fabric.Image.fromURL(url, function (img) {
    _this.backImage = img;
    _this.setBackgroundImage(img, () => {
      _this.historySaveAction("added");
      _this.historyProcessing = true;
      _this.once("after:render", () => {
        _this.historyProcessing = false;
      });
      _this.renderAll();
      _this.backgroundImage.erasable = false;
    });
  });
};

fabric.Canvas.prototype.cstmClearObjects = function () {
  // Remove all objects on the canvas
  this.historyProcessing = true;
  this.clear();
  this.historyProcessing = false;

  const _this = this;
  // Set the background image back after clearing
  this.setBackgroundImage(this.backImage, () => {
    _this.historySaveAction("added");
    _this.historyProcessing = true;
    _this.once("after:render", () => {
      _this.historyProcessing = false;
    });
    _this.renderAll();
  });
};
