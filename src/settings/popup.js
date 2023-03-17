const settings = {
  cefc_max_levels: 1,
  cemde_match: true,
  cefh_max_count: 5,
  cesh_property_color: "#ce5b29",
  cesh_bracket_bold: true,
  hfa_apps: "",
}

const settingsDefs = {
  cefc_max_levels: {
    label: "Editor funcs coloring <br> (0 = no coloring)",
    type: "number",
    other: "min=0 max=10",
  },
  cemde_match: {
    label: "Editor do-end matching",
    type: "checkbox",
  },
  cefh_max_count: {
    label: "Editor funcs history <br> (0 = no history)",
    type: "number",
    other: "min=0 max=20",
  },
  cesh_property_color: {
    label: "Editor syntax property color",
    type: "color",
  },
  cesh_bracket_bold: {
    label: "Editor syntax bracket bold",
    type: "checkbox",
  },
  hfa_apps: {
    label: "Favorite Apps <br> (separated by comma)",
    type: "text",
    other: 'placeholder="eg. Code,Tools"',
  },
}

const defTemplate = '<div><label for="{key}">{label}</label><br><input type="{type}" {other} name="{key}" id="{key}"></div>';

async function fillValues() {
  const storageValues = await chrome.storage.sync.get(null);

  for (const entry of Object.entries(settings)) {
    const key = entry[0];
    const defaultValue = entry[1];
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

  for (const key of Object.keys(settings)) {
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

if (Object.keys(settings).length != Object.keys(settingsDefs).length) {
  throw new Error("bad settings consts");
}

fillElements();
fillValues();

document.getElementById("save").addEventListener("click", async () => {
  const toSet = {};

  for (const key of Object.keys(settings)) {
    const elem = document.getElementById(key);
    let value = elem.getAttribute("value");
    if (!value) {
      value = elem.hasAttribute("checked");
    }
    toSet[key] = value;
  }

  await chrome.storage.sync.set(toSet);

  document.getElementById("saved").hidden = false;
  setTimeout(() => {
    document.getElementById("saved").hidden = true;
  }, 1234);

  // reload page?
  //const tab = await getCurrentTab() || {};
  //const currentUrl = tab.url ? new URL(tab.url) : {};
  //if (currentUrl.hostname !== RELOAD_TRIGGER_HOSTNAME) {
  //  chrome.tabs.reload(state.currentTabId);
  //}
});




//await chrome.storage.sync.set({ test2: "hi2" });
//await chrome.storage.sync.remove(["test2"]);
//const item = await chrome.storage.sync.get(["test"]);
//const all = await chrome.storage.sync.get(null);
