class Observer {
  static _selectorCallbacks = [];
  static _observer;

  constructor() {
    if (Observer._observer !== undefined) return;

    const targetNode = $("body").get(0);

    // attributes?
    const config = { attributes: false, childList: true, subtree: true };

    Observer._observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        for (const selectorCallback of Observer._selectorCallbacks) {
          const item = $(mutation.target).find(selectorCallback.selector).get(0)

          //console.log(item, mutation);

          if (item !== undefined) {
            selectorCallback.callback(mutations, observer)
          }
        }
      }
    });

    Observer._observer.observe(targetNode, config);
  }

  static observe(selector, callback) {
    Observer._selectorCallbacks.push({
      selector, callback
    })
  }
}