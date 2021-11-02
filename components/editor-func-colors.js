class EditorFuncColors {
  onChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      var cl = $(node).parent().parent().attr('class');
      if (cl != "domkit-Box") return;

      this._applyColors(node.children);
    })
  }

  _applyColors(nodes) {
    var maxCamels = getOption("maxCamels");
    var colorizedClassName = "skyspark-tweaks-colorized";
    var lastColor = null;

    for (var node of nodes) {
      var spanElem = $(node).find("span").get(0);
      if (spanElem.classList.contains(colorizedClassName)) break;

      var funcName = spanElem.innerHTML;
      var funcNameCamelSplitMax = camelSplitMax(funcName, maxCamels);
      var color = stringToColor(funcNameCamelSplitMax);
      var style = "color:" + color + "; font-weight:500;"
      var funcNamePartColorized = funcName.substring(0, funcNameCamelSplitMax.length);
      var funcNamePartNormal = funcName.substring(funcNameCamelSplitMax.length);

      if (getOption("showGroups") == 1 && lastColor != null && lastColor != color) {
        $(node).css("border-top", "1px dashed #e3e3e3").css("padding-top", "2px");
      }

      spanElem.classList.add(colorizedClassName);
      spanElem.innerHTML = '<span style="' + style + '">' + funcNamePartColorized + '</span>' + funcNamePartNormal;

      lastColor = color;
    }
  }

  static removeColors() {
    $(".skyspark-tweaks-colorized").each((i, node) => {
      node.innerHTML = $(node).text();
      $(node).removeClass("skyspark-tweaks-colorized");
    })
  }

  static removeGroups() {
    $(".domkit-Box .dom-style-autogen-0").children().css("border-top", "").css("padding-top", "3px");
  }
  
  static addGroups() {
    EditorFuncColors.removeColors();
  }
}