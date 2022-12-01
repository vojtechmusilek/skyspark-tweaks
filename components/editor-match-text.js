class EditorMatchText {
  static allowedKeys = ["arrowdown", "arrowup", "arrowleft", "arrowright", "home", "end"]

  onChange() {
    this._searchEditors();
  }
  
  onKeyDown(key) {
    if (EditorMatchText.allowedKeys.includes(key)) {
      this._searchEditors();
    }
  }

  _searchEditors() {
    $(".codemirror-Editor").each((_, node) => {
      this._matchKeywords(node);
    });
  }

  _matchKeywords(parent) {
    let cursor = $(parent).find(".CodeMirror-cursor").get(0);
    if (!cursor) return;
    
    let cursorPos = cursor.getBoundingClientRect();
    let cursorText = null;

    $(parent).find("span").each((_, node) => {
      if ($(node).attr("role") == "presentation") return;
      if (doOverlap(cursorPos, node.getBoundingClientRect())) {
        cursorText = $(node).text();
      }
    });

    $(parent).find("span").each((_, node) => {
      const text = $(node).text();
      if (text == "do" || text == "end") return;
      
      if (text == cursorText) {
        $(node).css('background-color', '#0078ff44');
        //$(node).css('background-color', '#FFFF00');
      }
      else {
        $(node).css('background-color', '');
      }
    });
  }
}