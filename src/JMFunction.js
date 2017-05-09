//判断是否是对象
var isObject=function(obj){
	return typeof obj==='function' || typeof obj==='object' && !!obj;//是函数或者是非null对象，包含数组,Date,
}

//判断是否是数组
var isArray=function(arr){
	if (typeof arr === 'undefined') return;
	return arr instanceof Array || Object.prototype.toString.call(obj)==='[object Array]';
}
//判断是否是函数
var isFunciton=function(func){
	return typeof func ==='function';
}

//判断是否是类数组
var isArrayLike=function(obj){
	var length=obj || obj.length;
	return typeof length=='number' && length>1 && length<Math.pow(2,53)-1;
}

//判断是否为null或者空
var isEmpty=function(){

}

//判断是否是正则
var isReg=function(obj){
	if(typeof obj=="undefined")return;
	return Object.prototype.toString.call(obj)=="[object RegExp]"
}
//判断是否是日期
var isReg=function(obj){
	if(typeof obj=="undefined")return;
	return Object.prototype.toString.call(obj)=="[object Date]"
}

// 自适应改变html font字体大小,使使用rem单位进行页面自适应移动终端
(function () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function () {
    var clientWidth = document.body.clientWidth;
    if(!clientWidth){
      return;
    }
    document.documentElement.style.fontSize = 10 * (clientWidth/375)+ 'px';
    document.documentElement.style.visibility = 'visible';
  }
  if(!document.documentElement.addEventListener){
    return;
  }
  window.addEventListener(resizeEvt,recalc,false);
  window.addEventListener('DOMContentLoaded',recalc,false);
})();


var jObj = new Object();
var pull_action='down';
var modalFlag=false;//是否是弹出层，用于禁止弹出层底层滚动
var tag1=1,//一级菜单id
    tag2=1;//二级菜单id
function ajaxJson(_url,param){
	var callback = arguments[2]?arguments[2]:"ajaxCallback";
	var type=arguments[3]?arguments[3]:config.JSONMETHOD;
	var dataType=arguments[4]?arguments[4]:'json';
	var async=arguments[5]?arguments[5]:false;

	_url = config.SERVER_URL  + _url + '/?callback=?';  //服务器请求地址

	//设置平台 IOS， Android
	if(jObj.platform== undefined || jObj.platform == ''){
		jObj.platform ==config.PLATFORM;
	}else{
		jObj.platform ==jObj.platform;
	}
	//经度
    if (jObj.longitude != undefined && jObj.longitude != '') {
        param.longitude = jObj.longitude;
    }
    //纬度
    if (jObj.latitude != undefined && jObj.latitude != '') {
        param.latitude = jObj.latitude;
    }
    //微信端登录令牌
    if (jObj.logintoken == undefined || jObj.logintoken == '') {
        param.logintoken = $.cookie('logintoken');
        if (typeof(param.logintoken) == "undefined" || param.logintoken == '') {
            param.logintoken = I('logintoken', '');
        }
    } else {
        param.logintoken = jObj.logintoken;
    }
    //微信公众号id
    if (jObj.wxappid == undefined || jObj.wxappid == '') {
        param.wxappid = $.cookie('wxappid');
        if (typeof(param.wxappid) == "undefined" || param.wxappid == '') {
            param.wxappid = IurlParam('wxappid', '');
        }
    } else {
        param.wxappid = jObj.wxappid;
    }
    var ajaxdo=$.ajax({
    	url:_url,
    	type:type,
    	timeout:config.TIMEOUT,
    	data:param,
    	dataType:dataType,
    	async:async,
    	success:function(data){
    			eval(callback(data));
                 		
    	},
    	error:function(){
    		return false;
    	}
    });


}



//页面加载完的回调函数，做所有页面公共处理的地方
$(document).ready(function(){
    //设置userid
    // setUserid();
    // setMid();
    // //处理微信环境
    // if (is_weixn(true)) {
    //     //设置openid
    //     setOpenid();
    // }
   // $('body').append(loadgif());
    appStart();
    document.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
    if(modalFlag==1){　　　　　　　　　　　　　　　　　　　　　　　　　　　　//判断是遮罩显示时执行，禁止滚屏
        event.preventDefault();　　　　　　　　　　　　　　　　　　　//最关键的一句，禁止浏览器默认行为
    }
})
});


