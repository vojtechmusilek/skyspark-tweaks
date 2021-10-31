class ButtonEditorSettings {
  onStart() {
    var imgSrc = "";
    $(".domkit-Box .ui-WsHeader").find("img").each((i, node) => {
      if($(node).attr("src").includes("clone?")) imgSrc = $(node).attr("src").replace("clone?", "command?");
    });
    if(getOption("settingsVisible") == false) imgSrc = imgSrc.replace("s=solid", "s=outline");
    
    var id = "skyspark-tweaks-button-editor-settings";
    var img = `<img class="ui-Icon" src="${imgSrc}" style="width: 16px; height: 16px;">`;
    var button = `<div id="${id}" class="domkit-control domkit-control-button domkit-Button" tabindex="0" style="padding: 3px 9px; float: right;">${img}</div>`;
    var elem = $(button)
    elem.click(this._click);
    $("#skyspark-tweaks-buttons").append(elem);
  }
  
  _click() {
    var visible = getOption("settingsVisible");
    setOption("settingsVisible", !visible);
    if(visible == true){
      $("#skyspark-tweaks-settings").remove();
    }
  }
}