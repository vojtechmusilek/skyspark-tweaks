class NavbarButtons {
  constructor() {
    Observer.observe('a[href="https://skyfoundry.com/skyspark"]', this.update.bind(this));
  }

  class_Navbar = "skyspark-tweaks-navbar";
  cssSelector_Navbar = "." + this.class_Navbar;

  buttonsAdded = false;

  update(target) {
    if (this.buttonsAdded) return;

    const navbar = $(target).parent().parent();
    navbar.addClass(this.class_Navbar);

    this.addButton("layout2h", "Swap Split View", this.onClickSwap);
    this.addButton("undo", "todo", null);
    this.addButton("navRight", "todo", null);
    this.addButton("navLeft", "todo", null);

    this.buttonsAdded = true;
  }

  getIconSrc(icon) {
    const dbIconSrc = $('img.ui-Icon[src*="db?"]').attr("src");
    return dbIconSrc.replace("db?", icon + "?");
  }

  addButton(icon, title, clickCallback) {
    const newElement = $("<div>", {
      "class": "domkit-control domkit-control-button domkit-Button",
      "tabindex": "0",
      "title": title,
      "style": "padding: 3px 5px; margin: 0px 3px; float: right;",
    }).append($("<img>", {
      "class": "ui-Icon",
      "src": this.getIconSrc(icon),
      "style": "width: 16px; height: 16px;",
    }));

    $(this.cssSelector_Navbar).append(newElement);
    $(newElement).click(clickCallback);
  }

  onClickSwap() {
    console.log("todo swap");
  }

}
