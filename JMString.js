var JMString={
	reverse:function(str){//字符串翻转
		if(typeof str != 'string')return false;
		return str.split('').reverse().join('');
	},
	palindrome:function(str){//是否是回文
		if(typeof str != 'string')return false;
		str=str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"") //去除标点符号,这是我百度的，js的正则不是很熟悉
 			   .replace(/\s+/g)//去除多余空格
 			   .toLowerCase()//转化为小写
 		if(str===this.reverse(str)){
 			return true;
 		}
 		return false;
	},
	strToArr:function(str){//字符串转数组
		if(typeof str != 'string')return false;
		return str.split('');
	},
	titleCase:function(str){//确保首字母大写，字符串包含所有标点符号类型
		//匹配所有标点符号
		if(typeof str != 'string')return false;
		var reg=new RegExp(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/,'g'); //去除标点符号,这是我百度的，js的正则不是很熟悉
		str.match(reg,)
	},
	indexOfAll:function(str,findstr){//只针对字符串,返回匹配字符的位置数组
		if(typeof str != 'string')return false;
		var lastIndex=0;
		var indexArr=[];
		for(var i=lastIndex;i<str.length;i++){
			if(lastIndex==0){
				lastIndex=str.indexOf(findstr,lastIndex);
			}else{
				lastIndex=str.indexOf(findstr,lastIndex+1);
			}	
			if(lastIndex<0){return indexArr}
			indexArr.push(lastIndex);
		}
		return indexArr;
	},
	
	match:function(str,strOrReg){// 返回匹配字符的值或者值数组,注意reg必须是g模式
		return str.match(strOrReg);
	}	

}