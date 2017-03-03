(function (global, factory) {
	factory(global)
})(typeof window !== 'undefined' ? window : this, function (global, noGlobal) {
	function ffTools (selector) {
		return new ffTools.prototype.inite(selector);
	};

	ffTools.prototype = {
		constructor: ffTools,
		inite: function (selector) {
			this.obj = selector;
		},
		css: function () {
			alert(1);
		}
	}



	var tool = {
		setTime:function  (time) {
	        var data = new Date(time);
	        var year = data.getFullYear();
	        var month = data.getMonth() + 1;
	        var week = data.getDate();
	        var day = data.getDay();
	        var h = data.getHours();
	        var m = data.getMinutes();
	        var s = data.getSeconds();
	        return this.dateToString([
	            year,
	            this.turnToo(month),
	            this.turnToo(week),
	            this.turnToo(day),
	            this.turnToo(h),
	            this.turnToo(m),
	            this.turnToo(s)
	            ], 0)
	    },
	    turnToo: function (num) {
	        num = num+'';
	        return num.length == 1 ? "0" + num:num;
	    },
    	dateToString: function (arr,n) {
	        //arr: 时间数组   ; n:时间连接方式
	        var s = '';
	        n = n || 0;
	        var aStr = ['年月日时分秒','-- ::','// ::'];
	        for ( var i=0; i<arr.length; i++ ) {
	            s += arr[i]+aStr[n].charAt(i);
	        };
	        return s;
	    },
	    getHash: function () {
			var lc = window.location.hash.substring(1);
			var data = {}
			lc = lc.split('=');
			data.name = lc[0];
			data.value = lc[1];
			return data.value;
		},
		getSearch: function () {
			var lc = location.search.length > 0 ? location.search.substring(1) : '',
			    data = {},
			    items = lc.length ? lc.split('&') : [],
			    item = null,
			    name = null,
			    value = null,
			    i=0,
			    len = items.length;
			for (var i = 0; i < len; i++) {
				item = items[i].split('=');
				name = decodeURIComponent(item[0]);
				value = decodeURIComponent(item[1]);
				for (var i = 0; i < item.length; i++) {
					data[name] = value;
				}
			}
		return data;
		}
	}

	for (attr in tool) {
		ffTools[attr] = tool[attr];
	}

	ffTools.prototype.inite.prototype = ffTools.prototype;

	window.ff = ffTools;
})