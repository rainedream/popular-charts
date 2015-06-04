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

(function(fusioncharts) {
	fusioncharts.renderLine = function(divId) {
		var revenueChart = new FusionCharts({
	        "type": "msline",
	        "renderAt": divId,
	        "width": "100%",
	        "height": "400",
	        "dataFormat": "json",
	        "dataSource": {
			    "chart": {
			        "caption": "Monthly Average Temperature",
			        "subcaption": "Source: WorldClimate.com",
			        "xaxisname": "Month",
			        "yaxisname": "Degree  (in Fahrenheit)",
			        "palette": "3",
			        "bgcolor": "FFFFFF",
			        "canvasbgcolor": "66D6FF",
			        "canvasbgalpha": "5",
			        "canvasborderthickness": "1",
			        "canvasborderalpha": "20",
			        "legendshadow": "0",
			        "numbersuffix": "°",
			        "showvalues": "0",
			        "alternatehgridcolor": "ffffff",
			        "alternatehgridalpha": "100",
			        "showborder": "0",
			        "legendborderalpha": "0",
			        "legendiconscale": "1.5",
			        "divlineisdashed": "1"
			    },
			    "categories": [
			        {
			            "category": [
			                {
			                    "label": "Jan"
			                },
			                {
			                    "label": "Feb"
			                },
			                {
			                    "label": "Mar"
			                },
			                {
			                    "label": "Apr"
			                },
			                {
			                    "label": "May"
			                },
			                {
			                    "label": "Jun"
			                },
			                {
			                    "label": "Jul"
			                },
			                {
			                    "label": "Aug"
			                },
			                {
			                    "label": "Sep"
			                },
			                {
			                    "label": "Oct"
			                },
			                {
			                    "label": "Nov"
			                },
			                {
			                    "label": "Dec"
			                }
			            ]
			        }
			    ],
			    "dataset": [
			        {
			            "seriesname": "New York",
			            "color": "F97D10",
			            "data": [
			                {
			                    "value": "-6"
			                },
			                {
			                    "value": "-15"
			                },
			                {
			                    "value": "3"
			                },
			                {
			                    "value": "12"
			                },
			                {
			                    "value": "32"
			                },
			                {
			                    "value": "44"
			                },
			                {
			                    "value": "52"
			                },
			                {
			                    "value": "50"
			                },
			                {
			                    "value": "39"
			                },
			                {
			                    "value": "28"
			                },
			                {
			                    "value": "5"
			                },
			                {
			                    "value": "-13"
			                }
			            ]
			        },
			        {
			            "seriesname": "Chicago",
			            "data": [
			                {
			                    "value": "-27"
			                },
			                {
			                    "value": "-19"
			                },
			                {
			                    "value": "-8"
			                },
			                {
			                    "value": "7"
			                },
			                {
			                    "value": "24"
			                },
			                {
			                    "value": "36"
			                },
			                {
			                    "value": "40"
			                },
			                {
			                    "value": "41"
			                },
			                {
			                    "value": "28"
			                },
			                {
			                    "value": "17"
			                },
			                {
			                    "value": "1"
			                },
			                {
			                    "value": "-25"
			                }
			            ]
			        },
			        {
			            "seriesname": "Bismarck",
			            "color": "3994F9",
			            "data": [
			                {
			                    "value": "-44"
			                },
			                {
			                    "value": "-43"
			                },
			                {
			                    "value": "-31"
			                },
			                {
			                    "value": "-12"
			                },
			                {
			                    "value": "15"
			                },
			                {
			                    "value": "30"
			                },
			                {
			                    "value": "35"
			                },
			                {
			                    "value": "33"
			                },
			                {
			                    "value": "11"
			                },
			                {
			                    "value": "-10"
			                },
			                {
			                    "value": "-30"
			                },
			                {
			                    "value": "-43"
			                }
			            ]
			        }
			    ],
			    "styles": {
			        "definition": [
			            {
			                "name": "captionFont",
			                "type": "font",
			                "size": "15"
			            }
			        ],
			        "application": [
			            {
			                "toobject": "caption",
			                "styles": "captionfont"
			            }
			        ]
			    }
			}
	    });

	    revenueChart.render();
	};
})(window.fusioncharts = window.fusioncharts || {});


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