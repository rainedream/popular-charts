function runCharts(chartEngine, container, xAxis, dataSeries, rounds) {
	var startTime = Date.now();
	for (var i = 0; i < rounds; i++) {
		window[chartEngine].renderLine(container, xAxis, dataSeries);
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
	// timespanSeries.push({'name':'HighCharts', 'grade':runCharts('highcharts', 'highchartsContainer', xAxis, dataSeries, rounds)});
	// timespanSeries.push({'name':'FusionCharts', 'grade':runCharts('fusioncharts', 'fusionchartsContainer', xAxis, dataSeries, rounds)});
	zingchart.renderLine(xAxis, dataSeries, rounds);

	highcharts.renderPerformaceResult('performanceContainer', timespanSeries);
});