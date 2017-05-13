$(function(){
	
	var arr = $.cookie('goods');
	
	if(arr){
						var sc_arr = JSON.parse(arr);
						console.log(sc_arr)
						var html = "";
						console.log(sc_arr)
						for(var i in sc_arr){
							html += '<tr><td class="img" width="205"><a href="#"><img src="'+sc_arr[i].imgurl
							+'" alt=""></a></td><td class="gift" width="257"><a href="#">'+sc_arr[i].name
							+'</a></div></td><td width="163">'+sc_arr[i].intro
							+'</td><td style="position:relative;" width="152"><span class="current">'+sc_arr[i].price
							+'</span></td><td width="152"><label class="btn"><input class="res1" value="-"type="button"><input class="val1" maxnum="5" value="'+sc_arr[i].num
							+'" type="text"><input class="add1" maxnum="5" value="+" type="button"></label></td><td class="bc_red" width="152">'+parseInt(sc_arr[i].price)*sc_arr[i].num+'</td><td style="text-align:left" width="117"><a href="javascript:;" style="color: #000">删除</a><br><a href="javascript:;" style="color: #000">移入收藏夹</a>S</td></tr>';
						}
						$('.prolist').html(html);
			

					}
	
	
	$('.and').html("商品总价:"+ $('.bc_red').html());
	$('#totalmoneyf').html( $('.bc_red').html());
	addAmount()
	function addAmount(){
    $(".add1").click(function(){
        var val = $(".val1").val();
        // console.log(val);
       
        $(".val1").val(++val);
         $('.bc_red').html(parseInt($('.val1').val())*parseInt($('.current').html()))
         var and = 0;
        for(var i in sc_arr){
        	and += parseInt( $('.bc_red').html());
        }
        console.log(and)
        $('.and').html("商品总价:"+and)
          $('#totalmoneyf').html(and);
    })
    $(".res1").click(function(){
        var val = $(".val1").val();
        // console.log(val);
        if(val>1){
            $(".val1").val(--val);
            
             $('.bc_red').html(parseInt($('.val1').val())*parseInt($('.current').html()))
               var and = 0;
              for(var i in sc_arr){
        	and += parseInt( $('.bc_red').html());
        }
      //  console.log(and)
        $('.and').html("商品总价:"+and);
        $('#totalmoneyf').html(and);
        }
    })
	}
})
