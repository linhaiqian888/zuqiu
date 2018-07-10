var teamSum = 11;
var matchSum = 11;

var imgs = new Array("../images/img_1.png", "../images/img_2.png", "../images/img_3.png", "../images/img_4.png", "../images/img_5.png", "../images/img_6.png", "../images/img_7.png", "../images/img_8.png", "../images/img_9.png", "../images/img_10.png",
	"../images/img_11.png", "../images/img_12.png", "../images/img_13.png", "../images/img_14.png", "../images/img_15.png", "../images/img_16.png", "../images/img_17.png", "../images/img_18.png", "../images/img_19.png", "../images/img_20.png",
	"../images/img_21.png", "../images/img_22.png", "../images/img_23.png", "../images/img_24.png", "../images/img_25.png", "../images/img_26.png", "../images/img_27.png", "../images/img_28.png", "../images/img_29.png", "../images/img_30.png",
	"../images/img_31.png", "../images/img_32.png");

var teamnames = new Array("阿根廷", "埃及", "澳大利亚", "巴拿马",
	"巴西", "比利时", "冰岛", "波兰",
	"丹麦", "德国", "俄罗斯", "法国",
	"哥伦比亚", "哥斯达黎加", "韩国", "克罗地亚",
	"秘鲁", "摩洛哥", "墨西哥", "尼日利亚",
	"葡萄牙", "日本", "瑞典", "瑞士",
	"塞尔维亚", "塞内加尔", "沙特阿拉伯", "突尼斯",
	"乌拉圭", "西班牙", "伊朗", "英格兰");

function teamResultLoad(httpUrl, page, count, teamname) {
	
	document.getElementById("list").setAttribute("style", "padding-top: 0px;")
	var f = document.getElementById("list");
	var childs = f.childNodes;

	if(page == 1) {
		teamSum = 11;
		for(var i = childs.length - 1; i >= 0; i--) {
			f.removeChild(childs[i]);
		}
	}
	if(teamSum <= (page * count)) {

		return;
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				console.log("xhr请求已初始化");
				break;
			case 1:
				console.log("xhr请求已打开");
				break;
			case 2:
				console.log("xhr请求已发送");
				break;
			case 3:
				console.log("xhr请求已响应");

				break;
			case 4:
				console.log("xhr请求成功：" + xhr.responseText);
				if(xhr.status == 200) {
					console.log("xhr请求成功：" + xhr.responseText);
					var data = JSON.parse(xhr.responseText);
					if(data.status != 200)
						break;
					teamSum = data.count;
					f.setAttribute("style", "padding-top: 10px;padding-bottom: 10px;")

					for(var i = 0; i < data.data.length; i++) {
						var resultData = data.data[i];
						var para = document.createElement("li");
						//para.setAttribute("style", "margin-bottom: 10px;margin-left: 10px;margin-right: 10px;");
						muicard = document.createElement("div");
						muicard.setAttribute("class", "mui-card");

						divhead = document.createElement("div");
						divhead.setAttribute("class", "mui-card-heade");
						divhead.setAttribute("style", "padding-left: 20px;padding-top: 10px;");
						div0 = document.createElement("div");
						div0.setAttribute("style", "color: #007AFF;font-size: 18px;float: left;");
						div1 = document.createElement("div");
						div1.setAttribute("style", "font-size: 14px;text-align: right;margin-right: 20px;");
						div0.innerHTML = resultData.eventtype;
						div1.innerHTML = resultData.match_time;
						divhead.appendChild(div0);
						divhead.appendChild(div1);

						div = document.createElement("div");
						div.setAttribute("class", "mui-card-content");
						div.setAttribute("style", "position:relative;  height:160px;");
						img0 = document.createElement("img");
						img0.setAttribute("style", "position:absolute;  top:0px;  left:0px;  width:70px;   margin-left: 20px;margin-top: 35px;height:70px;")
						imgLoad(img0, resultData.home_team_name);
						img1 = document.createElement("img");
						img1.setAttribute("style", "position:absolute;   top:0px;  right:0px;   width:70px;  margin-top: 35px;margin-right: 20px; height:70px;")
						imgLoad(img1, resultData.visiting_team_name);
						pleft = document.createElement("p");
						pleft.setAttribute("style", "position:absolute; top:0px;   left:0px;  width: 110px;color: #000000;text-align: center;margin-top: 125px;");
						pmid = document.createElement("p");
						pmid.setAttribute("style", "position: relative; top: 50%;text-align: center; width: 20%; left: 40%;font-size: 30px;transform: translateY(-40%);color: red;");
						pright = document.createElement("p");
						pright.setAttribute("style", "position:absolute; top:0px;   right:0px;  width: 110px;color: #000000;text-align: center;margin-top: 125px;");

						pleft.innerHTML = resultData.home_team_name;
						pmid.innerHTML = resultData.score;
						pright.innerHTML = resultData.visiting_team_name;
						div.appendChild(img0);
						div.appendChild(img1);
						div.appendChild(pleft);
						div.appendChild(pright);
						div.appendChild(pmid);

						muicard.appendChild(divhead);
						muicard.appendChild(div);
						para.appendChild(muicard);
						f.appendChild(para);
					}
				} else {

					console.log("xhr请求失败：" + xhr.status);

				}

				break;
			default:
				break;

		}
	}
	// 初始化HTTP请求
	var url = httpUrl + "/FootBall/matchController.do?findOldMatchs&page=" + page + "&count=" + count + "&teamname=" + teamname;

	xhr.open("GET", url);
	xhr.overrideMimeType("text/html; charset=utf-8"); // 将返回的数据当做UTF-8字符集的纯文本类型处理
	xhr.send();

};

