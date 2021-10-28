var _oldHref;
var _checkPageLoadId;
var _editorFuncColors;
var _editorFuncHistory;
var _buttonSideSwitch;

window.onload = function () {
  _oldHref = document.location.href;
  _editorFuncColors = new EditorFuncColors();
  _editorFuncHistory = new EditorFuncHistory();
  _buttonSideSwitch = new ButtonSideSwitch();

  _applyStyles();
  _startObeserver(null, onHrefChange);

  _checkPageLoadId = setInterval(_checkPageLoad, 100);
}

function onStart() {
  _buttonSideSwitch.onStart();
  
  
}

function onHrefChange() {
  _editorFuncColors.onHrefChange();
  _editorFuncHistory.onHrefChange();
  
  
}

function _applyStyles() {
  addStyle(".cm-property { color: #cf7900; }");
}

function _checkPageLoad() {
  if ($(".domkit-Box").length > 1) {
    clearInterval(_checkPageLoadId);
    onHrefChange();
    onStart();
  }
}

function _startObeserver(cbOnChange, cbOnHrefChange) {
  var bodyList = document.querySelector("body")
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {

      //console.log(new Date(), mutation);
      // todo - check for currently selected fn
      // todo - check for currently hovered fn?

      //cbOnChange()

      if (_oldHref != document.location.href) {
        _oldHref = document.location.href;
        cbOnHrefChange();
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