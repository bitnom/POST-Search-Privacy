const onMessageHandler = function(msg) {
	chrome.runtime.onMessage.removeListener(onMessageHandler)
	if (msg.hasOwnProperty('data') && msg.hasOwnProperty('qel')) {
		const hin = document.createElement("input")
		hin.type = "hidden"
		hin.name = msg.qel
		hin.id = msg.qel
		hin.value = msg.data[0]
		let frm = document.getElementById("post-search")
		frm.appendChild(hin)
		frm[msg.qel].value = msg.data[0]
		let url = new URL(msg.url)
		frm.action = url.origin + url.pathname
		console.log(url.origin + url.pathname)
		frm.submit()
	}
	
}

chrome.runtime.onMessage.addListener(onMessageHandler)