function teamMatchLoad(httpUrl, page, count, teamname) {

	document.getElementById("matchlist").setAttribute("style", "padding-top: 0px;")
	var f = document.getElementById("matchlist");
	var childs = f.childNodes;

	if(page == 1) {
		matchSum = 11;
		for(var i = childs.length - 1; i >= 0; i--) {
			f.removeChild(childs[i]);
		}
	}
	if(matchSum <= (page * count)) {
		return;
	}

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				console.log("xhr请求已初始化");
				break;
			case 1:
				console.log("xhr请求已打开");
				break;
			case 2:
				console.log("xhr请求已发送");
				break;
			case 3:
				console.log("xhr请求已响应");

				break;
			case 4:
				if(xhr.status == 200) {
					console.log("xhr请求成功：" + xhr.responseText);
					var data = JSON.parse(xhr.responseText);
					if(data.status != 200)
						break;
					matchSum = data.count;
					f.setAttribute("style", "padding-top: 10px;padding-bottom: 10px;")
					for(var i = 0; i < data.data.length; i++) {
						var resultData = data.data[i];
						var para = document.createElement("li");
						//para.setAttribute("style", "margin-bottom: 10px;margin-left: 10px;margin-right: 10px;");
						muicard = document.createElement("div");
						muicard.setAttribute("class", "mui-card");

						divhead = document.createElement("div");
						divhead.setAttribute("class", "mui-card-heade");
						divhead.setAttribute("style", "padding-left: 20px;padding-top: 10px;");
						div0 = document.createElement("div");
						div0.setAttribute("style", "color: #007AFF;font-size: 18px;float: left;");
						div1 = document.createElement("div");
						div1.setAttribute("style", "font-size: 14px;text-align: right;margin-right: 20px;");
						div0.innerHTML = resultData.eventtype;
						div1.innerHTML = resultData.match_time;
						divhead.appendChild(div0);
						divhead.appendChild(div1);

						div = document.createElement("div");
						div.setAttribute("class", "mui-card-content");
						div.setAttribute("style", "position:relative;  height:160px;");
						img0 = document.createElement("img");
						img0.setAttribute("style", "position:absolute;  top:0px;  left:0px;  width:70px;   margin-left: 20px;margin-top: 35px;height:70px;")
						imgLoad(img0, resultData.home_team_name);
						img1 = document.createElement("img");
						img1.setAttribute("style", "position:absolute;   top:0px;  right:0px;   width:70px;  margin-top: 35px;margin-right: 20px; height:70px;")
						imgLoad(img1, resultData.visiting_team_name);
						pleft = document.createElement("p");
						pleft.setAttribute("style", "position:absolute; top:0px;   left:0px;  width: 110px;color: #000000;text-align: center;margin-top: 125px;");
						pmid = document.createElement("p");
						pmid.setAttribute("style", "font-weight:bold;position: relative; top: 50%;text-align: center; width: 20%; left: 40%;font-size: 30px;transform: translateY(-40%);color: red;");
						pright = document.createElement("p");
						pright.setAttribute("style", "position:absolute; top:0px;   right:0px;  width: 110px;color: #000000;text-align: center;margin-top: 125px;");

						pleft.innerHTML = resultData.home_team_name;
						pmid.innerHTML = 'VS';
						pright.innerHTML = resultData.visiting_team_name;
						div.appendChild(img0);
						div.appendChild(img1);
						div.appendChild(pleft);
						div.appendChild(pright);
						div.appendChild(pmid);

						muicard.appendChild(divhead);
						muicard.appendChild(div);
						para.appendChild(muicard);
						f.appendChild(para);
					}
				} else {
					console.log("xhr请求失败：" + xhr.status);
				}

				break;
			default:
				break;

		}
	}

	// 初始化HTTP请求
	var url = httpUrl + "/FootBall/matchController.do?findMatchs&page=" + page + "&count=" + count + "&teamname=" + teamname;

	xhr.open("GET", url);
	xhr.overrideMimeType("text/plain; charset=utf-8"); // 将返回的数据当做UTF-8字符集的纯文本类型处理
	xhr.send();

};

