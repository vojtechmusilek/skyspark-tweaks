class CodeEditorKeepFuncsSearch {
  constructor() {
    const placeholder = '[placeholder="Search..."]';
    const style = '[style="width: 100%; margin-bottom: 8px; flex: 0 0 auto;"]';
    Observer.observeOnce('input.domkit-control-text.domkit-TextField' + placeholder + style, this.update.bind(this));
  }

  dataKey = "skyspark-tweaks-hash";

  async update(target) {
    const enabled = await getSettingsValue("cekfs_enabled", true);
    if (!enabled) return;

    $(target).on("input", this.onInput.bind(this));

    const hash = getNodeHash(target);
    $(target).data(this.dataKey, hash);

    this.tryFill(target, hash);
  }

  onInput(event) {
    const value = event.target.value;
    const hash = $(event.target).data(this.dataKey);

    sessionStorage.setItem(this.getSessionStorageKey(hash), value);
  }

  tryFill(target, hash) {
    const value = sessionStorage.getItem(this.getSessionStorageKey(hash));
    if (value == null) return;

    $(target).val(value);
  }

  getSessionStorageKey(hash) {
    return "skyspark-tweaks." + getProjectName() + "." + hash;
  }
}