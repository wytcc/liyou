window.$ && $(function() {
				var
				/**
				 * 收货地址dom
				 * @type {jQuery}
				 */
					$addrs = $('.shipping-address .addr'),
					activeAddrClass = 'addr-active',
					index = {
						/**
						 * 入口函数
						 */
						init: function() {
							this.addrFuncs();
						},
						/**
						 * 收货地址逻辑函数
						 */
						addrFuncs: function() {
							var that = this,
								hoverClass = 'addr-hover';
							$addrs.each(function() {
								$(this).hover(function() { //hover改变样式
									$(this).addClass(hoverClass);
								}, function() {
									$(this).removeClass(hoverClass);
								});
								$(this).click(function(e) { //点击后选中
									e.preventDefault();
									/**
									 * 如果该地址之前没选中，设置其选中
									 */
									if (!$(this).hasClass(activeAddrClass)) that.setAddrSeled(this);
								})
							});
							/**
							 * 设置默认地址选中
							 */
							var $active = $('.' + activeAddrClass);
							if ($active.length) {
								this.setAddrSeled($active);
							} else { //没有默认地址时选中第一个地址
								$($addrs[0]).click();
							}
						},
						/**
						 * 选中某个地址
						 * @param {String|JQuery} placeholder 选中的dom
						 */
						setAddrSeled: function(placeholder) {
							$addrs.removeClass(activeAddrClass);
							$(placeholder).addClass(activeAddrClass);
							/**
							 * 设置获取到的值
							 */
							$('#addr-prov').val($('.prov', placeholder).text());
							$('#addr-city').val($('.city', placeholder).text());
							$('#addr-name').val($('.name', placeholder).text());
							$('#addr-dist').val($('.dist', placeholder).text());
							$('#addr-town').val($('.town', placeholder).text());
							$('#addr-street').val($('.street', placeholder).text());
							$('#addr-phone').val($('.phone', placeholder).text());
						}
					}
				index.init();
			});