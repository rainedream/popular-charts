(function(analyzer) {
	function extractPartialData(dataSeries, key) {
		var array = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			array.push(dataSeries[i][key]);
		}
		return array;
	};

	analyzer.showRenderingPerformace = function(divId, dataSeries) {
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
})(window.analyzer = window.analyzer || {});