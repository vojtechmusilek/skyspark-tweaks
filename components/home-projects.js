class HomeProjects {
  static className = "skyspark-tweaks-projects-autofocus";
  
  onChange() {
    //console.log({ bef: this.pop });
    this._searchPopup();
    //console.log({ af: this.pop });

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
    //else if (key == "arrowdown" && this.projs) {
    //  let selNext = false;
    //  
    //  this.projs.each((_, node) => {
    //    let isHidden = $(node).is(":hidden");
    //    let isSelected = $(node).hasClass("selected");
    //
    //    console.log({node, isHidden, isSelected, selNext});
    //
    //    if (selNext && !isHidden) {
    //      $(node).addClass("selected");
    //      selNext = false;
    //    }
    //    else if (isHidden && isSelected) {
    //      $(node).hide().removeClass("selected");
    //      selNext = true;
    //    }
    //
    //    
    //  });
    //}
    //else if (key == "arrowup" && this.projs) {
    //  
    //}
  }

  _searchPopup() {
    if (this.pop) {
      if (!elemExists(this.pop)) {
        this.pop = undefined;
        this.input = undefined;
        this.projs = undefined;
      }
      return;
    }
    
    let pop = $(`.domkit-Popup:not(.${HomeProjects.className})`).get(0);
    if (pop == undefined) return;

    $(pop).addClass(HomeProjects.className);
    
    this.pop = pop;
  }

  _searchButtonOk() {
    if (this.btn) return;
    
    let btn = $(this.pop).find("div:contains(\"Ok\"):not(:has(*))").get(0);
    if (btn == undefined) return;
    
    console.log({btn: btn})

    this.btn = btn;
  }

  _searchInput() {
    if (this.input) return;
    
    let input = $(this.pop).find("input").get(0);
    if (input == undefined) return;
    
    console.log({input: input})

    $(input).on("input", () => this._filterProjects(this.projs, input.value));

    this._times = 0;
    this._sender = setInterval(() => this._focus(input), 50);

    this.input = input;
  }

  _searchProjects() {
    if (this.projs) return;

    let projs = $(this.pop).find(".ui-UiPimTree-node");
    if (projs.length == 0) return;

    console.log({projs: projs})
    
    this.projs = projs;
  }

  _filterProjects(projs, filter) {
    if (projs == undefined) return;
    
    filter = '.*' + filter.split('').join('.*') + '.*';
    const re = new RegExp(filter);

    let firstSelected = false;

    console.log("---", filter);



    projs.each((_, node) => {
      let projName = $(node).find("span").text().toLowerCase();
      let show = re.test(projName);

      if (show) {
        $(node).show();
        if (!firstSelected) {
          firstSelected = true;
          $(node).addClass("selected");
          $(node).click();
        }
      }
    });

    projs.each((_, node) => {
      let projName = $(node).find("span").text().toLowerCase();
      let show = re.test(projName);

      if (!show) {
        $(node).removeClass("selected").hide();
      }
    });
  }

  _focus(input) {
    this._times++;
    if (this._times > 20) {
      clearInterval(this._sender);
    }

    $(input).focus();
  }
}