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

    this.focusInput(popupInput);

    $(popupInput).on("input", (event) => {
      const value = event.target.value.toLowerCase();
      this.onInput(value, nodes);
    });
  }

  onInput(value, nodes) {
    const regexStr = '.*' + value.split('').join('.*') + '.*';
    const regex = new RegExp(regexStr);
    const nodesToHide = [];
    let firstShowedNode = null;

    for (const node of nodes) {
      const projName = node.innerText.toLowerCase();
      const show = regex.test(projName);

      if (show) {
        $(node).show();
        if (firstShowedNode == null) {
          firstShowedNode = node
        }
      }
      else {
        nodesToHide.push(node);
      }
    }

    if (firstShowedNode != null) {
      $(firstShowedNode).addClass("selected");
      $(firstShowedNode).click();
    }

    for (const node of nodesToHide) {
      $(node).hide();
    }
  }

  focusInput(popupInput) {
    // when unfocused, focus again
    $(popupInput).blur(() => {
      $(popupInput).focus();
    });

    $(popupInput).focus();
  }
}
