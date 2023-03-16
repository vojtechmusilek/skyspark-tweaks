class NavbarButtons {
  constructor() {
    Observer.observe('a[href="https://skyfoundry.com/skyspark"]', this.update.bind(this));
  }

  class_Navbar = "skyspark-tweaks-navbar";
  cssSelector_Navbar = "." + this.class_Navbar;

  buttonsAdded = false;


  splitViewExtendValue = 50;
  splitViewExtendStep = 10;

  update(target) {
    if (this.buttonsAdded) return;

    const navbar = $(target).parent().parent();
    navbar.addClass(this.class_Navbar);

    this.addButton("layout2h", "Swap Split View", this.onClickSwap.bind(this));
    this.addButton("undo", "Split View Reset Size", this.onExtendReset.bind(this));
    this.addButton("navRight", "Split View Extend Left", this.onExtendLeft.bind(this));
    this.addButton("navLeft", "Split View Extend Right", this.onExtendRight.bind(this));

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
    const hash = window.location.hash.replace("#", "");
    if (hash == null || hash == "") return;

    const data = sessionStorage.getItem(hash);
    const trimmed = data.substring(1, data.length - 1);

    let obj = {};
    let stack = "";
    let pointer = "";
    let bracket = 0;

    for (let index = 0; index < trimmed.length; index++) {
      const char = trimmed[index];

      if (char == "N" && stack == "" && bracket == 0) {
        obj[pointer] = char;
        stack = "";
      }

      if (char == ":" && bracket == 0) {
        pointer = stack.trim();
        stack = "";
      } else {
        stack += char;
      }

      if (char == "{") bracket++;
      if (char == "}") bracket--;

      if (char == "}" && bracket == 0) {
        obj[pointer] = stack;
        stack = "";
      }
    }

    // 3.1.7+
    const missingRight = !obj.hasOwnProperty("right");
    // 3.1.6-
    const nullRight = obj.right == "N";
    if (missingRight || nullRight) return;

    const newData = `{left:${obj.right} right:${obj.left}}`;
    sessionStorage.setItem(hash, newData);
    window.location.href = window.location.href;
  }

  onExtendLeft() {
    this.setSplitViewPercentage(this.splitViewExtendValue + this.splitViewExtendStep);
  }

  onExtendRight() {
    this.setSplitViewPercentage(this.splitViewExtendValue - this.splitViewExtendStep);
  }

  onExtendReset() {
    this.setSplitViewPercentage(50);
  }

  setSplitViewPercentage(newVal) {
    if (newVal < 10) {
      this.splitViewExtendValue = 10;
      return;
    }
    if (newVal > 90) {
      this.splitViewExtendValue = 90;
      return;
    }

    const left = $("#ws-left").get(0);
    const right = $("#ws-right").get(0);
    if (right == null) return;

    const leftValue = newVal;
    const rightValue = 100 - newVal;

    console.log({ left, right, newVal, leftValue, rightValue });

    $(left).css("width", `calc(${leftValue}% - 5px)`);
    $(right).css("width", `calc(${rightValue}% - 5px)`);

    this.splitViewExtendValue = newVal;
  }
}
