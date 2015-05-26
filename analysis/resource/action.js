$(document).ready(function() {
	var getSampleImage = function(target) {
		var type = target.html();
		type = type.replace(" ", "_").toLowerCase();
		return "resource/image/chart/" + type + ".png";
	};

	var showSample = function(target) {
		var sample = $("#sample");
		var img = sample.find("img");
		img.attr("src", getSampleImage(target));

		var x = target.offset().left + sample.width() < $(window).width() ? target.offset().left : target.offset().left + target.width() - sample.width();
		var y = target.offset().top + 50;
		sample.offset({left:x, top:y});
		sample.show();
	};

	$(".chart-type th").hover(function(event) {
		var targetElem = $(event.target);
		showSample(targetElem);

		targetElem.parent().bind("mouseleave", function(){
			var sample = $("#sample");
			sample.hide();
		});
	});
});