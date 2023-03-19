function observerCallback(mutations, observer) {
  let foundDomkit = false;

  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      if ($(addedNode).hasClass("domkit-Box")) {
        foundDomkit = true;
        break;
      }
    }
    if (foundDomkit) break;
  }

  observer.disconnect();

  if (foundDomkit) {
    initialize();
    console.log("SkySpark tweaks initialized");
  }
};

function initialize() {
  new Observer();

  new CodeEditorFuncsColoring();
  new CodeEditorFuncsHistory();
  new CodeEditorKeepFuncsSearch();
  new CodeEditorMatchDoEnd();
  new CodeEditorMatchText();
  new CodeEditorSyntaxHightlight();
  new HomeFavApps();
  new HomeProjectPicker();
  new NavbarButtons();
}

const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(observerCallback);
observer.observe(document.body, config);
