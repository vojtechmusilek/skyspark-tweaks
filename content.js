var oldHref = document.location.href;
var checkIntervalId;

window.onload = function () {
  addStyle("skyspark-tweaks-style", ".cm-property { color: #cf7900; }");
  addStyle("skyspark-tweaks-style", ".skyspark-tweaks-smooth-transition { transition: 100ms; }");
  addObserver();
  checkIntervalId = setInterval(checkPageLoad, 100);
};

// Functions

function onChange() {
  console.log("onChange");
  scan();
}

function checkPageLoad() {
  if ($(".domkit-Box").length > 1) {
    clearInterval(checkIntervalId);
    onChange();
  }
}

function addStyle(className, styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  style.classList.add(className);
  document.head.append(style);
}

function addObserver(){
  var bodyList = document.querySelector("body")
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      
      //console.log(new Date(), mutation);
      // todo - check for currently selected fn
      // todo - check for currently hovered fn?
      
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        onChange();
      }
    });
  });
  
  var config = {
    childList: true,
    subtree: true,
    attributes: true
  };
  
  observer.observe(bodyList, config);
}