function playerController(httpUrl, teamname) {

	document.getElementById("playerlist").setAttribute("style", "padding-top: 0px;")
	var f = document.getElementById("playerlist");
	var childs = f.childNodes;

	for(var i = childs.length - 1; i >= 0; i--) {
		f.removeChild(childs[i]);
	}

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				console.log("xhr请求已初始化");
				break;
			case 1:
				console.log("xhr请求已打开");
				break;
			case 2:
				console.log("xhr请求已发送");
				break;
			case 3:
				console.log("xhr请求已响应");

				break;
			case 4:
				if(xhr.status == 200) {

					console.log("xhr请求成功：" + xhr.responseText);
					var data = JSON.parse(xhr.responseText);
					if(data.status != 200)
						break;
					teamSum = data.count;
					f.setAttribute("style", "padding-top: 10px;padding-bottom: 10px;")

					for(var i = 0; i < data.data.length; i++) {
						var resultData = data.data[i];
						var para = document.createElement("li");
						para.setAttribute("accesskey", resultData);
						//para.setAttribute("style", "margin-bottom: 10px;margin-left: 10px;margin-right: 10px;");
						muicard = document.createElement("div");
						muicard.setAttribute("class", "mui-card");

						div = document.createElement("div");
						div.setAttribute("class", "mui-card-content");
						div.setAttribute("style", "height:160px;position:relative;");
						img = document.createElement("img");
						img.setAttribute("style", "height:80px;width:80px;position:absolute;left:10px;top: 10%;")
						img.src = resultData.imgurl;

						h1 = document.createElement("h1");
						h1.setAttribute("style", "position:absolute;top:65%;width:100px;font-size: 14px;text-align: center;");
						h1.innerHTML = resultData.playername;
						div0 = document.createElement("div");
						div0.setAttribute("style", "height: 100%;margin-left: 35%;padding-top: 5px;padding-bottom: 5px;");

						h10 = document.createElement("h1");
						h10.setAttribute("style", "font-size: 12px;height: 22%;");
						h11 = document.createElement("h1");
						h11.setAttribute("style", "font-size: 12px;height: 22%;");
						h12 = document.createElement("h1");
						h12.setAttribute("style", "font-size: 12px;height: 22%;");
						h13 = document.createElement("h1");
						h13.setAttribute("style", "font-size: 12px;height: 22%;");
						h10.innerHTML = "出生:" + resultData.birthday + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年龄:" + resultData.playerage;
						h11.innerHTML = "位置:" + resultData.playerposition + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;习惯:" + resultData.playerfoot;
						h12.innerHTML = "体重:" + resultData.playerweight + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;身高:" + resultData.playerheight;
						h13.innerHTML = "场次:" + resultData.playernumber;

						div0.appendChild(h10);
						div0.appendChild(h11);
						div0.appendChild(h12);
						div0.appendChild(h13);

						div.appendChild(img);
						div.appendChild(h1);
						div.appendChild(div0);

						muicard.appendChild(div);
						para.appendChild(muicard);
						f.appendChild(para);
					}
				} else {
					console.log("xhr请求失败：" + xhr.status);
				}

				break;
			default:
				break;

		}
	}
	// 初始化HTTP请求
	var url = httpUrl + "/FootBall/playerController.do?findPlayerGroups&teamname=" + teamname;

	xhr.open("GET", url);
	xhr.overrideMimeType("text/plain; charset=utf-8"); // 将返回的数据当做UTF-8字符集的纯文本类型处理
	xhr.send();

};
/**
 * 登录接口
 */
