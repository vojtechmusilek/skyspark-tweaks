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
    if (key == "enter") {
      if (this.btn) {
        $(this.btn).mousedown().mouseup();
      }
      return;
    }
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

    projs.each((_, node) => {
      let projName = $(node).find("span").text().toLowerCase();
      
      let show = re.test(projName);
      //let show = projName.includes(filter);

      if (show) {
        if (!firstSelected) {
          firstSelected = true;
          $(node).addClass("selected");
          $(node).click();
        }
        $(node).show();
      }
      else {
        $(node).removeClass("selected");
        $(node).hide();
      }
    });
  }

  _focus(input) {
    this._times++;
    if (this._times > 10) {
      clearInterval(this._sender);
    }

    $(input).focus();
  }



/*
  _autosearch2() {
    let foundNodes = $("." + HomeProjects.className);
    if (foundNodes.length != 1) return;
    
    console.log("lookin");
    $(".domkit-Popup * .ui-UiPimTree-node").each((index, node) => {
      console.log(node);
    })
    

  }

  _autosearch() {
    let foundNodes = $("." + HomeProjects.className);
    if (foundNodes.length != 1) return;
    
    const ke = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
      key: "Enter",
    });

    foundNodes.get(0).dispatchEvent(ke);
  }

  _autofocus() {
    $(".domkit-Popup > div > div:nth-child(1) > input").each((index, node) => {
      var alreadyMoved = $(node).hasClass(HomeProjects.className)
      if (alreadyMoved) return;

      $(node).addClass(HomeProjects.className);
      
      this._times = 0;
      this._sender = setInterval(() => this._focus(node), 50);
    })
  }
*/
  
}