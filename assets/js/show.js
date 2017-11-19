$(function(){
// 头部内容 start
	
	// 搜索框
	$('.search input').focus(function(){
		$('.search-tags').hide();
		$('.search-icon').css('backgroundColor','rgba(255,0,0,.5)');
		$(this).css('borderColor','rgba(255,0,0,.5)');
		$('.icon-sousuo').css('color','#f01414');
	})
	$('.search input').blur(function(){
		$('.search-tags').show();
		$('.search-icon').css('backgroundColor','rgba(255,0,0,0)');
		$(this).css('borderColor','#4d555d');
		$('.icon-sousuo').css('color','#4d555d');
	})
	
	// 下载APP
	$('.login li:first').mouseover(function(){
		$('.download').show();
	}).mouseout(function(){
		$('.download').hide();
	})
	// 购物车
	$('.login .chart').mouseover(function(){
		$('.my_chart').show();
	}).mouseout(function(){
		$('.my_chart').hide();
	})
// 头部内容 end

// 鼠标滚动一定距离 显示固定导航栏 start

	$(window).scroll(function(){
		var top = $(window).scrollTop();
		
		if (top > 582){
			$('.scroll').slideDown(100);
			// $('.fixed').animate({height:285}).children('.return').show(100);
		}else{
			$('.scroll').slideUp(100);
			// $('.fixed').animate({height:227}).children('.return').hide(100);
		}

	})
	
// 鼠标滚动一定距离 显示固定导航栏 end

// 底部内容 start
	$('.web .weixin a').mouseover(function(){
		$('.code').show();
	}).mouseout(function(){
		$('.code').hide();
	})

	$('.web a').mouseover(function(){
		$(this).siblings().position({left:20,top:20}).show();
	})
// 底部内容 end

// 网页固定内容 start
	$('.fixed a').mouseover(function(){
		$(this).find('i').hide();
		$(this).find('p').show();
	}).mouseout(function(){
		$(this).find('p').hide();
		$(this).find('i').show();
	})

	$('.fixed .download').mouseenter(function(){
		$('.app').stop(true,true).hide();
		$('.app').show();
	}).mouseleave(function(){
		$('.app').hide();
	})
	$('.fixed .weixin').mouseover(function(){
		$('.wei').stop(true,true).hide();
		$('.wei').show();
	}).mouseout(function(){
		$('.wei').hide();
	})
// 网页固定内容 end	
})

