class HomeProjectPicker {
  constructor() {
    Observer.observeOnce(Selector.Popup, this.onPopup.bind(this));
  }

  async onPopup(popup) {
    const enabled = await getSettingsValue("HomeProjectPicker_enabled", false);
    if (!enabled) return;

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
    popupInput = this.removeAllListenersFromInput(popupInput);

    this.focusInput(popupInput);
    this.addEvents(popupInput, popupButtonOk, nodes);
  }

  addEvents(popupInput, popupButtonOk, nodes) {
    $(popupInput).on("input", (event) => {
      const value = event.target.value.toLowerCase();
      this.onInputFilterNodes(value, nodes);
    });

    $(popupInput).on("keydown", (event) => {
      const key = event.key.toLowerCase();
      this.onKeydown(key, popupButtonOk, nodes);
    });
  }

  onInputFilterNodes(value, nodes) {
    const regexStr = '.*' + value.split('').join('.*') + '.*';
    const regex = new RegExp(regexStr);
    const nodesToHide = [];
    let firstShowedNode = null;

    for (const node of nodes) {
      const projName = node.innerText
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
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

  onKeydown(key, popupButtonOk, nodes) {
    if (key == "enter") {
      popupButtonOk.dispatchEvent(new Event('mousedown'));
      popupButtonOk.dispatchEvent(new Event('mouseup'));
      return;
    }

    if (key == "arrowdown") {
      this.processArrowKey(1, nodes);
      return;
    }

    if (key == "arrowup") {
      this.processArrowKey(-1, nodes);
      return;
    }
  }

  processArrowKey(change, nodes) {
    const showedNodes = $(nodes).filter(':visible');
    for (let i = 0; i < showedNodes.length; i++) {
      const showedNode = $(showedNodes[i]);
      if (!showedNode.hasClass("selected")) {
        continue;
      }

      const nextNode = $(showedNodes[i + change]);
      if (nextNode.length == 1) {
        showedNode.removeClass("selected");
        nextNode.addClass("selected");
        nextNode.click();
      }

      break;
    }
  }

  focusInput(popupInput) {
    // when unfocused, focus again
    $(popupInput).blur(() => {
      $(popupInput).focus();
    });

    $(popupInput).focus();
  }

  removeAllListenersFromInput(popupInput) {
    // to remove all listeners we need to make clone
    // and then replace old element with clone
    var clone = popupInput.cloneNode(true);
    popupInput.parentNode.replaceChild(clone, popupInput);
    return clone;
  }
}
