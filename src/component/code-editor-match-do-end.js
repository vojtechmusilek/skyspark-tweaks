console.log("INJ");

class CodeEditorMatchDoEnd {
  constructor() {
    Observer.observe(".CodeMirror-cursor", this.update);
  }

  update(mutations, observer) {
    console.log("CodeEditorMatchDoEnd.update");
  }
}
