AOS.init({
	duration: 800,
	easing: 'slide',
	once: false
});

jQuery(document).ready(function ($) {

	"use strict";

	var siteMenuClone = function () {
		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function () {

			var counter = 0;
			$('.site-mobile-menu .has-children').each(function () {
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		$('body').on('click', '.arrow-collapse', function (e) {
			var $this = $(this);
			if ($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();

		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	// siteMenuClone();


	var sitePlusMinus = function () {
		$('.js-btn-minus').on('click', function (e) {
			e.preventDefault();
			if ($(this).closest('.input-group').find('.form-control').val() != 0) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function (e) {
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function () {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 500,
			values: [75, 300],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
			" - $" + $("#slider-range").slider("values", 1));
	};
	// siteSliderRange();



	var siteCarousel = function () {
		if ($('.nonloop-block-13').length > 0) {
			$('.nonloop-block-13').owlCarousel({
				center: false,
				items: 1,
				loop: true,
				stagePadding: 0,
				margin: 20,
				smartSpeed: 1000,
				autoplay: true,
				nav: true,
				navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">'],
				responsive: {
					600: {
						margin: 20,
						nav: true,
						items: 2
					},
					1000: {
						margin: 20,
						stagePadding: 0,
						nav: true,
						items: 2
					},
					1200: {
						margin: 20,
						stagePadding: 0,
						nav: true,
						items: 3
					}
				}
			});
		}

		$('.slide-one-item').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			autoplay: true,
			pauseOnHover: false,
			nav: true,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
		});

		// $('.owl-carousel-one').owlCarousel({
		//   center: false,
		//   items: 1,
		//   loop: true,
		// 	stagePadding: 0,
		//   margin: 0,
		//   autoplay: true,
		//   pauseOnHover: false,
		//   nav: true,
		//   smartSpeed:1000,
		//   navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
		// });


		$('.slide-one-item-alt').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1000,
			autoplay: true,
			pauseOnHover: true,
			onDragged: function (event) {
				console.log('event : ', event.relatedTarget['_drag']['direction'])
				if (event.relatedTarget['_drag']['direction'] == 'left') {
					$('.slide-one-item-alt-text').trigger('next.owl.carousel');
				} else {
					$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
				}
			}
		});
		$('.slide-one-item-alt-text').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1000,
			autoplay: true,
			pauseOnHover: true,
			onDragged: function (event) {
				console.log('event : ', event.relatedTarget['_drag']['direction'])
				if (event.relatedTarget['_drag']['direction'] == 'left') {
					$('.slide-one-item-alt').trigger('next.owl.carousel');
				} else {
					$('.slide-one-item-alt').trigger('prev.owl.carousel');
				}
			}
		});


		$('.custom-next').click(function (e) {
			e.preventDefault();
			$('.slide-one-item-alt').trigger('next.owl.carousel');
			$('.slide-one-item-alt-text').trigger('next.owl.carousel');
		});
		$('.custom-prev').click(function (e) {
			e.preventDefault();
			$('.slide-one-item-alt').trigger('prev.owl.carousel');
			$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
		});

	};
	siteCarousel();

	var siteStellar = function () {
		$(window).stellar({
			responsive: false,
			parallaxBackgrounds: true,
			parallaxElements: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			scrollProperty: 'scroll'
		});
	};
	// siteStellar();

	var siteCountDown = function () {

		$('#date-countdown').countdown('2020/10/10', function (event) {
			var $this = $(this).html(event.strftime(''
				+ '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
				+ '<span class="countdown-block"><span class="label">%d</span> days </span>'
				+ '<span class="countdown-block"><span class="label">%H</span> hr </span>'
				+ '<span class="countdown-block"><span class="label">%M</span> min </span>'
				+ '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});

	};
	siteCountDown();

	var siteDatePicker = function () {

		if ($('.datepicker').length > 0) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteSticky = function () {
		try {
			$(".js-sticky-header").sticky({ topSpacing: 0 });
		} catch (error) { }
	};
	siteSticky();

	// navigation
	// var OnePageNavigation = function () {
	// 	var navToggler = $('.site-menu-toggle');
	// 	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function (e) {
	// 		if (this.hash) {
	// 			console.log("this.hash", this.hash);
	// 			e.preventDefault();
	// 			$('html, body').animate({
	// 				'scrollTop': $(this.hash).offset().top
	// 			}, 600, 'easeInOutExpo', function () {
	// 				window.location.hash = this.hash;
	// 			});
	// 		}
	// 	});
	// };
	// OnePageNavigation();

	var siteScroll = function () {



		$(window).scroll(function () {

			var st = $(this).scrollTop();

			if (st > 100) {
				$('.js-sticky-header').addClass('shrink');
			} else {
				$('.js-sticky-header').removeClass('shrink');
			}

		})

	};
	siteScroll();


	$('.fancybox').on('click', function () {
		var visibleLinks = $('.fancybox');

		$.fancybox.open(visibleLinks, {}, visibleLinks.index(this));

		return false;
	});

	$.ajax({
		url: 'navbar.html',
		dataType: 'html',
		success: function (response) {
			$('.site-navbar').html(response);
			const url = !window.location.href.includes("/index.html") ? "/" : "";
			const isLoggedIn = localStorage.getItem("classIsLoggedIn");
			$(".site-menu").empty();
			const links = [
				{
					name: 'Home',
					link: url + "#home-section"
				},
				{
					name: 'About',
					link: url + "#about-section"
				},
				{
					name: 'Batches',
					link: url + "#batch-section"
				},
				{
					name: 'Compiler',
					link: "/onlinecompiler.html"
				},
				{
					name: 'Testimonial',
					link: url + "#testimonials-section"
				},
				{
					name: 'Feedbacks',
					link: "/feedback.html"
				},
				{
					name: 'Contact',
					link: url + "#contact-section"
				},
			]
			if (isLoggedIn) {
				links.push({
					name: 'Logout',
					isLogout: true
				})
			} else {
				links.push({
					name: 'Login',
					link: "/login.html"
				})
			}
			links.map(x => {
				if (x.isLogout == true) {
					$(".site-menu").append(`<li><a type="button" class="nav-link" onclick="logout()">${x.name}</a></li>`)
				} else {
					$(".site-menu").append(`<li><a href="${x.link}" class="nav-link">${x.name}</a></li>`)
				}
			});

			siteMenuClone();
		}
	});

	$.ajax({
		url: 'footer.html',
		dataType: 'html',
		success: function (response) {
			$('.site-footer').html(response);
			$('#currentYear').text(new Date().getFullYear());
			$("#footer-links").empty();
			const isLoggedIn = localStorage.getItem("classIsLoggedIn");
			const url = !window.location.href.includes("/index.html") ? "/" : "";
			const links = [
				{
					name: 'About',
					link: url + "#about-section"
				},
				{
					name: 'Batches',
					link: url + "#batch-section"
				},
				{
					name: 'Compiler',
					link: "/onlinecompiler.html"
				},
				{
					name: 'Testimonial',
					link: url + "#testimonials-section"
				},
				{
					name: 'Feedbacks',
					link: "/feedback.html"
				},
				{
					name: 'Contact',
					link: url + "#contact-section"
				}
			]

			if (isLoggedIn) {
				links.push({
					name: 'All Contacts',
					link: "/contacts.html"
				})
				links.push({
					name: 'App Statistics',
					link: "/admin-stats.html"
				})
			}

			links.map(x => {
				$("#footer-links").append(`<li><a href="${x.link}" class="smoothscroll">${x.name}</a></li>`)
			})
		}
	});

});

function logout() {
	localStorage.removeItem("classIsLoggedIn");
	window.location.href = "/index.html";
}