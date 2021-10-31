window.onload = function () {
  _oldHref = document.location.href;
  _editorFuncColors = new EditorFuncColors();
  _editorFuncHistory = new EditorFuncHistory();
  _buttonSideSwitch = new ButtonSideSwitch();
  _buttonEditorSettings = new ButtonEditorSettings();
  _editorFuncSettings = new EditorFuncSettings();
  _buttons = new Buttons();

  _applyStyles();
  _startObeserver(onChange, onHrefChange);

  _checkPageLoadId = setInterval(_checkPageLoad, 100);
}

function onStart() {
  _buttons.onStart();
  _buttonSideSwitch.onStart();
  _buttonEditorSettings.onStart();
}

function onHrefChange() {
  
}

function onChange() {
  _editorFuncColors.onChange();
  _editorFuncHistory.onChange();
  _editorFuncSettings.onChange();
}

function _applyStyles() {
  var key = "skysparkTweaks.customCss";
  var css = localStorage.getItem(key);
  if(css == null) {
    css = ".cm-property { color: #cf7900; }";
    localStorage.setItem(key, css);
  }
  addStyle(css);
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
      cbOnChange()
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