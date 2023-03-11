class CodeEditorFuncsColoring {
  constructor() {
    Observer.observe("div.domkit-Box.dom-style-autogen-0", this.update.bind(this));
  }

  colorizedClassName = "skyspark-tweaks-colorized";

  update(target) {
    if (target.children.length == 0) return;

    this.colorizeFuncs(target.children)
  }

  async colorizeFuncs(nodes) {
    var maxLevels = await getSettingsValue("cefc_max_levels", 1);
    var lastColor = null;

    for (var node of nodes) {
      var spanElem = $(node).find("span").get(0);
      if (spanElem.classList.contains(this.colorizedClassName)) break;

      var funcName = spanElem.innerHTML;
      var funcNameCamelSplitMax = camelSplitMax(funcName, maxLevels);

      var curCamels = maxLevels - 1;
      while (funcNameCamelSplitMax == funcName && curCamels > 0) {
        funcNameCamelSplitMax = camelSplitMax(funcName, curCamels);
        curCamels -= 1;
      }

      var color = stringToColor(funcNameCamelSplitMax);
      var style = "color:" + color + "; font-weight:500;"
      var funcNamePartColorized = funcName.substring(0, funcNameCamelSplitMax.length);
      var funcNamePartNormal = funcName.substring(funcNameCamelSplitMax.length);

      if (lastColor != null && lastColor != color) {
        $(node).css("border-top", "1px dashed #e3e3e3").css("padding-top", "2px");
      }

      spanElem.classList.add(this.colorizedClassName);
      spanElem.innerHTML = '<span style="' + style + '">' + funcNamePartColorized + '</span>' + funcNamePartNormal;

      lastColor = color;
    }
  }
}
