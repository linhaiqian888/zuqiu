var menu = null;
var main = null;
var showMenu = false;
var isInTransition = false;
//开始预加载菜单页；
mui.plusReady(function() {
	main = plus.webview.currentWebview();
	main.addEventListener('maskClick', closeMenu);
	//处理侧滑导航，为了避免和子页面初始化等竞争资源，延迟加载侧滑页面；
	setTimeout(function() {
		menu = mui.preload({
			id: 'sidemenu.html',
			url: './html/sidemenu.html',
			styles: {
				left: 0,
				width: '280px',
				zindex: -1
			}
		});
	}, 200);
});
//打开侧滑窗口；
function openMenu() {
	if(isInTransition) {
		return;
	}
	if(!showMenu) {
		//侧滑菜单处于隐藏状态，则立即显示出来；
		isInTransition = true;
		menu.setStyle({
			mask: 'rgba(0,0,0,0)'
		}); //menu设置透明遮罩防止点击
		menu.show('none', 0, function() {
			//主窗体开始侧滑并显示遮罩
			main.setStyle({
				mask: 'rgba(0,0,0,0.4)',
				left: '280px',
				transition: {
					duration: 200
				}
			});
			mui.later(function() {
				isInTransition = false;
				menu.setStyle({
					mask: "none"
				}); //移除menu的mask
			}, 200);
			showMenu = true;
		});
	}
};
//关闭侧滑窗口；
function closeMenu() {
	if(isInTransition) {
		return;
	}
	if(showMenu) {
		//关闭遮罩；
		//主窗体开始侧滑；
		isInTransition = true;
		main.setStyle({
			mask: 'none',
			left: '0',
			transition: {
				duration: 200
			}
		});
		showMenu = false;
		//等动画结束后，隐藏菜单webview，节省资源；
		mui.later(function() {
			isInTransition = false;
			menu.hide();
		}, 200);
	}
};
//点击头部菜单小图标，打开侧滑菜单；
document.querySelector('.mui-icon-bars').addEventListener('tap', openMenu);
//点击自定义按钮，打开侧滑菜单；
//document.querySelector('#show-btn').addEventListener('tap', openMenu);
//menu页面点击后关闭菜单；
window.addEventListener("menu:tap", closeMenu);