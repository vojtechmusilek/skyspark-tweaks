var key = "skysparkTweaks.customCss";

window.onload = function () {
  $("#save").click(save)
  
  var css = localStorage.getItem(key);
  if(css == null) {
    css = ".cm-property { color: #cf7900; }";
    localStorage.setItem(key, css);
  }
  
  $("#css").val(css);
}

function save(){
  
  console.log({
    key: key,
    val: $("#css").val()
  });
  
  localStorage.setItem(key, $("#css").val());
  alert("Set!");
}