function runCharts(chartEngine, xAxis, dataSeries, rounds) {
	var startTime = Date.now();
	for (var i = 0; i < rounds; i++) {
		window[chartEngine].renderLine(chartEngine + 'Container', xAxis, dataSeries);
	}
	var endTime = Date.now();
	var timespan = endTime - startTime;
	
	return timespan;
}

function runKoolChart(xAxis, dataSeries, rounds) {
	var startTime = Date.now();
	for (var i = 0; i < rounds; i++) {
		renderLineWithKoolChart('koolchartContainer', xAxis, dataSeries);
	}
	var endTime = Date.now();
	var timespan = endTime - startTime;
	
	return timespan;
}


$(document).ready(function() {
	var indexGenerator = new SHCOMP.IndexGenerator();
	var initData = indexGenerator.initData();

	highcharts.renderLineWithRealtimeData("highchartsContainer", initData, indexGenerator.realtime);
});