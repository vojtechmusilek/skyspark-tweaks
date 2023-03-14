class Observer {
  static _subscribers = [];
  static _observer;

  static _selectorCalls = {};

  constructor() {
    if (Observer._observer !== undefined) return;

    const targetNode = $("body").get(0);

    if (debug()) {
      setInterval(() => {
        console.table(Observer._selectorCalls);
      }, 10000);
    }

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
            subscriber.callback(child);
            Observer._selectorCalls[subscriber.selector]++;
          }
        }
      }
    });

    Observer._observer.observe(targetNode, config);
  }

  static observe(selector, callback) {
    Observer._selectorCalls[selector] = 0;
    Observer._subscribers.push({
      selector, callback, onlyExact: false
    })
  }

  //static observeExact(selector, callback) {
  //  Observer._subscribers.push({
  //    selector, callback, onlyExact: true
  //  })
  //}
}