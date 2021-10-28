chrome.runtime.onMessage.addListener(function(message, sender) {
	console.log('hello');
});

console.log("background");