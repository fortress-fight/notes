function setMobileMeta (target) {
	var w = window.screen.width;
	var targetW = target;
	var scale = w/targetW;
	var meta = document.createElement('meta');
	meta.name = 'viewport';
	meta.content='width=device-width, user-scalable = no, initial-scale = '+scale+', minimum-scale = '+scale+', maximum-scale = '+scale;
	document.head.appendChild(meta);
	alert(document.documentElement.clientWidth)
}