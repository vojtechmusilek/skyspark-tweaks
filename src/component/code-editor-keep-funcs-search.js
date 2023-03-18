class CodeEditorKeepFuncsSearch {
  constructor() {
    const placeholder = '[placeholder="Search..."]';
    const style = '[style="width: 100%; margin-bottom: 8px; flex: 0 0 auto;"]';
    Observer.observeOnce('input.domkit-control-text.domkit-TextField' + placeholder + style, this.update.bind(this));
  }

  dataKey = "skyspark-tweaks-hash";

  async update(target) {
    const enabled = await getSettingsValue("CodeEditorKeepFuncsSearch_enabled", true);
    if (!enabled) return;

    $(target).on("input", this.onInput.bind(this));

    const hash = await getNodeHash(target);
    $(target).data(this.dataKey, hash);

    const val = this.tryFillAndGetValue(target, hash);
    if (val == "") return;

    // perform manual hide, because sometimes functions
    // are not filtered even if the filter is set
    for (const child of $(target).next().children()) {
      const funcName = child.innerText;
      if (!funcName.includes(val)) {
        $(child).hide();
      }
    }
  }

  onInput(event) {
    const value = event.target.value;
    const hash = $(event.target).data(this.dataKey);

    sessionStorage.setItem(this.getSessionStorageKey(hash), value);
  }

  tryFillAndGetValue(target, hash) {
    const value = sessionStorage.getItem(this.getSessionStorageKey(hash));
    if (value == null) return "";

    $(target).val(value);
    return value;
  }

  getSessionStorageKey(hash) {
    return "skyspark-tweaks." + getProjectName() + "." + hash;
  }
}