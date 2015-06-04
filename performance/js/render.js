function runHighCharts(xAxis, dataSeries, rounds) {
	var startTime = Date.now();
	for (var i = 0; i < rounds; i++) {
		highcharts.renderLine('highchartsContainer', xAxis, dataSeries);
	}
	var endTime = Date.now();
	var timespan = endTime - startTime;
	
	return timespan;
}

function runFusionCharts() {
	fusioncharts.renderLine('fusionchartsContainer');
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

	var timespanSeries = new Array();
	timespanSeries.push(runHighCharts(xAxis, dataSeries, 10));
	runFusionCharts();

	highcharts.renderPerformaceResult('performanceContainer', timespanSeries);
});