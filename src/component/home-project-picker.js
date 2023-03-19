class HomeProjectPicker {
  constructor() {
    Observer.observeOnce(Selector.Popup, this.onPopup.bind(this));
  }

  static classNamePopup = "skyspark-tweaks-popup";
  static classNameCache = "skyspark-tweaks-cache";

  onPopup(popup) {
    const popupButtonOk = $(popup).find('div:contains("Ok"):not(:has(*))').get(0);
    if (popupButtonOk == null) return;

    const popupInput = $(popup).find("input").get(0);
    if (popupInput == null) return;

    Observer.observeFirst(Selector.PimTreeNode, (firstNode) => {
      this.onFirstNode(firstNode, popupInput, popupButtonOk);
    });
  }

  onFirstNode(firstNode, popupInput, popupButtonOk) {
    const nodes = $(firstNode).parents(Selector.Popup).find(Selector.PimTreeNode);
    console.log({
      firstNode, popupInput, popupButtonOk, nodes
    });

  }
}
