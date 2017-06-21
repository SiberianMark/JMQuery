;(function(){

	var cookie=document.cookie;
	var JMcookie={
		getcookie:function(cname){
			if(typeof cname != 'string' ) return;
			var cookies=this.getcookieAll();
			if(cookies[cname]){
				return cookies[cname];
			}else{
				return undefined;
			}
		},
		setcookie:function(c_name,value,expiredays)
		{
			var exdate=new Date()
			exdate=exdate.setDate(exdate.getDate()+expiredays)/1000*1000
			document.cookie=c_name+ "=" +encodeURIComponent(value)+
			((expiredays==null) ? "" : ";expires="+exdate)
			
		},
		getcookieAll:function(){
			var cList = cookie.split(';'),
			 clLen = cList.length;
			 var cObj=new Object();
			if(clLen>0){
				for(let i = 0; i< clLen; i++){
					let cplist = cList[i].split('=');
					cObj[this._trimleft(cplist[0])]=cplist[1];
				}
			}
			return cObj;
			
		},
		removecookie:function(cname){
			 var exp = new Date();
			  exp.setTime(exp.getTime() - 1);
			  var cval = this.getcookie(cname);
			  if (cval != null)
			    document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString();
		},
		_trimleft:function(str){
			return str.replace(/^\s*/,'');
		},
		_trimright:function(str){
			return str.replace(/\s*$/,'');
		},
		_trimboth:function(str){
			return this.trimright(this._trimleft(str))
		},


	}
	window.JMcookie=JMcookie;
})();