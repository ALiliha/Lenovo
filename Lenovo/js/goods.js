$(function() {
	$.ajax({
		type: "get",
		url: "json/goods.json",
		success: function(res) {
			$.each(res, function(i, product) {
				$('.message').attr('id', res[i].id)
				//console.log(i,product)
				$('#details').html('<p><span>首页</span>&gt;<span>商品详情</span>&gt;<b>' + res[i].name + ',' + res[i].id + '</b></p>');
				var a1 = "";
				$.each(product.img, function(j, img) {
					//	console.log(img)
					a1 += '<li><img src="img/' + img.imgurl + '" /></li>'
				});
				$(".big").html(a1);
				var html = "";
				$.each(product.img, function(j, img) {
					//	console.log(img)
					html += '<li><img src="img/' + img.imgurl + '" /></li>'
				});
				$(".little ul").html(html);
				var content = '<h3>' + res[i].name + '</h3><span>' + res[i].intro + '</span><p><a href="#">' + res[i].welfare + '&gt;&gt;</a></p>';
				$('.message-t').html(content);
				$('.price p .pric').html(product.price);
				$('.model h4').html(product.model[0].title);
				var a2 = "";
				$.each(product.model[0].child, function(j, type) {
					//	console.log(type)
					a2 += '<li>' + type.type + '</li>'
				});
				$('.model ul').html(a2);
				var a3 = "";
				$.each(product.serve, function(k, type) {
					//	console.log(type)
					a3 += '	<li><i class="bg_05 officer1"></i><span>' + type.sev + '</span></li>';
				});
				$('.serve ul').html(a3);
				var a4 = "";
				$.each(product.hot, function(j, hot) {
					//console.log(hot)
					a4 += '<li><img src="img/' + hot.imgurl + '" /><p><b>' + hot.name + '</b><span>' + hot.price + '</span></p></li>';

				});
				//console.log($('.more-l ul'))
				$('#more .more-l ul').html(a4);
				var a5 = '';
				$.each(product.banner, function(j, banner) {
					//console.log(banner)
					a5 += '<li><img src="img/' + banner.imgurl + '" /></li>';
					//console.log(a5)
				});
				$('.more-r .banner').html(a5);
			});
			$('.model ul li').click(function() {

				$(this).addClass('active').siblings().removeClass('active');
			})
			$('.serve ul li').click(function() {

				$(this).addClass('active').siblings().removeClass('active');
			})
			//console.log($('.little ul li'))
			$('.big li').eq(0).addClass('active');
			$('.little ul li').click(function() {
				$(this).addClass('active').siblings().removeClass('active');
				$('.big li').eq($(this).index()).addClass('active').siblings().removeClass('active');
				//console.log($('.big li').eq($(this).index()))

			})
			$('#bug').click(function() {
				var id = $('.message').attr('id');
				//console.log( $('.message').attr('id'))
				var name = $('.message-t h3').html();
				var intro = $('.message-t span').html();
				var img = $('.big .active img').attr('src');
				var kind = $('.model ul .active').html();
				var serve = $('.serve ul .active span').html();
				var price = $('.pric').html();
				console.log(price);
				var num = $('.val').val();
				// console.log(img)
				var arr = [{ id: id, price: price, num: num, name: name, intro: intro, kind: kind, serve: serve, imgurl: img }];
				$.cookie("goods", JSON.stringify(arr));

				$('#bug').attr('href', 'shoppingCar.html');

			})
			var arr = $.cookie('goods');

			if(arr) {
				var sc_arr = JSON.parse(arr);
				$('.last b').html(sc_arr[0].num)
				
			}

			addAmount();

			function addAmount() {
				$("#add").click(function() {
					var val = $(".num .val").val();
					// console.log(val);
					$(".num .val").val(++val);
				})
				$("#sub").click(function() {
					var val = $(".num .val").val();
					// console.log(val);
					if(val > 1) {
						$(".num .val").val(--val);
					}
				})
			}

		}
	});

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
	$(window).scroll(function() {
		var winH = $(window).height(); //可视区域高度
		var oScroll = $(window).scrollTop(); //鼠标滚动的距离
		$('#consult').css('top', oScroll + (winH - $('#consult').outerHeight()) / 2 + "px");

	})
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

})