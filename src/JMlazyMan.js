function _lazyMan(name){
	this.name=name;
	var self=this;
	this.tasks=[];
	var task=(function(){
		return function(){
			console.log('Hi I am ' + name);
			self.next();
		}
	})();
	this.tasks.push(task);
	setTimeout(function(){  //通过settimeout的方法，将执行函数放入下一个事件队列中，从而达到先注册事件，后执行的目的,
		self.next();
	});
	console.log(this.tasks);
}
_lazyMan.prototype={
	next:function(){//任务调度方法，调用当前任务并执行
		let fn = this.tasks.shift();
			fn && fn();
			console.log(this.tasks);
	},
	eat:function(food){
		let self=this;
		let task=(function(){
			return function(){
				console.log('Eat '+ food);
				self.next();
			}	
		})();
		this.tasks.push(task);//声明任务并注册到任务队列
		return this;
	},
	sleep:function(time){
		let self=this;
		let task=(function(time){
			return function(){
				setTimeout(function(){	
					console.log(' '+ time);
					self.next();
				},time*1000)
				
			}	
		})(time);
		this.tasks.push(task);
		return this;
	},
	sleepFirst:function(time){
		let self=this;
		let task=(function(time){
			return function(){
				setTimeout(function(){	
					console.log(' '+ time);
					self.next();
				},time*1000)
				
			}	
		})(time);
		this.tasks.unshift(task);
		return this;
	}
}

function lazyMan(name){
	return new _lazyman(name);//last:简单工厂模式构造对象
}


lazyMan('mashaobin').sleep(1).eat('food').sleepFirst(2);

// 1. 执行构造函数：声明hi任务并注册在任务队列内：tasks=[function(){'hi'}]
// 2. 执行sleep函数：声明sleep任务并注册在任务队列内：tasks=[function(){'hi'},function(){'sleep'}]
// 3. 执行eat函数：声明eat任务并注册在任务队列内：tasks=[function(){'hi'},function(){'sleep'},function(){'eat'}]
// 4. 执行sleepFirst函数：声明sleepFirst任务并注册在任务队列内：tasks=[function(){'sleepFirst'},function(){'hi'},function(){'sleep'},function(){'eat'}]
// 5. 利用setTimeout(,0)异步挂起特性，最后执行next(),依次调用tasks内的每个任务
// 6. 完成输出