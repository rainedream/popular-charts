$(document).ready(function() {
	var popularCharts = ["line", "spline", "stepped", "scatter", "bubble", "area", "spline-area", "stepped-area", "column", "bar", 
					     "gantt", "logarithmic", "pareto", "pie", "donut", "radar", "gauge", "range"];

	var standardizeChartName = function(chartName) {
		return chartName.replace(" ", "_").toLowerCase();
	};

	var getSampleImage = function(target) {
		var type = target.html();
		return "resource/image/chart/" + standardizeChartName(type) + ".png";
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

	var isPopular = function(chartType) {
		return $.inArray(chartType, popularCharts) >= 0;
	};

	var findPopularChartBoundary = function() {
		var chartTypeRow = $("#chart-type");
		var minColIndex = chartTypeRow.children().size() - 1, maxColIndex = 0;
		
		chartTypeRow.children().each(function(index, chartTypeHeader) {
			var chartType = standardizeChartName($(chartTypeHeader).html());
			if (isPopular(chartType)) {
				minColIndex = index < minColIndex ? index : minColIndex;
				maxColIndex = index > maxColIndex ? index : maxColIndex;
			}
		});

		minColIndex += 2;
		maxColIndex += 2;

		return {min: minColIndex, max: maxColIndex};
	};

	var highlightPopularCharts = function() {
		var popularBoundary = findPopularChartBoundary();
		var minColIndex = popularBoundary.min;
		var maxColIndex = popularBoundary.max;

		if (minColIndex > maxColIndex) {
			return;
		}

		var charts = $(".supported");
		charts.each(function(rowIndex, row) {
			$(row).children().each(function(colIndex, cell) {
				if (colIndex < 2 || colIndex < minColIndex || colIndex > maxColIndex) {
					return;
				}

				cell = $(cell);
				if (rowIndex == 0) {
					cell.addClass("popular-chart-top");
				}
				if (rowIndex == charts.size() - 1) {
					cell.addClass("popular-chart-bottom");
				}
				if (colIndex == minColIndex) {
					cell.addClass("popular-chart-left");
				}
				if (colIndex == maxColIndex) {
					cell.addClass("popular-chart-right");
				}
			});
		});
	};

	highlightPopularCharts();

	$("#chart-type th").hover(function(event) {
		var targetElem = $(event.target);
		showSample(targetElem);

		targetElem.parent().bind("mouseleave", function(){
			var sample = $("#sample");
			sample.hide();
		});
	});
});