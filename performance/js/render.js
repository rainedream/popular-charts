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
	var timespanSeries = new Array();
	timespanSeries.push({'name':'HighCharts', 'grade':runCharts('highcharts', xAxis, dataSeries, rounds), 'usability':9});
	timespanSeries.push({'name':'FusionCharts', 'grade':runCharts('fusioncharts', xAxis, dataSeries, rounds), 'usability':8});
	timespanSeries.push({'name':'ZingChart', 'grade':runCharts('zingchart', xAxis, dataSeries, rounds), 'usability':8});
	timespanSeries.push({'name':'KoolChart', 'grade':runKoolChart(xAxis, dataSeries, rounds), 'usability':4});
	timespanSeries.push({'name':'amCharts', 'grade':runCharts('amcharts', xAxis, dataSeries, rounds), 'usability':6});

	analyzer.showRenderingPerformace('performanceContainer', timespanSeries);
	analyzer.showUX('uxContainer', timespanSeries);
});