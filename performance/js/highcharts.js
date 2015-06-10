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

	highcharts.renderLineWithRealtimeData = function(divId, initData, appendRealtimeData) {
		Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        var settings = {
            chart: {
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        receiveLatestDataFromShcomp(series);
                    }
                }
            },
            title: {
                text: 'Shanghai Composite Index'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'SHCOMP',
                data: []
            }]
        };

        startToReceiveDataFromShcomp(20, function(dataSeries){
        	settings.series[0]['data'] = dataSeries;
			$('#' + divId).highcharts(settings);
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

	function receiveLatestDataFromShcomp(pointArray) {
		setInterval(function () {
			var lastPoint = pointArray.data[pointArray.data.length - 1];

			$.get("http://localhost:8081/shcomp/last/" + Math.floor(lastPoint.y), function(data) {
				var x = data['Time'], y = data['Value'];
				pointArray.addPoint([x, y], true, true);
			});
	    }, 1000);		
	}

	function startToReceiveDataFromShcomp(initDataSeriesCount, renderChart) {
		$.get("http://localhost:8081/shcomp/multi/" + initDataSeriesCount, function(data) {
			var coordinates = new Array();
			$(data).each(function(index, element) {
				coordinates.push({x:element['Time'], y:element['Value']});
			});

			renderChart(coordinates);
		});
	}

	function extractPartialData(dataSeries, key) {
		var array = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			array.push(dataSeries[i][key]);
		}
		return array;
	};
})(window.highcharts = window.highcharts || {});