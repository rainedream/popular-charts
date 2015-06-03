(function(highcharts) {
	highcharts.renderLine = function(divId, xAxis, dataSeries) {
		$('#' + divId).highcharts({
	        title: {
	            text: 'Monthly Average Temperature',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Source: WorldClimate.com',
	            x: -20
	        },
	        xAxis: {
	            categories: xAxis
	        },
	        yAxis: {
	            title: {
	                text: 'Temperature (°C)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '°C'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        plotOptions: {
			    line: {
			        animation: false
			    }
			},
	        series: dataSeries
	    });
	};

	highcharts.renderPerformaceResult = function(divId, dataSeries) {
			$('#' + divId).highcharts({
		        chart: {
		            type: 'bar',
		            width: 800
		        },
		        title: {
		            text: 'Rendering Performance Test Result'
		        },
		        xAxis: {
		            categories: ['HighCharts'],
		            title: {
		                text: null
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Time (miliseconds)',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify'
		            }
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true
		                }
		            }
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            x: -40,
		            y: 100,
		            floating: true,
		            borderWidth: 1,
		            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		            shadow: true
		        },
		        credits: {
		            enabled: false
		        },
		        series: [{
		            name: 'Rendering',
		            data: dataSeries
		        }]
		    });
	};
})(window.highcharts = window.highcharts || {});


function runHighCharts(xAxis, dataSeries, rounds) {
	var startTime = Date.now();
	for (var i = 0; i < rounds; i++) {
		highcharts.renderLine('highcharts-container', xAxis, dataSeries);
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

	var timespanSeries = new Array();
	timespanSeries.push(runHighCharts(xAxis, dataSeries, 10));

	highcharts.renderPerformaceResult('performance-container', timespanSeries);
});