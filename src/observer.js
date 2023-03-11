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
          const target = $(mutation.target).find(selectorCallback.selector).get(0)

          if (target !== undefined) {
            selectorCallback.callback(target)
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