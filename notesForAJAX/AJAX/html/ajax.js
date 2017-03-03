
function ajax(method, url, data, suc) {
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch(e) {
		xhr = new ActiveXObject('Microsoft.XMLHttp')
	}

	if (method == 'get' && data) {
		url += '?' + data;
	}

	xhr.open(method, url, true)

	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
		xhr.send(data);
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				suc&&suc(xhr.responseText);
			} else {
				alert(xhr.status);
			}
		}
	}
}
