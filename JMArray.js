(function(){
	var JMArray={
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
					if(arr[j]>arr[j+1]){//比较相邻两个元素，如果前一个比后一个大则交换，每一轮得出档轮最大数排在最后面
						swap=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=swap;
					}
				}
			}
			return arr;
		}
		//选择排序
		selectionSort:function(arr){
			if(Object.prototype.toString.call(arr)!='[object Array]')return false;
			var i,j,minix,swap,
				len=arr.length;
			for(i = 0;i<len-1;i++){//假设当前值为最小，保存索引，与后续所有值进行比较，如有更小则替换索引，每一轮选出最小的值
				minix=i;
				for(j=i+1;j<len;j++){
					if(arr[j]<arr[minix]){
						minix=j;
					}
				}
				swap=arr[minix]
				arr[minix]=arr[i];
				arr[i]=swap;
			}
			return arr;
		}
		
	}
	return JMArray;
})();