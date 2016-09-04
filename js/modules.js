(function(loader){
	// history
	loader.history = [];
	// {fn} load resources
	loader.resources = function(resources, complete, callback){
		// check callbacks
		complete = complete || $.noop;
		callback = callback || $.noop;
		// unchached resources
		var unchached = [];
		for (var i=0; i<resources.length; i++) {
			if (resources[i].indexOf('/build/')==0) resources[i] = resources[i].replace('/build/', '/build/' + site.version + '/');
			if (resources[i].indexOf('/content/')==0) resources[i] = resources[i].replace('/content/', '/content/' + site.version + '/');
			if (resources[i].indexOf('/work/')==0) resources[i] = resources[i].replace('/work/', '/work/' + site.version + '/');
			if (loader.history.indexOf(resources[i])<0) unchached.push(resources[i]);
		};
		// if resources is empty
		if (!unchached.length) return complete();
		// load
		Modernizr.load({
			load: unchached,
			callback: function(url){
				loader.history.push(url);
				callback();
			},
			complete: complete
		});
	};
	// {fn} load images
	loader.images = function($block, complete, callback){
		var loaded = 0;
		// check callbacks
		complete = complete || $.noop;
		callback = callback || $.noop;
		// init plugin
		$block.imagesLoaded().always(complete).progress(function(instance){
			loaded++;
			callback(loaded, instance.images.length)
		});
	}
})(site.loader);
(function(sizes){
	// {fn} update sizes
	var updateSizes = function(){
		sizes.width = $window.width();
		sizes.height = parseInt(window.innerHeight,10);
	};
	// {event} window resize
	$window.on('resize.site', updateSizes);
	// init
	updateSizes();
})(site.sizes);
// content module
(function(content, plugins, router, loader){

	// container
	var $container =  $root.find('.page__content');

	// empty block template
	var template = $('#content-template').html();

	zIndex = 680;

	// disable/enable marquee
	var enableMarquee = function(){
		if (site.state.mode != 'work') return false;
		var $work = $works.find('[data-name="'+site.state.item+'"]');
		$works.data('marquee').enable();
		if ($work.data('marquee')) {
			$work.data('marquee').enable();
		} else {
			$work.data('work').enableCoverKeyboard();
		}
	};
	var disableMarquee = function(){
		if (site.state.mode != 'work') return false;
		var $work = $works.find('[data-name="'+site.state.item+'"]');
		$works.data('marquee').disable();
		if ($work.data('marquee')) {
			$work.data('marquee').disable();
		} else {
			$work.data('work').disableCoverKeyboard();
		}
	};

	// opened flag
	content.opened = false;

	// {fn} api: open
	content.open = function(name, callback, isParent){
		if (content.opened==name) return;
		if (isParent && name==content.items[content.opened].parent) {
			content.close(content.opened);
			return;
		};
		var parent = false;
		name = name || 'menu';
		if (content.opened) {
			if (isParent) {
				parent = content.items[content.opened].parent;
				content.items[content.opened].parent = name;
				content.items[name].parent = parent;
				content.items[content.opened].block.css('z-index', zIndex+1);
				content.close(content.opened, isParent);
				zIndex--;
			} else {
				content.fade(content.opened)
			}
		} else {
			disableMarquee();
		}
		content.items[name].parent = isParent ? parent : content.opened;
		content.opened = name;
		if (!content.items[name].block) content.load(name, callback);
		zIndex++;
		content.items[name].block.css('z-index', zIndex);
		$root.addClass('page_content');
		if (isParent) content.items[name].block.addClass('content_parent content_faded content_active');
		setTimeout(function(){
			if (isParent) {
				content.items[name].block.removeClass('content_parent');
				content.unfade(name);
			} else {
				content.items[name].block.addClass('content_active').triggerHandler('show');
			}
		}, 50);
		if (content.items[name].parent) {
			content.items[name].block.addClass('content_child');
		} else {
			content.items[name].block.removeClass('content_child');
		}
		router.set(name, content.items[name][site.lang]);
	};

	// {fn} api: close
	content.close = function(name, isParent){
		name = name || content.opened;
		content.items[name].block.removeClass('content_active').triggerHandler('hide');
		if (isParent) return false;
		if (content.items[name].parent) {
			content.opened = content.items[name].parent;
			content.unfade(content.items[name].parent);
			router.set(content.items[name].parent, content.items[content.items[name].parent][site.lang]);
			zIndex--;
		} else {
			$root.removeClass('page_content');
			content.opened = false;
			router.setByState();
			if (site.state.mode=='work') enableMarquee();
			zIndex = 680;
		}
	};

	// {fn} api: fade
	content.fade = function(name){
		content.items[name].block.addClass('content_faded').triggerHandler('hide');
	};

	// {fn} api: unfade
	content.unfade = function(name){
		content.items[name].block.removeClass('content_faded').triggerHandler('show');
	};

	// {fn} api: close all
	content.closeAll = function(){
		$.each(content.items, function(name){
			var $block = content.items[name].block;
			if ($block && ($block.hasClass('content_active') || $block.hasClass('content_faded'))) $block.removeClass('content_active content_faded').triggerHandler('hide');
		});
		$root.removeClass('page_content');
		content.opened = false;
		router.setByState();
		if (site.state.mode=='work') enableMarquee();
		zIndex = 680;
	};

	// {fn} load
	content.load = function(name, callback){
		// vars
		var settings = content.items[name],
		    $block = false,
		    $spinner = false,
		    $data = false,
		    inited = false,
		    resources = [],
		    loaded = {
		    	'html': false,
		    	'js+css': false,
		    	'images': false
		    };
		// prepare
		settings.title = (settings.header && settings.header[site.lang]) ? settings.header[site.lang] : settings[site.lang];
		settings.name = name;
		settings.url = name + '/';
		var html = Mustache.render(template, settings);
		$block = $(html).appendTo($container).addClass('content_loading');
		content.items[name].block = $block;
		// static files
		if (settings.js) resources = resources.concat(settings.js);
		if (settings.css) resources = resources.concat(settings.css);
		// {fn} show
		var show = function(){
			plugins.content($block);
			$spinner = $block.find('.ui-spinner');
			plugins.spinner($spinner);
		};
		// {fn} is loaded?
		var isLoaded = function(){
			return (loaded['html'] && loaded['js+css'] && loaded['images']);
		};
		// {fn} init
		var init = function(){
			inited = true;
			$spinner.api('spinner').hide(function(){
				$block.addClass('content_loaded');
				$block.find('.content__data').append($data);
				$block.removeClass('content_loading');
				plugins.basic($block);
				if (settings.plugin) {
					$.each(settings.plugin, function(i){
						plugins[settings.plugin[i]]($block);
					});
				}
				if (content.opened==name) $block.triggerHandler('show');
				if (callback) callback();
			});
		};
		// show empty block
		show();
		// load resources
		loader.resources(resources, function(){
			loaded['js+css'] = true;
			if (isLoaded()) init();
		});
		// download html
		$.get(settings.html, function(html){
			loaded['html'] = true;
			$data = $('<div>' + html + '</div>');
			// load images
			site.loader.images($data, function(){
				loaded['images'] = true;
				if (isLoaded()) init();
			});
		});
	};

})(site.content, site.plugins, site.router, site.loader);
(function(device){

	/* --- Mobile --- */
	device.support = Modernizr;

	/* --- Mobile --- */
	device.isMobile = device.support.touch;
	$html.addClass(device.isMobile ? 'd-mobile' : 'd-no-mobile');

	/* --- Retina --- */
	device.isRetina = (window.devicePixelRatio && window.devicePixelRatio>1);

	/* --- Phone --- */
	var phoneCheck = function(){
		device.isPhone = (site.sizes.width<768);
		$html.addClass(device.isPhone ? 'd-phone' : 'd-no-phone');
		$html.removeClass(device.isPhone ? 'd-no-phone' : 'd-phone');
	};
	$window.on('resize.phone-check', phoneCheck);
	phoneCheck();

	/* --- Flash --- */
	device.support.flash = swfobject.hasFlashPlayerVersion('8.0.0');
	$html.addClass(device.support.flash ? 'm-flash' : 'm-no-flash');

	/* --- iOS --- */
	if (navigator.userAgent.match(/iPad/i)) {
		$html.addClass('d-ipad');
		device.isIPad = true;
	};
	if (navigator.userAgent.match(/(iPhone|iPod touch)/i)) {
		$html.addClass('d-iphone');
		device.isIPhone = true;
	};
	if (navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)) {
		$html.addClass('d-ios');
		device.isIOS = true;
	};
	if (navigator.userAgent.match(/.*CPU.*OS 7_\d/i)) {
		$html.addClass('d-ios7');
		device.isIOS7 = true;
	};

	/* --- iPad (for fix wrong window height) --- */
	if ($html.hasClass('d-ipad d-ios7')) {
		$window.on('resize orientationchange focusout', function(){
			window.scrollTo(0,0);
		});
	};

	/* --- Firefox --- */
	device.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	$html.addClass(device.isFirefox ? 'd-firefox' : 'd-no-firefox');

	/* --- Save to cookies --- */
	for (option in device) {
		if (option.indexOf('is')===0) $.cookie(option, device[option] ? 1 : 0);
	};

})(site.device);
(function(effects){
	effects = site.effects;
	// light effect
	effects.light = {};
	effects.light.show = function($block, position, size, ratio){
		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translateY(' + Math.round(size-position*size) + 'px) translateZ(0)';
		if (position==0) $block[0].style[prefixed.transform] = 'translateY(110%)';
	};
	effects.light.hide = function($block, position, size, ratio){
		$block[0].style.opacity = (1-position*0.4).toFixed(3);
		$block[0].style[prefixed.transform] = 'translateY(' + Math.round(-(ratio-1)*size - (position*size*0.5)) + 'px) translateZ(0)';
		if (position==1) $block[0].style[prefixed.transform] = 'translateY(-110%)';
		if (position==0) $block[0].style[prefixed.transform] = 'translateY(' + Math.round(-(ratio-1)*size) + 'px) translateZ(0)';
	};
	effects.light.move = function($block, position, size){
		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translateY(' + Math.round(-position*size) + 'px) translateZ(0)';
	};
	// space effect
	effects.space = {};
	effects.space.show = function($block, position){

		$block[0].style.opacity = 0.33+position*0.67;
		var transform = '';

		if (position==0) {
			transform = 'translateX(110%)';
		} else if (site.device.isPhone) {
			transform = 'perspective(500px) translateX(' + (-8+8*position) + '%) rotateY(' + (-6+position*6) + 'deg) scale(' + (0.8+position*0.2) + ')';
		} else {
			transform = 'perspective(500px) translateX(' + (-4+4*position) + '%) scale(' + (0.9+position*0.1) + ')';
			if (!site.device.isFirefox) transform = transform + 'rotateY(' + (-4+position*4) + 'deg)';
		}
		$block[0].style[prefixed.transform] = transform;
	};
	effects.space.hide = function($block, position){

		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translateX(' + (-100*position) + '%)';
		if (position==1) $block[0].style[prefixed.transform] = 'translateX(-110%)';
	};
	// fold effect
	effects.fold = {};
	effects.fold.show = function($block, position){

		$block[0].style.opacity = 1;
		$block[0].style[prefixed.transform] = 'translateY(' + (100-position*100) + '%)';
	};
	effects.fold.hide = function($block, position){
		$block[0].style.opacity = 1-position*0.67;
		$block[0].style[prefixed.transform] = 'perspective(500px) translateY(' + (4*position) + '%) rotateX(' + (-position*3) + 'deg) scale(' + (1-position*0.05) + ')';
		if (position==1) $block[0].style[prefixed.transform] = 'translateY(-101%)';
	};
})(site.effects);
(function(likes){
	// vars
	var $block = $root.find('.ui-likes'),
	    duration = 500,
	    domain = 'http://' + (window.location.hostname.indexOf('www')==-1 ? 'www.' : '' ) + window.location.hostname,
	    fbGroup = 'http://www.facebook.com/OlegChulakovStudio';
	// scripts urls
	likes.scripts = ['http://connect.facebook.net/ru_RU/all.js#xfbml=1', 'http://platform.twitter.com/widgets.js', 'http://vk.com/js/api/openapi.js?105'];
	// states
	likes.opened = false;
	likes.animated = false;
	likes.url = false;
	likes.loaded = false;
	// {fn} open likes block
	likes.open = function(){
		if (likes.animated) return;
		likes.opened = true;
		likes.animated = true;
		if (site.router.get()!==likes.url) likes.createButtons($block);
		$works.data('marquee').scroll.disable();
		$root.addClass('page_likes');
		$works.find('.ui-likes-overlay').show().velocity({ opacity:0.2 }, duration);
		$works[0].style[prefixed['transform-origin']] = '50% 100%';
		$works.velocity({
			translateY: -170,
			rotateX: -2,
			scale: 0.95
		}, duration, 'easeOutCubic', function(){
			likes.animated = false;
			$root.addClass('page_likes_opened');
		});
	};
	// {fn} close likes block
	likes.close = function(callback){
		if (likes.animated) return;
		likes.opened = false;
		likes.animated = true;
		$works.data('marquee').scroll.enable();
		$works[0].style[prefixed['transform-origin']] = '50% 100%';
		$root.removeClass('page_likes page_likes_opened');
		$works.find('.ui-likes-overlay').velocity({ opacity:0 }, duration, function(){
			$(this).hide();
		});
		$works.velocity({
			translateY: 0,
			rotateX: 0,
			scale: 1
		}, duration, 'easeOutCubic', function(){
			likes.animated = false;
			setTimeout(function(){
				if (callback) callback();
			},10);
		});
	};
	// templates
	var templates = {
		fb: $('#fb-like-template').html(),
		vk: $('#vk-like-template').html(),
		tw: $('#tw-like-template').html()
	};
	// clear templates
	$block.empty();
	// {fn} create buttons
	likes.createButtons = function($wrapper, url, title, noWWW){
		url = url || site.router.get();
		title = title || History.getState().title;
		likes.url = url;
		url = domain + site.router.base + url;
		if (noWWW) url = url.replace('www.', '');
		$wrapper.empty();
		$wrapper.append(createFB(likes.url.length ? url : fbGroup));
		$wrapper.append(createTW(url, title));
		$wrapper.append(createVK(url));
		try { FB.XFBML.parse($wrapper[0]); } catch (ex) {};
		try { twttr.widgets.load($wrapper[0]); } catch (ex) {};
        try {
        	var vkOptions = {
				type: 'mini',
				pageUrl: url,
				pageTitle: title
			};
        	if (site.state.mode == 'work') vkOptions.pageImage = domain + site.works.items[site.state.item].poster.small;
        	VK.Widgets.Like('vk-like', vkOptions);
        } catch (ex) {};
	};
	var createFB = function(url){
		return Mustache.render(templates.fb, { url: url });
	};
	var createTW= function(url, title){
		return Mustache.render(templates.tw, { url:url, title:title });
	};
	var createVK = function(url){
		return Mustache.render(templates.vk, { url: url });
	};
	// load API
	site.loader.resources(likes.scripts, function(){
		var vkAppID = window.location.hostname.indexOf('neo')>=0 ? 4475747 : 3252330;
		try { VK.init({ apiId:vkAppID, onlyWidgets:true }); } catch (ex) {};
		likes.loaded = true;
		if (likes.opened) likes.createButtons($block);
	});

})(site.likes);
(function(router, works){
	/*// base url
	router.base = '/';
	// cache for menu
	router.cache = '';
	// {fn} api: set url
	router.set = function(url, title){
		History.replaceState(null, title || null, router.base + url);
        if (typeof ga!=='undefined') ga('send', 'pageview', router.base + url);
	};
	// {fn} api: get url
	router.get = function(){
		return History.getState().hash.replace(router.base, '').replace(/\/$/, '').split('?')[0];
	};
	// {fn} set by state
	router.setByState = function(state){
		state = state || site.state;
		if (state.mode=='posters') router.set('work');
		if (state.mode=='work' && state.item!='studio') router.set(state.mode + '/' + state.item);
		if (state.mode=='work' && state.item=='studio') router.set('', works.items[state.item][site.lang]);
	};*/
})(site.router, site.works);
(function(ui){
	// blocks
	ui.blocks = {};
	ui.blocks.logo = $root.find('.ui-logo:first');
	ui.blocks.menu = $root.find('.ui-menu');
	ui.blocks.like = $root.find('.ui-like');
	ui.blocks.links = $root.find('.ui-links__item');
	ui.blocks.works = $root.find('.ui-works');
	ui.blocks.prev = $root.find('.ui-nav_prev');
	ui.blocks.next = $root.find('.ui-nav_next');
	ui.blocks.nav = ui.blocks.prev.add(ui.blocks.next);
	ui.blocks.all = ui.blocks.logo.add(ui.blocks.menu).add(ui.blocks.works).add(ui.blocks.like).add(ui.blocks.links).add(ui.blocks.nav);
	// pathes
	ui.pathes = {};
	ui.pathes.logo = ui.blocks.logo.find('path, .ui-logo__name');
	ui.pathes.like = ui.blocks.like.find('path');
	ui.pathes.links = ui.blocks.links;
	ui.pathes.menu = ui.blocks.menu.find('.ui-menu__line');
	ui.pathes.works = ui.blocks.works.find('.ui-works__square');
	ui.pathes.prev = ui.blocks.prev.find('path');
	ui.pathes.next = ui.blocks.next.find('path');
	ui.pathes.nav = ui.pathes.prev.add(ui.pathes.next);
	ui.pathes.all = ui.pathes.logo.add(ui.pathes.menu).add(ui.pathes.works).add(ui.pathes.like).add(ui.pathes.links).add(ui.pathes.nav);
	// {fn} fill path
	ui.fill = function(path, color){
		ui.pathes[path].css({
			'color': color,
			'fill': color,
			'border-color': color,
			'background-color': color
		});
	};
})(site.ui);
// content module
(function(works){

	works.inTransition = false;
	works.verticalHelperAdded = false;

	// visual hole in works grid
	var $hole = $('<div class="posters__hole" />').appendTo($posters);

	// animation time
	var duration = 800;

	// styles
	var styles = {
		home: {},
		works: {},
		content: {}
	};
	styles.home.before = { scale: 1 };
	styles.home.after = { scale: 2 };
	styles.works.before = { scale: 0.75, opacity: 0.3};
	styles.works.after = { scale: 1, opacity: 1 };
	styles.content.before = { translateY: '0%' };
	styles.content.after = {};
	styles.content.after.up = { translateY: '-101%' };
	styles.content.after.down = { translateY: '101%' };

	// {fn} get poster position
	var getLayout = function($poster) {
		var layout = {};
		// offset
		layout.offset = $poster.offset();
		layout.sizes = {
			width: $poster.width(),
			height: $poster.height()
		};
		layout.center = {
			left: (layout.offset.left + layout.sizes.width/2) / site.sizes.width * 100,
			top: (layout.offset.top + layout.sizes.height/2) / site.sizes.height * 100
		};
		layout.caseCenter = {
			left: layout.offset.left/(site.sizes.width - layout.sizes.width)*100,
			top: layout.offset.top/(site.sizes.height - layout.sizes.height)*100
		};
		layout.scale = {
			x: site.sizes.width / layout.sizes.width * (1+Math.abs(layout.center.left-50)/50),
			y: site.sizes.height / layout.sizes.height * (1+Math.abs(layout.center.top-50)/50)
		};
		layout.scale.max = Math.max(layout.scale.x, layout.scale.y);
		return layout;
	};

	// {fn} set origins
	var setOriginPoint = function(layout){
		// set point
		$works[0].style[prefixed['transform-origin']] = layout.caseCenter.left.toFixed(3) + '% ' + layout.caseCenter.top.toFixed(3) + '%';
		$posters[0].style[prefixed['transform-origin']] = layout.center.left.toFixed(3) + '% ' + layout.center.top.toFixed(3) + '%';
		// show hole
		$hole.css({
			top: layout.offset.top,
			left: layout.offset.left,
			width: layout.sizes.width,
			height: layout.sizes.height
		});
	};

	works.open = function(name){
		// check
		if (works.inTransition || $works.data('marquee').get('scrolling')) return;
		// transition flag
		works.inTransition = true;
		// blocks
		var $poster = $posters.find('[data-name='+name+']'),
		    $posterContent = $poster.find('.posters__item__content'),
		    $work = $works.find('[data-name='+name+']');
		// index of work
		var index = 0;
		for (key in works.items) {
			if (key==name) break; else index++;
		};
		// disable scroll
		$works.api('marquee').enable();
		// change mode
		site.state.mode = 'work';
		site.state.item = name;
		// {fn} run
		var run = function(){
			// set origin point
		/*	setOriginPoint(layout);*/
			// move works
			$works.api('marquee').scrollTo(index, 0);
			$works.api('marquee').onScrollEnd();
			// show hole
			$hole.show();
			// change classes
			$root.addClass('page_works_transition');
			// deactivate posters screen
			$posters.triggerHandler('hide');
			// fill ui color
			setTimeout(function(){
				$work.triggerHandler('startShow');
				$work.triggerHandler('endShow');
			}, duration/2);
			// {fn} afterZoom
			var afterZoom = function(){
				// hide home and hole
				$posters.addClass('posters_hidden');
				// change classes
				$root.removeClass('page_works_transition');
				// disable scroll
				$works.api('marquee').enable();
				// activate work
				$work.triggerHandler('fullShow');
				// remove styles of works
				$works.removeAttr('style');
				// load work
				$work.api('work').request();
				// return to default style
				$posters.velocity(styles.home.before, 0, function(){
					$posterContent.velocity(styles.content.before, 0, function(){
						works.inTransition = false;
					});
				});
			};
			// disable scroll
			$posters.data('scroll').disable();
			// scale home
			$posters.velocity({ scale: layout.scale.max + 0.1 }, duration*1.25, 'easeInOutCubic');
			// scale works
			$works.velocity(styles.works.before, 0);
			$works.velocity(styles.works.after, duration*1.5, 'easeOutCubic', afterZoom);
			// move poster content
			$posterContent.velocity(styles.content.after[layout.center.top>45 ? 'down' : 'up'], duration*1.1, 'easeInOutCubic');
		};
		// get layout
		var layout = getLayout($poster),
		    shift = 0;
		if (layout.caseCenter.top<0) {
			shift = -layout.offset.top;
		} else if (layout.caseCenter.top>100){
			shift = site.sizes.height - layout.offset.top - layout.sizes.height;
		}
		if (shift) {
			var shiftTime = Math.min(Math.abs(shift)*2, 600);
			$posters.data('scroll').scrollBy(0, shift, shiftTime);
			setTimeout( function(){
				layout = getLayout($poster);
				run();
			}, shiftTime)
		} else {
			run();
		};
	};

	works.close = function(callback){
		// check
		if (works.inTransition || $works.data('marquee').get('scrolling')) return;
		// transition flag
		works.inTransition = true;
		// blocks
		var /*$poster = $posters.find('[data-name='+site.state.item+']'),
		    $posterContent = $poster.find('.posters__item__content'),*/
		    $work = $works.find('[data-name='+site.state.item+']');


		// start show home
		$posters.css('opacity', 1).removeClass('posters_hidden');
		// disable scroll'
		setTimeout(function(){
			$(".owl-carousel").owlCarousel({
				loop:true,
				margin:0,
				nav:true,
				items: 3,
				// responsive:{
				//     0:{
				//         items:1
				//     },
				//     600:{
				//         items:3
				//     },
				//     1000:{
				//         items:5
				//     }
				// }
			});
		}, 1000);
		$works.api('marquee').disable();
		// run





		var run = function(){
			// show hole
			$hole.show();
			// set origin point
			/*setOriginPoint(layout);*/
			// fill ui color
			setTimeout(function(){
				$posters.triggerHandler('startShow');
				$posters.triggerHandler('endShow');
			}, duration/2);
			// {fn} afterZoom
			var afterUnzoom = function(){
				// change classes
				if (!callback) $root.removeClass('page_works_transition');
				// hide hole
				$hole.hide();
				// deactivate work
				$work.triggerHandler('fullHide');
				// activate posters screen
				$posters.triggerHandler('show');
				// enable scroll
				$posters.data('scroll').enable();
				// transition flag
				works.inTransition = false;
				// callback
				if (callback) callback();
			};
			// change classes
			$root.addClass('page_works_transition');
			// scale home
			//$posters.velocity({ scale: layout.scale.max + 0.1, opacity:1 }, 0).velocity(styles.home.before, duration*1.25, 'easeInOutCubic');
			// move poster content
			//$posterContent.velocity(styles.content.after[layout.center.top>45 ? 'down' : 'up'], 0).velocity(styles.content.before, duration*1.35, 'easeInOutCubic');
			// scale works
			$works.velocity(styles.works.after, 0).velocity(styles.works.before, duration*1.5, 'easeInOutCubic', afterUnzoom);
		};
		// get layout
		/*var layout = getLayout($posters),
		    shift = 0;
		if (layout.caseCenter.top<0) {
			shift = -layout.offset.top;
		} else if (layout.caseCenter.top>100){
			shift = site.sizes.height - layout.offset.top - layout.sizes.height;
		}
		// need move?
		if (shift!=0) {
			$posters.data('scroll').scrollBy(0, shift, 0);
			layout = getLayout($poster);
		};*/
		run();
	};

})(site.works);