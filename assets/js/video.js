// 视频播放器 start
window.onload = function(){
	// 1.获取对象
	var videoContent = document.querySelector('.video_content');
	var video = document.querySelector('video');
	var start = document.querySelector('.icon-action');
	var control = document.querySelector('.control');

	// 静音与取消静音
	var mute = document.querySelector('.icon-vol');
	// var stop = document.querySelector('.icon-stop');
	// 当前时间和总时间
	var current = document.querySelector('.current');
	var total = document.querySelector('.total');
	// 进度条
	var progress = document.querySelector('.progress');
	var progressLine = document.querySelector('.progress-line');
	var progressBall = document.querySelector('.progress-ball');
	// 音量
	var volume = document.querySelector('.volume');
	var volumeLine = document.querySelector('.volume-line');
	var volumeBall = document.querySelector('.volume-ball');
	// 全屏与取消全屏
	var full = document.querySelector('.icon-quanping1');
	
	// 2.点击播放/暂停
	start.onclick = function(){
		if(video.paused){
			video.play();
			this.classList.add('icon-zanting1');
			this.classList.remove('icon-action');
		}else{
			video.pause();
			this.classList.add('icon-action');
		}
	}

	// 3.当前时间
	// current.innerHTML = formatTime(video.currentTime)+' / ';
	// total.innerHTML = formatTime(video.duration);
	console.log(video.duration);
	// 播放位置发生变化时触发的事件
	video.ontimeupdate = function(){
		current.innerHTML = formatTime(video.currentTime)+' / ';
		total.innerHTML = formatTime(video.duration);
		var percent = video.currentTime / video.duration;
	
		progressLine.style.width = percent * 100 + '%';

		progressBall.style.left = (progress.offsetWidth * percent - progressBall.offsetWidth / 2) / progress.offsetWidth * 100 + '%';
	}
	// 转换时间
	function formatTime(time){
		var minute = Math.floor(time/60);
		if(minute < 10){
			minute = '0'+minute;
		}
		var second = Math.floor(time%60);
		if(second < 10){
			second = '0'+second;
		}
		return minute + ':' + second;
	}

	// 6.点击进度条
	progress.onclick = function(e){
		// 获取点击的位置距进度条左侧的距离
		var distance = e.pageX - container.offsetLeft;
		// 获取点击的位置在整个进度条的比例
		var percent = distance / this.offsetWidth;
		// 视频播放到指定位置
		video.currentTime = video.duration * percent;
	}

	// 7.拖拽小球
	progressBall.onmousedown = function(e){
		// 拖拽到的位置
		var lineWidth = progressLine.offsetWidth;
		// 鼠标按下去的起始位置
		var startX = e.pageX;

		window.onmousemove = function(me){
			// 获取鼠标移动的相对位置
			var x = me.pageX - startX;
			var percent = (lineWidth + x)/progress.offsetWidth;
			// 改变当前的播放位置
			video.currentTime = video.duration * percent;

			progressLine.style.width = percent * 100 + '%';
			progressBall.style.left = (progress.offsetWidth * percent - progressBall.offsetWidth / 2) / progress.offsetWidth * 100 + '%';
		}
		window.onmouseup = function(){
			window.onmousemove = null;
		}
	}
	// 4.静音与取消静音
	var volSize = 1;
	mute.onclick = function(){
		if(video.volume === 0){
			video.volume = volSize;
			this.classList.add('icon-vol');
			this.classList.remove('icon-mute');
			volumeLine.style.height = volume.offsetHeight * volSize + 'px';
			volumeBall.style.top = volume.offsetHeight * volSize - volumeBall.offsetWidth / 2 + 'px';
		}else{
			volSize = video.volume;
			video.volume = 0;

			this.classList.remove('icon-vol');
			this.classList.add('icon-mute');
			volumeLine.style.height = '0px';
			volumeBall.style.top = - volumeBall.offsetHeight / 2 + 'px';

		}
	}
	// .点击音量进度条
	volume.onclick = function(e){
		// 获取点击的位置距进度条左侧的距离
		var distance = e.pageY - volume.offsetTop;
		// 获取点击的位置在整个进度条的比例
		// video.volume = distance / this.offsetWidth;
		var percent = distance / this.offsetHeight;
		video.volume = distance / this.offsetHeight;
		// 音量进行到到指定位置
		volumeLine.style.height = percent * 100 + '%';
		volumeBall.style.top = percent * 100 + '%';
		
	}
	// .拖拽音量控制小球
	volumeBall.onmousedown = function(e){
		// 拖拽到的位置
		var startTop = volumeLine.offsetHeight;
		// 鼠标按下去的起始位置
		var startY = e.pageY;

		window.onmousemove = function(me){
			// 获取鼠标移动的相对位置
			var y = me.pageY - startY;

			var top = startTop + y;
			if(top <= 0){
				top = 0;
			}else if(top > volume.offsetHeight){
				top = volume.offsetHeight;
			}
			var percent = top / volume.offsetHeight;
			if(percent > 0 && percent <= 1){
				mute.classList.add('icon-vol');
				mute.classList.remove('icon-mute');
			}else{
				mute.classList.remove('icon-vol');
				mute.classList.add('icon-mute');
			}
			video.volume = percent;
			// // 改变当前的音量进度位置
			volumeLine.style.height = top + 'px';
			volumeBall.style.top = top - volumeBall.offsetHeight / 2 + 'px';

		}
		window.onmouseup = function(){
			window.onmousemove = null;
		}
	}
	// 全屏与取消全屏
	full.onclick = function(){
		if(!fullscreen()){
			requestFullscreen(videoContent);
		}else{
			exitFullscreen();
		}

	}
	document.onwebkitfullscreenchange =
	document.onmozfullscreenchange = document.onmsfullscreenchange = function() {
		if(fullscreen()){
			videoContent.classList.add('fullscreen');
			full.classList.add('icon-quxiaoquanping1');
			full.classList.remove('icon-quanping1');
		}else{
			full.classList.add('icon-quanping1');
			full.classList.remove('icon-quxiaoquanping1');
			videoContent.classList.remove('fullscreen');
		}
	}


    // ele:全屏的对象
    function requestFullscreen(ele) {
        // 全屏兼容代码
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
        }
    }

    // 取消全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }

    // 判断是否是全屏状态
    function fullscreen() {
        return document.fullscreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            document.msFullscreenElement ||
            false;
    }
}
// 视频播放器 end