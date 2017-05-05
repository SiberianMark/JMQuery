/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


	var JMArray={
		//数组反序
		reverse:function(arr){
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			return arr.reverse();
		},
		//数组串接成字符串
		arrToStr:function(arr,separator){
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			return arr.join(separator);
		},
		unique:function(arr){//推荐默认hash数组去重
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			var n=[],//临时数组
				hash={};
			for(var i=0;i<arr.length-1;i++){
				if(!hash[arr[i]]){
					n.push(arr[i]);
					hash[arr[i]]=true;
				}
			}
			return n;
		},
		uniqueHash:function(arr){//利用hash数组去重提高性能
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			var n=[],//临时数组
				hash={};
			for(var i=0;i<arr.length-1;i++){
				if(!hash[arr[i]]){
					n.push(arr[i]);
					hash[arr[i]]=true;
				}
			}
			return n;
		},
		uniqueIndexof:function(arr){//双重循环遍历比较去重
			if(Object.prototype.toString.call(arr)!=='[object Array]')return false;
			var n=[];//临时数组
			for(var i=0;i<arr.length-1;i++){
				if(n.indexOf(arr[i])===-1){
					n.push(arr[i]);
				}
			}
			return n;
		},
		uniquesort:function(arr){//排序数组去重
			if(Object.prototype.toString.call(arr)!='[object Array]')return false;
			arr.sort();
			var n=[arr[0]];//结果数组
			for(var i=1;i<arr.length;i++){
				if(arr[i]!=n[n.length-1]){//与结果数组最后一个元素进行比较
					n.push(arr[i]);
				}
			
			}
			return n;
		},
		uniquedelete:function(arr){
			if(Object.prototype.toString.call(arr)!='[object Array]')return false;
			var i,
				j,
				len=arr.length;
				 for(i = 0; i < len; i++){
			        for(j = i + 1; j < len; j++){
			            if(arr[i] == arr[j]){
			                arr.splice(j,1);
			                len--;
			                j--;
			            }
			        }
			    }
				return arr;
		},
		uniqueES6set:function(arr){
			return Array.from(new Set(arr));
		},


		//冒泡排序
		sort:function(arr){//默认冒泡排序
			if(Object.prototype.toString.call(arr)!='[object Array]')return false;
			var 
				i,
				j,
				len=arr.length,
				swap;
			for(i=0;i<len-1;i++){
				for(j=0;j<len-i-1;j++){
					if(arr[j]>arr[j+1] && arr[j] && arr[j+1]){//比较相邻两个元素，如果前一个比后一个大则交换，每一轮得出档轮最大数排在最后面
						swap=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=swap;
					}
				}
			}
			return arr;
		},							
		//选择排序--最稳定o(n*n)
		selectionSort:function(arr){
			if(Object.prototype.toString.call(arr)!='[object Array]')return false;
			var i,j,minix,swap
				len=arr.length;
				for(i=0;i<len-1;i++){
					minix=i;
					for(j=i+1;j<len;j++){
						if(arr[i]>arr[j]){//比较当前轮的值与后续其他值
							swap=arr[minix];
							arr[minix]=arr[j];
							arr[j]=swap;
						}

					}
						
				}
			return arr;
		},
		//冒泡排序	
		bubbleSort:function(arr){
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			var i,j,swap,
				len=arr.length;
				for(i=0;i<len-1;i++){
					for(j=0;j<len-1;j++){
						if(arr[j]>arr[j+1] && arr[j] && arr[j+1]){
							swap=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=swap;
						}
					}
				}
			return arr;
		},
		//插入排序算法
		insertSort:function(arr){
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			var i,j,swap,
				len=arr.length;
				
			for(i=1;i<len;i++){
				preIndex=i-1;
				current=arr[i];//设置已排序数组的最后一项(当前项)，当比前一项小，前一项就往后移，往前看一项直到第一项
				while(preIndex>=0 && arr[preIndex]>current){
					arr[preIndex+1]=arr[preIndex];
					preIndex--;
				}
				arr[prIndex+1]=current;
			}
			return arr;
		}
		
	}
	module.exports = JMArray;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
		// if(typeof str != 'string')return false;
		// var reg=new RegExp(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/,'g'); //去除标点符号,这是我百度的，js的正则不是很熟悉
		// str.match(reg,)
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
module.exports=JMString

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var JMArray =__webpack_require__(0)
var JMString =__webpack_require__(1)

window.JMArray=JMArray;
window.JMString=JMString;


/***/ })
/******/ ]);