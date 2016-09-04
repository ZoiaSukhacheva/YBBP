$(document).ready(function() {

	var map
	// Map build begin
	function buildMap(){
		L.mapbox.accessToken = 'pk.eyJ1IjoiZG1pdHJpeW50YWRldiIsImEiOiIyZDhlNjczOTZiMGJkMzM3Nzk1NGIxMWVhNTYwMDA0NCJ9.yEcYoufLxGaOx_7fXw_eAw';
	    map = L.mapbox.map('contact__map', 'mapbox.streets')
	                .setView([52.34841878869259,4.941847999999977], 16);
		// Disable drag and zoom handlers.


		map.dragging.disable();
		map.touchZoom.disable();
		map.doubleClickZoom.disable();
		map.scrollWheelZoom.disable();


		$("#contact__map").mouseleave(function(){
			map.dragging.disable();
			map.touchZoom.disable();
			map.doubleClickZoom.disable();
			map.scrollWheelZoom.disable();
		});
		$("#contact__map").click(function(){
			map.dragging.enable();
			map.touchZoom.enable();
			map.doubleClickZoom.enable();
			map.scrollWheelZoom.enable();
		});


	    var cssIcon = L.divIcon({
		  // Specify a class name we can refer to in CSS.
		  className: 'css-icon',
		  // Set marker width and height
		  iconSize: [34, 50]
		});

	     L.marker([52.34841878869259,4.941847999999977], {icon: cssIcon}).addTo(map);
// 		
	};
	
//Owl - carousel

	$(".owl-carousel").owlCarousel({
		loop:false,
		margin:0,
		nav:true,
		items: 4
	});


	//Open menu
	$(".menu").click(function(){
		$(".menu-page").addClass('menu-page__active');
		$(".social-link").addClass('social-link--shadow');
		$(".pager").fadeOut(0);
		$(".menu-page__inner").show();
		$("#contact-div, #what_we_do-div, #who_we_are-div, #terms-div").hide();
		$works.api('marquee').disable();
		$(".works").addClass("cursor-auto");
	});
	
	
	//Open menu end
	function extractDelta(e) {
		if (e.deltaY) {
			return e.deltaY;
		}
		if (e.wheelDelta) {
			return e.wheelDelta;
		}

		if (e.originalEvent.detail) {
			return e.originalEvent.detail * -40;
		}

		if (e.originalEvent && e.originalEvent.wheelDelta) {
			return e.originalEvent.wheelDelta;
		}
	}
	//Hiding internal pages
	$(window).resize(function(){
		$(".page__wrap").css("margin-top", 0);
		$(".inner-screen__pager").hide();
	});

	
	
	var wrapanimated = false;

	function setHeight(){
		var  winH = window.innerHeight ? window.innerHeight:$(window).height();
		$(".inner-screen").css("height",winH);
	};
	$(window).resize(function () {
		setHeight();
	});
	/*Changed by Zoia*/
	/*setHeight();*/

	$(".page__wrap").off("mousewheel").mousewheel(function(event){



		if (!wrapanimated) {
			var next, l = $works.find('.works__item').length, el = $(this);
			var top = $(this).css("margin-top");
			var  winH = window.innerHeight ? window.innerHeight:$(window).height();
			top = top.replace("px", "");
			top = parseInt(top, 10);
			if (top == 0) {
				$("video").each(function(){
					if (!$(this).attr("autoplay"))
						this.pause();

				});
				next = $works.find('.works__item:visible').index()-1;
				if (extractDelta(event) < 0 ) {
					next++;
				} else {
					next--;
				}
				if (next >= l) /*next = 0;*/return false;
				if (next < 0) /*next = l;*/return false;
				wrapanimated = true;
				var curEl = $works.find('.works__item:visible');
				if (extractDelta(event) < 0 ) {
					curEl.velocity({perspective: 500, translateX: '-45%'}, 300, 'easeOutCubic');
					curEl.next().css("display", "block").velocity({opacity: 1, perspective: 500, scale: 0.9, rotateY:"(-0.243045deg)"}, 300, 'easeOutCubic');
				} else {

					curEl.velocity( {opacity: 0.6, perspective: 500, scale: 0.9, rotateY:"(-0.243045deg)" /*translateX:"(-0.243045%)", scale:"(0.993924)", rotateY:"(-0.243045deg)"*/}, 300, 'easeOutCubic');
					curEl.prev().css("display", "block").velocity({perspective: 500, translateX: '-45%'}, 300, 'easeOutCubic');


						}

				//translateX

				setTimeout(function(){
					if (extractDelta(event) < 0 ) {
					curEl.velocity({translateX: '-110%'}, 300, 'easeOutCubic');
					curEl.next().velocity({translateX: '0', scale: 1, perspective:0}, 200, 'easeOutCubic');
						$works.api('marquee').scrollTo(next, 0);
					} else {
				//   	curEl.velocity({translateX: '110%', scale: 1}, 900, 'easeOutCubic');
						curEl.prev().velocity({translateX: '0', scale: 1, perspective:0}, 200, 'easeOutCubic');
						$works.api('marquee').scrollTo(next, 0);
					}


					setTimeout(function(){ wrapanimated = false; }, 500);
				}, 300);
			} else {


				if (extractDelta(event) < 0 ) {


					var l = $('.works__item:visible .inner-screen').length + 1;
					if (top-winH > -winH*l) {
						wrapanimated = true;
						$("video").each(function(){
							if (!$(this).attr("autoplay"))
							this.pause();

						});
						$($($(this).find(".inner-screen"))[Math.abs((top-winH)/winH)-1]).find("video").each(function(){this.play()});
						$(this).stop(true, true).animate({"margin-top":top-winH}, 300,function(){
							wrapanimated  = false;
							var page = Math.abs((top-winH)/winH)

							if (page == 0) {$(".inner-screen__pager").hide(); $(".pager").show();} else {$(".inner-screen__pager").show(); $(".pager").hide();}
							$(".inner-screen__pager").each(function(){
								$(this).find("div").removeClass("active");
								$(this).find("div").eq(page-1).addClass("active");
							});
							$(".inner-screen__pager").each(function(){
								if ($(this).height())
									$(this).css("margin-top", -$(this).height()/2);
							});

						});
					} else {
						
					}

				} else {
					if (top+winH <=0) {
						$("video").each(function(){
							if (!$(this).attr("autoplay"))
							this.pause();

						});
						wrapanimated = true;
						$($($(this).find(".inner-screen"))[Math.abs((top+winH)/winH)-1]).find("video").each(function(){this.play()});
						$(this).stop(true, true).animate({"margin-top":top+winH}, 300, function(){
							wrapanimated  = false;
							var page = Math.abs((top+winH)/winH);

							if (page == 0) {$(".inner-screen__pager").hide(); $(".pager").show();} else {$(".inner-screen__pager").show(); $(".pager").hide();}
							$(".inner-screen__pager").each(function(){
								$(this).find("div").removeClass("active");
								$(this).find("div").eq(page-1).addClass("active");
							});
							$(".inner-screen__pager").each(function(){
								if ($(this).height())
									$(this).css("margin-top", -$(this).height()/2);
							});
						});
					}

				}
			}


		}

	

		return false;
	});

	$(".page__wrap").touchwipe({
		preventDefaultEvents: false,
		wipeUp: function () {
			var el =  $(this), index = $(".inner-screen__pager:visible div.active").index();
			if (index == -1)  index = 0;

			index = parseInt(index, 10);
			index--;



			if (index <0) {
				$(".inner-screen__pager").hide();
				$(".pager").show();$(".page__wrap").animate({"margin-top": 0}, 500);
			}else {
				el.find(".inner-screen__pager").show();
				$(".pager").hide();
				$($(".inner-screen__pager:visible div")[index]).click();
			}

			$(".inner-screen__pager").each(function(){
				if ($(this).height())
					$(this).css("margin-top", -$(this).height()/2);
			});
		},
		wipeDown: function () {
			var el = $(this), index = $(".inner-screen__pager:visible div.active").index();
			if (index == -1)  index = 0;

			index = parseInt(index, 10);


			//if (index < 0) index = 0;
			index++;
			if (index <0) {

				$(".inner-screen__pager").hide();
				$(".pager").show();
				$(".page__wrap").animate({"margin-top": 0}, 500);
			} else {
				el.find(".inner-screen__pager").show();
				$(".pager").hide();


				$($(".inner-screen__pager:visible div")[index]).click();
			}

			$(".inner-screen__pager").each(function(){
				if ($(this).height())
					$(this).css("margin-top", -$(this).height()/2);
			});
		}
	});

	$(".menu-page__close").click(function(){
		$(".menu-page").removeClass('menu-page__active');
		$(".social-link").removeClass('social-link--shadow');
		$(".pager").fadeIn(0);
		$works.api('marquee').enable();
		$(".works").removeClass("cursor-auto");
		map.remove();
	});

	$(".menu-page__link").click(function(){
		var el = $("#"+$(this).attr("id")+"-div");
			$('#menu-page__close').fadeOut(0);
		$(".menu-page__inner").fadeOut(300, function(){
			$("#contact-div, #what_we_do-div, #who_we_are-div").css({"margin-top":0});
			
			el.fadeIn(300);
			buildMap();
			$('#menu-page__arrow').fadeIn(300);

		});

		return false;


	});

	$(".menu-page__arrow").click(function(){
			$('#menu-page__arrow').fadeOut(100);	
			$("#contact-div, #what_we_do-div, #who_we_are-div,#terms-div").fadeOut(0);
		$(".menu-page__inner").fadeIn(300, function(){
			$('#menu-page__close').fadeIn(300);	
			});
		map.remove();

		return false;


	});

	$(".inner-page__footer-links a").on("click", function(){
        $("#what_we_do-div,#who_we_are-div").hide();
		if ($(this).hasClass("terms-link")) {
			$("#contact-div").hide();
			$("#terms-div").fadeIn(300);
		} else {
			$("#terms-div").hide();
			$("#contact-div").fadeIn(300);
			map.remove();
			buildMap();
		}
		return false;
	});


	// }

	// Soft scroll

	$('#scroll-link, #scroll-link2').on("click", "a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),

		top = $(id).offset().top;
		console.log(top);
		var p = $(this).parent().parent().parent().parent();
		console.log(p);
		console.log(p.height());
		$(p).animate({"margin-top": -top}, 500);
	});

	$("#what_we_do-div").mousewheel(function(event){
		if (extractDelta(event) > 0 ) {
			$("#what_we_do-div").animate({"margin-top": 0}, 0);
			
		}

	});

	$("#who_we_are-div").mousewheel(function(event){
		if (extractDelta(event) > 0 ) {
			$("#who_we_are-div").animate({"margin-top": 0}, 0);
			
		}

	});


	// Replace background by img in .page-section--slide 
	$('.page-section--slide').each(function(){
        var section = $(this).find('.page-section--slide-bg').attr('src');
        
        if(section == true){
            $(this).css({'background-color':'#fff'});
    
        }
        else{
            $(this).css({'background-image':'url(' + section + ')'});
    	
        }
    });
	// End of replace background by img in .page-section--slide


	

	//Close popup by clicking on "cross" or "shadow"
	$(".page__wrap").click(function(){
		$(".modal").fadeOut(500);
	});

	// Close popup by Esc
	$(this).keydown(function(eventObject){
		if (eventObject.which == 27)
			$('.modal').fadeOut(500);
	});


	$(".home-screen .promo__link").click(function(){
		return false;
	});
	$(".home-screen .promo__link").hover(function(){
		$(this).removeClass("element-animation1").addClass("element-animation");
		$(this).find("span").removeClass("element-animation3");
	}, function(){
		var el = $(this);
		el.addClass("element-animation1");
		el.find("span").addClass("element-animation3");
			setTimeout(function(){
				el.removeClass("element-animation");
			}, 200)//;
	});

	$(".home-screen .btn").click(function(){
		wrapanimated = true;
		setTimeout(function(){ wrapanimated = false; },600);
		var c = $(this).parent().parent().parent(), top = 0, h = $(window).height();
		var h= window.innerHeight ? window.innerHeight:$(window).height();

		c.animate({"margin-top": -h}, 500);
		c.parent().find(".inner-screen__pager").show();
		$(".pager").hide();
		c.parent().find(".inner-screen__pager div").removeClass("active");
		c.parent().find(".inner-screen__pager div").eq(0).addClass("active");
		$(".inner-screen__pager").each(function(){
			if ($(this).height())
				$(this).css("margin-top", -$(this).height()/2);
		});
		return false;
	});
	$(".inner-screen__pager div").on("click", function(){
		var h= window.innerHeight ? window.innerHeight:$(window).height();
		//var h = $(window).height();
		$(this).parent().find("div").removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		var c = $(this).parent().parent().find(".page__wrap");
		$("video").each(function(){
			if (!$(this).attr("autoplay"))
			this.pause();

		});
		c.stop(true, true).animate({"margin-top": -h*(index+1)}, 500);
		return false;
	});

	$(".scroll-icon").on("click", function(){
		var h= window.innerHeight ? window.innerHeight:$(window).height();
		$(this).parent().parent().parent().find(".inner-screen__pager-item.active").removeClass("active");
		$(this).parent().parent().parent().find(".inner-screen__pager-item:nth-child(2)").addClass("active");
		// var index = $(this).index();
		var c = $(this).parent().parent();

		c.animate({scrollTop: h}, 500);
		c.stop(true, true).animate({"margin-top": -h*2}, 500);
		// $('#inner-page').animate({scrollTop: top}, 1000);
		return false;
	});


});

