(function(koolchart) {
	var colors = ['#7CB5EC', '#434348', '#90ED7D', '#F7A35C'];

	koolchart.buildLayout = function(dataSeries) {
		var layoutStr = 
			'<KoolChart backgroundColor="0xFFFFFF" borderStyle="none">'
				+'<Options>'
					+'<Caption text="Monthly Average Temperature"/>'
					+'<SubCaption text="Source: WorldClimate.com"/>'
				+'</Options>'
				+'<Line2DChart showDataTips="true" selectionMode="single">'
					+'<verticalAxis>'
						+'<LinearAxis id="vAxis"/>'
					+'</verticalAxis>'
					+'<horizontalAxis>'
						+'<CategoryAxis categoryField="Month"/>' 
					+'</horizontalAxis>'
					+'<series>';

		for (var i = 0; i < dataSeries.length; i++) {
			var lineLayout = '<Line2DSeries id="series' + i + '" labelPosition="up" yField="Data' + i + '" raidus="4" displayName="' + dataSeries[i].name + '" itemRenderer="CircleItemRenderer">'
								+'<lineStroke>'
									+'<Stroke color="' + colors[i] + '" weight="3"/>'
								+'</lineStroke>'
								+'<fill>'
									+'<SolidColor color="' + colors[i] + '"/>'
								+'</fill>'
							+'</Line2DSeries>'
			layoutStr += lineLayout;
		}

		layoutStr += '</series>'
					+'<verticalAxisRenderers>'
						+'<Axis2DRenderer axis="{vAxis}" placement="left">'
							+'<axisStroke>'
								+'<Stroke color="#fd848f" weight="4"/>'
							+'</axisStroke>'
						+'</Axis2DRenderer>'
					+'</verticalAxisRenderers>'
					+'<backgroundElements>'
						+'<GridLines/>'
					+'</backgroundElements>'
				+'</Line2DChart>'
				+'<Box horizontalAlign="center" width="100%">'
        			+'<SubLegend useVisibleCheck="true" direction="horizontal" markerHeight="15" markerWidth="15">'

        for (var i = 0; i < dataSeries.length; i++) {
        	layoutStr += '<CheckableLegendItem targetSeries="{series' + i + '}" fill="' + colors[i] + '" label="' + dataSeries[i].name + '"/>'
        }

        layoutStr += '</SubLegend>'
    			+'</Box>'
			+'</KoolChart>';

		return layoutStr;
	};

	koolchart.formatData = function(xAxis, dataSeries) {
		var chartData = new Array();
		for (var i = 0; i < xAxis.length; i++) {
			var item = {'Month':xAxis[i]};
			for (var j = 0; j < dataSeries.length; j++) {
				item['Data' + j] = dataSeries[j].data[i];
			}
			chartData.push(item);
		}
		return chartData;
	};
})(window.koolchart = window.koolchart || {});


function renderLineWithKoolChart(divId, xAxis, dataSeries) {
	var chartVars = "KoolOnLoadCallFunction=chartReadyHandler";

	this.chartReadyHandler = function(id) {
		document.getElementById(id).setLayout(koolchart.buildLayout(dataSeries));
		document.getElementById(id).setData(koolchart.formatData(xAxis, dataSeries));
	};

	KoolChart.create("chart1", divId, chartVars, "100%", "100%"); 
}