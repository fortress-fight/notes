//method,url,val,succ,fail,type
function ajax(json){
		var settings = {
			'url':json.url||'',
			'method':json.method||'get',
			'data':json.data || {},
			'succ':json.succ || function(){},
			'fail':json.fail || function(){},
			'type':json.type || 'json'
		}
		
		var ajax = new XMLHttpRequest();
		var arr = [];
		for(var attr in settings.data){
			arr.push(attr+'='+settings.data[attr]);
		}
		settings.data = arr.join('&');
		
		if(settings.method === 'get'){
			var w = settings.data?'?':'';
			ajax.open(settings.method,settings.url+w+settings.data+'&'+new Date());
			ajax.send();
		}else{
			ajax.open(settings.method,settings.url);
			ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			ajax.send(settings.data);
		}
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4){
				if(ajax.status >=200 && ajax.status <= 206){
					if(settings.type == 'json'){
//						settings.succ(JSON.parse(ajax.responseText));
						settings.succ(eval('('+ajax.responseText+')'));
					}else if(settings.type == 'xml'){
						settings.succ(ajax.responseXML);
					}else {
						settings.succ(ajax.responseText);
					}
				}else{
					settings.fail(ajax.status);
				}
			}
		}
	}