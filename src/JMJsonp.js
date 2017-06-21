;(function(){
	var sp=document.createElemnt('script');
	sp.type="text/javascript";
	sp.src="url?cb=callback"
	document.getElementByTagName('head')[0].appendChild(sp);

	function callback(data){
		console.log(data);
	}
})();

function createXHR(url,data,way,success,fail){
	var xhr = new XMLHttpRequest();
	
	xhr.open(way,url,true);
	xhr.onreadystatechange=function(res){
		if(xhr.readyState == 4 && xhr.status == 200){
			success(data);
		}else{
			fail(data);
		}
	};
	xhr.send(data);

}


Var jsonp={
	getJsonp:function(url,data,func){
		
		var funcname=(data['callback']?data[callback]:'cb');
		if(data['callback']){
			url = parseParam(url,data);
		}else{
			url = parseParam(url,data)+ '&callback=cb';
		}
		var sp=document.createElement('script');
		sp.type="text/javascript";
		sp.src=url;
		window[funcname]=function(json){
            // 执行传入的的函数
            func(json);
		}
	},
	parseParam:function(url,data){
		if(data instanceof Object){
			url= (url.indexof('?')>-1)?'&':'?';
		}
		var param='';
		for(var k in data){
			data[k]=(data[k]==undefined)?'':data[k];
			param += '&' + k + '=' + data[k]; 
		}
		url =(url.indexof('&')>-1)?url.substring(1):url + param;
		return url;
	}

}