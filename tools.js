function doOverlap(domRect1, domRect2, margin = 2) {
  var l1 = {
    x: domRect1.x - margin,
    y: domRect1.y + domRect1.height
  };
  var r1 = {
    x: domRect1.x + domRect1.width + margin,
    y: domRect1.y + domRect1.height - domRect1.height
  };
  var l2 = {
    x: domRect2.x - margin,
    y: domRect2.y + domRect2.height
  };
  var r2 = {
    x: domRect2.x + domRect2.width + margin,
    y: domRect2.y + domRect2.height - domRect2.height
  };
  if (l1.x == r1.x || l1.y == r1.y || l2.x == r2.x || l2.y == r2.y ||
    l1.x >= r2.x || l2.x >= r1.x || r1.y >= l2.y || r2.y >= l1.y) return false;
  return true;
}

function getOption(type, global = false) {
  var key = window.location.pathname.replace("/ui/", "skysparkTweaks.") + "." + type;
  if (global) key = "skysparkTweaks." + type;
  
  var val = localStorage.getItem(key);
  if (val == null) {
    if (type == "maxCamels") {
      setOption(type, 1, global);
    } else if (type == "maxHistory") {
      setOption(type, 3, global);
    } else if (type == "showGroups") {
      setOption(type, 1, global);
    } else {
      setOption(type, "", global);
    }
    return getOption(type);
  }
  if (type == "maxHistory" || type == "maxCamels" || type == "showGroups") return parseInt(val);
  return val;
}

function setOption(type, val, global = false) {
  if (val < 0) return;
  
  var key = window.location.pathname.replace("/ui/", "skysparkTweaks.") + "." + type;
  if (global) key = "skysparkTweaks." + type;
  
  localStorage.setItem(key, val);
  
  if (type == "maxCamels") {
    EditorFuncColors.removeColors();
    EditorFuncColors.removeGroups();
  } else if (type == "maxHistory") {
    var history = $(".skyspark-tweaks-func-history")
    for (let index = 0; index < history.length; index++) {
      if (index >= val) {
        history[index].remove();
      }
    }
  } else if (type == "showGroups") {
    val == 0 ? EditorFuncColors.removeGroups() : EditorFuncColors.addGroups();
  } else if (type == "favApps") {
    HomeFavApps.reset();
  }
}

function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  style.classList.add("skyspark-tweaks-style");
  document.head.append(style);
}

function camelSplit(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ');
}

function camelSplitMax(str, maxCamels) {
  var strCamelSplit = camelSplit(str);
  var text = ""
  
  for (var i = 0; i < Math.min(strCamelSplit.length, maxCamels); i++) {
    text = text + strCamelSplit[i];
  }
  
  return text;
}

function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] == "_") continue;
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  color = normalizeColorBrightness(color);
  
  return color;
}


function stringToColorFromList(str, level) {
  list = [
    "#3498db",
    "#e74c3c",
    "#27ae60",
    "#9b59b6",
    "#f39c12",
    "#16a085",
    "#2980b9",
    "#c0392b",
    "#e67e22"
  ];
  
  if (EditorFuncColors.colorIndex[level] === undefined) {
    EditorFuncColors.colorIndex[level] = 0;
  }
  
  if (EditorFuncColors.colorDict[level] !== undefined && EditorFuncColors.colorDict[level][str] !== undefined) {
    return EditorFuncColors.colorDict[level][str];
  }
  
  if (EditorFuncColors.colorIndex[level] > list.length - 1) EditorFuncColors.colorIndex[level] = 0;
  const color = list[EditorFuncColors.colorIndex[level]++];
  
  if (EditorFuncColors.colorDict[level] === undefined) {
    EditorFuncColors.colorDict[level] = {};
  }
  
  EditorFuncColors.colorDict[level][str] = color;
  return color;
}

function stringToColorFromList2(str) {
  list = [
    "#3498db",
    "#e74c3c",
    "#27ae60",
    "#9b59b6",
    "#f39c12",
    "#16a085",
    "#2980b9",
    "#c0392b",
    "#e67e22"
  ];
  
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] == "_") continue;
    //hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash += Math.pow(str.charCodeAt(i), 3);
  }
  
  hash = Math.abs(hash);
  
  while (hash > 1) {
    hash /= 2;
  }
  
  var scaled = getScaledValue(hash, 0, 1, 0, list.length);
  
  return list[Math.round(scaled)];
}

function normalizeColorBrightness(color) {
  var brightness = getColorBrightness(color);
  var brightnessLimit = 255 + -60;
  var target = brightnessLimit / 765;
  var move = ((brightness / 765) - target) * (-100);
  color = shadeColor(color, move);
  
  return color;
}

function getColorBrightness(color) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);
  
  R = parseInt(R);
  G = parseInt(G);
  B = parseInt(B);
  
  return R + G + B;
}

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);
  
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  
  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;
  
  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
  
  return "#" + RR + GG + BB;
}

function stLog(message) {
  console.log("[Skyspark Tweaks]: " + message)
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function getScaledValue(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
  var targetRange = targetRangeMax - targetRangeMin;
  var sourceRange = sourceRangeMax - sourceRangeMin;
  return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
}

function elemExists(elem) {
  return document.documentElement.contains(elem)
}