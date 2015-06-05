function runCharts(chartEngine, xAxis, dataSeries, rounds) {
	var startTime = Date.now();
	for (var i = 0; i < rounds; i++) {
		window[chartEngine].renderLine(chartEngine + 'Container', xAxis, dataSeries);
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
	timespanSeries.push({'name':'HighCharts', 'grade':runCharts('highcharts', xAxis, dataSeries, rounds), 'ux':9});
	timespanSeries.push({'name':'FusionCharts', 'grade':runCharts('fusioncharts', xAxis, dataSeries, rounds), 'ux':8});
	timespanSeries.push({'name':'ZingChart', 'grade':runCharts('zingchart', xAxis, dataSeries, rounds), 'ux':8});
	// amcharts.renderLine('amchartsContainer', xAxis, dataSeries);
	// koolchart.renderLine('koolchartContainer', xAxis, dataSeries);

	analyzer.showRenderingPerformace('performanceContainer', timespanSeries);
	analyzer.showUX('uxContainer', timespanSeries);
});