class ButtonSideSwitch {
  _buttonId = "skyspark-tweaks-button-side-switch";

  onStart() {
    $(".domkit-Box .ui-WsHeader").children().each((index, node) => {
      if (node.style.cssText == "height: 34px; padding: 5px 10px 5px 5px;") {
        this._addButton(node);
      }
    })
  }

  _addButton(parent) {
    $(parent).children().each((index, node) => {
      if (node.style.cssText == "padding: 3px 9px; float: right;") {
        var cloned = $(node).clone();
        var child = cloned.children().first();
        var oldSrc = child.attr('src');
        var newSrc = oldSrc.replace("clone?", "layout2h?");
        $(node).after(cloned);

        child.attr('src', newSrc);
        cloned.attr('id', this._buttonId);
        cloned.click(this._buttonAction);
      }
    })

  }

  _buttonAction() {
    var hash = window.location.hash.replace("#", "");
    var data = sessionStorage.getItem(hash);
    var trimmed = data.substring(1, data.length - 1);
    
    var hasNull = false;
    var obj = {};
    var stack = "";
    var pointer = "";
    var bracket = 0;
    for (let index = 0; index < trimmed.length; index++) {
      const char = trimmed[index];

      if (char == "N" && stack == "" && bracket == 0) {
        obj[pointer] = char;
        stack = "";
        hasNull = true;
      }

      if (char == ":" && bracket == 0) {
        pointer = stack.trim();
        stack = "";
      }
      else {
        stack += char;
      }

      if (char == "{") bracket++;
      if (char == "}") bracket--;

      if (char == "}" && bracket == 0) {
        obj[pointer] = stack;
        stack = "";
      }
    }
    var res = `{left:${obj.right} right:${obj.left}}`
    
    console.log({
      before: data,
      after: res
    });
    
    if (hasNull) {
      alert("Split view not opened")
    }
    else {
      sessionStorage.setItem(hash, res);
      window.location.href = window.location.href
    }
  }
}