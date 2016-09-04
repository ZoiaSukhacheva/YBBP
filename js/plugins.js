site.plugins.awardsList = function($block){

	var $items = $block.find('.awards-list__item_link');

	$items.on('mouseenter', function() {
		$(this).removeClass('awards-list__item_disabled');
	});
	$items.on('mouseleave', function() {
		$(this).addClass('awards-list__item_disabled');
	});

};

/* --- Basic : plugin --- */
site.plugins.basic = function($block){

	// bg
	$block.find('img.bg__image').each(function(){
		var $block = $('<div />').addClass($(this).attr('class')).css({ 'background-image': 'url(' + $(this).attr('src') + ')' });
		$(this).replaceWith($block);
	});

	// {event} click on menu link
	$block.find('[data-content]').on('click.content', function(){
		site.content.open($(this).data('content'), $.noop, $(this).is('[data-content-parent]'));
		return false;
	});

	// Link
	$block.find('.ui-link').each(function(){
		// blocks and vars
		var $link = $(this),
			$icon = $link.find('path')
		duration = 325,
			animated = false,
			easing = 'easeOutBack';
		// {event} hover on link
		$link.on('mouseenter', function(){
			if (animated) return;
			animated = true;
			$icon.velocity('stop');
			$icon.velocity({ rotateZ: 0 }, 0);
			console.log(easing)
			$icon.velocity({ rotateZ:-180 }, duration, easing, function(){
				animated = false;
			});
		});
	});

	// Open
	$block.find('.ui-action').each(function(){
		var $button = $(this),
			text = $button.html();
		$button.html('');
		var $text1 = $('<span class="ui-action__text ui-action__text_1" />').html(text).appendTo($button),
			$plate = $('<span class="ui-action__plate" />').appendTo($button),
			$text2 = $('<span class="ui-action__text ui-action__text_2" />').html(text).appendTo($button),
			hovered = false,
			height = 57,
			duration = 190,
			opened = false,
			animated = false,
			loading = false,
			easing = 'easeInCubic',
			loadingText = site.lang=='ru' ? 'Загрузка...' : 'Loading...';
		$button.wrapInner('<span class="ui-action__content" />');
		// not touch device
		if (!site.device.support.touch) {
			var open = function(){
				animated = true;
				$text2.add($plate).css({ top:-height });
				$text1.velocity({ top:height }, duration*1.05, easing);
				$plate.add($text2).velocity({ top:0 }, duration*1.15, easing, function(){
					animated = false;
					opened = true;
					if (hovered) $button.velocity({ top:2 }, duration/5, 'easeOutCubic').velocity({ top:0 }, duration/4, 'easeOutCubic');
					check();
				});
			};
			var close = function(){
				animated = true;
				$text1.css({ top:-height });
				$plate.add($text2).velocity({ top:height }, duration, 'easeOutCubic');
				$text1.velocity({ top:0 }, duration*1.3, 'easeOutCubic', function(){
					animated = false;
					opened = false;
					check();
				});
			};
			$button.on('mouseenter', function(){
				if (hovered) return;
				hovered = true;
				check();
			});
			$button.on('mouseleave', function(){
				if (!hovered) return;
				hovered = false;
				check();
			});
			var check = function(){
				if (animated) return false;
				if (opened && loading && hovered) {
					close();
				} else if (opened && !hovered && !loading) {
					close();
				} else if (!opened && hovered && !loading) {
					open();
				}
				return true;
			};
			// {fn} animate button
			var startLoading = function(){
				if (loading) return;
				loading = true;
				// decorate button
				$button.width($button.width());
				$text1.text(loadingText);
				check();
			};
			// {fn} stop button
			var stopLoading = function(){
				if (!loading) return;
				loading = false;
				// decorate button
				$button.width('auto');
				$text1.text(text);
				check();
			};
		} else {
			var startLoading = function(){
				$button.width($button.width());
				$text1.text(loadingText);
			};
			var stopLoading = function(){
				$button.width('auto');
				$text1.text(text);
			};
		};
		// api
		$button.data('action', {
			startLoading: startLoading,
			stopLoading: stopLoading
		});
	});

	// Fast click
	FastClick.attach($block[0]);

};
site.plugins['bg-multiple-video-screen'] = function($cover, $work){
	// blocks
	var $bg = $cover.find('.bg'),
		$videos = $cover.find('video'),
		count = $videos.length,
		enabled = false,
		activeIndex = 0,
		idleDelay = 5 * 60 * 1000,
		idleTimer;

	// disable on mobile devices
	if (site.device.isMobile) {
		$videos.remove();
		return;
	};

	var waitIdle = function(){
		clearTimeout(idleTimer);
		idleTimer = setTimeout(function(){
			$videos.get(activeIndex).pause();
		}, idleDelay);
	};

	// hide videos
	$videos.each(function(index){
		$(this).data('src', this.src);
		if (index>0) $(this).addClass('bg__video_disabled');
	});

	var prevIndex = function(index){
		return index ? index-1 : count-1;
	};

	var nextIndex = function(index){
		return index >= count-1 ? 0 : index+1;
	};

	var play = function(index){
		var $video = $videos.eq(index),
			video = $video[0];
		preload(nextIndex(index));
		$video.one('playing', function(){
			$video.removeClass('bg__video_disabled');
			$bg.addClass('bg_video');
			unload(prevIndex(index));
		});
		$video.one('ended', function(){
			play(nextIndex(index));
		});
		$video.one('loadeddata', function(){
			preload(nextIndex(nextIndex(index)));
		});
		try {
			video.currentTime = 0;
		} catch (e) {}
		if (enabled) video.play();
		waitIdle();
		activeIndex = index;
	};

	var unload = function(index){
		$videos.eq(index).addClass('bg__video_disabled');
	};

	var preload = function(index){
		// var video = $videos.get(index);
		// if (video.preload && video.preload!='auto') {
		// 	video.preload = 'auto';
		// 	video.load();
		// }
	};

	// {event} cover show
	$cover.on('show unfreeze', function(){
		if (enabled) return false;
		$videos.show()
		enabled = true;
		play(activeIndex);
	});
	$cover.on('hide freeze', function(){
		enabled = false;
		$videos.get(activeIndex).pause();
		clearTimeout(idleTimer);
	});
	// {event} cover hide
	$cover.on('fullHide', function(){
		enabled = false;
		$bg.removeClass('bg_video');
		$videos.get(activeIndex).pause();
		unload(activeIndex);
		$videos.hide().addClass('bg__video_disabled');
		$videos.first().show().removeClass('bg__video_disabled');
		activeIndex = 0;
		clearTimeout(idleTimer);
	});
};
site.plugins['bg-video-screen'] = function($cover, $work){
	// blocks
	var $bg = $cover.find('.bg'),
		$video = $cover.find('video'),
		idleDelay = 5 * 60 * 1000,
		idleTimer;
	// disable on mobile devices
	if (site.device.isMobile) {
		$video.remove();
		return;
	};
	var src = $video[0].src,
		disabled = true,
		first = true;
	var waitIdle = function(){
		clearTimeout(idleTimer);
		idleTimer = setTimeout(function(){
			$video[0].pause();
		}, idleDelay);
	};
	// {event} cover show
	$cover.on('show', function(){
		if (disabled) {
			disabled = false;
			// if (!first) {
			// 	$video[0].src = src;
			// 	$video[0].load();
			// };
			first = false;
			$video[0].play();
			$video.one('playing', function(){
				$bg.addClass('bg_video');
			});
		} else {
			$video[0].play();
		}
		waitIdle();
	});
	$cover.on('hide', function(){
		$video[0].pause();
		clearTimeout(idleTimer);
	});
	$cover.on('freeze', function(){
		$video[0].pause();
		clearTimeout(idleTimer);
	});
	$cover.on('unfreeze', function(){
		$video[0].play();
		waitIdle();
	});
	// {event} cover hide
	$cover.on('fullHide', function(){
		if (disabled) return;
		disabled = true;
		$video[0].pause();
		// $bg.removeClass('bg_video');
		// $video.removeAttr('src');
		// $video[0].load();
		$video.off('playing');
	});
};
// plugin for content functional
site.plugins['content'] = function($block){

	// hover effects
	if (!site.device.support.touch) {

		// {event} click on close
		$block.find('.ui-back').each(function(){
			var $back = $(this),
				$icon = $back.find('.ui-back__icon'),
				steps = { hover: 32, click: 51 },
				frame = { index: 0 },
				size = $back.height() + 5,
				enabled = true,
				duration = 700,
				interval;
			// {fn} sequence
			var sequence = function(to, callback){
				TweenMax.to(frame, duration/1000, {
					index: to,
					roundProps: 'index',
					ease: Expo.easeOut,
					onUpdate: function(){
						move(frame.index);
					},
					onComplete: function(){
						if (callback) callback();
					}
				});
			};
			// {fn} enable
			var enable = function(){
				enabled = true;
				frame.index = 0;
				move(0);
			};
			// {fn} disable
			var disable = function(){
				enabled = false;
			};
			// {fn} move
			var move = function(index){
				$icon[0].style.backgroundPosition = '0px ' + (-index*size) + 'px';
			};
			// {event} mouse enter
			$back.on('mouseenter', function(){
				if (!enabled) return;
				sequence(steps.hover);
			});
			// {event} mouse leave
			$back.on('mouseleave', function(){
				if (!enabled) return;
				sequence(0);
			});
			// {event} click
			$back.on('click', function(){
				if (!enabled) return;
				disable();
				site.content.close();
				sequence(steps.click, enable);
			});
		});

		// {event} click on close
		$block.find('.ui-close').each(function(){
			var $close = $(this),
				$icon = $close.find('.ui-close__icon'),
				steps = { hover: 33, click: 56 },
				frame = { index: 0 },
				size = $icon.height() + 5,
				enabled = true,
				duration = 400,
				interval;
			// {fn} sequence
			var sequence = function(to, callback){
				TweenMax.to(frame, duration/1000, {
					index: to,
					roundProps: 'index',
					ease: Expo.easeOut,
					onUpdate: function(){
						move(frame.index);
					},
					onComplete: function(){
						if (callback) callback();
					}
				});
			};
			// {fn} enable
			var enable = function(){
				enabled = true;
				frame.index = 0;
				move(0);
			};
			// {fn} disable
			var disable = function(){
				enabled = false;
			};
			// {fn} move
			var move = function(index){
				var x = index>30 ? size : 0,
					y = index>30 ? (index-30)*size : index*size;
				$icon[0].style.backgroundPosition = (-x) + 'px ' + (-y) + 'px';
			};
			// {event} mouse enter
			$close.on('mouseenter', function(){
				if (!enabled) return;
				sequence(steps.hover);
			});
			// {event} mouse leave
			$close.on('mouseleave', function(){
				if (!enabled) return;
				sequence(0);
			});
			// {event} click
			$close.on('click', function(){
				if (!enabled) return;
				disable();
				site.content.close();
				sequence(steps.click, enable);
			});
		});

	} else {

		// {event} click on back and close icons
		$block.find('.ui-back, .ui-close').on('click', function(){
			site.content.close();
		});

	};

};
site.plugins['embed-content'] = function($block) {

	var $embeds = $block.find('[data-embed]'),
		ratio = 16 / 9,
		delay = 1000;

	// each players
	$embeds.each(function() {
		// block and vars
		var $embed = $(this).addClass('i-interactive'),
			embed = $embed.html(),
			isFit = $embed.is('[data-embed-fit]'),
			isEmpty = false,
			timer;
		// {fn} add
		var add = function(){
			clearTimeout(timer);
			if (!isEmpty) return false;
			$embed.html(embed);
			isEmpty = false;
		};
		// {fn} remove
		var remove = function(){
			if (isEmpty) return false;
			$embed.empty();
			isEmpty = true;
		};
		var startRemoving = function(){
			timer = setTimeout(remove, delay);
		};
		// block events
		$block.on('show', add);
		$block.on('hide', startRemoving);
		// fit video
		if (isFit) {
			var fit = function() {
				$embed.height($embed.width() / ratio);
			};
			$window.on('resize', fit);
			fit();
		};
	});
};