(function(state, router, ui, content, works, plugins, likes, loader, device){

	$('.cases').on('click', function(){


        if($(this).hasClass('cases-active')){
            $('.owl-carousel .owl-item').animate({'left':'105vw'},400);
            setTimeout(function(){
                $(".screen-cases-content").fadeOut(100);
            },380);
            setTimeout(function(){
                $(".screen-cases-content").removeClass('content-bg-none');
            },500);
            $(".page__footer").fadeIn(100);
            $(this).removeClass('cases-active');
			$('.screen-cases__close').fadeOut(0);
        }
        else{
            $(this).addClass('cases-active');
            $(".screen-cases-content").addClass('content-bg-none').css({"z-index":2000, left: 0}).css({'display':'block'});
            $('.owl-carousel .owl-item:nth-child(1)').animate({'left':'0'},500);
            $('.owl-carousel .owl-item:nth-child(2)').animate({'left':'25vw'},500);
            $('.owl-carousel .owl-item:nth-child(3)').animate({'left':'50vw'},500);
            $('.owl-carousel .owl-item:nth-child(4)').animate({'left':'75vw'},500);
            $('.owl-carousel .owl-item:nth-child(5)').animate({'left':'100vw'},500);
            $('.owl-carousel .owl-item:nth-child(6)').animate({'left':'125vw'},500);
            $('.owl-carousel .owl-item:nth-child(7)').animate({'left':'150vw'},500);
            $('.owl-carousel .owl-item:nth-child(8)').animate({'left':'175vw'},500);
            $('.owl-carousel .owl-item:nth-child(9)').animate({'left':'200vw'},500);
			$('.screen-cases__close').fadeIn(100);

        }


        return false;

	});

	$('.screen-cases__close').on('click', function(){
		$('.screen-cases__close').fadeOut(0);
        $('.owl-carousel .owl-item').animate({'left':'105vw'},400);
        setTimeout(function(){
            $(".screen-cases-content").fadeOut(100);
        },380);
        setTimeout(function(){
            $(".screen-cases-content").removeClass('content-bg-none');
        },500);

        $('.cases').removeClass('cases-active');
		$(".page__footer").fadeIn(100);
	})

    var pageX, pageY;
	$(".owl-carousel .item").mousedown(function(event){ pageX =event.pageX; pageY  = event.pageY;  }).click(function(event){
		
		if (event.pageX == pageX &&  event.pageY == pageY) {

			var index = $(this).attr("data-item");
			$(".works").velocity({ scaleX: 1}, 0, 'easeInOutCubic').velocity({ opacity: 1}, 100*0.5, 'easeInOutCubic',function(){
				$(".page__footer").fadeIn(100);
				$(".screen-cases-content").fadeOut(100);

				$(".page__wrap").css("margin-top", 0);
				$(".inner-screen__pager").hide();
				$(".cases").removeClass("cases-active");
				$("video").each(function(){
					if (!$(this).attr("autoplay"))
					this.pause();

				});
				setTimeout(function(){

					$($works.find(".works__item")[index]).fadeIn(300);
				}, 100);
				$works.api('marquee').scrollTo(index, 0);


			});

		}


		return false;
	});



	// Prevent default events
	$document.on('touchmove MSPointerMove', function(e){
		e.preventDefault();
	});
	$window.on('mousewheel', function(e){
		//e.preventDefault();
	});
	$document.on('dragstart selectstart', function() {
		return false;
	});
	$window.on('scroll', function(){
		$html.add($body).scrollTop(0);
	});

	// Run basic functions
	/*plugins.basic($root);

	// Posters
	plugins.posters($posters);
*/
	// Works
	for (var name in works.items) {
		if (!works.items[name][site.lang]) delete works.items[name];
	};
	plugins.works($works);

	// Preloader
	(function(){
		// blocks  and vars
		var $preloader = $root.find('.ui-preloader'),
			$spinner = $preloader.find('.ui-spinner');
		// init loading animation
		site.plugins.spinner($spinner);
		var spinner = $spinner.api('spinner');
		// {fn} activate work
		var activateWork = function(name, callback, quiet, screenName){
			var index = 0;
			for (key in site.works.items) {
				if (key==name) break; else index++;
			};
			var work = $works.find('.works__item').eq(index).data('work');
			work.loadCover(function(){
				work.activate($.noop, quiet || false);
				$works.api('marquee').scrollTo(index, 0);
				if (callback) callback();
				if (screenName) {
					setTimeout(function(){
						work.screenName = screenName;
						work.request();
					}, 50);
				}
			});
		};
		// {fn} hide
		var hidePreloader = function(){
			spinner.hide(function(){
				$root.removeClass('page_preloading');
				$preloader.velocity({ opacity:0 }, 450, function(){
					$preloader.remove();
				});
			});
		};
		// {fn} check
		var check = function(){
			var url = router.get(),
				isContent = site.content.items[url],
				isWorkGrid = url=='work';
			isWorkItem = url.indexOf('work/')!=-1,
				isError = $serverError.length,
				name = isWorkItem ? url.split('/')[1] : 'studio';
			if (name.indexOf('#')) {
				var screenName = name.split('#')[1];
				name = name.split('#')[0];
			};
			if (isError) {
				site.ui.fill('all', $serverError.data('color'));
				site.plugins['ui-help']($works.find('[data-name='+name+']'), 'horizontal');
				hidePreloader();
			} else if (isContent) {
				activateWork('studio', $.noop, true);
				site.content.open(url, hidePreloader);
			} else if (isWorkGrid && !site.device.isPhone) {
				activateWork('studio', hidePreloader);
				site.works.close();
			} else {
				content.load('menu');
				$works.api('marquee').enable();
				activateWork(name, hidePreloader, false, screenName || false);
				site.plugins['ui-help']($works.find('[data-name='+name+']'), 'horizontal');
			}
		};
		// {event} window load

	})();




})(site.state, site.router, site.ui, site.content, site.works, site.plugins, site.likes, site.loader, site.device);