class ButtonEditorSettings {
  onStart() {
    var imgSrc = "";
    $(".domkit-Box .ui-WsHeader").find("img").each((i, node) => {
      if ($(node).attr("src").includes("clone?")) imgSrc = $(node).attr("src").replace("clone?", "command?");
    });
    
    var id = "skyspark-tweaks-button-editor-settings";
    var img = `<img class="ui-Icon" src="${imgSrc}" style="width: 16px; height: 16px;">`;
    var button = `<div id="${id}" class="domkit-control domkit-control-button domkit-Button" tabindex="0" style="padding: 3px 9px; float: right;">${img}</div>`;
    var elem = $(button)
    elem.click(this._click);
    $("#skyspark-tweaks-buttons").append(elem);
  }
  
  _click() {
    $("body").append($(ButtonEditorSettings._settingsDialog))
    
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
    
    $("#skyspark-tweaks-option-camel").on("input", function() {
      var val = $(this).val();
      if (val == "") return;
      setOption("maxCamels", val);
    });
    $("#skyspark-tweaks-option-history").on("input", function() {
      var val = $(this).val();
      if (val == "") return;
      setOption("maxHistory", val);
    });
    $("#skyspark-tweaks-option-groups").change(function() {
      var val = $(this).prop('checked');
      setOption("showGroups", val ? 1 : 0);
    });
    $("#skyspark-tweaks-option-fav-apps").on("input", function() {
      var val = $(this).val();
      setOption("favApps", val, true);
    });
    
    $("#skyspark-tweaks-option-camel").val(getOption("maxCamels"));
    $("#skyspark-tweaks-option-history").val(getOption("maxHistory"));
    $("#skyspark-tweaks-option-groups").prop('checked', getOption("showGroups") == 1);
    $("#skyspark-tweaks-option-fav-apps").val(getOption("favApps", true));
    
    setTimeout(() => {
      $("#skyspark-tweaks-settings").css("opacity", 1);
    }, 100);
    setTimeout(() => {
      $("#skyspark-tweaks-settings").children().first().css("opacity", 1).css("transform", "scale(1)");
    }, 100);
  }
  
  static _settingsDialog = `
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
            <tbody>
              <tr>
                <td style="padding: 4px; white-space: nowrap;"><span
                    class="domkit-control domkit-Label domkit-noselect popup"
                    style="cursor: default; user-select: none;">Editor Coloring</span></td>
                <td style="padding: 4px; width: 100px;">
                  <div class="ui-Input"><input id="skyspark-tweaks-option-camel" type="number" min="0" class="domkit-control domkit-control-text domkit-TextField"
                      style="width: 100%;"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 4px; white-space: nowrap;"><span
                    class="domkit-control domkit-Label domkit-noselect popup"
                    style="cursor: default; user-select: none;">Editor Func History</span></td>
                <td style="padding: 4px; width: 100px;">
                  <div class="ui-Input"><input id="skyspark-tweaks-option-history" type="number" min="0" class="domkit-control domkit-control-text domkit-TextField"
                      style="width: 100%;"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 4px; white-space: nowrap;"><span
                    class="domkit-control domkit-Label domkit-noselect popup"
                    style="cursor: default; user-select: none;">Editor Func Groups</span></td>
                <td style="padding: 4px; width: 100px;"><input id="skyspark-tweaks-option-groups" type="checkbox" class="domkit-Checkbox"
                    style="display: inline-block;"></td>
              </tr>
              <tr>
                <td style="padding: 4px; white-space: nowrap;"><span
                    class="domkit-control domkit-Label domkit-noselect popup"
                    style="cursor: default; user-select: none;">Fav Apps</span></td>
                <td style="padding: 4px; width: 300px;">
                  <div class="ui-Input"><input id="skyspark-tweaks-option-fav-apps" placeholder="Builder,Historian" type="text" class="domkit-control domkit-control-text domkit-TextField"
                      style="width: 100%;"></div>
                </td>
              </tr>
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