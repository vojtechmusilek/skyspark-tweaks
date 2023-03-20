class CodeEditorMatchText {
  constructor() {
    Observer.observe(".CodeMirror-cursor", this.update.bind(this));
  }

  dataKey = "skyspark-tweaks-timeout"
  ignoredTexts = ["(", ")", "{", "}", "[", "]", "do", "end", "if", "else"]

  async update(cursor) {
    const matchEnabled = await getSettingsValue("CodeEditorMatchText_enabled", true);
    if (!matchEnabled) return;

    const parent = $(cursor).parents(".CodeMirror-scroll").get(0);
    if (!parent) return;

    this.highlightMatching(parent, cursor);
  }

  highlightMatching(parent, cursor) {
    let cursorPos = cursor.getBoundingClientRect();
    let cursorText = null;

    $(parent).find("span").each((_, node) => {
      if ($(node).attr("role") == "presentation") return;
      if (doOverlap(cursorPos, node.getBoundingClientRect(), 0)) {
        cursorText = $(node).text();
      }
    });

    if (this.ignoredTexts.includes(cursorText)) {
      cursorText = null;
    }

    const nodes = $(parent).find("span").children().get();
    const matches = nodes.filter(x => x.innerText == cursorText).length;

    for (const node of nodes) {
      if (node.innerText == cursorText && matches > 1) {
        const id = setTimeout(() => {
          $(node).css('background-color', 'rgba(0, 120, 255, 0.267)');
        }, 400);

        $(node).data(this.dataKey, id)
      }
      else {
        const timeoutId = $(node).data(this.dataKey);
        if (timeoutId != null) {
          clearTimeout(timeoutId);
        }

        if ($(node).css('background-color') == 'rgba(0, 120, 255, 0.267)') {
          $(node).css('background-color', '');
        }
      }
    }
  }
}
