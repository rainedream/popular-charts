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

	function extractPartialData(dataSeries, key) {
		var array = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			array.push(dataSeries[i][key]);
		}
		return array;
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
	            categories: extractPartialData(dataSeries, 'name'),
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
	            data: extractPartialData(dataSeries, 'grade')
	        }]
	    });
	};
})(window.highcharts = window.highcharts || {});