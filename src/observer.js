class Observer {
  static _subscribers = [];
  static _observer;

  constructor() {
    if (Observer._observer !== undefined) return;

    const targetNode = $("body").get(0);

    // attributes?
    const config = { attributes: false, childList: true, subtree: true };

    Observer._observer = new MutationObserver((mutations, _) => {
      for (const mutation of mutations) {
        for (const subscriber of Observer._subscribers) {
          const match = $(mutation.target).is(subscriber.selector);

          // found exact match - target is matching selector
          if (match) {
            subscriber.callback(mutation.target);
            return;
          }

          if (subscriber.onlyExact) return;

          // check childs
          const childs = $(mutation.target).find(subscriber.selector);

          for (const child of childs) {
            subscriber.callback(child)
          }
        }
      }
    });

    Observer._observer.observe(targetNode, config);
  }

  static observe(selector, callback) {
    Observer._subscribers.push({
      selector, callback, onlyExact: false
    })
  }

  static observeExact(selector, callback) {
    Observer._subscribers.push({
      selector, callback, onlyExact: true
    })
  }
}