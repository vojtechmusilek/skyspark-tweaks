class EditorMatchDoEnd {
  
  onChange() {
    $(".codemirror-Editor").each((index, node) => {
      this._matchKeywords(node);
    })
  }
  
  _matchKeywords(parent) {
    var cursor = $(".CodeMirror-cursor").get(0);
    if (!cursor) return;
    
    var cursorPos = cursor.getBoundingClientRect();
    var doKeywords = [];
    var i = 0;
    var overlap = null;
    var matching = [];
    
    $(parent).find("span.cm-keyword").each((index, node) => {
      if ($(node).text() == "do") {
        doKeywords[i] = node;
        if (this._doOverlap(cursorPos, node.getBoundingClientRect())) overlap = node;
        i++;
      } else if ($(node).text() == "end") {
        i--;
        matching.push({
          do: doKeywords[i],
          end: node
        });
        if (this._doOverlap(cursorPos, node.getBoundingClientRect())) overlap = node;
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
  
  _doOverlap(domRect1, domRect2, margin = 2) {
    var l1 = {
      x: domRect1.x - margin,
      y: domRect1.y + domRect1.height
    };
    var r1 = {
      x: domRect1.x + domRect1.width + margin,
      y: domRect1.y + domRect1.height - domRect1.height
    };
    var l2 = {
      x: domRect2.x - margin,
      y: domRect2.y + domRect2.height
    };
    var r2 = {
      x: domRect2.x + domRect2.width + margin,
      y: domRect2.y + domRect2.height - domRect2.height
    };
    if (l1.x == r1.x || l1.y == r1.y || l2.x == r2.x || l2.y == r2.y ||
      l1.x >= r2.x || l2.x >= r1.x || r1.y >= l2.y || r2.y >= l1.y) return false;
    return true;
  }
  
}