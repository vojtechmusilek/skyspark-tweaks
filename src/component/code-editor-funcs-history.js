class CodeEditorFuncsHistory {
  constructor() {
    Observer.observe(this.cssSelector_SelectedDiv, this.update.bind(this));
  }

  cssSelector_Parent = "div.domkit-Box.dom-style-autogen-0";
  cssSelector_SelectedDiv = this.cssSelector_Parent + " > div[style*='background: rgb(214, 234, 255)']";

  class_NewElem = "domkit-control domkit-Label skyspark-tweaks-func-history";
  style_NewElem = "color: #555; width: 100%; display: block; overflow: hidden; " +
    "background: #fff; border: 1px solid #bbb; user-select: all; padding: 4px 4px; border-top-style: hidden;";

  update(target) {
    const parent = $(target).parents(this.cssSelector_Parent).get(0);
    if (!parent) return;

    this.addCurrentFunc(target, parent)
  }

  async addCurrentFunc(target, parent) {
    const maxCount = await getSettingsValue("cefh_max_count", 5);
    if (maxCount == 0) return;

    const spanElem = $(target).find("span").get(0);
    const funcName = $(spanElem).html();
    const history = $(parent).parent().children(".skyspark-tweaks-func-history");

    // remove if already exists in history
    for (let index = 1; index < history.length; index++) {
      if ($(history[index]).html() == funcName) {
        history[index].remove()
        history.splice(index, 1);
      }
    }

    // already is first in history, dont add new element
    if (history.length > 0 && $(history[0]).html() == funcName) return;

    // remove elements that are above limit
    if (history.length > maxCount - 1) {
      for (let index = maxCount - 1; index < history.length; index++) {
        history[index].remove();
      }
    }

    // create new element
    const html = `<span class="${this.class_NewElem}" style="${this.style_NewElem}">${funcName}</span>`;
    $(parent).after(html);
  }
}
