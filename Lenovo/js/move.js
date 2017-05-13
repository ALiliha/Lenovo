$(function() {
				//第一张显示
				$(".pic li").eq(0).show();
				//鼠标滑过手动切换，淡入淡出
				$("#position li").mouseover(function() {
					$(this).addClass('cur').siblings().removeClass("cur");
					var index = $(this).index();
					i = index; //不加这句有个bug，鼠标移出小圆点后，自动轮播不是小圆点的后一个
					// $(".pic li").eq(index).show().siblings().hide();
					$(".pic li").eq(index).fadeIn(500).siblings().fadeOut(500);
				});
				//自动轮播
				var i = 0;
				var timer = setInterval(play, 3000);
				//向右切换
				var play = function() {
					i++;
					i = i > 4 ? 0 : i;
					$("#position li").eq(i).addClass('cur').siblings().removeClass("cur");
					$(".pic li").eq(i).fadeIn(500).siblings().fadeOut(500);
				}
				//向左切换
				var playLeft = function() {
					i--;
					i = i < 0 ? 4 : i;
					$("#position li").eq(i).addClass('cur').siblings().removeClass("cur");
					$(".pic li").eq(i).fadeIn(500).siblings().fadeOut(500);
				}
				//鼠标移入移出效果
				$("#container").hover(function() {
					clearInterval(timer);
				}, function() {
					timer = setInterval(play, 3000);
				});
				//左右点击切换
				$("#prev").click(function() {
					playLeft();
				})
				$("#next").click(function() {
					play();
				})
			})