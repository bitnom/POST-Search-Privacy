

function url_to_queries(_url) {
	var qd = {};
	if (_url.search)
		return _url.search.substr(1).split`&`.forEach((item) => {
			let [k, v] = item.split`=`
			v = v && decodeURIComponent(v)
			(qd[k] = qd[k] || []).push(v)
		})
}


chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		chrome.tabs.update(details.tabId, {
			url: chrome.runtime.getURL("src/search.html"),
		})
		
		var url = new URL(details.url)
		//let data = url_to_queries()
		let qel
		if (url.searchParams.has('q'))
			qel = 'q'
		if (url.searchParams.has('query'))
			qel = 'query'
		let qval = url.searchParams.getAll(qel)
		let handler = function (tabId, changeInfo) {
			if (tabId === details.tabId && changeInfo.status === "complete") {
				chrome.tabs.onUpdated.removeListener(handler)
				chrome.tabs.sendMessage(tabId, {
					data: qval,
					qel: qel,
					url: url
				})
			}
		}
		chrome.tabs.onUpdated.addListener(handler)
		chrome.tabs.sendMessage(details.tabId, {
			data: qval,
			qel: qel,
			url: url
		})
		return { cancel: true }
	},
	{
		urls: [
			"https://duckduckgo.com/?*q=*",
			"https://start.duckduckgo.com/?*q=*",
			"http://duckduckgo.com/?*q=*",
			"http://start.duckduckgo.com/?*q=*",
			"http://www.startpage.com/sp/search?*query=*",
			"http://startpage.com/sp/search?*query=*",
			"https://www.startpage.com/sp/search?*query=*",
			"https://startpage.com/sp/search?*query=*"
		],
	},
	["blocking"]
)
