class EditorFuncHistory {
  onChange() {
    $(".domkit-Box .dom-style-autogen-0").each((_, node) => {
      let cl = $(node).parent().parent().attr('class');
      if (cl != "domkit-Box") return;
      
      this._addCurrentFunc(node, node.children);
    })
  }
  
  _addCurrentFunc(parent, nodes) {
    let maxHistory = getOptionNum("maxHistory", 3);
    if (maxHistory == 0) return;
    
    for (let node of nodes) {
      if ($(node).css("background").includes("rgb(214, 234, 255)")) {
        let spanElem = $(node).find("span").get(0);
        let funcHtml = $(spanElem).html();
        let funcName = $(spanElem).text();

        this._clearDuplicate(funcName);

        let history = $(parent).parent().children(".skyspark-tweaks-func-history");
        if (history.length > 0 && $(history[0]).html() == funcHtml) break;
        if (history.length > maxHistory - 1) {
          for (let index = maxHistory - 1; index < history.length; index++) {
            history[index].remove();
          }
        }
        
        let classes = "domkit-control domkit-Label skyspark-tweaks-func-history";
        let style = "color: #555; width: 100%; display: block; overflow: hidden; " +
          "background: #fff; border: 1px solid #bbb; user-select: all; padding: 4px 4px; border-top-style: hidden;";
        
        $(parent).after(`<span class="${classes}" style="${style}">${funcHtml}</span>`);
        
        break;
      }
    }
  }

  _clearDuplicate(name) {
    let itemsInHistory = $(".skyspark-tweaks-func-history").slice(1);
    
    for (let node of itemsInHistory) {
      if ($(node).text() == name) {
        $(node).detach();
      }
    }
  }
}