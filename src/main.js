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
  new CodeEditorMatchDoEnd();
}

const targetNode = $("body").get(0);
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(observerCallback);

observer.observe(targetNode, config);
