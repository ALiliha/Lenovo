$(function(){
	addAmount()
	alter(1)
	function addAmount(){
    $(".add1").click(function(){
        var val = $(".val1").val();
        // console.log(val);
        $(".val1").val(++val);
    })
    $(".res1").click(function(){
        var val = $(".val1").val();
        // console.log(val);
        if(val>1){
            $(".val1").val(--val);
        }
    })
	}
})
