$(function() {
	function addMsg(msg) {
		$('#msg').append('<div>' + msg + '</div>');
	}

	$('#btn').on('click', function() {
		var pjn = $('#pjn').val(),
			pjt = $('input[name = "type"]:checked').val(),
			dmui = $('#dmui').val(),
			sta_src = $('#sta_src').val(),
			gan_src = $('#gan_src').val(),
			htmlName = $('#htmlName').val(),
			scssName = $('#scssName').val(),
			// imgSrc = $('#imgSrc').val(),
			outName = $('#outName').val(),
			cssMin = $('input[name = "cssmin"]:checked').val();
		var flag = true;

		$('#msg').html('<h2>错误信息:</h2>');
		if (htmlName == '') {
			htmlName = 'index';
		}
		if (scssName == '') {
			scssName = 'index';
		}
		// if (imgSrc == '') {
		// 	imgSrc = 'http://sta.doumi.com/src/image/';
		// }
		if (outName == '') {
			outName = 'dist';
		}
		if (pjn == '') {
			addMsg('项目名不能为空');
			flag = false;
		}
		if (typeof pjt == 'undefined') {
			addMsg('项目类型不能为空');
			flag = false;
		}
		if (flag) {
			$('#msg').hide();
		} else {
			$('#msg').show();
		}


		if (flag) {
			// '&imgSrc=' + imgSrc +
			var _url = 'http://localhost:3030/msg?pjn=' + pjn + '&pjt=' + pjt + '&htmlName=' + htmlName + '&scssName=' + scssName + '&outName=' + outName + '&cssMin=' + cssMin;
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
						alert('项目创建成功');
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