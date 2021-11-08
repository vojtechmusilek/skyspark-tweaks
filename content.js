window.onload = function() {
  _buttons = new Buttons();
  _buttonSideSwitch = new ButtonSideSwitch();
  _buttonEditorSettings = new ButtonEditorSettings();
  
  _editorFuncColors = new EditorFuncColors();
  _editorFuncHistory = new EditorFuncHistory();
  _editorMatchDoEnd = new EditorMatchDoEnd();
  
  _homeFavApps = new HomeFavApps();
  
  _applyStyles();
  _startObeserver(onChange);
  
  _checkStartId = setInterval(_checkStart, 10);
}

window.onclick = onChange;


function onStart() {
  _buttons.onStart();
  _buttonSideSwitch.onStart();
  _buttonEditorSettings.onStart();
  console.log("SkySpark Tweaks started");
}

function onChange() {
  _editorFuncColors.onChange();
  _editorFuncHistory.onChange();
  _editorMatchDoEnd.onChange();
  _homeFavApps.onChange();
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

function _checkStart() {
  if ($('img[src="/ui/x/24daeae5-9feb24af/icon/clone?s=solid&c=fff"]').length >= 1) {
    clearInterval(_checkStartId);
    onStart();
  }
}

function _startObeserver(cbOnChange) {
  var bodyList = document.querySelector("body");
  
  var observer = new MutationObserver(function(mutations) {
    cbOnChange();
  });
  
  var config = {
    childList: true,
    subtree: true
  };
  
  observer.observe(bodyList, config);
}