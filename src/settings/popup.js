const settingsDefs = {
  CodeEditorFuncsColoring_levels: {
    defVal: 1,
    label: "Editor Funcs Coloring <br> (0 = no coloring)",
    type: "number",
    other: "min=0 max=10",
  },
  CodeEditorMatchDoEnd_enabled: {
    defVal: true,
    label: "Editor do-end Matching",
    type: "checkbox",
  },
  CodeEditorFuncsHistory_count: {
    defVal: 5,
    label: "Editor Funcs History <br> (0 = no history)",
    type: "number",
    other: "min=0 max=20",
  },
  CodeEditorSyntaxHightlight_color: {
    defVal: "#ce5b29",
    label: "Editor Syntax Property Color",
    type: "color",
  },
  CodeEditorSyntaxHightlight_boldBracket: {
    defVal: true,
    label: "Editor Syntax Bracket Bold",
    type: "checkbox",
  },
  HomeFavApps_appList: {
    defVal: "",
    label: "Homescreen Favorite Apps <br> (separated by comma)",
    type: "text",
    other: 'placeholder="eg. Code,Tools" style="width: 220px;"',
  },
  CodeEditorMatchText_enabled: {
    defVal: true,
    label: "Editor Text Matching",
    type: "checkbox",
  },
  CodeEditorKeepFuncsSearch_enabled: {
    defVal: true,
    label: "Preserve Editor Search After Refresh",
    type: "checkbox",
  },
  HomeProjectPicker_enabled: {
    defVal: false,
    label: "Faster Project Picker <br> (autofocus, realtime fuzzy search)",
    type: "checkbox",
  },
}

const defTemplate = '<tr><td><label for="{key}">{label}</label></td><td><input type="{type}" {other} id="{key}"></td></tr>';
const settingsKeys = Object.keys(settingsDefs);

async function fillValues() {
  const storageValues = await chrome.storage.sync.get(null);

  for (const key of settingsKeys) {
    const defaultValue = settingsDefs[key].defVal;
    const elem = document.getElementById(key);
    const value = storageValues[key];
    const isCheckBox = elem.getAttribute("type") == "checkbox"
    const valueToFill = value !== undefined ? value : defaultValue;

    if (isCheckBox) {
      fillCheckbox(elem, valueToFill);
    }
    else {
      fillInput(elem, valueToFill);
    }
  }
}

function fillInput(elem, value) {
  elem.addEventListener("input", (event) => {
    elem.setAttribute("value", event.target.value);
  })

  elem.setAttribute("value", value);
}

function fillCheckbox(elem, value) {
  elem.addEventListener("change", (event) => {
    if (event.target.checked) {
      elem.setAttribute("checked", null);
    }
    else {
      elem.removeAttribute("checked");
    }
  })

  if (value == true) {
    elem.setAttribute("checked", undefined);
  }
  else {
    elem.removeAttribute("checked");
  }
}

function fillElements() {
  const elem = document.getElementById("settings");
  let html = elem.innerHTML;

  for (const key of settingsKeys) {
    const def = settingsDefs[key];

    let other = def.other;
    if (!other) other = "";

    const newElem = defTemplate
      .replaceAll("{key}", key)
      .replaceAll("{type}", def.type)
      .replaceAll("{label}", def.label)
      .replaceAll("{other}", other);

    html = newElem + html;
  }

  elem.innerHTML = html;
}

async function onSaveClick() {
  const toSet = {};

  for (const key of settingsKeys) {
    const elem = document.getElementById(key);
    let value = elem.getAttribute("value");
    if (value == null) {
      value = elem.hasAttribute("checked");
    }

    toSet[key] = value;
  }

  await chrome.storage.sync.set(toSet);

  document.getElementById("refresh").hidden = false;
  document.getElementById("saved").hidden = false;
  setTimeout(() => {
    document.getElementById("saved").hidden = true;
  }, 1234);
}

fillElements();
fillValues();

document.getElementById("save").addEventListener("click", onSaveClick);