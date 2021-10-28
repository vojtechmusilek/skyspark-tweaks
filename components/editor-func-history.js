class EditorFuncHistory {
  onHrefChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      this._setCurrentFunc(node, node.children);
    })
  }

  _setCurrentFunc(parent, nodes) {
    for (var node of nodes) {
      if ($(node).css("background").includes("rgb(214, 234, 255)")) {
        var spanElem = $(node).find("span").get(0);
        var funcName = $(spanElem).text();

        var history = $(parent).parent().children(".skyspark-tweaks-func-history");
        if (history.length > 0 && $(history[0]).text() == funcName) break;
        if (history.length > 4) history[4].remove();

        var classes = "domkit-control domkit-Label skyspark-tweaks-func-history";
        var style = "color: #555; width: 100%; display: block; overflow: hidden; " +
          "background: #fff; border: 1px solid #bbb; user-select: all; padding: 4px 4px; border-top-style: hidden;";

        $(parent).after(`<span class="${classes}" style="${style}">${funcName}</span>`);

        break;
      }
    }
  }
}