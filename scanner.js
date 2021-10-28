function scan(){
  console.log("scan");
  scanCodeEditor();
  
  
}

function scanCodeEditor(){
  $(".domkit-Box .dom-style-autogen-0").each((index, parent) => {
    modifyCodeEditorColors(parent.children);
    modifyCodeEditorSmoothTransitions(parent.children);
  })
}