$(function() {
	function addMsg(msg) {
		$('#msg').append('<div>' + msg + '</div>');
	}

	var staticLs = localStorage.static;
	var ganjiLs = localStorage.ganji;
	var dmuiLs = localStorage.dmui;
	if (typeof staticLs != 'undefined') {
		$('#sta_src').val(staticLs);
	}
	if (typeof staticLs != 'undefined') {
		$('#gan_src').val(ganjiLs);
	}
	if (typeof dmuiLs != 'undefined') {
		$('#dmui').val(dmuiLs);
	}

	$('#btn').on('click', function() {
		var
			dmui = $('#dmui').val(),
			sta_src = $('#sta_src').val(),
			gan_src = $('#gan_src').val();

		var flag = true;

		$('#msg').html('<h2>错误信息:</h2>');

		if (sta_src == '') {
			addMsg('本地static项目路径不能为空');
			flag = false;
		}
		if (dmui == '') {
			addMsg('本地DMUI项目路径不能为空');
			flag = false;
		}
		if (gan_src == '') {
			addMsg('本地ganji_sta项目路径不能为空');
			flag = false;
		}
		if (flag) {
			$('#msg').hide();
		} else {
			$('#msg').show();
		}


		if (flag) {
			var _url = 'http://localhost:3050/msg?sta_src=' + sta_src + '&gan_src=' + gan_src + '&dmui=' + dmui;
			$(this).hide();
			$('.hide').show();
			var self = this;
			var n = 10;
			var timer = setInterval(function() {
				if (n <= 0) {
					$(self).show();
					$('.hide').hide();
					clearInterval(timer);
				}
				$('#time').html(n);
				n = n - 1;
			}, 1000);
			$.ajax({
				type: 'GET',
				url: _url,
				success: function(msg) {
					if (msg.n) {
						flag = true;
						localStorage.static = sta_src;
						localStorage.ganji = gan_src;
						localStorage.dmui = dmui;
						alert('项目初始化成功');
						window.close();
					} else {
						$(self).show();
						$('.hide').hide();
						addMsg(msg.detail);
						$('#msg').show();
						clearInterval(timer);
					}
				}
			});
		}


	})
})