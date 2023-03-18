class CodeEditorMatchDoEnd {
  constructor() {
    Observer.observe(".CodeMirror-cursor", this.update.bind(this));
  }

  async update(cursor) {
    const matchDoEnd = await getSettingsValue("CodeEditorMatchDoEnd_enabled", true);
    if (!matchDoEnd) return;

    const parent = $(cursor).parents(".CodeMirror-scroll").get(0);
    if (!parent) return;

    const [matching, overlap] = this.findMatching(parent, cursor);

    this.colorizeMatching(matching, overlap);
  }

  findMatching(parent, cursor) {
    const cursorPos = cursor.getBoundingClientRect();
    const doKeywords = [];
    const matching = [];
    const nodes = $(parent).find("span.cm-keyword");

    let i = 0;
    let overlap = null;

    for (const node of nodes) {
      if ($(node).text() == "do") {
        doKeywords[i] = node;
        if (doOverlap(cursorPos, node.getBoundingClientRect())) {
          overlap = node;
        }
        i++;
      } else if ($(node).text() == "end") {
        i--;
        matching.push({
          do: doKeywords[i],
          end: node
        });
        if (doOverlap(cursorPos, node.getBoundingClientRect())) {
          overlap = node;
        }
      }
    }

    return [matching, overlap];
  }

  colorizeMatching(matching, overlap) {
    for (const match of matching) {
      if (overlap != null && (overlap == match.do || overlap == match.end)) {
        $(match.end).css('background-color', '#ffff00');
        $(match.do).css('background-color', '#ffff00');
      } else {
        $(match.end).css('background-color', '');
        $(match.do).css('background-color', '');
      }
    }
  }

}
