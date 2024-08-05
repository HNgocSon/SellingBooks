
/* -------------------------------------
		CUSTOM FUNCTION WRITE HERE
-------------------------------------- */
jquery(document).on('ready', function() {
	"use strict";
	jquery('.tg-themetabnav > li > a').hover(function() {
		jquery(this).tab('show');
	});
	/*--------------------------------------
			SCROLL TO TOP					
	--------------------------------------*/
	var _tg_btnscrolltop = jquery("#tg-btnbacktotop");
	_tg_btnscrolltop.on('click', function(){
		var _scrollUp = jquery('html, body');
		_scrollUp.animate({ scrollTop: 0 }, 'slow');
	})
	/* -------------------------------------
			COLLAPSE MENU SMALL DEVICES
	-------------------------------------- */
	function collapseMenu(){
		jquery('.menu-item-has-children, .menu-item-has-mega-menu').prepend('<span class="tg-dropdowarrow"><i class="fa  fa-angle-right"></i></span>');
		jquery('.menu-item-has-children span, .menu-item-has-mega-menu span').on('click', function() {
			jquery(this).next().next().slideToggle(300);
			jquery(this).parent('.menu-item-has-children, .menu-item-has-mega-menu').toggleClass('tg-open');
		});
	}
	collapseMenu();
	/*--------------------------------------
			HOME SLIDER						
	--------------------------------------*/
	var _tg_homeslider = jquery('#tg-homeslider');
	_tg_homeslider.owlCarousel({
		items: 1,
		nav: true,
		loop: true,
		dots: true,
		autoplay:false,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
	});
	/*--------------------------------------
			BEST BOOK SLIDER				
	--------------------------------------*/
	var _tg_bestsellingbooksslider = jquery('#tg-bestsellingbooksslider');
	_tg_bestsellingbooksslider.owlCarousel({
		nav: true,
		loop: true,
		margin: 30,
		dots: true,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
		responsive: {
			0: { items:1 },
			480: { items:2 },
			600: { items:3 },
			1000: { items:5 },
			1200: { items:6 },
		}
	});
	/*--------------------------------------
			RELATED PRODUCT SLIDER			
	--------------------------------------*/
	var _tg_relatedproductslider = jquery('#tg-relatedproductslider');
	_tg_relatedproductslider.owlCarousel({
		nav: true,
		loop: true,
		margin: 30,
		dots: true,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
		responsive: {
			0: { items:1 },
			568: { items:2 },
			768: { items:2 },
			992: { items:3 },
			1200: { items:4 },
		}
	});
	/* -------------------------------------
			COLLECTION COUNTER
	-------------------------------------- */
	try {
		var _tg_collectioncounters = jquery('#tg-collectioncounters');
		_tg_collectioncounters.appear(function () {
			
			var _tg_collectioncounter = jquery('.tg-collectioncounter h3');
			_tg_collectioncounter.countTo({
				formatter: function (value, options) {
					return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
				}
			});
		});
	} catch (err) {}
	/*--------------------------------------
			PICKED BY AUTHOR SLIDER			
	--------------------------------------*/
	var _tg_pickedbyauthorslider = jquery('#tg-pickedbyauthorslider');
	_tg_pickedbyauthorslider.owlCarousel({
		nav: true,
		loop: true,
		dots: true,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
		responsive: {
			0: { items:1 },
			768: { items:2 },
			992: { items:3 },
		}
	});
	/*--------------------------------------
			TESTIMONIALS SLIDER				
	--------------------------------------*/
	var _tg_testimonialsslider = jquery('#tg-testimonialsslider');
	_tg_testimonialsslider.owlCarousel({
		items:1,
		nav: true,
		loop: true,
		dots: true,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
	});
	/*--------------------------------------
			PICKED BY AUTHOR SLIDER			
	--------------------------------------*/
	var _tg_authorsslider = jquery('#tg-authorsslider');
	_tg_authorsslider.owlCarousel({
		nav: true,
		loop: true,
		dots: true,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
		responsive: {
			0: { items:1 },
			600: { items:4 },
			1000: { items:5 },
			1200: { items:6 },
		}
	});
	/*--------------------------------------
			TEAMS SLIDER					
	--------------------------------------*/
	var _tg_teamsslider = jquery('#tg-teamsslider');
	_tg_teamsslider.owlCarousel({
		nav: true,
		loop: true,
		dots: true,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
		responsive: {
			0: { items:1 },
			600: { items:3 },
			1000: { items:4 },
		}
	});
	/*--------------------------------------
			NEWS AND ARTICLE SLIDER			
	--------------------------------------*/
	var _tg_postslider = jquery('#tg-postslider');
	_tg_postslider.owlCarousel({
		nav: true,
		loop: true,
		dots: true,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
		responsive: {
			0: { items:1 },
			600: { items:2 },
			992: { items:3 },
			1200: { items:4 },
		}
	});
	/*--------------------------------------
			HOME SLIDER						
	--------------------------------------*/
	var _tg_successslider = jquery('#tg-successslider');
	_tg_successslider.owlCarousel({
		items: 1,
		nav: true,
		loop: true,
		dots: true,
		autoplay:false,
		navText: [
					'<i class="icon-chevron-left"></i>',
					'<i class="icon-chevron-right"></i>'
				],
		navClass: [
					'owl-prev tg-btnround tg-btnprev',
					'owl-next tg-btnround tg-btnnext'
				],
	});
	/* -------------------------------------
			Google Map
	-------------------------------------- */
	jquery("#tg-locationmap").gmap3({
		marker: {
			address: "1600 Elizabeth St, Melbourne, Victoria, Australia",
			options: {
				title: "Books Library",
			}
		},
		map: {
			options: {
				zoom: 16,
				scrollwheel: false,
				disableDoubleClickZoom: true,
			}
		}
	});
	/*------------------------------------------
			PRODUCT INCREASE
	------------------------------------------*/
	jquery('em.minus').on('click', function () {
		jquery('#quantity1').val(parseInt(jquery('#quantity1').val(), 10) - 1);
	});
	jquery('em.plus').on('click', function () {
		jquery('#quantity1').val(parseInt(jquery('#quantity1').val(), 10) + 1);
	});
});