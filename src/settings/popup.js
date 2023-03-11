const aaa = document.getElementById("a");
const bbb = document.getElementById("b");

aaa.addEventListener("click", async () => {
  await chrome.storage.sync.set({ test2: "hi2" });
  await chrome.storage.sync.remove(["test2"]);
  console.log("set");
});

bbb.addEventListener("click", async () => {
  const item = await chrome.storage.sync.get(["test"]);
  console.log(item);

  const all = await chrome.storage.sync.get(null);
  console.log(all);
});