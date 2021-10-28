//  main timer
//setTimeout(runjs, 1000);
setInterval(runjs, 1000);

function getViewName(){
  classStr = 'domkit-control domkit-control-button domkit-Button domkit-ToggleButton tab selected down sel'
  return document.getElementsByClassName(classStr)[0].innerHTML
}

document.body.addEventListener('click', console.log("now"), true);



maxCamels = initializeMaxCamels();
lastHoverFunc = "";

function initializeMaxCamels(){
  if(window.localStorage.getItem("maxCamels") == null){
    window.localStorage.setItem("maxCamels", 2)
  } 
  return Number(window.localStorage.getItem("maxCamels"));
}

function runjs(){
  maxCamels = initializeMaxCamels();
  
  elemsFunctionsBox = document.getElementsByClassName('domkit-Box dom-style-autogen-0');
  if(elemsFunctionsBox.length == 0 || getViewName() != "Editor"){
    console.log("Editor not opened");
    return;
  }
  elemsObarveno = document.getElementsByClassName('obarveno').length;
  
  selectedFunc = "";
  hoverFunc = lastHoverFunc;
  
  // obarvit all function names
  children = elemsFunctionsBox[0].children
  for (var i = 0; i < children.length; i++) {
    tableChild = children[i]
    
    //Hover/select funkce
    if(tableChild.style.background != "") {
      if(tableChild.style.background.includes("214")) {
        selectedFunc = tableChild.children[0].children[1].innerHTML;
      }
      if(tableChild.style.background.includes("238")) {
        hoverFunc = tableChild.children[0].children[1].innerHTML;
      }
    }
    
    
    funcSpanElem = tableChild.children[0].children[1]
    funcName = funcSpanElem.innerHTML
    funcNameCamelSplit = funcName.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ')
    
    funcNameCamel = getCamels(funcNameCamelSplit, maxCamels)
    
    funcColor = stringToColour(funcNameCamel)
    funcColor = normalizeColorBrightness(funcColor)
    
    // obarvuju jen kdyz neni obarveno
    if(elemsObarveno == 0){
      hoverFunc = "";
      //obarveni
      funcSpanElem.innerHTML = '<span class="obarveno" style="color:'+funcColor+'; font-weight:500">' 
      + funcName.substring(0, funcNameCamel.length) 
      + '</span>' + funcName.substring(funcNameCamel.length);
      
    }
  }
  
  updateFuncNameElem("selectedFunctionBox", selectedFunc, "12px", "Selected:");
  updateFuncNameElem("hoverFunctionBox", hoverFunc, "12px", "Hover:");
  
  lastHoverFunc = hoverFunc;
}

function updateFuncNameElem(idcko, text, marginL, label){
  funkceNazevElem = document.getElementById(idcko)
  if(funkceNazevElem != null){
    //element existuje
    if(funkceNazevElem.innerHTML != text){
      funkceNazevElem.innerHTML = text;
    }
  }
  else{
    //vytvorit element
    createFuncNameElem(idcko, document.body.children[0].children[1].children[0].children[0].children[0].children[0], text, marginL, label);
  }
}

function createFuncNameElem(idcko, parent, text, marginL, label){
  elem = document.createElement("span");
  elem.id = idcko;
  elem.classList.add("domkit-control");
  elem.classList.add("domkit-control-button");
  elem.classList.add("domkit-Button");
  elem.innerHTML = text;
  elem.style.marginLeft = "4px";
  elem.style.color = "#555555";
  elem.style.userSelect = "all";
  parent.appendChild(elem);
  elem.outerHTML = '<span style="display: inline-block;margin-top: 4px;margin-left: '+marginL+';">'+label+'</span>' + elem.outerHTML
}

function getCamels(splitList, maxCamels){
  if(splitList.length < maxCamels){
    maxCamels = splitList.length;
  }
  
  text = ""
  
  for (var i = 0; i < maxCamels; i++) {
    text = text + splitList[i];
  }
  
  return text;  
}

function normalizeColorBrightness(color){
  brightness = getColorBrightness(color)
  brightnessLimit = 255
  colorTmp = color
  
  if(brightness > brightnessLimit){
    target = brightnessLimit / 765
    decrease = ((brightness / 765) - target) * (-100)
    colorTmp = shadeColor(funcColor, decrease)
  }
  return colorTmp
}

var stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

function getColorBrightness(color) {
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R);
    G = parseInt(G);
    B = parseInt(B);
    
    return R + G + B;
}

function shadeColor(color, percent) {
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}



