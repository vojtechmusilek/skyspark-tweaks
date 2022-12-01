class HomeFavApps {
  
  onChange() {
    $(".ui-AppPicker").each((i, node) => {
      
      if ($(node).attr("style") != undefined) {
        if ($(node).attr("style").includes("calc")) {
          return;
        }
      }
      
      var apps = $(node).children().first();
      var alreadyMoved = $(apps).hasClass("skyspark-tweaks-fav-apps")
      if (alreadyMoved) return;
      
      this._moveFavApps(apps);
    });
  }
  
  _moveFavApps(node) {
    var favApps = getOption("favApps", "").split(",");
    favApps = favApps.filter(x => x != "");
    if (favApps.length == 0) return;
    
    var allApps = $(node).find("td").detach();
    
    var width = 600;
    var isPopup = $(node).parents('.domkit-Popup').length >= 1;
    if (isPopup) width = 432;
    
    var line = `<div style="border-top: 1px solid rgb(217, 217, 217); margin: 4px 0px;"></div>`;
    var spacing = `<div class="skyspark-tweaks-fav-apps-spacing" style="width: ${width}px; margin: 0px auto; padding: 8px 0px 4px;">${line}</div>`
    $(node).parent().prepend(spacing);
    
    var favNode = $(node).clone();
    $(favNode).addClass("skyspark-tweaks-fav-apps");
    $(node).parent().prepend(favNode);
    
    var favNodes = {};
    var otherNodes = [];
    
    allApps.each((i, app) => {
      var appName = $(app).text();
      
      if (favApps.includes(appName)) {
        favNodes[appName] = app;
      } else {
        otherNodes.push(app);
      }
    })
    
    if (Object.keys(favNodes).length == 0) {
      var parent = $(node).parent();
      $(parent).find(".skyspark-tweaks-fav-apps-spacing").css("display", "none");
      $(parent).find(".skyspark-tweaks-fav-apps").css("display", "none");
    }
    
    $(favNode).find("tr").each((i, row) => {
      var slice = favApps.slice(0, 6);
      if (slice.length == 0) return;
      favApps = favApps.filter((t, i) => i >= 6);
      
      slice.forEach(element => {
        $(row).append(favNodes[element]);
      });
    });
    
    $(node).find("tr").each((i, row) => {
      var slice = otherNodes.slice(0, 6);
      if (slice.length == 0) return;
      otherNodes = otherNodes.filter((t, i) => i >= 6);
      
      slice.forEach(element => {
        $(row).append(element);
      });
    });
  }
  
  static reset() {
    $(".ui-AppPicker").each((i, node) => {
      var favs = $(node).find(".skyspark-tweaks-fav-apps");
      if (favs.length == 0) return;
      
      var favApps = $(favs).find("td").detach();
      
      $(node).find(".skyspark-tweaks-fav-apps-spacing").remove();
      $(node).find(".skyspark-tweaks-fav-apps").remove();
      
      $(node).children().first().append(favApps);
    });
  }
}