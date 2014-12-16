// CLIENT SAMPLES 
// OVERLAYS 

var linkHeight = $('.client-link').height(),
	labelHeight = parseInt($('.client-label').css('height'),10);

function updateClientHeight() {
    labelHeight = parseInt($('.client-label').css('height'), 10);
   	linkHeight = $('.client-link').height();

    $('.client-descriptor-wrapper').css({
        'top': -labelHeight
    });
}

$('.client-link').on('click', function(e) {
	var descriptor = $(this).find('.client-descriptor-wrapper');
	if (parseInt(descriptor.css('top'),10) !== -linkHeight) {
		e.preventDefault();
		descriptor.css('top',-linkHeight);
	}
});

$('.client-descriptor-wrapper').hover(function(e) {
	$(this).css({
		'top': -linkHeight
	});
}, function(e) {
	$(this).css({
		'top': -labelHeight
	});
});

$(document).ready(function() {
	ifc.lax.init({
		'pre': updateClientHeight
	});
});