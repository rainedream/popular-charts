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

	var chart;
	var chartData = [];
	var chartCursor;
	var day = 0;
	var firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - 500);
	var latestValue = -1;

	amcharts.renderLineWithRealtimeData = function(divId, serviceHost) {
	    // SERIAL CHART    
	    chart = new AmCharts.AmSerialChart();
	    chart.pathToImages = "image/amcharts/";
	    chart.marginTop = 0;
	    chart.marginRight = 10;
	    chart.autoMarginOffset = 5;
	    chart.zoomOutButton = {
	        backgroundColor: '#000000',
	        backgroundAlpha: 0.15
	    };
	    chart.dataProvider = chartData;
	    chart.categoryField = "time";

	    // AXES
	    // category
	    var categoryAxis = chart.categoryAxis;
	    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
	    categoryAxis.minPeriod = "ss";
	    categoryAxis.dataDateFormat = "HH:NN:SS";
	    categoryAxis.dashLength = 1;
	    categoryAxis.gridAlpha = 0.15;
	    categoryAxis.axisColor = "#DADADA";

	    // value                
	    var valueAxis = new AmCharts.ValueAxis();
	    valueAxis.axisAlpha = 0.2;
	    valueAxis.dashLength = 1;
	    chart.addValueAxis(valueAxis);

	    // GRAPH
	    var graph = new AmCharts.AmGraph();
	    graph.title = "red line";
	    graph.valueField = "visits";
	    graph.bullet = "round";
	    graph.bulletBorderColor = "#FFFFFF";
	    graph.bulletBorderThickness = 2;
	    graph.lineThickness = 2;
	    graph.lineColor = "#b5030d";
	    graph.negativeLineColor = "#0352b5";
	    graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
	    chart.addGraph(graph);

	    // CURSOR
	    chartCursor = new AmCharts.ChartCursor();
	    chartCursor.cursorPosition = "mouse";
	    chart.addChartCursor(chartCursor);

	    // SCROLLBAR
	    var chartScrollbar = new AmCharts.ChartScrollbar();
	    chartScrollbar.graph = graph;
	    chartScrollbar.scrollbarHeight = 40;
	    chartScrollbar.color = "#FFFFFF";
	    chartScrollbar.autoGridCount = true;
	    chart.addChartScrollbar(chartScrollbar);

	    // WRITE
	    chart.write(divId);
	    
	    // set up the chart to update every second
	    setInterval(function() { refreshData(serviceHost); }, 1000);
	};

	function refreshData(serviceHost) {
		var url = serviceHost + '/shcomp';
		if (latestValue > 0) {
			url = serviceHost + '/shcomp/last/' + Math.floor(latestValue);
		}

		$.get(url, function(data) {
			chart.dataProvider.push({
	            time: data['Time'],
	            visits: data['Value']
	        });
			chart.validateData();

			latestValue = data['Value'];
		});
	}
})(window.amcharts = window.amcharts || {});