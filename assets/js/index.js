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

	// 登录注册 start

	// 鼠标聚焦到登录或注册时，显示登录注册框
	$('.login-d').focus(function(){
		$('.frame,.bg').show();
	})
	$('.login-z').focus(function(){
		$('.frame,.bg').show();
	})
	// 鼠标点击X图标时，隐藏登录注册框
	$('.frame h3 i').click(function(){
		$('.frame,.bg').hide();
	})
	// 点击注册时
	$('.frame .reg').click(function(){
		$('.frame .active').css('color','#787d82');
		$('.frame .active').css('border-bottom',0);
		$('.frame .reg').css('color','#f01400');
		$('.frame .reg').css('border-bottom','1px solid #f01400');
		$('.password,.forget').hide();
		$('.verification').show();
		$('.frame').animate({height:301},10);
		$('form .login input').val('注册');
	})
	// 点击登录时
	$('.frame .active').click(function(){
		$('.frame .reg').css('color','#787d82');
		$('.frame .reg').css('border-bottom',0);
		$('.frame .active').css('color','#f01400');
		$('.frame .active').css('border-bottom','1px solid #f01400');
		$('.password,.forget').show();
		$('.verification').hide();
		$('.frame').animate({height:333},10);
		$('form .login input').val('登录')
	})
	// 注册-用户名验证 start
	$('.user input').blur(function(){
		var value = this.value.trim();
		var reg = /^[0-9a-zA-Z_\.]{1,}@[a-zA-Z0-9]+\.[a-z]{2,5}(\.cn)?|(13[0-9]|14[579]|15[012356789]|17[135678]|18[0-9]|199)[0-9]{8}$/;
		if (reg.test(value)){
			$(this).siblings('p').text('');
			var bool1 = true;
		}else {
			$(this).siblings('p').text('请输入正确的邮箱或手机号');
			var bool1 = false;
		}

		// 判断用户名是否被注册
		var that = $(this);
		get('assets/php/1.php',{username:value},function(data){
			if(data.success === 0){
				that.parent('.user').siblings('p').text('用户名可用');
			}else{
				that.parent('.user').siblings('p').text('用户名已被注册');
			}
			console.log(data);
		},'json');
	})
	// 注册-用户名验证 end

	var bool1 = false;
	var bool2 = false;

	// 登录-用户名验证start
	$('.user input').blur(function(){
		var value = this.value.trim();
		var reg = /^[0-9a-zA-Z_\.]{1,}@[a-zA-Z0-9]+\.[a-z]{2,5}(\.cn)?|(13[0-9]|14[579]|15[012356789]|17[135678]|18[0-9]|199)[0-9]{8}$/;
		if (reg.test(value)){
			$(this).siblings('p').text('');
			bool1 = true;
		}else {
			$(this).siblings('p').text('请输入正确的邮箱或手机号');
			bool1 = false;
		}
	})

	// 登录-密码验证 start
	$('.password input').blur(function(){
		var value = this.value.trim();
		var reg = /^\w{6,16}$/;
		if(reg.test(value)){
			$(this).siblings('p').text('');
			bool2 = true;
		}else {
			$(this).siblings('p').text('请输入6-16位密码，区分大小写，不能使用空格！');
			bool2 = false;
		}
	})

	$('form').submit(function(){
		console.log(bool1,bool2);
		if (!bool1 || !bool2){
			$(this).children('p:eq(0)').text('非法请求').css('color','red');
			return false;
		}

	})

	// 登录-密码验证 end

	// 登录验证end

	// 登录注册 end
// 头部内容 end

// 左侧菜单栏 start
	var index = 0;
	$('.menu li a').mouseover(function(){
		$(this).siblings().show();
	}).mouseout(function(){
		$(this).siblings().hide();
	})
// 左侧菜单栏 end

