
	var JMArray={
		//数组反序
		reverse:function(arr){
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			return arr.reverse();
		}
		//数组串接成字符串
		arrToStr:function(arr,separator){
			if(Object.prototype.toString.call(arr)!='[object Array]') return false;
			return arr.join(separator);
		}
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
		var result=[];
		var hash={};
		for(var i=0;i<arr.length-1;i++){
			if(!hash[arr[i]]){
				result.push(arr[i]);
				hash[arr[i]]==true;
			}
		}
		return result;
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
		}
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
		},
		//快速排序
		quickSort:function(arr){
			if(Object.prototype.toString.call(arr)!="[object Array]"){return;}
			if(arr.length<=1){return arr;}
			var len=arr.length,
				pIndex=Math.floor(len/2),
				p=arr.splice(pIndex, 1)[0],//临界值
				arrLeft=[],
				arrRight=[];
			for(let i=0;i<len;i++){
				if(arr[i]<p){
					arrLeft.push(arr[i]);
				}else{
					arrRight.push(arr[i]);
				}
			}
			return quickSort(arrLeft).concat([p],quickSort(arrRight))
		},
		//不可变数组范围求和高性能版本
		staticArraySum:function(arr,i,j){
			if(Object.prototype.toString.call(arr)!="[object Array]"){return;}
			var sumlist=[];
			sum=0;
			for(let i = 0;i<arr.length;i++){
				sum=sum+arr[i];
				sumlist.push(sum);
			}
			return sumlist[j]-sumlist[i-1];
		},

		isArrayLike:function(collection){//判断对象是否是类数组
			var length=collection && collection.length;
			return typeof length == 'number' && length>=0 && length<MAX_ARRAY_INDEX;
		}
		
	}
	module.exports = JMArray;