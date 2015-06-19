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
	var years = 25;
	var xAxis = monthMark.generate(2014, years);
	var dataSeries = [
			{
	            name: 'Tokyo',
	            data: temperature.random(years)
	        }, {
	            name: 'New York',
	            data: temperature.random(years)
	        }, {
	            name: 'Berlin',
	            data: temperature.random(years)
	        }, {
	            name: 'London',
	            data: temperature.random(years)
	        }];

	var rounds = 1;
	runCharts('highcharts', xAxis, dataSeries, rounds);
	runCharts('fusioncharts', xAxis, dataSeries, rounds);
    runCharts('zingchart', xAxis, dataSeries, rounds);
    runKoolChart(xAxis, dataSeries, rounds);
    runCharts('amcharts', xAxis, dataSeries, rounds);
});