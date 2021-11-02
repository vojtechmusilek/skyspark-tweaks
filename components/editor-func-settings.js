class EditorFuncSettings {
  onChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      var cl = $(node).parent().parent().attr('class');
      if(cl != "domkit-Box") return;
      
      this._addSettings(node);
    })
  }
  
  _addSettings(parent) {
    var alreadyCreated = $("#skyspark-tweaks-camel-current").length > 0;
    if (alreadyCreated) return;
    if (getOption("settingsVisible") == 0) return;
    
    // rewrite this using jquery?
    var classes = "domkit-control domkit-Label";
    var classesIn = "domkit-control domkit-control-button domkit-Button";

    var style = "color: #555; width: 100%; display: block; overflow: hidden; " +
      "background: #fff; border: 1px solid #bbb; margin-top: 4px; padding: 0px; height: 50px;";

    var plusMinusStyle = "width: 16.65%; border: none; font-weight: 500; border-left: 1px dashed #ddd; border-radius: 0px; text-align: center; padding-left: 0px; padding-right: 0px;"

    var elementCamelCurrent = `<span id="skyspark-tweaks-camel-current" class="${classes}" style="width: 16.7%; border: none; font-weight: 500; text-align: center;">${getOption("maxCamels")}</span>`;
    var elementCamelPlus = `<span id="skyspark-tweaks-camel-plus" class="${classesIn}" style="${plusMinusStyle}">+</span>`;
    var elementCamelMinus = `<span id="skyspark-tweaks-camel-minus" class="${classesIn}" style="${plusMinusStyle}">-</span>`;

    var elementHistoryCurrent = `<span id="skyspark-tweaks-history-current" class="${classes}" style="width: 16.7%; border-left: 1px solid #bbb; font-weight: 500; text-align: center;">${getOption("maxHistory")}</span>`;
    var elementHistoryPlus = `<span id="skyspark-tweaks-history-plus" class="${classesIn}" style="${plusMinusStyle}">+</span>`;
    var elementHistoryMinus = `<span id="skyspark-tweaks-history-minus" class="${classesIn}" style="${plusMinusStyle}">-</span>`;

    var inside = elementCamelCurrent + elementCamelPlus + elementCamelMinus + elementHistoryCurrent + elementHistoryPlus + elementHistoryMinus;
    
    var labelLeft = `<span class="${classes}" style="width: 50%; border: none; border-bottom: 1px solid #bbb; font-weight: 500; text-align: center;">Colors</span>`;
    var labelRight = `<span class="${classes}" style="width: 50%; border: none; border-bottom: 1px solid #bbb; border-left: 1px solid #bbb; font-weight: 500; text-align: center;">History</span>`;
    
    $(parent).parent().children().last().after(`<span id="skyspark-tweaks-settings" class="${classes}" style="${style}">${labelLeft + labelRight}<br>${inside}</span>`);
    
    $("#skyspark-tweaks-camel-plus").click(function () { setOption("maxCamels", getOption("maxCamels") + 1); });
    $("#skyspark-tweaks-camel-minus").click(function () { setOption("maxCamels", getOption("maxCamels") - 1); });
    $("#skyspark-tweaks-history-plus").click(function () { setOption("maxHistory", getOption("maxHistory") + 1); });
    $("#skyspark-tweaks-history-minus").click(function () { setOption("maxHistory", getOption("maxHistory") - 1); });

  }
}