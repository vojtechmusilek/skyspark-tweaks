class CodeEditorFuncsHistory {
  constructor() {
    Observer.observe(this.selectedDivSelector, this.update.bind(this));
  }

  parentSelector = "div.domkit-Box.dom-style-autogen-0";
  selectedDivSelector = this.parentSelector + " > div[style*='background: rgb(214, 234, 255)']";

  update(target) {
    const parent = $(target).parents(this.parentSelector).get(0);
    if (!parent) return;

    //console.log("target", target);
    //console.log("parent", parent);

    this.addCurrentFunc(target, parent)
  }

  async addCurrentFunc(target, parent) {
    const maxCount = await getSettingsValue("cefh_max_count", 5);
    if (maxCount == 0) return;

    const spanElem = $(target).find("span").get(0);
    const funcName = $(spanElem).html();

    const history = $(parent).parent().children(".skyspark-tweaks-func-history");
    if (history.length > 0 && $(history[0]).html() == funcName) return;

    if (history.length > maxCount - 1) {
      for (let index = maxCount - 1; index < history.length; index++) {
        history[index].remove();
      }
    }

    var classes = "domkit-control domkit-Label skyspark-tweaks-func-history";
    var style = "color: #555; width: 100%; display: block; overflow: hidden; " +
      "background: #fff; border: 1px solid #bbb; user-select: all; padding: 4px 4px; border-top-style: hidden;";

    $(parent).after(`<span class="${classes}" style="${style}">${funcName}</span>`);
  }
}
