class EditorFuncHistory {
  onHrefChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      this._addSettings(node);
      this._addCurrentFunc(node, node.children);
    })
  }

  _addCurrentFunc(parent, nodes) {
    var maxHistory = getOption("maxHistory") - 1;

    for (var node of nodes) {
      if ($(node).css("background").includes("rgb(214, 234, 255)")) {
        var spanElem = $(node).find("span").get(0);
        var funcName = $(spanElem).text();

        var history = $(parent).parent().children(".skyspark-tweaks-func-history");
        if (history.length > 0 && $(history[0]).text() == funcName) break;
        if (history.length > maxHistory) {

          for (let index = maxHistory; index < history.length; index++) {
            history[index].remove();
          }

          //history[maxHistory].remove();

        }

        var classes = "domkit-control domkit-Label skyspark-tweaks-func-history";
        var style = "color: #555; width: 100%; display: block; overflow: hidden; " +
          "background: #fff; border: 1px solid #bbb; user-select: all; padding: 4px 4px; border-top-style: hidden;";

        $(parent).after(`<span class="${classes}" style="${style}">${funcName}</span>`);

        break;
      }
    }
  }
  
  // todo - move this to editor-func-settings.js
  _addSettings(parent) {
    var alreadyCreated = $("#skyspark-tweaks-camel-current").length > 0;
    if (alreadyCreated) return;

    var classes = "domkit-control domkit-Label";
    var classesIn = "domkit-control domkit-control-button domkit-Button";

    var style = "color: #555; width: 100%; display: block; overflow: hidden; " +
      "background: #fff; border: 1px solid #bbb; margin-top: 4px; padding: 0px; height: 26px;";

    var plusMinusStyle = "width: 15%; border: none; font-weight: 500; border-left: 1px dashed #ddd; border-radius: 0px; text-align: center; padding-left: 0px; padding-right: 0px;"

    var elementCamelCurrent = `<span id="skyspark-tweaks-camel-current" class="${classes}" style="width: 20%; border: none; font-weight: 500; text-align: center;">${getOption("maxCamels")}</span>`;
    var elementCamelPlus = `<span id="skyspark-tweaks-camel-plus" class="${classesIn}" style="${plusMinusStyle}">+</span>`;
    var elementCamelMinus = `<span id="skyspark-tweaks-camel-minus" class="${classesIn}" style="${plusMinusStyle}">-</span>`;

    var elementHistoryCurrent = `<span id="skyspark-tweaks-history-current" class="${classes}" style="width: 20%; border-left: 1px solid #bbb; font-weight: 500; text-align: center;">${getOption("maxHistory")}</span>`;
    var elementHistoryPlus = `<span id="skyspark-tweaks-history-plus" class="${classesIn}" style="${plusMinusStyle}">+</span>`;
    var elementHistoryMinus = `<span id="skyspark-tweaks-history-minus" class="${classesIn}" style="${plusMinusStyle}">-</span>`;

    var inside = elementCamelCurrent + elementCamelPlus + elementCamelMinus + elementHistoryCurrent + elementHistoryPlus + elementHistoryMinus;
    
    $(parent).after(`<span id="skyspark-tweaks-options" class="${classes}" style="${style}">${inside}</span>`);
    
    $("#skyspark-tweaks-camel-plus").click(function () { setOption("maxCamels", getOption("maxCamels") + 1); });
    $("#skyspark-tweaks-camel-minus").click(function () { setOption("maxCamels", getOption("maxCamels") - 1); });
    $("#skyspark-tweaks-history-plus").click(function () { setOption("maxHistory", getOption("maxHistory") + 1); });
    $("#skyspark-tweaks-history-minus").click(function () { setOption("maxHistory", getOption("maxHistory") - 1); });

  }
}