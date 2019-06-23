const myWebBrowser = () => {
	const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
	const isFirefox = typeof InstallTrigger !== 'undefined'
	const isSafari = /constructor/i.test(window.HTMLElement) || (p => p.toString() === "[object SafariRemoteNotification]")(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))
	const isIE = false || !!document.documentMode
	const isEdge = !isIE && !!window.StyleMedia
	const isChrome = !!window.chrome
	const isBlink = (isChrome || isOpera) && !!window.CSS

	return {
		"browser": isOpera ? 'Opera' : isFirefox ? 'Mozilla Firefox' : isSafari ? 'Safari' : isIE ? 'Internet Explorer' : isEdge ? 'Edge' : isChrome ? 'Google Chrome' : isBlink ? 'Blink' : 'Desconhecido. Nos envie uma mensagem em "Contate-nos".',
		"language": navigator.language
	}
}
