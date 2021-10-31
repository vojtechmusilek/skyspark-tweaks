class EditorFuncColors {
  onChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      var cl = $(node).parent().parent().attr('class');
      if(cl != "domkit-Box") return;
      
      this._applyColors(node.children);
    })
  }
  
  _applyColors(nodes) {
    var maxCamels = getOption("maxCamels");
    var colorizedClassName = "skyspark-tweaks-colorized";

    for (var node of nodes) {
      var spanElem = $(node).find("span").get(0);
      if (spanElem.classList.contains(colorizedClassName)) continue;

      var funcName = spanElem.innerHTML;
      var funcNameCamelSplitMax = camelSplitMax(funcName, maxCamels);

      var color = stringToColor(funcNameCamelSplitMax);
      var style = "color:" + color + "; font-weight:500;"
      var funcNamePartColorized = funcName.substring(0, funcNameCamelSplitMax.length);
      var funcNamePartNormal = funcName.substring(funcNameCamelSplitMax.length);

      //if(funcNamePartNormal == "") {
      //  funcNamePartNormal = funcNamePartColorized;
      //  funcNamePartColorized = ""
      //}

      spanElem.classList.add(colorizedClassName);
      spanElem.innerHTML = '<span style="' + style + '">' + funcNamePartColorized + '</span>' + funcNamePartNormal;
    }
  }
  
  static removeColors() {
    $(".skyspark-tweaks-colorized").each((i, node) => {
      node.innerHTML = $(node).text();
      $(node).removeClass("skyspark-tweaks-colorized");
    })
  }
}