$.fn.extend({
	animate_buffer: function(json, func){
		//1、先看一下选中的元素如何获取
		//$(this)  就是我们已经选中的所有元素节点

		//2、我们将选中的元素单独取出
		var nodes = $(this).get();
		for(var i = 0; i < nodes.length; i++){
			//3、给每一个选中的元素节点，执行运动
			startMove(nodes[i], json, func);
		}
		
	}
})