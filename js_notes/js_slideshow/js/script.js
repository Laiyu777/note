//获取id的方法
function getID(id){
	return typeof(id) === "string"?document.getElementById(id):id;
}

var timer = null;
var index = 0;
var main = getID("main"); 
var pics = getID("banner").getElementsByTagName("div");
var dots = getID("dots").getElementsByTagName("span");
var preBtn = getID("preBtn");
var nextBtn = getID("nextBtn");
var menucontent = getID("menu-content");
var menus = getID("menu-content").getElementsByClassName("menu-item");
var submenu = getID("sub-menu")
var subboxs = submenu.getElementsByClassName("sub-menu-box");

//定时换图片
//鼠标移动到main中的时候要取消定时换图片，离开的时候才会自动换图片
function changeImage(){
	//遍历图片，先将图片隐藏
	//1.滑动的效果可以使用高度,遍历设置要显示的div
	//2.用透明度的淡入淡出效果
		//透明度会占据原来的空间。transition不能作用在display上
		//
	 //pics[index].style.display = "block";
	 //pics[index].style.height = "460px";
	for(var i=0,len=pics.length;i<len;i++){
		//pics[i].style.height = "0px";
		pics[i].style.opacity = "0";
		dots[i].className = "";
		//延迟执行的时候，这个时候i变成3，数组越界。
		//window.setTimeout(function(){pics[i].style.display = "none"},500);
		pics[i].style.display="block";
	}
	pics[index].style.opacity = "1";
	dots[index].className = "active";
	//pics[index].style.display="block";
	//window.setTimeout(hideDiv,500);
}

//将另外两个图片的div的display设置成none,这样不会占据空间
//先设置成block在设置none，会将div顶上去，造成效果不均匀。
function hideDiv(){
	console.log("现在index的值是:"+index);
	if(index == 0){
		pics[1].style.display="none";
		pics[2].style.display="none";
	}else if(index == 1){
		pics[0].style.display="none";
		pics[2].style.display="none";
	}else{
		pics[1].style.display="none";
		pics[0].style.display="none";
	}
}

//定时图片
function setAutoChangeImage(){
	timer = window.setInterval(function(){
		index++;
		if(index>2){
			index = 0;
		}
		changeImage()
	},5000);
}
//停止定时更换
function stopAutoChangeImage(){
	clearInterval(timer);
}
//点击更换下一张图片
function nextImage(){
	index++;
	if(index > 2){
		index = 0;
	}
	changeImage();
}
//点击更换上一张图片
function preImage(){
	index --;
	if(index < 0){
		index = 2;
	}
	changeImage();
}

//点击dot更换图片
function dotChangeImage(){
	//遍历dot 一一绑定
	for(var i = 0,len=dots.length;i<len;i++){
		//为了区别是点击哪个dot，可以先在dot上加上属性,改变的图片的实质就是改变index
		dots[i].setAttribute("count",i);
		dots[i].onclick = function(){
			index = this.getAttribute("count");
			changeImage();
		}
	}
}
//鼠标滑过的时候显示图片
function showSubMenu(){
	for(var i = 0,len=menus.length;i<len;i++){
		menus[i].setAttribute("index",i);
		subboxs[i].style.display = "none";
		var yy = null;
		menus[i].onmouseover = function(){
			//将subboxs隐藏
			for(var j=0,len=subboxs.length;j<len;j++){
				subboxs[j].style.display = "none";
			}
			var indexSub = this.getAttribute("index");
			yy = indexSub;
			submenu.className = "sub-menu";
			subboxs[indexSub].style.display = "block";
		}
		menus[i].onmouseout = function(){
			submenu.className = "sub-menu hide";
			subboxs[this.getAttribute("index")].style.display = "none";
		}
	}
	submenu.onmouseover = function(){
		this.className = "sub-menu";
	}
	submenu.onmouseout = function(){
		this.className = "sub-menu hide";
	}
}

function slideImage(){
	//鼠标滑出的时候自动播放
	main.onmouseout = function(){
		setAutoChangeImage();
	}
	main.onmouseover = function(){
		stopAutoChangeImage();
	}
	//为了一点开页面就自动轮换
	main.onmouseout();
	//左右的按钮切换图片
	preBtn.onclick = preImage;
	nextBtn.onclick = nextImage;
	//点击dot更换图片
	dotChangeImage();
	//鼠标滑过的时候显示菜单
	showSubMenu();
	//鼠标移开的时候清除
	// submenu.onmouseout = function(){
	// 	this.className = "sub-menu hide";
	// }
	
}

slideImage();