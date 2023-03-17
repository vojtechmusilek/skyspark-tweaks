class HomeFavApps {
  constructor() {
    Observer.observe("div.ui-AppPicker", this.update.bind(this));
  }

  class_FavApps = "skyspark-tweaks-fav-apps";

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
    const favAppsStr = await getSettingsValue("hfa_apps", "");
    let favApps = favAppsStr.split(",").filter(x => x != "");
    if (favApps.length == 0) return;

    const allApps = $(node).find("td").detach();

    let width = 600;
    const isPopup = $(node).parents('.domkit-Popup').length >= 1;
    if (isPopup) width = 432;

    const line = `<div style="border-top: 1px solid rgb(217, 217, 217); margin: 4px 0px;"></div>`;
    const spacing = `<div class="skyspark-tweaks-fav-apps-spacing" style="width: ${width}px; margin: 0px auto; padding: 8px 0px 4px;">${line}</div>`
    $(node).parent().prepend(spacing);

    const favNode = $(node).clone();
    $(favNode).addClass("skyspark-tweaks-fav-apps");
    $(node).parent().prepend(favNode);

    const favNodes = {};
    let otherNodes = [];

    allApps.each((i, app) => {
      const appName = $(app).text();

      if (favApps.includes(appName)) {
        favNodes[appName] = app;
      } else {
        otherNodes.push(app);
      }
    })

    if (Object.keys(favNodes).length == 0) {
      const parent = $(node).parent();
      $(parent).find(".skyspark-tweaks-fav-apps-spacing").css("display", "none");
      $(parent).find(".skyspark-tweaks-fav-apps").css("display", "none");
    }

    $(favNode).find("tr").each((i, row) => {
      const slice = favApps.slice(0, 6);
      if (slice.length == 0) return;
      favApps = favApps.filter((t, i) => i >= 6);

      slice.forEach(element => {
        $(row).append(favNodes[element]);
      });
    });

    $(node).find("tr").each((i, row) => {
      const slice = otherNodes.slice(0, 6);
      if (slice.length == 0) return;
      otherNodes = otherNodes.filter((t, i) => i >= 6);

      slice.forEach(element => {
        $(row).append(element);
      });
    });
  }
}
