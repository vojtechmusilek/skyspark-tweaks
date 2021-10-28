function modifyCodeEditorColors(nodes) {
  if (nodes.lenght == 0) return;

  var maxCamels = 2;
  var colorizedClassName = "skyspark-tweaks-colorized";

  for (var node of nodes) {
    var spanElem = $(node).find("span").get(0);
    if (spanElem.classList.contains(colorizedClassName)) continue;

    var funcName = spanElem.innerHTML;
    var funcNameCamelSplitMax = camelSplitMax(funcName, maxCamels);

    var color = stringToColor(funcNameCamelSplitMax);
    var style = "color:" + color + "; font-weight:500;"
    var funcNamePartColorized = funcName.substring(0, funcNameCamelSplitMax.length);
    var funcNamePartNormal = funcName.substring(funcNameCamelSplitMax.length);



    spanElem.classList.add(colorizedClassName);
    spanElem.innerHTML = '<span style="' + style + '">' + funcNamePartColorized + '</span>' + funcNamePartNormal;
  }




}

function modifyCodeEditorCurrentFunc() {
  // todo - add this after search input (if not there yet) and update with current func name
  /*
  <span id="mything" class="domkit-control domkit-Label" style="
    color: #555;
    margin-bottom: 8px;
    width: 100%;
    display: block;
  ">newFuncnewFuncnewFuncnewFuncnewFuncnewFunc</span>
  */
}

function modifyCodeEditorSmoothTransitions(nodes) {
  if (nodes.lenght == 0) return;
  for (var node of nodes) {
    if (!node.classList.contains("skyspark-tweaks-smooth-transition")) {
      node.classList.add("skyspark-tweaks-smooth-transition")
    }
  }
}