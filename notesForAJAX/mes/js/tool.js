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
		setTime:function  () {
	        var data = new Date(1482067762);
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
	    }
	}

	for (attr in tool) {
		ffTools[attr] = tool[attr];
	}

	ffTools.prototype.inite.prototype = ffTools.prototype;

	window.ff = ffTools;
})