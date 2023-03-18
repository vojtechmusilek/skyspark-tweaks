class HomeFavApps {
  constructor() {
    Observer.observeOnce("div.ui-AppPicker", this.update.bind(this));
  }

  class_FavApps = "skyspark-tweaks-fav-apps";
  class_FavAppsSpacing = this.class_FavApps + "-spacing";

  update(target) {
    const nodeStyle = $(target).attr("style");
    if (nodeStyle && nodeStyle.includes("calc")) {
      return;
    }

    var apps = $(target).children().first();
    var alreadyMoved = $(apps).hasClass(this.class_FavApps);
    if (alreadyMoved) return;

    this.moveFavApps(apps);
  }

  async moveFavApps(node) {
    const favAppsStr = await getSettingsValue("HomeFavApps_appList", "");
    let favApps = favAppsStr.split(",").filter(x => x != "");
    if (favApps.length == 0) return;

    const allApps = $(node).find("td").detach();

    let width = 600;
    const isPopup = $(node).parents(".domkit-Popup").length >= 1;
    if (isPopup) width = 432;

    const line = $("<div>").css({
      borderTop: "1px solid rgb(217, 217, 217)",
      margin: "4px 0px"
    });
    const spacing = $("<div>").addClass(this.class_FavAppsSpacing).css({
      width: `${width}px`,
      margin: "0px auto",
      padding: "8px 0px 4px"
    }).append(line);

    $(node).parent().prepend(spacing);

    const favNode = $(node).clone().addClass(this.class_FavApps);
    $(node).parent().prepend(favNode);

    const favNodes = {};
    let otherNodes = [];

    const allAppNames = allApps.get().map(x => $(x).text());
    favApps = favApps.filter(element => allAppNames.includes(element));

    for (const app of allApps) {
      const appName = $(app).text();
      if (favApps.includes(appName)) {
        favNodes[appName] = app;
      } else {
        otherNodes.push(app);
      }
    }

    if (Object.keys(favNodes).length == 0) {
      const parent = $(node).parent();
      parent.find("." + this.class_FavAppsSpacing).hide();
      parent.find("." + this.class_FavApps).hide();
    }

    favNode.find("tr").each((i, row) => {
      const slice = favApps.slice(0, 6);
      if (slice.length == 0) return;
      favApps = favApps.filter((t, i) => i >= 6);

      slice.forEach(element => {
        $(row).append(favNodes[element]);
      });
    });

    node.find("tr").each((i, row) => {
      const slice = otherNodes.slice(0, 6);
      if (slice.length == 0) return;
      otherNodes = otherNodes.filter((t, i) => i >= 6);

      slice.forEach(element => {
        $(row).append(element);
      });
    });
  }
}
