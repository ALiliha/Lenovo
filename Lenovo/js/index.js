$(function() {
	// ========================头部显示隐藏=========== ==========
	$(".social").hover(function() {
		$(".social .contact").css("display", "block")
	}, function() {
		$(".social .contact").css("display", "none")
	})
	$(".phone").hover(function() {
		$(".phone .QR").css("display", "block")
	}, function() {
		$(".phone .QR").css("display", "none")
	})
	//=============================登录注册==========================
	$('.login').click(function(){
		$('#shadow').css('display','block');
		$('#login').css('display','block');
		$('#login .close').click(function(){
			$('#shadow').css('display','none');
			$('#login').css('display','none');
		})
	})
	$('.register').click(function(){
		$('#shadow').css('display','block');
		$('#register').css('display','block');
		$('#register .close').click(function(){
			$('#shadow').css('display','none');
			$('#register').css('display','none');
		})
	})
	//=========================侧边导航==============================================
	$.ajax({
					url: "json/indexdata.json",
					type: "GET",
					success: function(res) {
						var asideArr = res[0].content;
						var html = "";
						$.each(asideArr,function(i,title){
						//	console.log(i,title)
							html += '<li class="pro"><p class="hr"><a href="#" class="kinds">' + title.title +
								'</a><span>&gt;</span></p><div class="clear details"><div class="data l">';
							$.each((asideArr[i].child), function(j,v1) {
								//console.log(j,v1)
								html +='<p><a href="#">'+v1.title+'</a></p>';
								if(asideArr[i].child[j].child){
										html +='<ul class="clear">'
								}
								$.each(asideArr[i].child[j].child,function(k,v2){
									//console.log(k,v2)
									html+='<li><span>|</span><a href="#">'+v2.name+'</a></li>'
								})
								if(asideArr[i].child[j].child){
										html +='</ul>'
									}
							});
							html += '</div><div class="r"><img src="img/'+title.imgUL1+'" /><img src="img/'+title.imgUL2+'" /></div></div></li>';
						})
                       $(".aside").html(html);
						$(".aside li:nth-child(4) span").remove();
						$(".aside li:nth-child(4) .details").remove();
						$(".aside li:last-child").css('padding-bottom', '4px');
						$("aside .aside .pro").hover(function() {
							$(this).addClass('active').siblings().removeClass("active");
							$(this).find('.kinds').addClass('active').siblings().removeClass("active");
							$(this).find('.details').css('display', 'block');
						}, function() {
							$(this).removeClass('active');
							$(this).find('.kinds').removeClass('active')
							$(this).find('.details').css('display', 'none')
						})
					}
				})
	//===================================广告轮播图====================================================
	//提取数据 创建动态页面
	$.ajax({
		url: "json/indexdata.json",
		type: "GET",
		success: function(res) {
			var bannerArr = res[1].content;
			var html = "";
			for(var i = 0; i < bannerArr.length; i++) {
				html += "<li><a><img src='img/" + bannerArr[i].imgURL + "' /></a></li>"
			}
			var point = "";
			$(".photo").html(html);
			for(var i = 0; i < bannerArr.length; i++) {
				point += "<li></li>";
			}
			$(".btn").html(point);
			//console.log($(".btn").find("li")[0]);
			$(".btn li").eq(0).addClass("active");
			var timer = 0;
			var i = 0; //下标
			var play = function() {
				i++;
				i = i > bannerArr.length ? 0 : i; //如果下标大于当前广告图长度，那么下标为0 否者是当前下标
				$(".btn li").eq(i).addClass("active").siblings().removeClass("active");
				$(".photo li").eq(i).fadeIn(500).siblings().fadeOut(500);
			}
			var playLeft = function() {
				i--;
				i = i < 0 ? bannerArr.length : i; //如果当前是第一张，那么向左运动 显示最后这一张
				$(".btn li").eq(i).addClass("active").siblings().removeClass("active");
				$(".photo li").eq(i).fadeIn(500).siblings().fadeOut(500);
			}
			timer = setInterval(play, 4000);
			$(".banner").hover(function() {
				startMove($(".banner").find("p")[0], { opacity: 40 });
				clearInterval(timer);
			}, function() {
				startMove($(".banner").find("p")[0], { opacity: 0 });
				timer = setInterval(play, 4000);
			})
			$(".banner p #prev").click(function() {
				playLeft();
			})
			$(".banner p #next").click(function() {
				play();
			})
		}

	})
	//=============================精彩讨论区===========================
	$.ajax({
		url: "json/indexdata.json",
		type: "GET",
		success: function(res) {
			var newsArr = res[2].content;
			var html = "";
			for(var i = 0; i < newsArr.length; i++) {
				html += "<li class='over'><a href='#'><span>【" + newsArr[i].label + "】</span>" + newsArr[i].title + "</a></li>"
			}
			$(".news").find("ul").html(html);
		}
	})
	//================今日推荐========================================
	$.ajax({
		url: "json/indexdata.json",
		type: "GET",
		success: function(res) {
			var recommendArr = res[3].content;
			var html = "";
			//console.log(recommendArr.length)
			for(var i = 0; i < recommendArr.length; i++) {
				html += "<li><a href='#'><img src='img/" + recommendArr[i].imgurl + "' /></a></li>"
			}
			$(".recommend").find("ul").html(html + html);
			//console.log($(".recommend ul li").length)
			$(".recommend ul").css("width", $(".recommend ul li").outerWidth(true) * $(".recommend ul li").length);
			//console.log($(".recommend ul").css("width"));

			$(".recommend").hover(function() {
				startMove($(".recommend").find("p")[0], { opacity: 40 });
			}, function() {
				startMove($(".recommend").find("p")[0], { opacity: 0 });
			})
			var count = 0;

			$(".recommend p #prev").click(function() {

				if(count == 0) {
					$('.recommend').find("ul").css("left", "-" + (parseInt($('.recommend').find("ul").css("width")) / 2) + "px");
					count = 6;
				}
				count--;
				var left = parseInt($('.recommend').find("ul").position().left);
				var width = parseInt($('.recommend').find("li").css("width"));
				$('.recommend').find("ul").animate({ left: left + width });

				return false;
			})
			$(".recommend p #next").click(function() {
				if(count == 6) {
					$('.recommend').find("ul").css("left", 0);
					count = 0;
				}
				count++;
				var left = parseInt($('.recommend').find("ul").position().left);
				var width = parseInt($('.recommend').find("li").css("width"));
				$('.recommend').find("ul").animate({ left: left - width });
				return false;
			})

		}
	})
	//=============================明星单品=========================
	$.ajax({
		url: "json/indexdata.json",
		type: "GET",
		success: function(res) {
			var starArr = res[4].content;
			var html = "";
			$(".star-t").prepend("<h3 class='l'>" + res[4].title + "</h3>")
			for(var i = 0; i < starArr.length; i++) {
				html += "<li id="+starArr[i].id+"><a href=goods.html?"+starArr[i].id+".html'><img src='img/" + starArr[i].imgUrl +
					"' /></a><span><a href='#'>" + starArr[i].name + "</a></span><p><a href='#'>" + starArr[i].intro +
					"</a></p><b><a href='#'>" + starArr[i].price + "</a></b></li>";
			}
			
			$(".star-b ul").html(html + html);
			
			$(".star-b ul").css("width", $(".star-b ul li").outerWidth(true) * $(".star-b ul li").length);
            
			var count = 0;
			$("#star .star-t p #prev").click(function() {

				if(count == 0) {
					$('.star-b').find("ul").css("left", "-" + (parseInt($('.star-b').find("ul").outerWidth(true)) / 2) + "px");
					count = 12;
				}
				count--;
				var left = parseInt($('.star-b').find("ul").position().left);
				var width = parseInt($('.star-b').find("li").outerWidth(true));
				$('.star-b').find("ul").animate({ left: left + width });

				return false;
			})
			$("#star .star-t p #next").click(function() {
				if(count == 12) {
					$('.recommend').find("ul").css("left", 0);
					count = 0;
				}
				count++;
				var left = parseInt($('.star-b').find("ul").position().left);
				var width = parseInt($('.star-b').find("li").outerWidth(true));
				$('.star-b').find("ul").animate({ left: left - width });
				return false;
			})
		}
	})
	//=======================================楼层=====================================
	$.ajax({
		url: "json/indexdata.json",
		type: "GET",
		success: function(res) {
			var floorArr = res[5].child;
			var html = "";
			for(var i = 0; i < floorArr.length - 1; i++) {
				html += "<div class='floor" + (i + 1) + " margin'><div class='floor-t clear'><h3 class='title l'>" + floorArr[i].title + "</h3></div><div class='floor-b clear'><img src='img/" + floorArr[i].banner + "' class='l banner'/><ul class='l'>";
				/*console.log("<div class='floor"+(i+1)+" margin'><div class='floor-t clear'><h3 class='title l'>"+floorArr[i].title+"</h3></div><div class='floor-b clear'><img src='img/"+floorArr[i].banner+"' class='l banner'/></div></div>")*/

				for(var j = 0; j < floorArr[0].product.length; j++) {
					html += "<li><a href='#'><img src='img/" + floorArr[i].product[j].img + "'/></a><span><a href='#'>" + floorArr[i].product[j].name + "</a></span><p><a href='#'>" + floorArr[i].product[j].intro + "</a></p><b><a href='#'>" + floorArr[i].product[j].price + "</a></b></li>";
				}
				html += "</ul></div></div>";
			}
			html += "<div class='floor7 margin'><div class='floor-t clear'><h3 class='title l'>" + floorArr[6].title + "</h3></div><ul>";
			for(var k = 0; k < floorArr[6].community.length; k++) {
				html += "<li><a href='#'><img src='img/" + floorArr[6].community[k].imgUrl + "'/></a></li>";
			}
			$("#floor").html(html);

			//console.log($(".floor7").siblings().find("li").find("img"))

			//1-6楼鼠标滑过 图片左右移动
			$(".floor7").siblings().find("li").find("img").hover(function() {
				$(this).animate({
					left: 50
				}, 'normal');
			}, function() {
				$(this).animate({
					left: 30
				}, 'normal');
			});
			//7楼鼠标滑过图片出现阴影
			$(".floor7 ul li img").hover(function() {
				$(this).css("box-shadow", "0 0 30px black");
			}, function() {
				$(this).css("box-shadow", "")
			})

			var oMove = "";
			for(var i = 0; i < floorArr.length; i++) {
				oMove += '<li><span>' + floorArr[i].floor + '</span><b>' + floorArr[i].name + '</b><p></p></li>';
			}
			$(".move ul").html(oMove);
			$(".move ul li").eq(0).find('b').css('width', '36px');
		
			//$('#shadow').css('height',oScroll+80+'px');
			$(window).scroll(function() {
				var winH = $(window).height(); //可视区域高度
				var oScroll = $(window).scrollTop(); //鼠标滚动的距离
				//console.log(oScroll, $('.kong').outerHeight())
				$('#consult').css('top', oScroll + (winH - $('#consult').outerHeight()) / 2 + "px");
			    $('#shadow').css('height',oScroll+winH+'px')
				$('#login').css('top',oScroll+80+'px');
				$('#register').css('top',oScroll+80+'px');
				//console.log($('#floor').offset().top)
				if(oScroll > $('#floor').offset().top-300) {
					$(".move").css({ "top": oScroll + (winH - $('.move').outerHeight()) / 2 + 'px' })
					$(".move").fadeIn();
					//console.log($('#floor .margin'))
					$('#floor .margin').each(function() {
						if(winH + oScroll - $(this).offset().top > winH /2) {
							$(".move ul li span").css('display', 'block'); //初始显示楼层数
							$(".move ul li b").css('display', 'none'); //初始让楼层名称隐藏
							$(".move ul li").eq($(this).index()).find('span').css('display', 'none'); //当到达指定位置的时候让楼层数隐藏
							$(".move ul li").eq($(this).index()).find('b').css('display', 'inline-block'); //显示当前楼层名称	
							$(".move ul li").eq($(this).index()).find('b').addClass('active'); //给当前楼层添加选择之后的样式
						}
					})
				} else {
					$(".move").fadeOut();
				}

			})
			$('.move ul li').click(function() {
				var t = $("#floor .margin").eq($(this).index()).offset().top;
				$('body,html').animate({
					"scrollTop": t
				}, 1000);
				$(this).addClass('active').siblings().removeClass('active');
			});
			$('.top').click(function() {
				$('body,html').animate({
					'scrollTop': 0
				}, 3000);
			})
			/*mouseenter和mouseleave*/
			$('#consult .content li').mouseenter(function() {
				$(this).find('i').css('display', 'none');
				$(this).find('.te').css('display', 'block');
				$(this).find('.child').css('display', 'block');
			})
			$("#consult .content li").mouseleave(function() {
				$(this).find('i').css('display', 'block');
				$(this).find('.te').css('display', 'none');
				$(this).find('.child').css('display', 'none');

			})

		}
	})
})