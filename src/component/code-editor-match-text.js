class CodeEditorMatchText {
  constructor() {
    Observer.observe(".CodeMirror-cursor", this.update.bind(this));
  }

  ignoredTexts = ["(", ")", "{", "}", "[", "]", "return"]

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
      if (doOverlap(cursorPos, node.getBoundingClientRect())) {
        cursorText = $(node).text();
      }
    });

    if (this.ignoredTexts.includes(cursorText)) {
      cursorText = null;
    }

    $(parent).find("span").each((_, node) => {
      const text = $(node).text();
      if (text == "do" || text == "end") return;

      if (text == cursorText) {
        $(node).css('background-color', '#0078ff44');
      }
      else {
        $(node).css('background-color', '');
      }
    });
  }
}
