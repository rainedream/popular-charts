(function(amcharts) {
	var colors = ['#7CB5EC', '#434348', '#90ED7D', '#F7A35C'];

	function generateLinesStyle(dataSeries) {
		var graphs = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			graphs.push({
				"id": "g" + i,
		        "bullet": "round",
		        "bulletBorderAlpha": 1,
		        "bulletColor": "#FFFFFF",
		        "bulletSize": 5,
		        "hideBulletsCount": 50,
		        "lineThickness": 2,
		        "lineColor": colors[i],
		        "title": dataSeries[i].name,
		        "useLineColorForBulletBorder": true,
		        "valueField": "value" + i,
		        "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[category]]</span><br>[[value" + i + "]]</div>"
			});
		}

		return graphs;
	}

	function formatDataSeries(xAxis, dataSeries) {
		var data = new Array();
		for (var i = 0; i < xAxis.length; i++) {
			var item = {'month': xAxis[i]};
			for (var j = 0; j < dataSeries.length; j++) {
				item['value' + j] = dataSeries[j].data[i];
			}
			data.push(item);
		}

		console.log(data);

		return data;
	}

	amcharts.renderLine = function(divId, xAxis, dataSeries) {
		var settings = {
			"type": "serial",
		    "theme": "none",
		    "marginRight": 40,
		    "autoMarginOffset": 20,
		    "dataDateFormat": "YYYY-MM-DD",
		    "valueAxes": [{
		        "id": "v1",
		        "axisAlpha": 0,
		        "position": "left"
		    }],
		    "balloon": {
		        "borderThickness": 1,
		        "shadowAlpha": 0
		    },
		    "graphs": generateLinesStyle(dataSeries),
		    "chartScrollbar": {
		        "graph": "g0",
		        "scrollbarHeight": 80,
		        "backgroundAlpha": 0,
		        "selectedBackgroundAlpha": 0.1,
		        "selectedBackgroundColor": "#888888",
		        "graphFillAlpha": 0,
		        "graphLineAlpha": 0.5,
		        "selectedGraphFillAlpha": 0,
		        "selectedGraphLineAlpha": 1,
		        "autoGridCount":true,
		        "color":"#AAAAAA"
		    },
		    "chartCursor": {
		        "pan": true,
		        "valueLineEnabled": true,
		        "valueLineBalloonEnabled": true,
		        "cursorAlpha":0,
		        "valueLineAlpha":0.2
		    },
		    "categoryField": "month",
		    "categoryAxis": {
		        "parseDates": true,
		        "dashLength": 1,
		        "minorGridEnabled": true,
		        "position": "top"
		    },
		    "dataProvider": formatDataSeries(xAxis, dataSeries)
		};

		AmCharts.makeChart(divId, settings);
	};
})(window.amcharts = window.amcharts || {});