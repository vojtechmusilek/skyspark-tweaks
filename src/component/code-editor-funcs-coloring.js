class CodeEditorFuncsColoring {
  constructor() {
    Observer.observe(Selector.EditorFuncs, this.update.bind(this));
  }

  colorizedClassName = "skyspark-tweaks-colorized";

  update(target) {
    if (target.children.length == 0) return;

    this.colorizeFuncs(target.children)
  }

  async colorizeFuncs(nodes) {
    const maxLevels = await getSettingsValue("CodeEditorFuncsColoring_levels", 1);
    let lastColor = null;

    for (const node of nodes) {
      const spanElem = $(node).find("span").get(0);
      if (spanElem.classList.contains(this.colorizedClassName)) break;

      const funcName = spanElem.innerHTML;
      let funcNameCamelSplitMax = camelSplitMax(funcName, maxLevels);

      let curCamels = maxLevels - 1;
      while (funcNameCamelSplitMax == funcName && curCamels > 0) {
        funcNameCamelSplitMax = camelSplitMax(funcName, curCamels);
        curCamels -= 1;
      }

      const color = stringToColor(funcNameCamelSplitMax);
      const style = "color:" + color + "; font-weight:500;"
      const funcNamePartColorized = funcName.substring(0, funcNameCamelSplitMax.length);
      const funcNamePartNormal = funcName.substring(funcNameCamelSplitMax.length);

      if (lastColor != null && lastColor != color) {
        $(node).css("border-top", "1px dashed #e3e3e3").css("padding-top", "2px");
      }

      spanElem.classList.add(this.colorizedClassName);
      spanElem.innerHTML = '<span style="' + style + '">' + funcNamePartColorized + '</span>' + funcNamePartNormal;

      lastColor = color;
    }
  }
}
