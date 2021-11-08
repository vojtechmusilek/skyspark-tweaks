class EditorMatchDoEnd {
  
  onChange() {
    $(".codemirror-Editor").each((index, node) => {
      this._matchKeywords(node);
    })
  }
  
  _matchKeywords(parent) {
    var cursor = $(parent).find(".CodeMirror-cursor").get(0);
    if (!cursor) return;
    
    var cursorPos = cursor.getBoundingClientRect();
    var doKeywords = [];
    var i = 0;
    var overlap = null;
    var matching = [];
    
    $(parent).find("span.cm-keyword").each((index, node) => {
      if ($(node).text() == "do") {
        doKeywords[i] = node;
        if (doOverlap(cursorPos, node.getBoundingClientRect())) overlap = node;
        i++;
      } else if ($(node).text() == "end") {
        i--;
        matching.push({
          do: doKeywords[i],
          end: node
        });
        if (doOverlap(cursorPos, node.getBoundingClientRect())) overlap = node;
      }
    })
    
    matching.forEach((match) => {
      if (overlap != null && (overlap == match.do || overlap == match.end)) {
        $(match.end).css('background-color', '#ffff00');
        $(match.do).css('background-color', '#ffff00');
      } else {
        $(match.end).css('background-color', '');
        $(match.do).css('background-color', '');
      }
    });
  }
}