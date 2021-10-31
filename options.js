//alert(11);

$("#btn").click(xxx)


function xxx(){
  
  
  
  //console.log(window);
  //console.log(sessionStorage.getItem(window.location.hash.replace("#", "")));
  
  res = "{left:{view:\"codeEditor\" state:{uri:`id:p:jednorazoveAnalyzy:r:290c9605-4bc6841b`}} right:N}";
  
  sessionStorage.setItem(window.location.hash.replace("#", ""), res);
  window.location.href = window.location.href
  
}