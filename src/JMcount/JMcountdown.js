;(function(){

	var JMCountDown=function(el,options){
		this.defaults={
			time:60,
			beforeText:"发送验证码",
			afterText:"s后重发",
			timeoutText:"点击重发"
		}

		this.options=options?this._concactObj(options,this.defaults):this.defaults;


		this.el = (typeof el === 'string') ? document.querySelector(el) : el;

	};
	JMCountDown.prototype={
		init : function(){
			var _self=this;
			this.el.innerHTML=this.options.beforeText;
			this.el.addEventListener('click',function(){
				_self._count();
			},false)
		},
		_count : function(){
			var _self=this;
			
			let i=this.options.time;
			let t=setInterval(function(){

				if(i<=0){
					//加入cookie修复退出网页重新进重新计时的bug
					window.cookie()
					_self.el.innerHTML = _self.options.timeoutText;
					clearInterval(t);
				}else{
					_self.el.innerHTML = i + _self.options.afterText;
				}

				console.log(i);
				i--;
					
			},1000);	
			
		},
		_concactObj:function(options,defaults){
			if(options instanceof Object || defaults instanceof Object){
				for (let prop in defaults){
					if(!options.hasOwnProperty(prop)){
						options[prop]=this._clone(defaults[prop]);
					}
				}
				return options;
			}

		},
		_clone:function(obj){
			let clo;
			if(obj instanceof Array){
				for(let i = 0; i < obj.length; i++){
					clo[i]=obj[i];
				}
			}else if(obj instanceof Object){
				for (let prop in obj){
					clo[prop]=this._clone(obj);
				}
			}else{
				clo=obj;
			}
			return clo;
		}
	};
	function count(el,options){
		new JMCountDown(el,options).init();
	}
	window.count=count;
})();