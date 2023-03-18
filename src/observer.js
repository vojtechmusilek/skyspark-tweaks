class Observer {
  static _subscribers = [];
  static _observer;

  static _debug_selectorCalls = {};

  constructor() {
    if (Observer._observer !== undefined) return;

    if (debug()) {
      setInterval(() => {
        console.table(Observer._debug_selectorCalls);
      }, 10000);
    }

    // attributes?
    const config = { attributes: false, childList: true, subtree: true };

    const doCallback = (subscriber, elem) => {
      if (subscriber.once && subscriber.calledTargets.includes(elem)) {
        return;
      }

      Observer._debug_selectorCalls[subscriber.selector]++;
      subscriber.callback(elem);

      if (subscriber.once) {
        subscriber.calledTargets.push(elem);
      }
    }

    Observer._observer = new MutationObserver((mutations, _) => {
      for (const mutation of mutations) {
        for (const subscriber of Observer._subscribers) {
          // found exact match - target is matching selector
          const match = $(mutation.target).is(subscriber.selector);
          if (match) {
            doCallback(subscriber, mutation.target);
            return;
          }

          if (subscriber.exact) {
            return;
          }

          // check childs
          const childs = $(mutation.target).find(subscriber.selector);
          for (const child of childs) {
            doCallback(subscriber, child);
          }
        }
      }
    });

    Observer._observer.observe(document.body, config);
  }

  static observe(selector, callback) {
    Observer._debug_selectorCalls[selector] = 0;
    Observer._subscribers.push({
      selector, callback
    })
  }

  static observeOnce(selector, callback) {
    Observer._debug_selectorCalls[selector] = 0;
    Observer._subscribers.push({
      selector, callback, once: true, calledTargets: []
    })
  }

  //static observeExact(selector, callback) {
  //  Observer._subscribers.push({
  //    selector, callback, exact: true
  //  })
  //}

  static stopObserving(selector) {
    delete Observer._debug_selectorCalls[selector];
    Observer._subscribers = Observer._subscribers.filter(item => item.selector != selector);
  }
}