(function(plugins){

	var scrollIndex = 0;

	plugins.keyboardScroll = function(scroll){

		scrollIndex++;

		var eventName = 'keydown.keyboards-scroll-' + scrollIndex,
			paused = false,
			duration = 500;

		// scroll to
		var scrollTo = function(y){
			if (paused) return false;
			paused = true;
			scrollTimer = setTimeout(function(){
				paused = false;
			}, 50);
			scroll.scrollTo(0, y, duration, IScroll.utils.ease.cubicOut);
		};

		// prev
		var prev = function(){
			var y = Math.min(0, scroll.y + 100);
			scrollTo(y);
		};

		// next
		var next = function(){
			var y = Math.max(scroll.maxScrollY, scroll.y - 100);
			scrollTo(y);
		};

		// prev
		var pageUp = function(){
			var y = Math.min(0, scroll.y + scroll.wrapperHeight);
			scrollTo(y);
		};

		// next
		var pageDown = function(){
			var y = Math.max(scroll.maxScrollY, scroll.y - scroll.wrapperHeight);
			scrollTo(y);
		};

		// start
		var toStart = function(){
			scrollTo(0);
		};

		// start
		var toEnd = function(){
			scrollTo(scroll.maxScrollY);
		};

		// {fn} enable
		scroll.enableKeyboardScroll = function(){
			if (!site.device.support.touch) $document.on(eventName, function(e){
				if (e.which==38) prev();
				if (e.which==40) next();
				if (e.which==33) pageUp();
				if (e.which==34) pageDown();
				if (e.which==36) toStart();
				if (e.which==35) toEnd();
			});
		};

		// {fn} disable
		scroll.disableKeyboardScroll = function(){
			if (!site.device.support.touch) $document.off(eventName);
		};

		// init
		if (scroll.enabled) scroll.enableKeyboardScroll();

		scroll.on('enable', function(){
			scroll.enableKeyboardScroll();
		});

		scroll.on('disable', function(){
			scroll.disableKeyboardScroll();
		});

	};

})(site.plugins);
site.plugins.marquee = function($frames, settings){
	// each elements
	$frames.each(function(){
		// blocka and vars
		var $frame = $(this),
			$screens = $frame.find(settings.screens),
			$fake = $('<div class="'+settings.spaceClass+'" />').prependTo($frame),
			screens = [],
			effect = site.effects[settings.effect],
			overlayed = false,
			name = $frame.data('name');
		// marquee
		var marquee = {
			index: 0,
			prevIndex: 0,
			progress: 0,
			size: 0,
			scrolling: false,
			enabled: true
		};
		// screens
		$screens.each(function(i){
			var $block = $(this);
			// api
			var api = $block.api('screen');
			api.state = {
				isVisible: false,
				isEndShow: false,
				isStartShow: false,
				isFullShow: false,
				isFullHide: true
			};
			// screen
			var screen = {
				index: i,
				block: $block,
				fake: $('<div class="'+settings.spaceClass+'__screen" />'),
				api: api,
				ratio: 1
			};
			// save screen
			screens.push(screen);
			// decor
			if (i && settings.nextClass) $block.addClass(settings.nextClass);
			$fake.append(screen.fake);
		});
		// {fn} resize fake
		var resize = function(){
			var offset = 0;
			marquee.size = settings.vertical ? site.sizes.height : site.sizes.width;
			$.each(screens, function(i, screen){
				if (settings.vertical){
					var height = Math.max(screen.block.outerHeight(), screen.block.find('.screen__frame').outerHeight());
					if (i>0 && height>marquee.size) {
						screen.block.addClass('screen_long');
						screen.size = height;
					} else {
						screen.block.removeClass('screen_long');
						screen.size = site.sizes.height;
					}
					screen.fake.width(site.sizes.width);
					screen.fake.height(screen.size);
				} else {
					screen.size = site.sizes.width;
					screen.fake.width(screen.size);
					screen.fake.height(site.sizes.height);
				}
				screen.offset = offset;
				screen.ratio = screen.size/marquee.size;
				offset += screen.size;
			});
		};
		resize();
		// scroll
		var scroll = new IScroll($frame[0], {
			disableMouse: false,
			mouseWheel: settings.mousewheel,
			scrollX: !settings.vertical,
			scrollY: settings.vertical,
			bounce: true,
			snap: '.'+settings.spaceClass+'__screen',
			eventPassthrough: settings.vertical ? 'horizontal' : true,
			probeType: 3,
			tap: false,
			click: false,
			snapSpeed: settings.duration,
			preventDefault: true,
			scrollbars: settings.vertical ? 'custom' : false,
			interactiveScrollbars: settings.vertical && !site.device.support.touch,
			fake: true
		});
		// {fn} set limits
		marquee.setLimits = function(index){
			index = Math.min(Math.max(0, index), screens.length-1);
			var isLast = index >= screens.length-1,
				isFirst = index==0;
			// min limit
			scroll[settings.vertical ? 'minScrollY' : 'minScrollX'] = -screens[index].offset + (isFirst ? 0 : screens[index-1].size);
			// max limit
			scroll[settings.vertical ? 'maxScrollY' : 'maxScrollX'] = -screens[index].offset - (isLast ? screens[index].size-marquee.size : screens[index].size);
			// set current page
			scroll.currentPage = { x:0, y:0, pageX:0, pageY:0 };

			scroll.currentPage[settings.vertical ? 'y' : 'x'] = -screens[index].offset;
			scroll.currentPage[settings.vertical ? 'pageY' : 'pageX'] = index;
		};
		// {fn} update params
		marquee.update = function(){
			var position = -Math.round(scroll[settings.vertical ? 'y' : 'x']),
				index = 0;
			// get screen index
			for (var i=0; i<screens.length; i++) {
				if (position >= screens[i].offset) index = i;
			};
			// position
			marquee.position = (position-screens[index].offset) / screens[index].size;
			// progress
			marquee.progress = index+marquee.position;
			// indexes


			if (marquee.index!=index) {
				marquee.prevIndex = marquee.index;
				marquee.index = index;
				$(".pager__item-active").css("left", (marquee.index)*$(".pager__item").width());
			};
		};
		// {fn} hide invisibles
		marquee.hideInvisibles = function(){
			for (var i=0; i<screens.length; i++) {
				if (i!=marquee.index && i!=marquee.index+1) {
					if (i>marquee.index+1) effect.show(screens[i].block, 0, marquee.size, screens[i].ratio);
					if (i<marquee.index) effect.hide(screens[i].block, 1, marquee.size, screens[i].ratio);
					screens[i].block[0].style.display = 'none';
				}
			};
		};
		// {fn} hide invisibles
		marquee.callScreensAPI = function(){
			var isLast = marquee.index>=screens.length-1,
				ratio = 1 / screens[marquee.index].ratio,
				position = { top:0, bottom:0 };
			// position
			position.top = marquee.position / ratio;
			position.bottom = marquee.position*screens[marquee.index].ratio - (screens[marquee.index].ratio - 1);
			// show and hide
			if (position.bottom>0.6) {
				if (screens[marquee.index].api.state.isVisible) {
					screens[marquee.index].api.state.isVisible = false;
					screens[marquee.index].block.triggerHandler('hide');
				}
				if (!isLast && !screens[marquee.index+1].api.state.isVisible) {
					screens[marquee.index+1].api.state.isVisible = true;
					screens[marquee.index+1].block.triggerHandler('show');
				}
			} else if (position.top>0.4) {
				if (screens[marquee.index] && !screens[marquee.index].api.state.isVisible) {
					screens[marquee.index].api.state.isVisible = true;
					screens[marquee.index].block.triggerHandler('show');
				}
				if (!isLast && screens[marquee.index+1].api.state.isVisible) {
					screens[marquee.index+1].api.state.isVisible = false;
					screens[marquee.index+1].block.triggerHandler('hide');
				}
			}
			// show start and end of next screen
			if (!isLast) {
				if (position.bottom>0.1 && !screens[marquee.index+1].api.state.isStartShow) {
					screens[marquee.index+1].api.state.isStartShow = true;
					screens[marquee.index+1].block.triggerHandler('startShow');
				} else if (position.bottom<0.1 && screens[marquee.index+1].api.state.isStartShow) {
					screens[marquee.index+1].api.state.isStartShow = false;
				}
				if (position.bottom>0.9 && !screens[marquee.index+1].api.state.isEndShow) {
					screens[marquee.index+1].api.state.isEndShow = true;
					screens[marquee.index+1].block.triggerHandler('endShow');
				} else if (position.bottom<0.9 && screens[marquee.index+1].api.state.isEndShow) {
					screens[marquee.index+1].api.state.isEndShow = false;
				}
			}
			// show start and end of current screen
			if (screens[marquee.index] && position.bottom<0.9 && !screens[marquee.index].api.state.isEndShow) {
				screens[marquee.index].api.state.isEndShow = true;
				screens[marquee.index].block.triggerHandler('endShow');
			} else if (screens[marquee.index] && position.bottom>0.9 && screens[marquee.index].api.state.isEndShow) {
				screens[marquee.index].api.state.isEndShow = false;
			}
			if (screens[marquee.index] && position.bottom<0.1 && !screens[marquee.index].api.state.isStartShow) {
				screens[marquee.index].api.state.isStartShow = true;
				screens[marquee.index].block.triggerHandler('startShow');
			} else if (screens[marquee.index] && position.bottom>0.1 && screens[marquee.index].api.state.isStartShow) {
				screens[marquee.index].api.state.isStartShow = false;
			}
			// full show
			if (screens[marquee.index] && position.top>=0 && position.bottom<=0) {
				if (!screens[marquee.index].api.state.isFullShow) {
					screens[marquee.index].api.state.isFullShow = true;
					screens[marquee.index].block.triggerHandler('fullShow');
				};
				for (var i=0; i<screens.length; i++) {
					if (i!=marquee.index) screens[i].api.state.isFullShow = false;
				};
			} else {
				for (var i=0; i<screens.length; i++) {
					screens[i].api.state.isFullShow = false;
				};
			};
			var visible = [Math.floor(marquee.progress), Math.ceil(marquee.progress)];
			// full hide
			for (var i=0; i<screens.length; i++) {
				if (i==visible[0] || i==visible[1]) {
					screens[i].api.state.isFullHide = false;
					screens[i].block[0].style.display = 'block';
				} else if (!screens[i].api.state.isFullHide) {
					screens[i].block[0].style.display = 'none';
					screens[i].block.triggerHandler('fullHide');
					screens[i].api.state.isFullHide = true;
				}
			}
		};
		// mark nav
		marquee.markNav = function(){
			if (settings.navPrev) settings.navPrev[marquee.progress<=0.5 ? 'addClass' : 'removeClass']('i-disabled');
			if (settings.navNext) settings.navNext[marquee.progress>=screens.length-1.5 ? 'addClass' : 'removeClass']('i-disabled');
		};
		// redraw
		marquee.draw = function(){

            var mt = $(".works__item:visible .page__wrap").css("margin-top");

			mt = mt.replace("px", "");
			mt = parseFloat(mt);
			if (mt < 0) {
				return false;
			}

 			if (!effect.move || screens[marquee.index].ratio*marquee.position >= screens[marquee.index].ratio-1) {
				var position = 1-Math.abs(screens[marquee.index].ratio*marquee.position-screens[marquee.index].ratio);
				if (marquee.index>=0) effect.hide(screens[marquee.index].block, position, marquee.size, screens[marquee.index].ratio);
				if (marquee.index<screens.length-1) effect.show(screens[marquee.index+1].block, position, marquee.size, screens[marquee.index+1].ratio);
			} else {
				if (marquee.index>=0) effect.move(screens[marquee.index].block, screens[marquee.index].ratio*marquee.position, marquee.size, screens[marquee.index].ratio);
				if (marquee.index<screens.length-1) effect.show(screens[marquee.index+1].block, 0, marquee.size, screens[marquee.index+1].ratio);
			}
			// hide invisibles
			marquee.hideInvisibles();
			// mark nav buttons
			marquee.markNav();
		};
		// {fn} on scroll start
		marquee.onScrollStart = function(){
			marquee.scrolling = true;
		};
		// {fn} on scroll
		marquee.onScroll = function(){
			index = 0;
			marquee.update();
			marquee.draw();
			marquee.callScreensAPI();

			if (scroll.moved) {
				var position = scroll[settings.vertical ? 'y' : 'x'] - scroll[settings.vertical ? 'pointY' : 'pointX'];
				for (var i=0; i<screens.length; i++) {
					if (position <= -screens[i].offset && position >= -screens[i].offset-screens[i].size) index = i;
				};
				marquee.setLimits(index);
			} else if (scroll.indicators && scroll.indicators[0].moved) {
				for (var i=0; i<screens.length; i++) {
					if (scroll[settings.vertical ? 'y' : 'x']-marquee.size/2 <= -screens[i].offset && scroll[settings.vertical ? 'y' : 'x']+marquee.size/2 >= -screens[i].offset-screens[i].size) index = i;
				};
				marquee.setLimits(index);
			};
		};
		// interactive
		marquee.grabTimer = false;
		var interactiveStart = function(){
			clearTimeout(marquee.grabTimer);
			if (!marquee.scrolling) {
				$frame.addClass('i-scrolling');
				marquee.scrolling = true;
			}

		};
		var interactiveEnd = function(){
			if (marquee) clearTimeout(marquee.grabTimer);
			if (marquee && marquee.scrolling) {
				$frame.removeClass('i-scrolling');
				marquee.scrolling = false;
			}

		};
		scroll.on('beforeWheelSnap', function(){
			index = 0;
			for (var i=0; i<screens.length; i++) {
				if (scroll[settings.vertical ? 'y' : 'x']-marquee.size/2 <= -screens[i].offset && scroll[settings.vertical ? 'y' : 'x']+marquee.size/2 >= -screens[i].offset-screens[i].size) index = i;
			};
			scroll.absStartX = settings.vertical ? 0 : -screens[index].offset;
			scroll.absStartY = -settings.vertical ? -screens[index].offset : 0;
			marquee.setLimits(index);
		})
		// {fn} on scroll end
		marquee.onScrollEnd = function(){
			marquee.refresh();
		};
		// {fn} refresh
		marquee.refresh = function(){
			marquee.update();
			marquee.draw();
			marquee.callScreensAPI();
			marquee.setLimits(marquee.index);
		};
		// {fn} resize
		marquee.resize = function(){
			if (!marquee) return false;
			$root.addClass('page_resize');
			resize();
			scroll.refresh();
			marquee.refresh();
			$root.removeClass('page_resize');
		};
		// {fn} enable
		marquee.enable = function(){
			marquee.enabled = true;
			scroll.enable();
			marquee.enableKeyboard();
		};
		// {fn} disable
		marquee.disable = function(){
			marquee.enabled = false;
			scroll.disable();
			marquee.disableKeyboard();
		};
		// {event} scroll start
		scroll.on('scrollStart', function(){
			if (!marquee) return false;
			marquee.onScrollStart();
		});
		// {event} scroll move
		scroll.on('scroll', function(){
			if (!marquee) return false;
			marquee.onScroll();
			if (scroll.moved) interactiveStart();
		});
		// {event} scroll end
		scroll.on('scrollEnd', function(){
			if (!marquee) return false;
			marquee.onScrollEnd();
			interactiveEnd();
		});
		// {event} grab
		scroll.on('grab', function(){
			if (!marquee) return false;
			// interavtive
			interactiveStart();
			marquee.grabTimer = setTimeout(function(){
				if (scroll) scroll.reset();
				interactiveEnd();
			}, 500);
			// update
			var index = 0,
				position = scroll[settings.vertical ? 'y' : 'x'] - scroll[settings.vertical ? 'pointY' : 'pointX'];
			for (var i=0; i<screens.length; i++) {
				if (position <= -screens[i].offset && position >= -screens[i].offset-screens[i].size) index = i;
			};
			marquee.setLimits(index);
		});
		// {event} window resize
		$window.on('resize', marquee.resize);
		// set limits on first screen
		marquee.setLimits(0);
		// {fn} scroll to
		marquee.scrollTo = function(index, duration){
			duration = duration===undefined ? settings.duration : duration;
			scroll.goToPage(!settings.vertical ? index : 0, settings.vertical ? index : 0, duration, IScroll.utils.ease.cubicOut);


			if (duration==0) marquee.refresh();
		};
		// {fn} prev
		marquee.prev = function(duration){
			if (marquee.scrolling) return false;
			duration = duration===undefined ? settings.duration : duration;
			var remaining = (-scroll.y - screens[marquee.index].offset);
			if (settings.vertical && remaining) {
				scroll.scrollBy(0, Math.min(remaining, marquee.size), duration, IScroll.utils.ease.cubicOut);
			} else if (settings.vertical && scroll.y<=-marquee.size) {
				scroll.scrollBy(0, marquee.size, duration, IScroll.utils.ease.cubicOut);
			} else if (marquee.index>0) {
				scroll.prev(duration, IScroll.utils.ease.cubicOut);
			}
		};
		// {fn} next
		marquee.next = function(duration){
			if (marquee.scrolling) return false;
			duration = duration===undefined ? settings.duration : duration;
			var remaining = (screens[marquee.index].offset + screens[marquee.index].size) - (-scroll.y + marquee.size)
			if (remaining>marquee.size*0.1 && settings.vertical) {
				scroll.scrollBy(0, -Math.min(remaining, marquee.size), duration, IScroll.utils.ease.cubicOut);
			} else if (marquee.index<screens.length-1) {
				scroll.next(duration, IScroll.utils.ease.cubicOut);
			}
		};
		// {fn} get marquee param
		marquee.get = function(parameter){
			return marquee[parameter];
		};
		marquee.destroy = function(){
			$frame.find('.'+settings.spaceClass).remove();
			$frame.removeData('marquee');
			scroll.destroy();
			scroll = null;
			marquee = null;
		};
		// scroll
		if (settings.vertical) {
			var $scroll = $frame.find('.iScrollVerticalScrollbar');
			$scroll.addClass('ui-scroll').prepend('<div class="ui-scroll__bar" />');
			$scroll.find('.iScrollIndicator').addClass('ui-scroll__handle').prepend('<div class="ui-scroll__handle__inner" />');
		};
		// {event} click on prev
		if (settings.navPrev) settings.navPrev.on('click', function(){
			marquee.prev();
		});
		// {event} click on next
		if (settings.navNext) settings.navNext.on('click', function(){
			marquee.next();
		});
		// {event} enable keyboard
		var keyboardEventName = 'keydown.marquee-' + (name ? name : '') + (settings.vertical ? 'v' : 'h');
		marquee.enableKeyboard = function(){
			if (!site.device.support.touch) $document.on(keyboardEventName, function(e){
				if (!$(e.target).is('input,textarea,select') && !site.content.opened) {
					if (e.which==(settings.vertical ? 38 : 37)) marquee.prev();
					if (e.which==(settings.vertical ? 40 : 39)) marquee.next();
				}
			});
		};
		// {event} disable keyboard
		marquee.disableKeyboard = function(){
			if (!site.device.support.touch) $document.off(keyboardEventName);
		};
		// api
		$frame.data('marquee', {
			screens: screens,
			onScrollStart: $.noop,
			onScrollEnd: $.noop,
			scrollTo: marquee.scrollTo,
			get: marquee.get,
			scroll: scroll,
			update: marquee.onScroll,
			resize: marquee.resize,
			enable: marquee.enable,
			disable: marquee.disable,
			destroy: marquee.destroy,
			enableKeyboard: marquee.enableKeyboard,
			disableKeyboard: marquee.disableKeyboard
		});
	});
};
// plugin for content scroll in phones
site.plugins['mobile-scrollable-content'] = function($block){

	var $data = $block.find('.content__data');

	// blocks and vars
	var scroll = new IScroll($data[0], {
		disableMouse: false,
		mouseWheel: true,
		scrollX: false,
		scrollY: true,
		click: false,
		tap: false,
		scrollbars: 'custom',
		interactiveScrollbars: !site.device.support.touch
	});

	// check
	var check = function(){
		if (site.device.isPhone) {
			scroll.enable();
			$data.addClass('content__data_scroll');
		} else {
			scroll.disable();
			$data.removeClass('content__data_scroll').children().first().removeAttr('style');
		}
	};

	check();

	// resize
	$window.on('resize.scrollable-content', function(){
		scroll.scrollTo(0,0);
		scroll.refresh();
		check();
	});

	// {event} show block
	$block.on('show', function(){
		if (site.device.isPhone) scroll.enable();
	});

	// {event} hide block
	$block.on('hide', function(){
		scroll.disable();
	});

	// api
	$block.data('scrollable-content', { scroll: scroll })

};
site.plugins.post = function($block){

	var $inner = $block.find('.content__inner'),
		$likes = $block.find('.post__actions__likes'),
		name = $block.data('name'),
		settings = site.content.items[name];

	// blocks and vars
	var scroll = new IScroll($inner[0], {
		disableMouse: false,
		mouseWheel: true,
		scrollX: false,
		scrollY: true,
		click: false,
		tap: false,
		scrollbars: 'custom',
		interactiveScrollbars: !site.device.support.touch,
		probeType: 3
	});

	// attach plugins
	site.plugins.keyboardScroll(scroll);
	site.plugins.scrollWithEmbeds(scroll);

	// {event} show block
	$block.on('show', function(){
		scroll.enable();
	});

	// {event} hide block
	$block.on('hide', function(){
		scroll.disable();
	});

	if ($likes.length) {
		var likesInserted = false;
		var createLikes = function(){
			site.likes.createButtons($likes, settings.url, settings.title, true);
		};
		if (site.likes.loaded) {
			createLikes();
		} else {
			site.loader.resources(site.likes.scripts, createLikes);
		}
	};

};
site.plugins.posters = function(){

	var worksGrid = {
		init: function() {
			var that = this;
			this.itemSet = $posters.find(".posters__item");
			var input = this.itemSet.map(function(index, elt) {
				return $(elt).attr("data-orientation").match(/(horizontal)|(vertical)|(square)/g);
			}).toArray();
			that.grid = [[]];
			var len = input.length,
				containerWidth = $posters.width(),
				rowWidth = 400,
				row = 0;
			that.cells = Math.round(containerWidth / rowWidth);
			that.cell = Math.ceil(containerWidth / that.cells);
			that.cellX2 = that.cell * 2;
			function checkАvailability(row, cell) {
				// true если текущая ячейка в предыдущей строке не вертикальна
				var noVertical = row > 0 ? that.grid[row - 1][cell] != "vertical" : true;
				// в текущей ячейке нет пробела и не выходит за пределы общего числа ячеек
				var currentEmpty = that.grid[row][cell] != "gap" && cell < that.cells;
				return noVertical && currentEmpty;
			};
			// Построение сетки и установка элементов
			for (var i = 0, c = 0; i < len; i++, c++) {
				var currentCell = c % that.cells;
				if (currentCell == 0 && c > 0) {
					row++;
					if (that.grid[row] == undefined) {
						that.grid.push([]);
					}
				};
				var currentCellEmpty = checkАvailability(row, currentCell);
				var nextCellEmpty = checkАvailability(row, currentCell + 1);
				// Алгоритм установки
				if (currentCellEmpty) {
					switch(input[i]) {
						case 'horizontal':
							if (nextCellEmpty) {
								that.grid[row][currentCell] = input[i];
								that.grid[row][currentCell + 1] = "gap";
								worksGrid.setItem(input[i], i, row, currentCell);
								c++;
							} else {
								that.grid[row][currentCell] = input[i];
								worksGrid.setItem("square", i, row, currentCell);
							}
							break;
						case 'vertical':
							if (that.grid[row + 1] == undefined) {
								that.grid.push([]);
							}
							that.grid[row][currentCell] = input[i];
							that.grid[row + 1][currentCell] = "gap";
							worksGrid.setItem(input[i], i, row, currentCell);
							break;
						case 'square':
							that.grid[row][currentCell] = input[i];
							worksGrid.setItem(input[i], i, row, currentCell);
							break;
					}
				} else {
					i--; // текущая ячейка занята. Уменьшаем номер текущего элемента.
				}
			};
			$posters.find(".posters__content").height(that.grid.length * this.cell);
		},
		setItem: function (itemType, index, setRow, setCell) {
			var item = this.itemSet.eq(index);
			item.css({
				top: setRow * this.cell + "px",
				left: setCell * this.cell + "px"
			});
			item.removeClass('posters__item_horizontal posters__item_vertical posters__item_square')
				.addClass('posters__item_' + itemType);
			switch(itemType) {
				case 'horizontal':
					item.css({
						width: this.cellX2 + "px",
						height: this.cell + "px"
					});
					break;
				case 'vertical':
					item.css({
						width: this.cell + "px",
						height: this.cellX2 + "px"
					});
					break;
				case 'square':
					item.css({
						width: this.cell + "px",
						height: this.cell + "px"
					});
					break;
				case 'convert':
					item.css({
						width: this.cell + "px",
						height: this.cell + "px"
					});
					break;
			}
		}
	};
	worksGrid.init();

	// {event} resize screen
	$window.on('resize.posters', function(){
		$posters.addClass('posters_refresh');
		worksGrid.init();
		scroll.refresh();
		$posters.removeClass('posters_refresh');
	});

	// works
	var scroll;
	$posters.each(function(){
		// scroll
		$posters.addClass('posters_refresh');
		scroll = new IScroll($posters[0], {
			disableMouse: false,
			mouseWheel: true,
			scrollX: false,
			scrollY: true,
			probeType: 3,
			bounce: true,
			tap: false,
			click: !site.device.support.touch
		});
		// api
		var color = $posters.data('color');
		$posters.on('show', function(){
			scroll.enable();
			site.state.mode = 'posters';
			site.state.item = 'index';
			//site.router.setByState();
			$root.addClass('page_posters');
		});
		$posters.on('hide', function(){
			scroll.disable();
			$root.removeClass('page_posters');
		});
		$posters.on('endShow', function(){
			$root.addClass('page_posters');
			site.ui.fill('logo', color);
			site.ui.fill('menu', color);
		});
		$posters.on('startShow', function(){
			site.ui.fill('works', color);
		});
		$posters.data('scroll', scroll);
		scroll.disable();
		site.plugins.keyboardScroll(scroll);
		$posters.removeClass('posters_refresh');
	});

	// {event} tap on item
	$posters.find('.posters__item').on('click', function(){
		site.works.open($(this).data('name'));
	});

};
$.fn.ipadPreloader = function(noresize) {

	this.each(function(){

		var $this = $(this),
			$img = $this.find('img'),
			$vid = $this.find('video');

		if (site.device.isMobile) {
			$vid.remove();
			return false;
		};

		if (!noresize) {

			var setWidth = function(){
				$this.width($img.width());
			};

			setWidth();

			$window.on('resize.ipad', setWidth);

		}

		// $this.on('click', function() {
		// 	$this.addClass('i-loading');
		// 	$vid[0].play();
		// });

		$this
			.closest('.screen')
			.on('show', function(){
				$vid[0].play();
			})
			.on('fullHide', function(){
				$vid[0].pause();
			});

		$vid.on('timeupdate', function(){
			if ($vid[0].currentTime>0) {
				// $this.removeClass('i-loading');
				$this.addClass('i-play');
				$vid.off('timeupdate');
			}
		});

	});

}