function login(httpUrl) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				console.log("xhr请求已初始化");
				break;
			case 1:
				console.log("xhr请求已打开");
				break;
			case 2:
				console.log("xhr请求已发送");
				break;
			case 3:
				console.log("xhr请求已响应");

				break;
			case 4:
				if(xhr.status == 200) {

					console.log("xhr请求成功：" + xhr.responseText);
					var data = JSON.parse(xhr.responseText);

					if(data.message != null) {
						mui.toast(data.message);
					}
					if(data.status == 200) {
						try {
							localStorage.setItem('user', xhr.responseText);
						} catch(e) {
							console.log("Storage failed:" + e); //存储失败
						}
						mui.back();
					}

				} else {
					console.log("xhr请求失败：" + xhr.status);
				}

				break;
			default:
				break;

		}
	};
	var phone = document.getElementById('phone').value;
	var pwd = document.getElementById('pwd').value;
	var url = httpUrl + "/FootBall/userController.do?login&tel=" + phone + "&password=" + pwd;

	xhr.open("GET", url);
	xhr.overrideMimeType("text/plain; charset=utf-8"); // 将返回的数据当做UTF-8字符集的纯文本类型处理
	xhr.send();

};

function register(httpUrl) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				console.log("xhr请求已初始化");
				break;
			case 1:
				console.log("xhr请求已打开");
				break;
			case 2:
				console.log("xhr请求已发送");
				break;
			case 3:
				console.log("xhr请求已响应");

				break;
			case 4:
				if(xhr.status == 200) {

					console.log("xhr请求成功：" + xhr.responseText);
					var data = JSON.parse(xhr.responseText);
					if(data.message != null) {
						mui.toast(data.message);
					}
					if(data.status == 200) {
						localStorage.setItem('user', data);
						mui.back();
					}

				} else {
					console.log("xhr请求失败：" + xhr.status);
				}

				break;
			default:
				break;

		}
	};
	var username = document.getElementById('username').value;
	var phone = document.getElementById('phone').value;
	var pwd = document.getElementById('pwd').value;
	var url = httpUrl + "/FootBall/userController.do?register&username=" + username + "&tel=" + phone + "&password=" + pwd;

	xhr.open("GET", url);
	xhr.overrideMimeType("text/plain; charset=utf-8"); // 将返回的数据当做UTF-8字符集的纯文本类型处理
	xhr.send();
}

function imgLoad(img, data) {
	var isfalse = false;
	
	for(var i = 0; i < teamnames.length; i++) {

		if(teamnames[i] == data) {
			img.src = imgs[i];
			isfalse = true;
		}
	}
	if(!isfalse) {

		img.src = "../images/icon_default.png";
	}
};