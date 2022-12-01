class EditorKeepSearch {
  static classNameInput = "skyspark-tweaks-editor-input";
  
  onStart() {
    this.searchTimes = 0;
    this.searchSender = setInterval(() => this._searchInput(), 50);
  }

  _searchInput() {
    this.searchTimes++;
    
    if (this.input || this.searchTimes > 10) {
      clearInterval(this.searchSender);
      if (!elemExists(this.input)) {
        this.input = undefined;
      }
      return;
    }
    
    let input = $(`input[placeholder="Search..."]:not(.${EditorKeepSearch.classNameInput})`).get(0);
    if (input == undefined) return;

    let val = localStorage.getItem("skysparkTweaks.editorSearchLeft");
    if (val != null) {
      input.value = val;
    }

    $(input).addClass(EditorKeepSearch.classNameInput);
    $(input).on("input", () => this._cacheText(input.value));

    this.input = input;
  }

  _cacheText(text) {
    // todo left right editors
    localStorage.setItem("skysparkTweaks.editorSearchLeft", text);
  }
}