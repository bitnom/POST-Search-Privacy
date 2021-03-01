function create_input(name, value, type='hidden'){
	let hin = document.createElement("input")
	hin.type = type
	hin.name = name
	hin.id = name
	hin.value = value
	let frm = document.getElementById("post-search")
	frm.appendChild(hin)
	frm[name].value = value
}

var onMessageHandler = function(msg) {
	console.log('test')
	console.log(msg)
	chrome.runtime.onMessage.removeListener(onMessageHandler)
	if (msg.hasOwnProperty('data') && msg.hasOwnProperty('qel')) {
		var hin = document.createElement("input")
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
		if (msg.hasOwnProperty('qwant') && msg.qwant){
			create_input('t', 'web')
		}
		frm.submit()
	}
	
}

chrome.runtime.onMessage.addListener(onMessageHandler)