function Parent(name,age){
	this.name=name;
	this.age=age;
}

Parent.prototype.hi=function(){
	console.log('hi i am '+this.name+'i am Parent');
}


function Child(name,age,nickname){
	Parent.call(this,name,age);
	this.nickname=nickname;
	this.name=name
}

Child.prototype=new Parent();

Child.prototype.hi=function(){
	console.log('hi i am '+this.nickname+'i am Child');
}
Child.prototype.learn=function(){
	console.log('I am good at learning');
}
var parent=new Parent('parent','49')
var child=new Child('child',12,'qqgoggogog');
console.log(child);
console.log(child.name)
console.log(parent.name)

Object.prototype.clone=function(obj){
	var clone;
	if(obj instanceof Array){
		clone=[];
		for(let i in obj){
			clone.push(obj[i]);
		}
	}else if(typeof obj =='object'){
		clone={};
		for(let i in obj){
			clone[i]=clone(obj[i]);
		}
	}else{
		clone=obj;
	}
	return clone;

}
