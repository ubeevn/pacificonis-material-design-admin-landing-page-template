"use strict";

//preloader
$(window).on("load", function(){
	setTimeout(function(){
		$("body").addClass("loaded");
	}, 1500);
});

$(function() {
	//Set height for header
	$(".js-header").css("height", $(window).height() + "px");

	//show menu and back to top button on scroll
	(function() {

		var docElem = document.documentElement,
			header = $('.js-navbar'),
			toTopBtn = $('.js-to-top'),
			didScroll = false,
			changeHeaderOn = $('.js-header').height(),
			changeToTopBtnOn = 700;

		function init() {
			window.addEventListener( 'scroll', function( event ) {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 200 );
					setTimeout( showToTopBtn, 200 );
				}
			}, false );
		}

		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				header.addClass("scrolled");
			}
			else {
				header.removeClass("scrolled");
			}
			didScroll = false;
		}

		function showToTopBtn() {
			var sy = scrollY();
			if ( sy >= changeToTopBtnOn ) {
				toTopBtn.show();
			}
			else {
				toTopBtn.hide();
			}
			didScroll = false;
		}

		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}

		init();

	})();

	//open or close mobile menu
	var navbar = '.js-navbar',
    	openMenu = '.js-open-menu',
    	closeMenu = '.js-close-menu';

	$(openMenu).on('click', function () {
	 	$(navbar).addClass('open');
	});

	$(document).on('click', function (e) {
		if ($(navbar).hasClass('open') && $(e.target).closest(navbar).length === 0 || $(e.target).closest(closeMenu).length === 1) {
			setTimeout(function(){
				$(navbar).removeClass('open');
			});
		}
	});

	//open or close modals
	var modal = $('.js-modal'),
		modalDialog = '.js-modal-dialog',
		openModal = $('.js-open-modal'),
		closeModal = '.js-close-modal';

	openModal.on('click', function() {
		$($(this).attr('data-target')).addClass('open');
	});

	//prevent scrolling when modal opens
	$(document).on('scroll touchmove mousewheel', function(e){
		if(modal.hasClass('open')) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	})

	modal.on('click', function (e) {
		if (modal.hasClass('open') && $(e.target).closest(modalDialog).length === 0 || $(e.target).closest(closeModal).length === 1) {
			setTimeout(function(){
				modal.removeClass('open');
			});
		}
	});

	//carousel
	$(".js-carousel").owlCarousel({
	    items: 3,
	    dots: true,
	    loop: false,
	    responsive:{
	      0:{
	          items:1
	      },
	      760:{
	          items:2
	      },
	      1000:{
	          items:3
	      }
	    }
  	});

	//inputs
	var formInput = $(".js-input");
	
  	formInput.on("focus", function() {
        $(this).parent().addClass("active");
    });

    formInput.on("blur", function() {
    	if ($(this).val().length === 0) {
    		$(this).parent().removeClass("active");
    	}    
    });

    //smooth scroll to id if animations are enabled
    var animationsEnabled = $("body").hasClass("animations");
    $('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname && animationsEnabled) {
			var target = $(this.hash);
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});

//google map
function initialize() {
    var myLatlng = new google.maps.LatLng(37.773972, -122.431297);
    var mapOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyles, //from map-styles.js
        disableDefaultUI: true,
        scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var marker = new google.maps.Marker({
		position: {lat: 37.773972, lng: -122.431297},
		map: map,
		icon: 'img/map-marker.svg'
	});
}

google.maps.event.addDomListener(window, 'load', initialize);
