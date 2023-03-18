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
  }
};

async function initialize() {
  new Observer();

  new CodeEditorFuncsColoring();
  new CodeEditorFuncsHistory();

  if (await getSettingsValue("CodeEditorKeepFuncsSearch_enabled", true)) {
    new CodeEditorKeepFuncsSearch();
  }

  if (await getSettingsValue("CodeEditorMatchDoEnd_enabled", true)) {
    new CodeEditorMatchDoEnd();
  }

  if (await getSettingsValue("CodeEditorMatchText_enabled", true)) {
    new CodeEditorMatchText();
  }

  new CodeEditorSyntaxHightlight();
  new HomeFavApps();
  new NavbarButtons();

  console.log("SkySpark tweaks initialized");
}

const targetNode = $("body").get(0);
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(observerCallback);

observer.observe(targetNode, config);