//页面加载中gif
function Endload(){
	$('#loader_model').remove();
}
//在页面加载完之后插入loading动画
function loadgif(){
	var loadgif='<div id="loader_model" style="position: fixed;bottom:0; top:0;left:0;right:0;background: url(/web/img/loading.gif);z-index: 999;background-position: -130px 50px"></div>'
	return loadgif;
}


/*****************************************************************************************/
/*****************************************************************************************/


/**
 * 获取url参数
 */
function IurlParam(name) {
    var def;  //默认值
    if (typeof(arguments[1]) == "undefined") {
        def = '';
    } else {
        def = arguments[1];
    }
    var param = window.location.search;  //URL参数
    if (param == '') {
        return def;
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = param.substr(1).match(reg);
    if (r == null) {
        return def;
    }
    return (r[2]);
}

//构建引擎模板

function getDotRender(_id){
	var template =document.getElementById(_id);
	if(template != undefined){
		var doTTmp=doT.template(template.innerHTML);
		return doTTmp;
	}
}

//页面跳转

function PageGoto(_page,params){
      var url='';
      if (params != '') {
        if (PAGE[_page].indexOf('?') > -1) {
            url = PAGE[_page] + '&' + objToUrl(params).substr(1);
        } else {
            if((params== undefined || JSON.stringify(params)=='{}') && ['index','search'].indexOf(_page)>-1){
                url = PAGE[_page] + objToUrl(params).substr(1);
            }else{
                url = PAGE[_page] + '?' + objToUrl(params).substr(1);
            }
            
        }
    }
    location.href=url;
}

//JS对象转URL参数
function objToUrl(obj,key,encode){
    if(obj==null) return '';//如果传入的对象为null或者undefined，返回
    var objStr='';//初始化返回结果
    var t= typeof(obj);//深度递归结束标志
    if(t === 'string' || t=== 'number' || t==='boolean'){//如不为object则结束递归
        objStr+='&'+key+'='+((encode==null|| encode)?encodeURIComponent(obj):obj);
    }else {
        for (var i in obj) {//如为object，对象或者数组则分别处理并递归
            var k = (key == null ?//当前传入的为层次最深的对象，
                    i : 
                    key + //否则未到最深，
                    (obj instanceof Array ? 
                        '[' + i + ']' : //当前节点为数组
                        '.' + i   //当前节点为对象
                    ));
            objStr += objToUrl(obj[i], k, encode);//递归
        }
    }
    return objStr;
}

//验证表单
// function checkInput(type,params){
//     if(typeof params != "object") return;
//     var result=true;
//     var phoneFilter=/^1\d{10}/;    
//     if(!phoneFilter.test(params.phone)) return "请输入正确格式的手机号";
    
//     if(params.passwd!=undefined && (params.passwd.length<4 || params.passwd.length>16)) return "密码位数不合适,请重新输入";
//     if(type =="RegR"){
//         if(params.valid==undefined || params.valid=="") return "请输入验证码！";
//     }
//     if(type == 'RegR' || type == 'LogL' || type=='findL'){
//         if(params.verify==undefined || params.verify=="") return "请输入手机验证码！";
//     }   
//     return true; 
//    // return true;
// }

var is_tipstext_timeout;
function tipsLayer(text,time){
    var layerIcon=arguments[2]?arguments[2]:false;//是否显示图标
    var iconNum=arguments[3]?arguments[3]:1;
    var effect=Math.abs(iconNum);
    var iconSrc='/web/travels/img/icon'+iconNum+'.png';
    var hide=true;
    if($('.tipsLayer').length==0){
        if(!layerIcon){
            $('body').append('<div class="tipsLayer hide"><div><span></span></div></div>');
        }else if(iconNum>0){
            $('body').append("<div class='tipsLayer hide'><div><p><img src='"+iconSrc+"'></p><span></span></div></div>");
        }else{
            $('body').append("<div class='tipsLayer hide'><div><p></p><span></span></div></div>");
            createLoadingEffect(effect);
        }   
    }else if(!layerIcon){
         $('.tipsLayer>div>p').remove();
    }else if(layerIcon){
        $('.tipsLayer>div>p').remove();
        //if(!$('.inputTipsText>div').has('p').length)
        if(iconNum>0){
            $('.tipsLayer>div').prepend("<p><img src=''/></p>");
            $('.tipsLayer>div>p>img').attr('src',iconSrc);
        }else{
            $('.tipsLayer>div').prepend("<p></p>");
            createLoadingEffect(effect);
        }
    }
    if(typeof(arguments[1])=='undefined'){
        time=3000;//默认2秒自动隐藏提示框
    }else if(arguments[1]==-1){
        hide=false;//当参数 time == -1时，提示框常驻不会消失,需手动让其消失
    }
    if($('.tipsLayer').attr('class').indexOf('hide')>-1){//当提示框隐藏时
        $('.tipsLayer>div>span').html(text);
        $('.tipsLayer').removeClass('hide');
        if(hide){
            is_tipstext_timeout=setTimeout(function(){
              $('.tipsLayer').addClass('hide');
            },time);
        }
    }else{//提示框正在显示时
        clearTimeout(is_tipstext_timeout);  //清除上一个倒计时
        $('.tipsLayer>div>span').html(text);
        $('.tipsLayer').removeClass('hide');
        if(hide){
            is_tipstext_timeout=setTimeout(function(){
              $('.tipsLayer').addClass('hide');
            },time);
        }
    }

}
function createLoadingEffect(effect){
    var html="<div class='loading_eff_"+effect+"'>";
    var load_inner_count = 0;
    switch(effect){
        case 1:
        case 2:
            load_inner_count=8;
            break;
        case 3:
        case 4:
        case 6:
            load_inner_count=3;
            break;
        case 5:
            load_inner_count=5;
            break;
        default:
            load_inner_count=8;
            break;
    }
    for(var i=0;i<load_inner_count;i++){html+='<div></div>'}
    html+='</div>';
    $('.tipsLayer>div>p').append(html);
}

function isLogin(goparam){
    var result= false;console.log($.cookie('user_id'));
    if($.cookie('user_id')=="null" || $.cookie('user_id')=='' || $.cookie('user_id')==null){
        var obj={};
        obj=goparam;
        PageGoto('login',obj);
    }else{
        result= true;   
    };
    return result;
}

/**
 * 获取userid
 */
function getUserid() {
    var userid = I('user_id', '');
    if (userid == '') {
        userid = $.cookie('user_id');
    }
    if (typeof(userid) == "undefined" || userid == 0) {
        userid = 0;
    }
    return userid;
}

/**
 * 获取url参数
 */
function I(name) {
    var def;  //默认值
    if (typeof(arguments[1]) == "undefined") {
        def = '';
    } else {
        def = arguments[1];
    }
    var param = window.location.search;  //URL参数
    if (param == '') {
        return def;
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = param.substr(1).match(reg);
    if (r == null) {
        return def;
    }
    return (r[2]);
}
//url参数转化为对象
function urlparamToobj(){
    var param=window.location.search.substring(1);
    var params = param.split('&');
    var res = {};
    for(var i = 0;i<params.length;i++){
        var str = params[i].split('=');
        res[str[0]]=str[1];
    }
    return res
        
}

    // 日期弹窗配置
 function datetimeDateInit(monthSelected) {
        $(function (monthSelected) {

            // Mobiscroll Date & Time initialization
            $('#datetimeInvalid-riqizao').mobiscroll().date({
                theme: 'material',      // Specify theme like: theme: 'ios' or omit setting to use default
                lang: 'zh',    // Specify language like: lang: 'pl' or omit setting to use default
                display:'bottom',  // Specify display mode like: display: 'bottom' or omit setting to use default
                mode: 'scroller'         // More info about mode: https://docs.mobiscroll.com/3-0-0_beta3/datetime#!opt-mode
            });
               $('#datetimeInvalid-riqiwan').mobiscroll().date({
                theme: 'material',      // Specify theme like: theme: 'ios' or omit setting to use default
                lang: 'zh',    // Specify language like: lang: 'pl' or omit setting to use default
                display:'bottom',  // Specify display mode like: display: 'bottom' or omit setting to use default
                mode: 'scroller'         // More info about mode: https://docs.mobiscroll.com/3-0-0_beta3/datetime#!opt-mode
            });

            $('.datetimeInvalid-zuizao').click(function () {
                
                $('#datetimeInvalid-riqizao').mobiscroll('show');
                $('.riqifilter').css('display','none');
                return false;
            });
            $('.datetimeInvalid-zuiwan').click(function () {
                $('#datetimeInvalid-riqiwan').mobiscroll('show');
                 $('.riqifilter').css('display','none');
                return false;
            });

            $('#datetimeDate-clear').click(function () {
                $('#datetimeInvalid-riqi').mobiscroll('clear');
                return false;
            });

        });    
}

//原生实现固定钉子功能
function JMsticky(){
    var sticky = document.querySelector('.JMsticky');  
    var origOffsetY = sticky.offsetTop;  
      
    function onScroll(e) {  
      window.scrollY >= origOffsetY ? sticky.classList.add('fixed') :  
                                      sticky.classList.remove('fixed');  
    }       
    document.addEventListener('scroll', onScroll);  
}
function loadModernizr(){
    console.log('下载兼容性检测库Modernizr');
}

//mui上拉下拉刷新初始化
function mui_init(){
    mui.init({
      pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        // down : {//下拉配置
        //   height:50,//可选,默认50.触发下拉刷新拖动距离,
        //   auto: true,//可选,默认false.自动下拉刷新一次
        //   contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        //   contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        //   contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        //   callback :pullDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        // },
        up : {//上拉配置
          height:50,//可选.默认50.触发上拉加载拖动距离
          auto:true,//可选,默认false.自动上拉加载一次
          contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
          //contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
          callback :pullUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }

      }
    });
    //普通列表刷新设置停止上次刷新
    mui('#refreshContainer').pullRefresh().setStopped(true);
}
// //下拉业务处理函数
// function pullDown(){
//     console.log('pulldownRefresh down');
//     pull_action='down';
//     getData(tag1,tag2);
//     // 加载完数据之后结束正在加载字样
//     mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
//     //重置上拉刷新
//     mui('#refreshContainer').pullRefresh().refresh(true);
    
// }
//上拉业务处理函数
function pullUp(){
    console.log('pulldownRefresh up');
    pull_action='up';
    getData(tag1,tag2);
    // 加载完数据之后结束正在加载字样
    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    //重置上拉刷新
    mui('#refreshContainer').pullRefresh().refresh(true);
}

function localStore(_key){
    if(typeof _key != 'string')return;
    if(arguments[1]==undefined){
        return window.localStorage._key;
    }else{
        window.localStorage.setItem(_key,arguments[1]);
    }

}
//验证码倒计时
var remainTime=60;
var remainTimeobj;
var t;
var sent=false;
function settime(obj){//开始倒计时
    if (typeof obj != "object") return
    remainTimeobj=obj;  
    t=setInterval(function(){
        remainTime--;
        if(remainTime==0){
            $.cookie("secondsremained",null);
            $(remainTimeobj).html('重新发送');
            $(remainTimeobj).removeClass('sent');
            remainTime=60;
            sent=false;
            $('.code-image').attr('src',config.SERVER_URL+'/validate.php');
            $('.code-input input').val('');
            clearInterval(t);
        }else{
             $(remainTimeobj).addClass('sent');
            $(remainTimeobj).html('<div>'+remainTime+'</div>');
        }
        
    },1000);
}

//禁止弹出层滚动
function stopscroll(flag){
    if(flag){
        $("body").height($(window).height()).css({
          "overflow-y": "hidden"
        });
    }else{
        $("body").height('100%').css({
          "overflow-y": "scroll"
        });
    }
}
// //60s倒计时
// var countdown=60; 
// function settime(obj) { 
//     if (countdown == 0) { 
//         obj.attr("disabled",false);    
//         obj.value="获取验证码"; 
//         countdown = 60; 
//         return;
//     } else { 
//         obj.attr("disabled", true); 
//         obj.value="重新发送(" + countdown + ")";
//         countdown--; 
//     } 
//     setTimeout(function() { 
//         settime(obj) }
//         ,1000) 
// }


//屏蔽页面复制效果
function clearCopy() {
    if(!is_weixn(true)){
        return;
    }
    document.body.oncontextmenu = function () {
        return false;
    };
    document.body.ondragstart = function () {
        return false;
    };
    document.body.onselectstart = function () {
        return false;
    };
    document.body.onbeforecopy = function () {
        return false;
    };
    document.body.onselect = function () {
        if(document.selection){
            document.selection.empty();
        }else{
            window.getSelection().empty();
        }
    };
    document.body.oncopy = function () {
         if(document.selection){
            document.selection.empty();
        }else{
            window.getSelection().empty();
        }
    };
}
window.onload = clearCopy;

//常用函数
function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}
function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    }
}
function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    }
}

