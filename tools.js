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
  var brightnessLimit = 255

  if (brightness > brightnessLimit) {
    var target = brightnessLimit / 765
    var decrease = ((brightness / 765) - target) * (-100)
    color = shadeColor(color, decrease)
  }

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