// 轮播图 start
	var index = 0;
	var timer = 0;
	var len = $('.carousel-image li').length;
	function run(){
		timer = setInterval(function(){
			$('.carousel-image li:eq('+index+')').fadeOut(1000);
			$('.carousel-index li:eq('+index+')').removeClass('active');
			index++;
			if (index > len - 1){
				index = 0;
			}
			$('.carousel-image li:eq('+index+')').fadeIn(1000);
			$('.carousel-index li:eq('+index+')').addClass('active');
		},3000);
	}
	run();
	// 鼠标移入，停止轮播
	$('.carousel').mouseover(function(){
		clearInterval(timer);
	}).mouseout(function(){
		run();
	})
	// 鼠标点击数字li时，显示对应的图片
	$('.carousel-index li').click(function(){
		$('.carousel-image li:eq('+index+')').fadeOut(1000);
		$('.carousel-index li:eq('+index+')').removeClass('active');

		index = $(this).index();

		$('.carousel-image li:eq('+index+')').fadeIn(1000);
		$('.carousel-index li:eq('+index+')').addClass('active');
	})
	// 鼠标移入左右键
	$('.carousel-left').mouseover(function(){
		$('.carousel .c-left').css('background-color','rgba(0,0,0,.5');
	}).mouseout(function(){
		$('.carousel .c-left').css('background-color','');
	})
	$('.carousel-right').mouseover(function(){
		$('.carousel .c-right').css('background-color','rgba(0,0,0,.5');
	}).mouseout(function(){
		$('.carousel .c-right').css('background-color','');
	})
	// 鼠标点击左右键
	$('.carousel-left').click(function(){
		$('.carousel-image li:eq('+index+')').fadeOut(1000);
		$('.carousel-index li:eq('+index+')').removeClass('active');

		index--;
		if (index < 0) {
			index = len-1;
		}

		$('.carousel-image li:eq('+index+')').fadeIn(1000);
		$('.carousel-index li:eq('+index+')').addClass('active');
	})
	$('.carousel-right').click(function(){
		$('.carousel-image li:eq('+index+')').fadeOut(1000);
		$('.carousel-index li:eq('+index+')').removeClass('active');

		index++;
		if (index > len-1) {
			index = 0;
		}

		$('.carousel-image li:eq('+index+')').fadeIn(1000);
		$('.carousel-index li:eq('+index+')').addClass('active');
	})
// 轮播图 end

// 攻城狮 start
	$('.bot-item').mouseenter(function(){
		$('.bot-item').stop(true,true);
		$(this).animate({top:-7},200);
	}).mouseleave(function(){
		$('.bot-item').stop(true,true);
		$(this).animate({top:0},200);
	})
// 攻城狮 end

// 新手入门 start
	$('.mid .stack').mouseenter(function(){
		$('.p_top,.p_middle,.p_bottom,.shadow').stop();
		$(this).find('.p_top').animate({top:-15});
		$(this).find('.p_middle').animate({top:0,left:8,width:200});
		$(this).find('.p_bottom').animate({top:15,left:18,width:180});
		$(this).find('.shadow').animate({bottom:23})
	})
	.mouseleave(function(){
		$('.p_top,.p_middle,.p_bottom,.shadow').stop();
		$(this).find('.p_top').animate({top:0});
		$(this).find('.p_middle').animate({top:10,left:4,width:208});
		$(this).find('.p_bottom').animate({top:20,left:9,width:198});
		$(this).find('.shadow').animate({bottom:8})
	})
// 新手入门 end

// 精英名师 start
	$('.t_item').mouseenter(function(){

		// 鼠标移入，停止动画效果
		$('.t_item').find('img,.introduce').stop();

		// 图片恢复原来大小
		$('.t_item').find('img').css({width:96,height:96,marginLeft:-48});

		// 人物介绍恢复原位置
		$('.t_item').find('.introduce').css({height:72,top:0});

		// 鼠标移入，背景颜色为白色
		$(this).children('a').css('backgroundColor','#fff');

		// 昵称和职称隐藏
		$(this).find('.person').hide();

		// 图片变小
		$(this).find('img').animate({width:60,height:60,marginLeft:-30},500);

		// 人物介绍和高度位置改变
		$(this).find('.introduce').animate({height:168,top:-35},500);


	}).mouseleave(function(){
		// 鼠标移出，停止动画效果
		$('.t_item').find('img,.introduce').stop();
		// 背景颜色恢复原来的颜色
		$(this).children('a').css('backgroundColor','#d8dae0');
		// 昵称和职称显示
		$(this).find('.person').show();
		// 图片恢复原来大小
		$(this).find('img').animate({width:96,height:96,marginLeft:-48});
		// 高度立即恢复原来高度
		$(this).find('.introduce').css('height',72);
		// 人物介绍位置恢复原来位置
		$(this).find('.introduce').animate({top:0},10);

	})
// 精英名师 end

// 吊炸天全明星 start
	$('.head_pic a').mouseenter(function(){
		$('.head_pic a').find('div:animated').hide();
		$(this).find('div').fadeIn(200);

		var color = $(this).find('div').css('backgroundColor');
		$(this).parent().css('borderColor',color)
	}).mouseleave(function(){
		$(this).find('div').fadeOut(200);
		$(this).parent().css('borderColor','#fff')
	})
// 吊炸天全明星 end

// 底部内容 start
	$('.web .weixin i').mouseover(function(){
		$('.code').show();
	}).mouseout(function(){
		$('.code').hide();
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
		$('.app').stop(true,true);
		$('.app').show();
	}).mouseleave(function(){
		$('.app').hide();
	})
	$('.fixed .weixin').mouseover(function(){
		$('.wei').stop(true,true);
		$('.wei').show();
	}).mouseout(function(){
		$('.wei').hide();
	})
// 网页固定内容 end
})