function main(){
  projs = document.getElementsByClassName("proj");
  
  for (let i = 0; i < projs.length; i++) {
    const element = projs[i];
    console.log(element);
  }
  

  console.log(projs);
  
  /*.forEach(element => {
    element.style.backgroundColor = "red";
  });*/
}


try {
  main();
}
catch (e){
  console.error(e);
}

