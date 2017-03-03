function Rander(contId,pageId) {
	this.msgObj = tools.$(contId);
	this.pageObj = tools.$(pageId);
	this.hash = window.location.hash.substr(1) || 1;
	this.pageCount = 0;
}
Rander.prototype = {
	init: function () {
		this.randerBody();
		this.addMsg();
		this.hashChange();
		this.msgClick();//删除，点赞功能
	},
	randerBody: function () {//渲染消息列表页和页码
		this.getPage();
		this.getPageCount();
	},
	//添加一条数据
	addMsg: function () {
		var _this = this;
		var oBtn = tools.$('#btn1');
		var oText = tools.$('#tijiaoText');
		
		oBtn.addEventListener('click',function(){
			var val = oText.value;
			if ( val.trim() === '' ) {
				alert('要认真对待本次评论哦');
			} else {
				tools.ajax({
					url: 'php/weibo.php',
					data: {
						act: 'add',
						content: val
					},
					success: function (json) {
						if ( json.error === 0 ) {
							
							//dom中临时添加一个元素
							var str = _this.creatEle({
								id: json.id,
								content: val,
								time: json.time,
								acc: 0,
								ref: 0
							});
							
							if ( _this.hash == 1 ) {
								_this.msgObj.innerHTML = str + _this.msgObj.innerHTML;
							} else {
								window.location.hash = 1;
							}
							_this.randerBody();//重新渲染页面
						}
					},
					fail: this.fail
				})
			}
		})
	},
	//生成一条字符串类型的dom节点
	creatEle: function (json) {
		var nowDate = new Date(json.time);
		var time = tools.getNowTime(1,nowDate);
		return '<div class="reply" fileId="'+json.id+'">'
                +'<p class="replyContent">'+json.content+'</p>'
                +'<p class="operation">'
                    +'<span class="replyTime">'+time+'</span>'
                    +'<span class="handle">'
                    	+'<a href="javascript:;" class="top">'+json.acc+'</a>'
                        +'<a href="javascript:;" class="down_icon">'+json.ref+'</a>'
                        +'<a href="javascript:;" class="cut">删除</a>'
                    +'</span>'
                +'</p>'
            +'</div>';
	},
	
	//weibo.php?act=get_page_count	获取页数
	//返回：{count:页数}
	getPageCount: function () {
		var _this = this;
		tools.ajax({
			url: 'php/weibo.php',
			data: 'act=get_page_count',
			success: function (json) {
				_this.pageCount = json.count;
				if ( _this.pageCount<_this.hash ) {
					_this.hash = window.location.hash = _this.pageCount;
				}
				_this.randerPage();
			},
			fail: this.fail
		})
	},
	//渲染底部页码
	randerPage: function () {
		var str = '';
		if ( this.pageCount>=5 ) {
			for ( var i=this.getNum(); i<this.getNum()+5; i++ ) {
				str += this.creatPageEle(i);
			}
		} else {
			for ( var i=1; i<=this.pageCount; i++ ) {
				str += this.creatPageEle(i);
			}
		}
		this.pageObj.innerHTML = str;
	},
	//页码元素生成
	creatPageEle: function (num) {
		if ( num === this.hash*1 ) {
			return '<a href="#'+num+'" class="active">'+num+'</a>';
		} else {
			return '<a href="#'+num+'">'+num+'</a>';
		}
		
	},
	//设置页码中的数字
	getNum: function () {
		var pageNum = 1;
		if ( this.hash<3 ) {
			pageNum = 1;
		} else if (this.hash >this.pageCount-2) {
			pageNum = this.pageCount - 4;
		} else {
			pageNum = this.hash - 2;
		}
		return pageNum;
	},
	//获取一页数据
	//[{id: ID, content: "内容", time: 时间戳, acc: 顶次数, ref: 踩次数}, {...}, ...]
	getPage: function () {
		var _this = this;
		tools.ajax(
			{
				url: 'php/weibo.php',
				data: {
					act: 'get',
					page: this.hash
				},
				success: function (json) {
					var str = '';
					for ( var i=0; i<json.length; i++ ) {
						str+=_this.creatEle(json[i]);
					}
					_this.msgObj.innerHTML = str;
				},
				fail: this.fail
			}
		);
	},
	hashChange: function () {
		var _this = this;
		window.onhashchange = function() {
			_this.hash = window.location.hash.substr(1);
			_this.randerBody();//重新渲染页面
		}
	},
	//消息列表点击:删除/点赞/倒赞
	msgClick: function () {
		var _this = this;
		this.msgObj.addEventListener('click',function(ev){
			if (tools.indexOfStr(ev.target.className,'top')) {
				//点赞
				_this.refMsg(ev.target,'acc');
			} else if (tools.indexOfStr(ev.target.className,'down_icon')) {
				//倒赞
				_this.refMsg(ev.target,'ref');
			} else if (tools.indexOfStr(ev.target.className,'cut')) {
				//删除
				_this.delMsg(ev.target);
			}
		})
	},
	//点赞/倒赞
	refMsg: function (ele,act) {
		var _this = this;
		var id = tools.findParent(ele,this.msgObj.children).getAttribute('fileId');
		tools.ajax({
			url: 'php/weibo.php',
			data: {
				act:act,
				id: id
			},
			success: function (json) {
				if ( json.error == 0 ) {
					var delay = 24*60*60*1000;
					if ( !ele.onOff ) {
						ele.innerHTML = ele.innerHTML*1+1;
						ele.nowTime = new Date().getTime();
						ele.onOff = true;
					} else {
						ele.onOff = !_this.timeLimit(ele.nowTime,delay);
					}
				}
			},
			fail: this.fail
		})
	},
	timeLimit: function (nowTime,delay) {
		var endTime = new Date().getTime();
		
		if (endTime-(nowTime+delay)>=0 ) {
			return true;
		}
		return false; 
	},
	//删除
	delMsg: function (ele) {
		var _this = this;
		var id = tools.findParent(ele,this.msgObj.children).getAttribute('fileId');
		tools.ajax({
			url: 'php/weibo.php',
			data: {
				act:'del',
				id: id
			},
			success: function (json) {
				if ( json.error == 0 ) {
					_this.randerBody();
				}
			},
			fail: this.fail
		})
	},
	fail: function (status) {
		console.log(status);
	}
	
}

var task = new Rander('#div1','#page');
task.init();