function preDefault() {
    event.preventDefault();
}
function forBidMove() {	//禁止touchmove
    document.getElementsByTagName('body')[0].addEventListener('touchmove', preDefault);
}
function allowMove() {	//恢复touchmove
    document.getElementsByTagName('body')[0].removeEventListener('touchmove', preDefault);
}


/**
 * 公共函数文件
 */

/**
 * 获取url参数
 */
function I(name) {
    var def;  //默认值
    if (typeof(arguments[1]) == "undefined") {
        def = '';
    } else {
        def = arguments[1];
    }
    var param = window.location.search;  //URL参数
    if (param == '') {
        return def;
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = param.substr(1).match(reg);
    if (r == null) {
        return def;
    }
    return (r[2]);
}

/**
 * 创建一个空对象
 */
function M() {
    return new Object();
}

/**
 * 获取url参数数组
 */
function GetUrlPars() {
    var url = location.search;
    var Request = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var sTemp = strs[i].split("=");
            Request[sTemp[0]] = (sTemp[1]);
        }
    }
    return Request;
}


/**
 * 获取访问终端
 */
function getDeviceType() {
    if (DEBUG == 1) {
        return "web";
    }
    //判断访问终端
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (!(browser.versions.mobile || browser.versions.android || browser.versions.ios)) {
        return "web";
    }

    if (browser.versions.android) {
        return "android";
    }

    if (browser.versions.ios) {
        return "ios";
    }
}

