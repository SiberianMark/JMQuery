// 构建二叉树结构

//构造节点
function BSTNode(data,left,right){
	this.data=data;
	this.left=left;
	this.right=right;

}
BSTNode.prototype.show=function(){
	return this.data;
}

//构造二叉树对象
function BST(){
	this.root=null;//根节点
	this.nodes=[];
	this.count = 1;//记录数据在数据集中出现的次数
	
}

BST.prototype.count=function(data){//计数
	var grade = this.find(data);
	grade.count++;
	return grade;
}
BST.prototype.insert=function(data){//插入节点
	var n=new BSTNode(data,null,null);
	if(this.root==null){
		this.root=n;
	}else{
		var current=this.root;
		var parent;
		while(true){//开始遍历
			parent=current;//将当前节点升级为父节点
			if(data<parent.data){//判断路径往左还是往右
				current=parent.left;//将父节点的左子升级为当前节点
				if(current==null){//判断为结束节点则插入并跳出循环
					parent.left=n;
					break;
				}
			}else{
				current=parent.right;
				if(current==null){
					parent.right=n;
					break;
				}
			}
		}
	}
}
BST.prototype.middleOrder=function(node){//中序遍历节点
	if(!(node==null)){
		this.middleOrder(node.left);
		this.nodes.push(node.show());
		this.middleOrder(node.right);
	}
}
BST.prototype.preOrder=function(node){
	if(!(node==null)){
		this.nodes.push(node.show());
		this.preOrder(node.left);
		this.preOrder(node.right);
	}
}
BST.prototype.postOrder=function(node){
	if(!(node==null)){
		this.nodes.push(node.show());
		this.postOrder(node.right);
		this.putstr(node.show()+",");
	}
}
BST.prototype.remove=function(node,data){//删除节点

}
BST.prototype.getMin=function(){//获取最小值
	if(this.root!=null){
		this.middleOrder(this.root);
		return this.nodes[0];
	}
}
BST.prototype.getMax=function(){//获取最大值
	if(this.root!=null){
		this.middleOrder(this.root);
		return this.nodes[nodes.length-1];
	}
}
BST.prototype.find(data){//查找给定值
	var current=this.root;
	var parent;
	while(current!=null){
		if(current.data == data){
			return current;
		}
	}else{
		if(data<current.left){
			current.current.left;
		}else{
			rurrent=current.right;
		}
	}
}
// var bst=new BST();
// for(var i=0;i<10;i++){
// 	bst.insert(Math.floor(Math.random()*10));
// }
// bst.middleOrder(bst.root);