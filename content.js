window.onload = function() {
  _oldHref = document.location.href;
  _editorFuncColors = new EditorFuncColors();
  _editorFuncHistory = new EditorFuncHistory();
  _editorMatchDoEnd = new EditorMatchDoEnd();
  _buttonSideSwitch = new ButtonSideSwitch();
  _buttonEditorSettings = new ButtonEditorSettings();
  _buttons = new Buttons();
  _spamLock = false;
  
  _applyStyles();
  _startObeserver(onChange);
  
  _checkPageLoadId = setInterval(_checkPageLoad, 100);
}

window.onclick = onChange;


function onStart() {
  _buttons.onStart();
  _buttonSideSwitch.onStart();
  _buttonEditorSettings.onStart();
}

function onChange() {
  _editorFuncColors.onChange();
  _editorFuncHistory.onChange();
  _editorMatchDoEnd.onChange();
}

function _applyStyles() {
  var key = "skysparkTweaks.customCss";
  var css = localStorage.getItem(key);
  if (css == null) {
    css = ".cm-property { color: #ce5b29;} .cm-keyword { color: #00f;} .cm-bracket { color: #f00; font-weight: bold}";
    localStorage.setItem(key, css);
  }
  addStyle(css);
}

function _checkPageLoad() {
  if ($(".domkit-Box").length > 1) {
    clearInterval(_checkPageLoadId);
    onChange();
    onStart();
  }
}

function _startObeserver(cbOnChange) {
  var bodyList = document.querySelector("body")
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (!_spamLock) {
        cbOnChange()
        _spamLock = true;
        setTimeout(() => {
          _spamLock = false;
        }, 100);
      }
      
      if (_oldHref != document.location.href) {
        _oldHref = document.location.href;
        cbOnChange();
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