/**
 * 判断是否是微信
 */
function is_weixn() {
    var iswx = arguments[0] ? arguments[0] : false;//真正的微信客户端判断
    var ua = navigator.userAgent.toLowerCase();
    if(iswx){
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }else{
        //在微信，或者非神马嘀嘀客户端都认为是微信（为了支付都统一跳转网页收银台）
        if (ua.match(/MicroMessenger/i) == "micromessenger" || !ua.match(/shenmadidi/i)) {
            return true;
        } else {
            return false;
        }
    }
}

//利用canvasjiang img转换成为base64
function getImage(img) {
    var image = new Image();
    image.crossOrigin = '';
    image.src = img;
    image.onload = function () {
        var base64 = getBase64Image(image);
        return base64;
    }
    return img;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}
/**
 * JS对象转URL参数
 */
function urlEncode(param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};

function TitleReSet(title) {
    // body...
    //如果是IOS端微信,无法直接修改title.需要下面这一段神代码...
    //没看懂为什么添加一个iframe,然后remove掉就能动态修改title.
    document.title = title;
    var $body = $('body');
    var $iframe = $('<iframe src="/favicon.ico" style="display:none;"></iframe>');
    $iframe.on('load', function (argument) {
        //console.log("loading....");
        setTimeout(function () {
            //console.log("remove....");
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
}

function changeBg(color1, color2, obj) {
    obj.css('background-color', color1);
    setTimeout(function () {
        obj.css('background-color', color2);
    }, 200);
}


/**
 * JS转码去除Html标签
 */
function clearHtml(text) {
    var div=document.createElement('div');div.innerHTML=text;
    var content=div.innerText || div.textContent;
    content = content.replace(/<\/{0,}[a-z](.+?)>/gi,"");
    return content;
}