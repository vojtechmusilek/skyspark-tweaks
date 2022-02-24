class EditorFuncColors {
  onChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      var cl = $(node).parent().parent().attr('class');
      if (cl != "domkit-Box") return;
      
      if (getOption("maxHistory") == 0) {
        $(node).css("border-bottom", "1px solid #ccc")
      } else {
        $(node).css("border-bottom", "3px solid #ccc")
      }
      
      var colorizedClassName = "skyspark-tweaks-colorized";
      
      if (node.children.length > 0) {
        //this._applyColorsSmart(node.children, colorizedClassName);
        this._applyColors(node.children, colorizedClassName);
      }
    })
  }
  
  static colorIndex = 0;
  static colorDict = {};

  _applyColorsSmart(nodes, colorizedClassName) {
    var maxCamels = getOption("maxCamels");
    var lastColor = null;
    
    var breaked = false;
    var camels = [];
    var camelsMaxParts = 0;
    
    for (var node of nodes) {
      var spanElem = $(node).find("span").get(0);
      if (spanElem.classList.contains(colorizedClassName)) {
        breaked = true;
        break;
      }
      var funcName = spanElem.innerHTML;
      var parts = camelSplit(funcName);
      camelsMaxParts = Math.max(camelsMaxParts, parts.length);
      camels.push({parts, elem: spanElem});
    }
    if (breaked) return;
    
    var concats = [];
    
    var partIndex = camelsMaxParts - 1;
    while (partIndex > 0) {
      for (var camel of camels) {
        var currentIndex = 0;
        var concat = "";
        
        while (currentIndex < partIndex) {
          if (currentIndex >= camel.parts.length || camel.parts.length < partIndex) break;
          concat += camel.parts[currentIndex];
          currentIndex++
        }
        
        if (concat !== "") {
          concats.push({
            partIndex,
            concat,
            lastPart: camel.parts[currentIndex - 1],
            elem: camel.elem
          });
        }
      }
      partIndex--;
    }
    
    var grouped = groupBy(concats, x => x.partIndex + x.concat);
    var filtered = new Map([...grouped].filter(([k, v]) => v.length > 1));
    var filteredVals = Array.from(filtered.values()).flat();
    var groupedElems = groupBy(filteredVals, x => x.elem);

    for (const [key, values] of groupedElems.entries()) {
      var innerText = key.innerText;
      var remain = innerText;

      var res = "";

      for (const value of values) {
        var lio = remain.lastIndexOf(value.lastPart);
        
        var left = remain.substring(0, lio);
        var center = remain.substring(lio, lio + value.lastPart.length);
        var right = remain.substring(lio + value.lastPart.length, remain.length);

        // var 1
        //var color = stringToColor(center);
        // var 2
        var color = stringToColorFromList(center);

        var style = "color:" + color + "; font-weight:500;"
        var html = '<span style="' + style + '">' + center + '</span>';

        res = html + res;
        remain = left + right;
      }
      res += remain;
      
      key.classList.add(colorizedClassName);
      key.innerHTML = res;
    }
  }
  
  _applyColors(nodes, colorizedClassName) {
    var maxCamels = getOption("maxCamels");
    var lastColor = null;
    
    for (var node of nodes) {
      var spanElem = $(node).find("span").get(0);
      if (spanElem.classList.contains(colorizedClassName)) break;
      
      var funcName = spanElem.innerHTML;
      var funcNameCamelSplitMax = camelSplitMax(funcName, maxCamels);
      
      // todo - toto bude nastavitelne
      if (funcNameCamelSplitMax == funcName) funcNameCamelSplitMax = "";
      
      var color = stringToColor(funcNameCamelSplitMax);
      var style = "color:" + color + "; font-weight:500;"
      var funcNamePartColorized = funcName.substring(0, funcNameCamelSplitMax.length);
      var funcNamePartNormal = funcName.substring(funcNameCamelSplitMax.length);
      
      if (getOption("showGroups") == 1 && lastColor != null && lastColor != color) {
        $(node).css("border-top", "1px dashed #e3e3e3").css("padding-top", "2px");
      }
      
      spanElem.classList.add(colorizedClassName);
      spanElem.innerHTML = '<span style="' + style + '">' + funcNamePartColorized + '</span>' + funcNamePartNormal;
      
      lastColor = color;
    }
  }
  
  static removeColors() {
    $(".skyspark-tweaks-colorized").each((i, node) => {
      node.innerHTML = $(node).text();
      $(node).removeClass("skyspark-tweaks-colorized");
    })
  }
  
  static removeGroups() {
    $(".domkit-Box .dom-style-autogen-0").children().css("border-top", "").css("padding-top", "3px");
  }
  
  static addGroups() {
    EditorFuncColors.removeColors();
  }
}