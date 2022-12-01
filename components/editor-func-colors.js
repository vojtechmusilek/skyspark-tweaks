class EditorFuncColors {
  onChange() {
    $(".domkit-Box .dom-style-autogen-0").each((index, node) => {
      var cl = $(node).parent().parent().attr('class');
      if (cl != "domkit-Box") return;
      if ($(node).hasClass("ui-WsViewMenu-faux")) return;
      
      if (getOption("maxHistory") == 0) {
        $(node).css("border-bottom", "1px solid #ccc")
      } else {
        $(node).css("border-bottom", "3px solid #ccc")
      }
      
      var colorizedClassName = "skyspark-tweaks-colorized";
      
      if (node.children.length > 0) {
        if (localStorage.getItem("skysparkTweaks.experimental") == "yes") {
          this._applyColorsSmart(node.children, colorizedClassName);
        } else {
          this._applyColors(node.children, colorizedClassName);
        }
      }
    })
  }
  
  static colorIndex = {};
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
      camels.push({ parts, elem: spanElem });
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
      
      //var color = "";
      var camelkeep = 1;
      
      // todo - try start at lvl 1 - merge colors at lvl 2 with lvl 1, merge colors of lvl 3 with lvl2
      for (const value of values) {
        var lio = remain.lastIndexOf(value.lastPart);
        
        var left = remain.substring(0, lio);
        var center = remain.substring(lio, lio + value.lastPart.length);
        var right = remain.substring(lio + value.lastPart.length, remain.length);
        
        //if (color == "" || value.partIndex <= camelkeep) {
        // var 1
        var colorKey = center.toLowerCase();
        var color = stringToColor(colorKey);
        // var 2
        //color = stringToColorFromList(value.concat, value.partIndex); //Math.min(value.partIndex, camelkeep + 1));
        //color = stringToColorFromList2(center);
        //}
        
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
      
      // if camels set to 2 and only camel 1 if found, this will color it as camel 1
      // todo - settings for this?
      var curCamels = maxCamels - 1;
      while (funcNameCamelSplitMax == funcName && curCamels > 0) {
        funcNameCamelSplitMax = camelSplitMax(funcName, curCamels);
        curCamels -= 1;
      }

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