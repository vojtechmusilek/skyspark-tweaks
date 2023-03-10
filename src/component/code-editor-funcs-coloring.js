console.log("INJ");

class CodeEditorFuncsColoring {
  constructor() {
    Observer.observe("div.domkit-Box.dom-style-autogen-0", this.update);
  }

  update(mutations, observer) {
    console.log("CodeEditorFuncsColoring.update");
  }
}
