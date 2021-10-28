class EditorFuncColors {
  onHrefChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      this._applyColors(node.children);
    })
  }
  
  _applyColors(nodes) {
    var maxCamels = 2;
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

      spanElem.classList.add(colorizedClassName);
      spanElem.innerHTML = '<span style="' + style + '">' + funcNamePartColorized + '</span>' + funcNamePartNormal;
    }
  }
}