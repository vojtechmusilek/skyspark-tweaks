function getOption(type) {
  var key = window.location.pathname.replace("/ui/", "skysparkTweaks.") + "." + type;
  var val = localStorage.getItem(key);
  if (val == null) {
    if (type == "maxCamels") {
      setOption(type, 1);
    }
    else if (type == "maxHistory") {
      setOption(type, 3);
    }
    else if (type == "showGroups") {
      setOption(type, 1);
    }
    else {
      setOption(type, "undefined");
    }
    return getOption(type);
  }
  if (type == "maxHistory" || type == "maxCamels" || type == "showGroups") return parseInt(val);
  return val;
}

function setOption(type, val) {
  if(val < 0) return;
  
  var key = window.location.pathname.replace("/ui/", "skysparkTweaks.") + "." + type;
  localStorage.setItem(key, val);

  if (type == "maxCamels") {
    EditorFuncColors.removeColors();
  }
  else if (type == "maxHistory") {
    var history = $(".skyspark-tweaks-func-history")
    for (let index = 0; index < history.length; index++) {
      if (index >= val) {
        history[index].remove();
      }
    }
  }
  else if (type == "showGroups") {
    val == 0 ? EditorFuncColors.removeGroups() : EditorFuncColors.addGroups();
  }
}

function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  style.classList.add("skyspark-tweaks-style");
  document.head.append(style);
}

function camelSplitMax(str, maxCamels) {
  var strCamelSplit = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ');
  var text = ""

  for (var i = 0; i < Math.min(strCamelSplit.length, maxCamels); i++) {
    text = text + strCamelSplit[i];
  }

  return text;
}

function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
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

function normalizeColorBrightness(color) {
  var brightness = getColorBrightness(color)
  var brightnessLimit = 255 + 30
  var target = brightnessLimit / 765
  var move = ((brightness / 765) - target) * (-100)
  color = shadeColor(color, move)

  return color
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