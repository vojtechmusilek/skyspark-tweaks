class Settings {
  static buttonId = "skyspark-tweaks-button-editor-settings";
  
  onStart() {
    this._makeButton();


  }

  _makeButton() {
    let imgSrc = this._getImageSrc();

    let img = $("<img>")
      .addClass("ui-Icon")
      .height(16)
      .width(16)
      .attr("src", imgSrc);

    let btn = $("<div></div>")
      .attr("id", Settings.buttonId)
      .attr("tabindex", 0)
      .addClass("domkit-control")
      .addClass("domkit-control-button")
      .addClass("domkit-Button")
      .css("padding", "3px 9px")
      .css("float", "right")
      .append(img);
    
    btn.click(() => this._click());
    $("#skyspark-tweaks-buttons").append(btn);
  }

  _getImageSrc() {
    var imgSrc = "";
    $(".domkit-Box .ui-WsHeader").find("img").each((i, node) => {
      if ($(node).attr("src").includes("clone?")) {
        imgSrc = $(node).attr("src").replace("clone?", "command?");
      }
    });
    return imgSrc;
  }

  _click() {
    this._makeDialog();
  }

  _makeDialog() {
    $("body").append($(Settings.settingsDialog));

    this._configureDialogButtons();

    let editorColoring = this._makeDialogRow("Editor Coloring", "skyspark-tweaks-option-camel", "num");
    let editorFuncHis = this._makeDialogRow("Editor Func History", "skyspark-tweaks-option-history", "num");
    let editorFuncGroups = this._makeDialogRow("Editor Func Groups", "skyspark-tweaks-option-groups", "bool");
    let favApps = this._makeDialogRow("Fav Apps", "skyspark-tweaks-option-fav-apps", "str");
    let homeProjects = this._makeDialogRow("Faster Project Selector", "skyspark-tweaks-fast-proj-sel", "bool");
    //let xxx = this._makeDialogRow("", "", "");

    $(editorColoring).on("input", function() {
      var val = $(this).val();
      if (val == "") return;
      setOption("maxCamels", val);
    }).val(getOption("maxCamels"));

    $(editorFuncHis).on("input", function() {
      var val = $(this).val();
      if (val == "") return;
      setOption("maxHistory", val, true);
    }).val(getOption("maxHistory", true));

    $(editorFuncGroups).change(function() {
      var val = $(this).prop('checked');
      setOption("showGroups", val ? 1 : 0);
    }).prop('checked', getOption("showGroups") == 1);

    $(favApps).on("input", function() {
      var val = $(this).val();
      setOption("favApps", val, true);
    }).val(getOption("favApps", true));;

    $(homeProjects).change(function() {
      var val = $(this).prop('checked');
      setOption("fastHomeProjs", val ? 1 : 0, true);
    }).prop('checked', getOption("fastHomeProjs", true) == 1);
  }

  _configureDialogButtons() {
    $("#skyspark-tweaks-settings").on('click', function(e) {
      if (e.target !== this) return;
      $("#skyspark-tweaks-settings").css("opacity", 0);
      setTimeout(() => {
        $("#skyspark-tweaks-settings").remove();
      }, 100);
    });
    
    $("#skyspark-tweaks-settings-ok").click(function() {
      
      $("#skyspark-tweaks-settings").children().first().css("opacity", 0).css("transform", "scale(0)");
      
      setTimeout(() => {
        $("#skyspark-tweaks-settings").css("opacity", 0);
      }, 100);
      
      setTimeout(() => {
        $("#skyspark-tweaks-settings").remove();
      }, 100);
    });

    setTimeout(() => {
      $("#skyspark-tweaks-settings").css("opacity", 1);
    }, 100);

    setTimeout(() => {
      $("#skyspark-tweaks-settings").children().first().css("opacity", 1).css("transform", "scale(1)");
    }, 100);
  }

  _makeDialogRow(dis, id, type) {
    let row = ""
    if(type == "num") row = Settings.settingsDialogNum;
    if(type == "bool") row = Settings.settingsDialogCheckbox;
    if(type == "str") row = Settings.settingsDialogText;

    row = row
      .replace("%dis%", dis)
      .replace("%id%", id);

    let elem = $(row);
    
    $("#skyspark-tweaks-dialog-rows").append(elem);
    
    return $("#" + id);
  }

  static settingsDialogNum = `
<tr>
  <td style="padding: 4px; white-space: nowrap;"><span
      class="domkit-control domkit-Label domkit-noselect popup"
      style="cursor: default; user-select: none;">%dis%</span></td>
  <td style="padding: 4px; width: 100px;">
    <div class="ui-Input"><input id="%id%" type="number" min="0" class="domkit-control domkit-control-text domkit-TextField"
        style="width: 100%;"></div>
  </td>
</tr>
  `

  static settingsDialogCheckbox = `
<tr>
  <td style="padding: 4px; white-space: nowrap;"><span
      class="domkit-control domkit-Label domkit-noselect popup"
      style="cursor: default; user-select: none;">%dis%</span></td>
  <td style="padding: 4px; width: 100px;"><input id="%id%" type="checkbox" class="domkit-Checkbox"
      style="display: inline-block;"></td>
</tr>
  `
  
  static settingsDialogText = `
<tr>
  <td style="padding: 4px; white-space: nowrap;"><span
      class="domkit-control domkit-Label domkit-noselect popup"
      style="cursor: default; user-select: none;">%dis%</span></td>
  <td style="padding: 4px; width: 300px;">
    <div class="ui-Input"><input id="%id%" placeholder="Builder,Historian" type="text" class="domkit-control domkit-control-text domkit-TextField"
        style="width: 100%;"></div>
  </td>
</tr>
  `


  static settingsDialog = `
<div id="skyspark-tweaks-settings" tabindex="0" class="domkit-Dialog-mask"
  style="opacity: 0; transition-duration: 100ms; transition-property: opacity;">
  <div class="domkit-Dialog-frame"
    style="transform: scale(0); opacity: 0; transition-duration: 100ms; transition-property: -webkit-transform, opacity;">
    <div class="domkit-Dialog-title"><span class="domkit-control domkit-Label def-label">SkySpark Tweaks Settings</span>
    </div>
    <div class="domkit-Box domkit-Dialog" tabindex="0">
      <div class="domkit-Box domkit-SashBox" style="width: auto;">
        <div class="domkit-Box domkit-GridBox"
          style="padding: 6px; max-height: 998px; overflow: auto; display: block; float: none; width: 100%; height: auto;">
          <table>
            <tbody id="skyspark-tweaks-dialog-rows">
            </tbody>
          </table>
        </div>
        <div class="domkit-Box domkit-FlexBox ui-ContentDialog-buttons"
          style="padding: 10px; place-content: stretch flex-start; align-items: center; flex-flow: row nowrap; display: flex; float: none; width: 100%; height: auto;">
          <div class="domkit-Box domkit-FlowBox" style="text-align: right;flex: 1 0 auto;width: auto;">
            <div id="skyspark-tweaks-settings-ok" class="domkit-control domkit-control-button domkit-Button def-action" tabindex="0" style="min-width: 60px; margin-right: 4px;">Ok</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
}