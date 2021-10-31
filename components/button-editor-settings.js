class ButtonEditorSettings {
  onStart() {
    var id = "skyspark-tweaks-button-editor-settings";
    var img = '<img class="ui-Icon" src="/ui/x/24daeae5-9feb24af/icon/command?s=solid&amp;c=fff" style="width: 16px; height: 16px;">';
    var button = `<div id="${id}" class="domkit-control domkit-control-button domkit-Button" tabindex="0" style="padding: 3px 9px; float: right;">${img}</div>`;
    var elem = $(button)
    elem.click(this._click);
    
    $("#skyspark-tweaks-buttons").append(elem);
  }

  _click() {
    $("#skyspark-tweaks-options").remove();
    
    // todo - set option to local storage, read from it and update current nodes, also when off set solid to outline
    
  }
}