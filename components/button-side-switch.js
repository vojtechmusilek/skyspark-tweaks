class ButtonSideSwitch {
  onStart() {
    var imgSrc = "";
    $(".domkit-Box .ui-WsHeader").find("img").each((i, node) => {
      if ($(node).attr("src").includes("clone?")) imgSrc = $(node).attr("src").replace("clone?", "layout2h?");
    });
    var id = "skyspark-tweaks-button-side-switch";
    var img = `<img class="ui-Icon" src="${imgSrc}" style="width: 16px; height: 16px;">`;
    var button = `<div id="${id}" class="domkit-control domkit-control-button domkit-Button" tabindex="0" style="padding: 3px 9px; float: right;">${img}</div>`;
    var elem = $(button)
    elem.click(this._click);
    
    $("#skyspark-tweaks-buttons").append(elem);
  }
  
  _click() {
    var hash = window.location.hash.replace("#", "");
    if (!hash) return;
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
      } else {
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
    
    if (hasNull) {
      //alert("Split view not opened")
    } else {
      sessionStorage.setItem(hash, res);
      window.location.href = window.location.href
    }
  }
}