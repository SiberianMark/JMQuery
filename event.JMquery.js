// EmacScript-->Javascript(数据类型,语句,引用类型,|面向对象Object,function,原型链,闭包|)->浏览器JavaScript(BOM,DOM,event,form)->网络JavaScript(JSON,AJAX,WebSockets,JSONP)->服务器JavaScript(nodejs)



/*
**原生事件模块
**
*/

//W3C事件的事件流与IE的事件流

//事件业务应用结构
//  
//		  |--------PC端	------浏览器兼容性
//事件----
//		  |--------移动端-----移动端新事件类型：如touch等
//
//
//


//******浏览器级别**************
//****************************

//W3C/DOM2规定事件流的三个阶段，捕获阶段，目标阶段，冒泡阶段，与此不同的IE8以下只有目标阶段跟冒泡阶段，没有捕获阶段


//原生js事件处理程序与实现兼容所有浏览器的事件处理程序
	//准备：事件处理程序有几大类形态，html事件处理程序，典型代表： <div onclick="handle();">：缺点：无法实现js html,代码分离 onclick=null;
	//							  	  DOM0事件处理程序，典型代表   var btn=document.getElementByid("mybtn"); btn.onclick=function(){};//优点：兼容所有浏览器	缺点：无法自定义事件，只能添加一个事件处理程序；删除用 btn.onclick=null;							  
	//								  DOM2事件处理程序，典型代表： var btn=document.getElementByid("mybtn"); btn.addEventListener("click",function(){},false);//优点：false表示在冒泡阶段执行，可控制事件执行阶段，可同时添加多个事件处理程序，缺点：不兼容IE8以下浏览器；执行顺序根据代码顺序;btn,removeEventListener("click",handler);(匿名函数无法用过此方法);
	//								  IE事件处理程序，典型代表：   var btn=document.getElementByid("mybtn"); btn.attachEvent("click",function(){});//IE8以下只支持事件冒泡所以用此方法的事件默认绑定在事件冒泡，移除：btn.deachEvent('click',function(){});//缺点：只用于IE8以下;不同于上三种形态，this指向window对象；应用：常用于兼容IE8以下的事件绑定;可同时添加多个事件处理程序，
	//准备：大多数情况下是将事件绑定在冒泡阶段，有助于兼容多个浏览器
//原生事件对象：产生于事件触发并传入处理函数中
//e.currentTarget表示绑定事件的元素，e.target表示实际触发事件的元素，当事件绑定在目标元素上，this==e.currentTarget==e.target;当事件绑定在父元素时，e.currentTarget==父元素！=e.target;

//实现兼容所有浏览器的事件处理程序
//实现兼容所有浏览器的事件对象
var EventUtil={
	//兼容事件处理程序--添加事件绑定
	addHandler:function(elem,eventType,handler){
		if(elem.addEventListener){
			elem.addEventlistener(eventType,handler,false);
		}else if(elem.attachEvent){
			elem.attachEvent(eventType,handler);
		}else{
			elem["on" + eventType]=handler;
		}
	},
	//兼容事件处理程序--删除事件绑定
	removeHandler:function(elem,eventType,handler){
		if(elem.removeEventListener){
			elem.removeEventListener(eventType,handler,false);
		}else if(elem.detachEvent){
			elem.detachEvent(eventType,handler)
		}else{
			elem["on"+eventType]=null;
		}
	},
	//兼容事件对象--获取事件
	getEvent:function(event){
		return event?event:window.event; 
	},
	//兼容事件对象--事件目标
	getETarget:function(e){
		return e.target?e.target:e.srcElement;
	},
	//兼容事件对象--取消事件的默认行为，如a的跳转页面等
	cancelDefault:function(e){
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
	},
	stopPropagation:function(e){
		if(e.stopPropagation){
			e.stoppropagation();
		}else{
			window.event.cancelBublle=true;
		}
	}
	
}

//原生js实现事件委托，利用W3C事件流事件冒泡阶段的原理
//减少DOM操作，提高性能，常用于列表或者表格内多个元素绑定同一个事件;也能实现当新增子对象时无需再次对其绑定事件，常用于动态添加元素的事件绑定

var eventProxy=function(parentElem,childElem,handler){

	EventUtil.addHandler(parentElem,function(e){
		var ev=eventUtil.getEvent(e);
		var target=eventUtil.getETarget(ev);
		if(target=="childElem"){
			handler();
		}
	})

}


//******语言级别**************
//****************************

/*
**JavaScript作为一种基于事件驱动的脚本语言，很多书本都介绍了它的事件模型，
**了解javascript的事件模型的原理
**实现自定义的JavaScript事件模型
*/

//
//准备：利用js面向对象编程构造一个事件的对象EventEmmit，根据事件模型的原理事件实现EventEmmit的对外接口，包括事件队列(存放每个处理程序对应的事件处理函数的队列)，注册事件类型并绑定事件数组，触发对应事件类型的特定事件等等
//准备：1.核心需求就是可以对某一个事件名称绑定多个事件响应函数，然后触发这个事件名称时，依次按绑定顺序触发相应的响应函数
//准备：2.数据抽象：根据需求抽象事件对象得到事件对象图：1个事件类型""对应多个绑定事件[];有不确定个事件类型--->选取JSON对象作为容器，对象类型名作为索引(1)数组作为绑定对象(多)
//准备 :接口确认：有两个函数，一个bind(eventName, Handler)一个trigger(EventName,fun1,fun2...)，分别实现绑定事件和触发事件
//确认构造：即写一个类或是一个模块，有两个函数，一个bind一个trigger，分别实现绑定事件和触发事件
//
//
//实现：
function EventModule(){
	this._listeners={};//是一个队列对象，用于存储用户注册的事件类型，每个类型对应一个事件处理函数数组;如{"click":[fun1,fun2,fun3],"hover":[fun4,fun5,fun6]};
}
//注册新的事件类型
EventModule.prototype.bind=function(eventName,Handler){
	var listeners=this._listeners[eventName]?this._listeners[eventName]?[];//如果事件类型已存在则直接获取事件类型，如果不存在新创建一个存放事件处理函数的数组
	listeners.push(Hanler);//插入绑定的事件处理函数
	this._listeners[eventName]=listeners;//将处理函数绑定到队列上，如果存在则替换，不存在则追加
};

//触发事件
EventModule.prototype.triggle=function(eventName){
	//获取eventName 后面的0-多个参数
	var funcs=Array.prototype.slice().apply(arguments).slice(1);
	var args=this._listeners[eventName];//获取对应事件名
	if(!Array.isArray(listener))return;//自定义事件不存在
	listener.forEach(function(callback){
		try{
			callback.apply(this,args);//执行函数
		}catch{
			console.error(e);
		}
	})
}



/*  DOM 事件模型
**
**
**
*/

