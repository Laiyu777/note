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
	for(var i=0,len=pics.length;i<len;i++){
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	pics[index].style.display = "block";
	dots[index].className = "active";
}

//定时图片
function setAutoChangeImage(){
	timer = window.setInterval(function(){
		index++;
		if(index>2){
			index = 0;
		}
		changeImage()
	},1000)
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