site.plugins['screen'] = function($screens, $work){

	// each screens
	$screens.each(function(){

		// vars
		var $screen = $(this);

		// {fn} check visibibily
		var isVisible = function(){
			return $work.data('work') && $work.data('work').state.active;
		}

		// {event} on show screen
		$screen.on('show', function(){
			if (!isVisible()) return;
			if ($work.data('work') && $work.data('work').setScrollColor) $work.data('work').setScrollColor($screen.data('color'));
			site.ui.fill('nav', $screen.data('color'));
		});

		// {event} on show start of  screen
		$screen.on('startShow', function(){
			if (!isVisible()) return;
			site.ui.fill('like', $screen.data('color'));
			site.ui.fill('links', $screen.data('color'));
			site.ui.fill('works', $screen.data('color'));
			$work.data('color', $screen.data('color'));
		});

		// {event} on show end of  screen
		$screen.on('endShow', function(){
			if (!isVisible()) return;
			site.ui.fill('logo', $screen.data('color'));
			site.ui.fill('menu', $screen.data('color'));
		});

	});

};
site.plugins.scrollWithEmbeds = function(scroll){

	var $block = $(scroll.wrapper),
		isScrolled = false,
		grabTimer;

	// {event} resize
	$window.on('resize', function(){
		if ($block.css('position') != 'static') scroll.refresh();
	});

	var start = function(){
		clearTimeout(grabTimer);
		if (!isScrolled) {
			$block.addClass('i-scrolling');
			isScrolled = true;
		}
	};
	var end = function(){
		clearTimeout(grabTimer);
		if (isScrolled) {
			$block.removeClass('i-scrolling');
			isScrolled = false;
		}
	};

	scroll.on('grab', function(){
		start();
		grabTimer = setTimeout(function(){
			scroll.reset();
			end();
		}, 500);
	});

	scroll.on('scroll', function(){
		if (scroll.moved) start();
	});

	scroll.on('scrollEnd', function(){
		end();
	});

};
// plugin for content scroll
site.plugins['scrollable-content'] = function($block){

	var $inner = $block.find('.content__data');

	// blocks and vars
	var scroll = new IScroll($inner[0], {
		disableMouse: false,
		mouseWheel: true,
		scrollX: false,
		scrollY: true,
		click: false,
		tap: false,
		scrollbars: 'custom',
		interactiveScrollbars: !site.device.support.touch,
		probeType: 3
	});

	// attach plugins
	site.plugins.keyboardScroll(scroll);
	site.plugins.scrollWithEmbeds(scroll);

	// {event} show block
	$block.on('show', function(){
		scroll.enable();
	});

	// {event} hide block
	$block.on('hide', function(){
		scroll.disable();
	});


};
site.plugins.spinner = function($block){

	// blocks  and vars
	var $icon = $block.find('img'),
		steps = 90,
		frame = { index: 0 },
		size = 61,
		columnSize = 33,
		duration = 3000,
		interval;
	// {fn} hide preloader
	var hide = function(callback, delay){
		$block.delay(delay || 0).velocity({
			opacity: 0
		}, 'easeOutCubic', 175, function(){
			// TweenMax.killTweensOf(frame);
			$block.remove();
			if (callback) callback();
		});
	};
	// {fn} sequence
	// var startSequence = function(){
	// 	if (!$block.length) return;
	// 	frame.index = 0;
	// 	TweenMax.to(frame, duration/1000, {
	// 		index: steps-1,
	// 		roundProps: 'index',
	// 		ease: Linear.easeNone,
	// 		onComplete: startSequence,
	// 		onUpdate: function(){
	// 			column = Math.floor(frame.index/columnSize);
	// 			$icon[0].style.left = (-column*size) + 'px';
	// 			$icon[0].style.top = (-(frame.index%columnSize)*size) + 'px';
	// 		}
	// 	});
	// };
	// api
	$block.data('spinner', { hide:hide });
	// run
	// site.loader.images($block, startSequence);

};
site.plugins['ui-help'] = function($parent, direction) {

	// blocks and vars
	var template = $('#help-template').html(),
		$screen = (direction=='horizontal') ? $parent.find('.screen_cover') : $parent,
		$item = $(template).addClass('ui-help_'+direction).appendTo($screen).css('color', $screen.data('color')),
		$block = $item.find('.ui-help__icon'),
		$icon = $block.find('svg'),
		length = 16,
		height = 50,
		frame = { index:0 },
		duration = 150,
		dragTime = 700,
		dragEasing = 'easeInOutCubic',
		dragStyle = (direction=='horizontal') ? { left: '25%' } : { top: '20%' },
		backStyle = (direction=='horizontal') ? { left: '75%' } : { top: '80%' },
		active = (direction=='horizontal');

	$screen.addClass('screen_help');

	// {fn} grab
	var grab = function(){
		active = true;
		frame.index = 0;
		sequence(length-1, drag);
	};
	// {fn} ungrab
	var ungrab = function(){
		frame.index = length-1;
		sequence(0, back);
	};
	// {fn} drag
	var drag = function(){
		$block.delay(100).velocity(dragStyle, dragTime, dragEasing, ungrab);
	};
	// {fn} back
	var back = function(){
		$block.delay(100).velocity(backStyle, dragTime, dragEasing, grab);
	};
	// {fn} sequence
	var sequence = function(to, callback){
		TweenMax.to(frame, duration/1000, {
			index: to,
			roundProps: 'index',
			ease: Linear.easeNone,
			delay: 0.1,
			onUpdate: function(){
				$icon[0].style.top = (-frame.index*height) + 'px';
			},
			onComplete: function(){
				if (callback) callback();
			}
		});
	};

	// {event} hide work
	$parent.on('fullHide', function(){
		if (direction=='horizontal') {
			TweenMax.killTweensOf(frame);
			$block.velocity('stop');
			$item.remove();
			$screen.removeClass('screen_help');
		} else {
			TweenMax.killTweensOf(frame);
			$block.velocity('stop');
			$block.css(backStyle);
			$icon[0].style.top = '0px';
		}
		active = false;
	});

	if (direction=='horizontal') {
		grab();
	} else {
		$parent.on('show', function(){
			if (!active) grab();
		});
	};

};
site.plugins['vimeo-screen'] = function($screen){

	// blocks and vars
	var $wrap = $screen.find('.vimeo-player').addClass('i-interactive'),
		iframe = $wrap.find('iframe')[0],
		screen = $screen.api('screen'),
		playerReady = false;

	// {fn} bind api
	var bindAPI = function(){
		var player = $f(iframe);
		// {fn} play
		var play = function(){
			if (playerReady && ((screen.state && screen.state.isVisible) || $screen.is('.content_active'))) player.api('play');
		};
		// {fn} pause
		var pause = function(){
			if (playerReady) player.api('pause');
		};
		// {event} player ready
		player.addEvent('ready', function(){
			if (!playerReady) {
				playerReady = true;
				play();
			};
		});
		// {event} screen show
		$screen.on('show', function(){
			play();
		});
		// {event} screen hide
		$screen.on('hide', pause);
		$screen.on('fullHide', pause);
	};

	// {fn} bind html api
	var bindHTML = function(){
		var html = $wrap.html();
		// {fn} play
		var add = function(){
			if (!$wrap.html().length) $wrap.html(html)
		};
		// {fn} pause
		var remove = function(){
			$wrap.html('');
		};
		// {event} screen show
		$screen.on('show', add);
		// {event} screen hide
		$screen.on('fullHide', remove);
		// content
		if ($screen.hasClass('content')) $screen.on('hide', remove);
	};

	// try to bind API
	if (typeof $f !== 'undefined' && !site.device.isMobile) {
		try {
			bindAPI();
		} catch (error) {
			bindHTML();
		};
	} else {
		bindHTML();
	}
};
site.plugins['work-inner'] = function($inner, $work){

	// init screens
	site.plugins.screen($inner.find('.screen'), $work);

};
/* --- Work : plugin --- */
var loadingTemplate = $('#work-loading-template').html(),
	pullHeight;

