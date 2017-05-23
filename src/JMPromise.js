var convertToPromise=function(fn){

	return function(){//1.按照需求，接口是接受一个函数并返回一个函数
		var args=[].slice.call(arguments);
		var _context=this;


		return new Promise(function(resolve,reject){//2.按照返回函数应该返回一个Promise对象

			//3. 按照需求对象内应该执行传入的异步函数并resolve fn的结果
			function callback(ret){//创建一个异步成功之后的传入回调函数，完成resolve
				resolve(ret)
			};
			args.push(callback);//将回调函数传入到结果函数中
			fn.apply(_context,args);//将fn的上下文指向结果函数并执行

		});
	}
}