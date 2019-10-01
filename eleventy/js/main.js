'use strict';


$(window).on('load', function () {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");
	removeExtraCommas();
	collapseAbstracts();
});


(function ($) {

	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function () {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	$('.review-slider').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 1,
		autoplay: true
	});



	$('.progress-bar-style').each(function () {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});


	$('.lan-prog').each(function () {
		var progress = $(this).data("lanprogesss");
		var ele = '<span></span>';
		var ele_fade = '<span class="fade-ele"></span>';

		for (var i = 1; i <= 5; i++) {
			if (i <= progress) {
				$(this).append(ele);
			} else {
				$(this).append(ele_fade);
			}
		}
	});


	/*------------------
		Popup
	--------------------*/
	$('.portfolio-item .port-pic').magnificPopup({
		type: 'image',
		mainClass: 'img-popup-warp',
		removalDelay: 500,
	});




	if ($().circleProgress) {

		//Set progress circle 1
		$("#progress1").circleProgress({
			value: 0.75,
			size: 175,
			thickness: 2,
			fill: "#40424a",
			emptyFill: "rgba(0, 0, 0, 0)"
		});
		//Set progress circle 2
		$("#progress2").circleProgress({
			value: 0.83,
			size: 175,
			thickness: 2,
			fill: "#40424a",
			emptyFill: "rgba(0, 0, 0, 0)"
		});

		//Set progress circle white
		$("#progress3").circleProgress({
			value: 0.75,
			size: 175,
			thickness: 2,
			fill: "#ffffff",
			emptyFill: "rgba(0, 0, 0, 0)"
		});

		//Set progress circle white
		$("#progress4").circleProgress({
			value: 0.83,
			size: 175,
			thickness: 2,
			fill: "#ffffff",
			emptyFill: "rgba(0, 0, 0, 0)"
		});

		//Set progress circle skyblue
		$("#progress5").circleProgress({
			value: 0.75,
			size: 175,
			thickness: 2,
			fill: "#009fff",
			emptyFill: "rgba(0, 0, 0, 0)"
		});

		//Set progress circle skyblue
		$("#progress6").circleProgress({
			value: 0.83,
			size: 175,
			thickness: 2,
			fill: "#009fff",
			emptyFill: "rgba(0, 0, 0, 0)"
		});
	}

})(jQuery);

function removeExtraCommas() {
	let authors = $('.timeline h5');
	for (let i in authors) {
		if (authors[i].innerHTML) {
			authors[i].innerHTML = authors[i].innerHTML.trim().slice(0, -1);
		}
	}
}

function collapseAbstracts() {
	let abstracts = $('.timeline .full-abstract .abstract-text');
	for (let i in abstracts) {
		if (abstracts[i].innerText) {
			let collapsed = $(abstracts[i]).closest('.full-abstract').siblings('.collapsed-abstract').find('.abstract-text');
			let collapsedText = abstracts[i].innerText.split(' ').slice(0, 30).join(' ') + ' ...';
			collapsed[0].innerText = collapsedText;
		}
	}
}

function toggleAbstract(element, more) {
	let readMore = $(element);
	let collapsed = null;
	let full = null;

	if (more) {
		collapsed = readMore.closest('.collapsed-abstract');
		full = collapsed.siblings('.full-abstract');
		collapsed.hide();
		full.show();
	} else {
		full = readMore.closest('.full-abstract');
		collapsed = full.siblings('.collapsed-abstract');
		full.hide();
		collapsed.show();
	}
}