// update pull size
var updatePullheight = function(){
	if (site.device.isPhone) {
		pullHeight = 80;
	} else if (site.sizes.height<800) {
		pullHeight = 116;
	} else {
		pullHeight = 166;
	}
};
$window.on('resize', updatePullheight);
updatePullheight();

site.plugins['work'] = function($work){

	// blocks
	var $cover = $work.find('.screen_cover'),
		$loadingTemplate = $(loadingTemplate),
		$loadingScreen = $([]),
		$spinner = $([]),
		$loading = $([]),
		$loadingProgress = $([]),
		$scroll = $([]),
		$scrollHandle = $([]),
		$content = $work.find('.work__item__content'),
		$inner = $work.find('.works__item__inner'),
		$open = $cover.find('.ui-action.js-open'),
		$prev = $work.prev('.works__item'),
		$next = $work.next('.works__item'),
		$beforePrev = $prev.prev('.works__item'),
		$afterNext = $next.next('.works__item'),
		$media = $cover.find('.screen__media'),
		loadingScreenColor = '#666',
		name = $work.data('name'),
		settings = site.works.items[name],
		loaded = { cover:false, inner:false },
		loading = { cover:false, inner:false },
		state = { active:false, pull:false },
		coverScroll = null,
		offset = 0,
		innerHTML,
		ctx;

	// draw loader
	var pullProgress = function(progress){
		// clear prev frame
		ctx.clearRect(0, 0, $spinner[0].width, $spinner[0].height);
		ctx.beginPath();
		// offset (scroll larger then pull size)
		if (progress>1 && !state.pull) {
			offset = progress-1;
		} else if (!state.pull) {
			offset = 0;
		}
		// validate progress
		progress = (state.pull) ? 1 : Math.min(1, Math.max(0, progress), progress);
		// draw arc
		ctx.arc(25, 25, 19, (offset-0.5)*Math.PI,  (offset - 0.5 + 1.7 * progress) * Math.PI);
		ctx.stroke();
	}

	// cover screen api
	site.plugins['screen']($cover, $work);

	// enable/disable cover keyboard
	var enableCoverKeyboard = function(){
		if (!site.device.support.touch && coverScroll) $document.on('keydown.work-cover-'+name, function(e){
			if (!$(e.target).is('input,textarea,select') && e.which==40 && !site.content.opened) startLoading();
		});
	};
	var disableCoverKeyboard = function(){
		$document.off('keydown.work-cover-'+name);
	};


	// {event} click on open
	$open.on('click', function(){
		$work.api('work').request();
	});

	// {fn} show loading
	var showLoading = function(){
		$loading.addClass('ui-loading_visible');
	};

	// {fn} hide loading
	var hideLoading = function(){
		$loading.removeClass('ui-loading_visible');
	};

	// {fn} reset loading
	var resetLoading = function(){
		$loading.addClass('ui-loading_reset');
		$loadingProgress.width('0%');
		$loading.removeClass('ui-loading_reset');
	};

	// {fn} update loading
	var updateLoading = function(progress){
		(progress<100) ? showLoading() : hideLoading();
		$loadingProgress.width(progress + '%');
	};

	// {fn} open
	var open = function(){
		// check

		if (!state.active || !loaded.inner) return;
		// scroll
		if (state.pull) $work.api('marquee').scroll.scrollTo(0, -pullHeight, 0);

		if ($work.api('screen').state.isFullShow) {
			if (work.screenName) {
				var $screens = $work.find('.screen'),
					screenNameIndex = $screens.index($screens.filter('[data-name="'+work.screenName+'"]'));
			}
			var index = screenNameIndex || 1;
			$work.api('marquee').scrollTo(index);
			work.screenName = false;
		}
	};

	// {fn} close
	var close = function(){
		// check
		if (!loaded.inner) return;
		// set ui color
		$work.data('color', $cover.data('color'));
		// scroll
		$work.api('marquee').scroll.hold = false;
		$work.api('marquee').scrollTo(0,0);
		// disable
		$work.api('marquee').disable();
	};

	// {fn} activate
	var activate = function(coverCallback, quiet){
		if (state.active) return;
		// change active flag
		state.active = true;
		// state
		site.state.mode = 'work';
		site.state.item = name;
		// router
		//if (!quiet) site.router.setByState();
		// covers
		if (!loaded.cover) loadCover(coverCallback || $.noop);
		if ($prev.data('work')) $prev.data('work').loadCover();
		if ($next.data('work')) $next.data('work').loadCover();
		if ($beforePrev.data('work')) $beforePrev.data('work').loadCover();
		if ($afterNext.data('work')) $afterNext.data('work').loadCover();
		// enable
		if ($work.data('marquee')) {
			$work.data('marquee').enable();
		} else if (coverScroll) {
			enableCoverKeyboard();
		}
	};

	// {fn} deactivate
	var deactivate = function(){
		if (!state.active) return;
		// change active flag
		state.active = false;
		// return to cover
		close();
		// clear inner
		if (loaded.inner && site.device.isMobile) clear();
		if ($work.data('marquee')) $work.data('marquee').disable();
		if (coverScroll) disableCoverKeyboard();
	};

	// {fn} clear
	var clear = function(){
		loaded.inner = false;
		$work.api('marquee').scrollTo(0,0);
		$work.api('marquee').destroy();
		$inner.empty();
		createCoverScroll();
	};

	// {fn}
	var startLoading = function(){
		if (!coverScroll) return false;
		$open.api('action').startLoading();
		coverScroll.preventReset = true;
		coverScroll.scrollTo(0, -pullHeight, 350, IScroll.utils.ease.cubicOut);
	};

	// {fn} request inner
	var request = function(){
		if (loaded.inner) {
			open();
		} else if (settings.inner && coverScroll) {
			startLoading();
		}
	};

	// {fn} load cover
	var loadCover = function(callback){
		if (loaded.cover || loading.cover) return;
		// blocks and vars
		var $block = $('<div />').append($media.html()),
			progress = { resources:false, images:false },
			resources = [];
		// flag
		loading.cover = false;
		// resources
		///if (settings.cover && settings.cover.js) resources = resources.concat(settings.cover.js);
		//if (settings.cover && settings.cover.css) resources = resources.concat(settings.cover.css);
		// {fn} init
		var init = function(){
			// check
			if (!progress.resources || !progress.images) return false;
			setTimeout(function(){
				// change loading flags
				loaded.cover = true;
				loading.cover = false;
				// show media
				site.plugins['basic']($block);
				$block.insertAfter($media);
				$media.remove();
				// run plugin
			/*	try {
					if (settings.cover && settings.cover.plugin) site.plugins[settings.cover.plugin]($cover, $work);
				} catch (error) {
					console.log(site.plugins, settings.cover.plugin)
					console.log(settings.cover.plugin, error);
				};*/
				// custom callback
				if (callback) callback($cover);
				// show cover if visible
				var index = $work.data('marquee') ? $work.data('marquee').get('index') : 0;
				if (state.active && index==0) $cover.triggerHandler('show');
			}, 100);
		};
		// {fn} images loaded
		var onImagesLoaded = function(){
			progress.images = true;
			init();
		};
		// {fn} resources loaded
		var onResourcesLoaded = function(){
			progress.resources = true;
			init();
		};
		// load resources
		site.loader.resources(resources, onResourcesLoaded);
		// load images
		site.loader.images($block, onImagesLoaded);
	};

	// {fn} load inner
	var loadInner = function(callback){
		if (loaded.inner || loading.inner || !settings.inner) return;
		// disable cover scroll
		if (coverScroll) {
			$window.off('resize.work-cover-'+name);
			coverScroll.destroy();
			coverScroll = null;
		};
		// blocks and vars
		var $data = false,
			progress = { resources:false, images:false, html:false },
			status = 0,
			resources = [];
		// flag
		loading.inner = true;
		// resources
		if (settings.inner.js) resources = resources.concat(settings.inner.js);
		if (settings.inner.css) resources = resources.concat(settings.inner.css);
		// {fn} init
		var init = function(){
			// check
			if (!progress.resources || !progress.images || !progress.html) return false;
			// decorate button
			$open.api('action').stopLoading();
			// hide loading
			hideLoading();
			// hide spinner
			$spinner.addClass('work__loading__spinner_ready');
			setTimeout(function(){
				// change loading flags
				loaded.inner = true;
				loading.inner = false;
				// insert html
				$inner.html(innerHTML);
				// classes
				$inner.removeClass('works__item__inner_empty');
				$root.addClass('page_resize');
				// vertical scroll helper
				var $screens = $inner.find('.screen');
				// help
				if (!site.device.isPhone && !site.works.verticalHelperAdded && $screens.length>1 && !$screens.first().data('disable-help')) {
					site.works.verticalHelperAdded = true;
					site.plugins['ui-help']($screens.first(), 'vertical');
				}
				// create marquee
				site.plugins.marquee($work, {
					vertical: true,
					screens: '.screen:not(.work__loading)',
					effect: 'light',
					mousewheel: true,
					spaceClass: 'vertical-space',
					nextClass: 'screen_next',
					duration: 550
				});
				$root.removeClass('page_resize');
				// remove loading screen
				$loadingScreen.remove();
				disableCoverKeyboard();
				// scrollbars
				$scroll = $work.find('.ui-scroll__bar');
				$scrollHandle = $work.find('.ui-scroll__handle__inner');
				setScrollColor($cover.data('color'));
				// bind cover
				site.plugins['screen']($cover, $work);
				// default plugins
				site.plugins['basic']($inner, $work);
				site.plugins['work-inner']($inner, $work);
				// work plugin
				if (settings.inner.plugin) site.plugins[settings.inner.plugin]($inner, $work);
				// custom callback
				if (state.active && callback) callback();
				// update marquee
				$work.api('marquee').update();
				if (state.active) $work.data('marquee').enable();
				// close if not active
				if (!state.active) close();
				// event api
				if (!state.active) $work.data('work').deactivate();
				// pull
				state.pull = false;
			}, 175);
		};
		// {fn} images loaded
		var onImagesLoaded = function(){
			progress.images = true;
			init();
		};
		// {fn} image loaded
		var onImagesItemLoaded = function(ready,total){
			status += 50/total;
			updateLoading(status);
		};
		// {fn} resources loaded
		var onResourcesLoaded = function(){
			progress.resources = true;
			init();
		};
		// {fn} html loaded
		var onHtmlLoaded = function(html){
			progress.html = true;
			status += 25;
			updateLoading(status);
			innerHTML = html;
			site.loader.images($(html), onImagesLoaded, onImagesItemLoaded);
			init();
		};
		// loading
		resetLoading();
		// load resources
		site.loader.resources(resources, onResourcesLoaded, function(){
			status += 25/resources.length;
			updateLoading(status);
		});
		// download html
		$.get('/work/'+name+'/inner.php', onHtmlLoaded);
	};

	// bind cover
	site.plugins['screen']($cover, $work);

	// set scroll color
	var setScrollColor = function(color){
		$scroll.add($scrollHandle).css('background-color', color);
	};

	// work api
	var work = $work.api('work');
	work.loadCover = loadCover;
	work.loadInner = loadInner;
	work.request = request;
	work.open = open;
	work.close = close;
	work.activate = activate;
	work.deactivate = deactivate;
	work.state = state;
	work.setScrollColor = setScrollColor;
	work.enableCoverKeyboard = enableCoverKeyboard;
	work.disableCoverKeyboard = disableCoverKeyboard;

	// {event} full show work
	$work.on('fullShow', function(){

		var marquee = $work.data('marquee'),
			index = marquee ? marquee.get('index') : 0,
			$screen = index ? $work.find('.screen').eq(index) : $cover;
		if (coverScroll) {
			coverScroll.refresh();
			coverScroll.enable();
		};

		$screen.triggerHandler('show');
		$screen.triggerHandler('fullShow');
		if ($work.data('work')) $work.data('work').activate();
	});

	// {event} full hide work
	$work.on('fullHide', function(){
		// marquee
		var marquee = $work.data('marquee'),
			$screens = $([]);
		// find visible screens
		if (marquee && marquee.screens) {
			var screens = marquee.screens,
				$screens = $([]);
			for (var i=0; i < screens.length; i++) {
				if (screens[i].api.state.isVisible) $screens = $screens.add(screens[i].block);
			};
		} else {
			var $screens = $cover;
		}
		// call screens hide events
		$screens.triggerHandler('hide');
		$screens.triggerHandler('fullHide');
		// deactivate work
		if ($work.data('work')) $work.data('work').deactivate();
		// disable cover scroll
		if (coverScroll) coverScroll.disable();
	});

};
site.plugins.works = function(){

	// blocks
	var $items = $works.find('.works__item');
	$items.first().addClass('works__item_first');
	$items.last().addClass('works__item_last');

	// marquee between cases
	site.plugins.marquee($works, {
		vertical: false,
		screens: '.works__item',
		effect: 'space',
		nextClass: 'works__item_next',
		mousewheel: false,
		spaceClass: 'horizontal-space',
		duration: site.device.isPhone ? 350 : 700,
		navPrev: $root.find('.ui-nav_prev'),
		navNext: $root.find('.ui-nav_next')
	});

	// {event} switch case
	$works.api('marquee').onScrollEnd = function(nextIndex, prevIndex){
		if (nextIndex!=prevIndex && nextIndex>=0) {
			var prev = $items.eq(prevIndex).api('work'),
				next = $items.eq(nextIndex).api('work');
			if (prev.deactivate) prev.deactivate();
			if (next.activate) next.activate();
		}
	};

	// fill UI color
	$items.each(function(){
		// blocks
		var $work = $(this),
			$cover = $work.find('.screen_cover');
		// set default ui color
		$work.data('color', $cover.data('color'));
		// {event} start show
		$work.on('startShow', function(){
			var topColor = $work.data('work').state.pull ? $cover.data('color') : $work.data('color'),
				bottomColor = $work.data('work').state.pull ? $work.data('loading-color') : $work.data('color');
			site.ui.fill('next', topColor);
			site.ui.fill('menu', topColor);
			site.ui.fill('works', bottomColor);
		});
		// {event} end show
		$work.on('endShow', function(){
			var topColor = $work.data('work').state.pull ? $cover.data('color') : $work.data('color'),
				bottomColor = $work.data('work').state.pull ? $work.data('loading-color') : $work.data('color');
			site.ui.fill('prev', topColor);
			site.ui.fill('logo', topColor);
			site.ui.fill('like', bottomColor);
			site.ui.fill('links', bottomColor);
		});
		// {event} full hide work
		$work.on('fullHide', function(){
		/*	var $screen = $work.data('marquee') ? $work.find('.screen').eq($work.data('marquee').get('index')) : $cover;
			if ($screen.api('screen').onFullHide) $screen.api('screen').onFullHide();*/
		});
		// run case plugin
		site.plugins['work']($work);
	});

};