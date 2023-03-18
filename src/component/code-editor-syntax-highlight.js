class CodeEditorSyntaxHightlight {
  constructor() {
    this.start();
  }

  async start() {
    const propertyColor = await getSettingsValue("CodeEditorSyntaxHightlight_color", "#ce5b29");
    const bracketBold = await getSettingsValue("CodeEditorSyntaxHightlight_boldBracket", true);

    let styleString = `.cm-property { color: ${propertyColor};}\n`;

    if (bracketBold) {
      styleString += ".cm-bracket { font-weight: bold}\n"
    }

    const style = document.createElement("style");
    style.textContent = styleString;
    style.classList.add("skyspark-tweaks-style");
    document.head.append(style);
  }
}
