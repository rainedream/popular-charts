(function(fusioncharts) {
	var colors = ['7CB5EC', '434348', '90ED7D', 'F7A35C'];

	fusioncharts.renderLine = function(divId, xAxis, dataSeries) {
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
			        "yaxisname": "Temperature (°C)",
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
			        "divlineisdashed": "1",
			        "animation": "0"
			    },
			    "categories": [
			        {
			            "category": formatAxisSeries(xAxis)
			        }
			    ],
			    "dataset": formatDataSeries(dataSeries),
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
	
	function formatAxisSeries(xAxis) {
		var axisSeries = new Array();
		for (var i = 0; i < xAxis.length; i++) {
			axisSeries.push({'label': xAxis[i]});
		}
		return axisSeries;
	}

	function formatDataSeries(dataSeries) {
		var series = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			series.push({'seriesname':dataSeries[i].name, 'color':colors[i], 'data':formatData(dataSeries[i].data)});
		}
		return series;
	}

	function formatData(dataArray) {
		var data = new Array();
		for (var i = 0; i < dataArray.length; i++) {
			data.push({'value': dataArray[i]});
		}
		return data;
	}
})(window.fusioncharts = window.fusioncharts || {});