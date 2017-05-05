/*!
**note:this的作用是表示运行时上下文，通俗就是当前执行环境，可通过call和apply执行函数并改变当前上下文
 *author:JM
 *对类数组对象进行迭代each的相关方法
 * Date: 2017-05-05
 * collection:类数组对象
 * Interaren迭代函数
 * context当前迭代对象
*/
var JMArray=require('./JMArray.js')

function JMEach(collection,Iteration,context){
	// 重定向将迭代器this指向迭代对象
	Interaion=bind(Interation,context)
	if(JMArray.isArrayLike){//类数组
		for(var i=0;i<collection.length;i++){
			Iteration(collection[i],i,collection);
		}
	}else{//对象
		for(key in collection){
			Iteration(collection[key],key,collection);
		}
	}
	return collection;
}
/*!
 * fn:当前函数
 * context:当前上下文
*/
function bind(fn,context){
 	context=context || null;//确保当前上下文有值
 	return function(col,i,arr){
 		fn.call(context,col,i,arr);
 	}
}



