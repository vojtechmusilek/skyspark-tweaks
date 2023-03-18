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

async function getSettingsValue(key, defaultValue) {
  const item = await chrome.storage.sync.get([key]);

  const val = item[key];
  if (val != null) return val;

  return defaultValue;
}

function getNodeHash(node) {
  const path = [];
  let currentNode = node;

  while (currentNode) {
    path.unshift(currentNode.nodeName + currentNode.id); // + currentNode.className
    currentNode = currentNode.parentNode || currentNode.host;
  }

  return new TextEncoder().encode(path).join('');
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

function getProjectName() {
  return window.location.pathname.replace("/ui/", "");
}

function debug() {
  return localStorage.getItem("skysparktweaksdebug") != null;
}