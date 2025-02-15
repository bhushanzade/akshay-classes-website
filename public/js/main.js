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

	var siteSticky = function () {
		try {
			$(".js-sticky-header").sticky({ topSpacing: 0 });
		} catch (error) { }
	};
	siteSticky();

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

	// $.ajax({
	// 	url: 'navbar.html',
	// 	dataType: 'html',
	// 	success: function (response) {
	// 		$('.site-navbar').html(response);
	// 		const url = !window.location.href.includes("/index.html") ? "/" : "";
	// 		const isLoggedIn = localStorage.getItem("classIsLoggedIn");
	// 		$(".site-menu").empty();
	// 		const links = [
	// 			{
	// 				name: 'Home',
	// 				link: url + "#home-section"
	// 			},
	// 			{
	// 				name: 'About',
	// 				link: url + "#about-section"
	// 			},
	// 			{
	// 				name: 'Batches',
	// 				link: url + "#batch-section"
	// 			},
	// 			{
	// 				name: 'Compiler',
	// 				link: "/onlinecompiler.html"
	// 			},
	// 			{
	// 				name: 'Testimonial',
	// 				link: url + "#testimonials-section"
	// 			},
	// 			{
	// 				name: 'Feedbacks',
	// 				link: "/feedback.html"
	// 			},
	// 			{
	// 				name: 'Contact',
	// 				link: url + "#contact-section"
	// 			},
	// 		]
	// 		if (isLoggedIn) {
	// 			links.push({
	// 				name: 'Logout',
	// 				isLogout: true
	// 			})
	// 		} else {
	// 			links.push({
	// 				name: 'Login',
	// 				link: "/login.html"
	// 			})
	// 		}
	// 		links.map(x => {
	// 			if (x.isLogout == true) {
	// 				$(".site-menu").append(`<li><a type="button" class="nav-link" onclick="logout()">${x.name}</a></li>`)
	// 			} else {
	// 				$(".site-menu").append(`<li><a href="${x.link}" class="nav-link">${x.name}</a></li>`)
	// 			}
	// 		});

	// 		siteMenuClone();
	// 	}
	// });

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

	function bindNavbarMenu() {
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
				$(".site-menu").append(`<li><span type="button" class="nav-link" onclick="logout()">${x.name}</span></li>`)
			} else {
				$(".site-menu").append(`<li><a href="${x.link}" class="nav-link">${x.name}</a></li>`)
			}
		});

		siteMenuClone();
	}

	bindNavbarMenu();
});

function logout() {
	localStorage.removeItem("classIsLoggedIn");
	window.location.href = "/index.html";
}