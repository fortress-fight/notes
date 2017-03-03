var cookie = (function () {
	var cookieTool = {
		setCookie: function (name, json, time) {
			var exp = new Date();
			document.cookie.name = name || [];
			time = time || 1;
			exp.setTime(exp.getTime() + this.cookieTime(time));
			console.log(exp)
			for (attr in json) {
				console.log(json[attr]);
				document.cookie = attr +'='+ json[attr] + ';expires=' + exp.toGMTString();
			}
		},
		cookieTime: function (str) {
			if (typeof str == 'number') {
				return str*24*60*60*1000;
			} else {
				var str1= str.substring(1)*1;
				var str2= str.substring(0,1);
				if (str2=="s"){
					return str1*1000;
				} else if (str2=="h") {
					return str1*60*60*1000;
				} else if (str2=="d") {
					return str1*24*60*60*1000;
				} else {
					return str1
				}
			}
		},
	}
	return cookieTool;
})()

/*(function (global, factory) {
	factory(global);
})(typeof window === 'undefined' ? this : window, function (global, noGlobal) {
	function ff (selector) {
		return new ff.prototype.inite(selector);
	}
	ff.prototype = {
		inite: function (selector) {
			this.obj = selector;
		},
		css: function () {
			alert(1)
		}
	}

	ff.css = function () {
		alert(2)
	}

	ff.prototype.inite.prototype = ff.prototype;
	window.ff = ff;
})
*/
