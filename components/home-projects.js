class HomeProjects {
  static classNamePopup = "skyspark-tweaks-popup";
  static classNameCache = "skyspark-tweaks-cache";
  
  onChange() {
    this._searchPopup();

    // shell menu fix
    if (this.pop) {
      this._fixMenuItems();
    }

    if (this.pop) {
      this._searchButtonOk();
      this._searchInput();
      this._searchProjects();
    }
  }
  
  onKeyDown(key) {
    if (key == "enter" && this.btn) {
      this.btn.dispatchEvent(new Event('mousedown'));
      this.btn.dispatchEvent(new Event('mouseup'));
    }
  }

  _searchPopup() {
    if (this.pop) {
      if (!elemExists(this.pop)) {
        this.pop = undefined;
        this.btn = undefined;
        this.input = undefined;
        this.projs = undefined;
        this.projsCache = undefined;
        this.projsCacheParent = undefined;
        this.projsParent = undefined;
      }
      return;
    }
    
    let pop = $(`.domkit-Popup:not(.${HomeProjects.classNamePopup})`).get(0);
    if (pop == undefined) return;

    $(pop).addClass(HomeProjects.classNamePopup);
    
    this.pop = pop;
  }

  _searchButtonOk() {
    if (this.btn) return;
    
    let btn = $(this.pop).find("div:contains(\"Ok\"):not(:has(*))").get(0);
    if (btn == undefined) return;
    
    this.btn = btn;
  }

  _searchInput() {
    if (this.input) return;
    
    let input = $(this.pop).find("input").get(0);
    if (input == undefined) return;
    
    $(input).on("input", () => this._filterProjects(this.projs, input.value));

    this.focusTimes = 0;
    this.focusSender = setInterval(() => this._focus(input), 50);

    this.input = input;
  }

  _searchProjects() {
    if (this.projs) return;

    let projs = $(this.pop).find(".ui-UiPimTree-node");
    if (projs.length == 0) return;

    this.projs = projs;
    
    this._makeProjectsCache(projs);
  }

  _makeProjectsCache(projs) {
    let projsCache = [];
    let projsParent = $(projs).parent().parent().get(0);
    
    let projsCacheParent = $("." + HomeProjects.classNameCache).get(0);
    if (projsCacheParent == undefined) {
      projsCacheParent = $("<div></div>").hide().addClass(HomeProjects.classNameCache);
      $(projsCacheParent).appendTo(document.body);
      projsCacheParent = projsCacheParent.get(0);
    }
    
    let divs = $(projs).parent();

    divs.each((_, node) => {
      let projName = $(node).find("span").text()
        .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      projsCache.push({
        projName: projName,
        node: node
      });
    });

    console.log({projsCache});
    this.projsCache = projsCache;
    this.projsCacheParent = projsCacheParent;
    this.projsParent = projsParent;
  }

  _filterProjects(projs, filter) {
    if (projs == undefined) return;
    
    filter = '.*' + filter.split('').join('.*') + '.*';
    const re = new RegExp(filter);

    for (const val of this.projsCache) {
      this.projsCacheParent.appendChild(val.node);
    }

    let firstSelected = false;
    for (const val of this.projsCache) {
      const show = re.test(val.projName);
      if (show) {
        this.projsParent.appendChild(val.node);

        if (!firstSelected) {
          firstSelected = true;
          $(val.node).find(".ui-UiPimTree-node").addClass("selected").click();
        }
      }
    }
  }

  _focus(input) {
    this.focusTimes++;
    if (this.focusTimes > 20) {
      clearInterval(this.focusSender);
    }

    $(input).focus();
  }

  _fixMenuItems() {
    $(".domkit-control.domkit-MenuItem").height("auto");
  }
}