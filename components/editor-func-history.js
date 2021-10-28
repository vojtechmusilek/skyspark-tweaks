class EditorFuncHistory {
  onHrefChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      this._setCurrentFunc(node, node.children);
    })
  }
  
  // todo - not working with multiple editors
  //  because selecting by ID
  //  also add history
  
  _setCurrentFunc(parent, nodes) {
    for (var node of nodes) {
      if ($(node).css("background").includes("rgb(214, 234, 255)")) {
        var spanElem = $(node).find("span").get(0);
        var funcName = $(spanElem).text();
        
        if ($('#skyspark-tweaks-func-name').length == 1) {
          $('#skyspark-tweaks-func-name').get(0).innerHTML = funcName;
        }
        else {
          var id = "skyspark-tweaks-func-name"
          var classes = "domkit-control domkit-Label"
          var style = "color: #555; width: 100%; display: block; overflow: hidden; " +
            "background: #fff; border: 1px solid #bbb; user-select: all; padding: 4px 4px; border-top-style: hidden;"

          $(parent).after(`<span id="${id}" class="${classes}" style="${style}">${funcName}</span>`)
        }
        break;
      }
    }
  }
}