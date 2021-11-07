class Buttons {
  onStart() {
    $(".domkit-Box .ui-WsHeader").children().each((index, parent) => {
      if (parent.style.cssText == "height: 34px; padding: 5px 10px 5px 5px;") {
        $(parent).children().each((index, node) => {
          if (node.style.cssText == "padding: 3px 9px; float: right;") {
            var span = $('<span id="skyspark-tweaks-buttons" style="float: right;"></span>')
            $(node).after(span);
          }
        })
      }
    })
  }
}