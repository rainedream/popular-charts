(function(analyzer) {
	var colors = ['#FF812D', '#FFD100', '#81D733', '#7CB5EC', '#D37EC4'];

	function extractPartialData(dataSeries, key) {
		var array = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			array.push(dataSeries[i][key]);
		}
		return array;
	};

	function colorizeBars(dataSeries) {
		var array = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			array.push({'y':dataSeries[i], 'color':colors[i]});
		}
		return array;
	}

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
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name: 'Rendering',
	            data: colorizeBars(extractPartialData(dataSeries, 'grade'))
	        }]
	    });
	};

	analyzer.showUX = function(divId, dataSeries) {
		$('#' + divId).highcharts({
	        chart: {
	            type: 'bar',
	            width: 800
	        },
	        title: {
	            text: 'Developer Experience'
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
	                text: 'Impression Grade [0 - 10]',
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
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name: 'Developer Experience',
	            data: colorizeBars(extractPartialData(dataSeries, 'usability'))
	        }]
	    });
	};
})(window.analyzer = window.analyzer || {});