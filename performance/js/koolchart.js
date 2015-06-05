var layoutStr = 
				'<KoolChart backgroundColor="0xFFFFFF" borderStyle="none">'
					+'<Options>'
						+'<Caption text="Monthly Average Temperature"/>'
						+'<SubCaption text="Source: WorldClimate.com"/>'
					+'</Options>'
					+'<Stroke id="stroke1" color="0xFF0000" weight="1"/>'
					+'<Stroke id="stroke2" color="0x0000FF" weight="1"/>'
					+'<Line2DChart showDataTips="true" selectionMode="single">'
						+'<verticalAxis>'
							+'<LinearAxis id="vAxis"/>'
						+'</verticalAxis>'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Month"/>' 
						+'</horizontalAxis>'
						+'<series>'
							+'<Line2DSeries labelPosition="up" yField="Data1" raidus="4" displayName="Revenue" itemRenderer="CircleItemRenderer">'
								+'<lineStroke>'
									+'<Stroke color="#7fcffc" weight="3"/>'
								+'</lineStroke>'
								+'<fill>'
									+'<SolidColor color="#7fcffc"/>'
								+'</fill>'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
							+'</Line2DSeries>'
							+'<Line2DSeries labelPosition="up" yField="Data2" raidus="4" displayName="Revenue" itemRenderer="CircleItemRenderer">'
								+'<lineStroke>'
									+'<Stroke color="#fd848f" weight="3"/>'
								+'</lineStroke>'
								+'<fill>'
									+'<SolidColor color="#fd848f"/>'
								+'</fill>'
								+'<verticalAxis>'
									+'<LinearAxis id="vAxis2"/>'
								+'</verticalAxis>'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
							+'</Line2DSeries>'
						+'</series>'
						+'<verticalAxisRenderers>'
							+'<Axis2DRenderer axis="{vAxis}" placement="left">'
								+'<axisStroke>'
									+'<Stroke color="#fd848f" weight="4"/>'
								+'</axisStroke>'
							+'</Axis2DRenderer>'
							+'<Axis2DRenderer axis="{vAxis2}" placement="right">'
								+'<axisStroke>'
									+'<Stroke color="#7fcffc" weight="4"/>'
								+'</axisStroke>'
							+'</Axis2DRenderer>'
						+'</verticalAxisRenderers>'
						+'<backgroundElements>'
							+'<GridLines/>'
						+'</backgroundElements>'
					+'</Line2DChart>'
				+'</KoolChart>';

// Declares Dataset
var chartData = [{"Month":"Jan","Data1":1000,"Data2":1500,"Data3":2300,"Data4":900,"Data5":1560,"Data6":1700,"Data7":1110,"Data8":1300,"Data9":1200},
				{"Month":"Feb","Data1":1400,"Data2":1900,"Data3":1200,"Data4":2300,"Data5":880,"Data6":1780,"Data7":1120,"Data8":990,"Data9":1700},
				{"Month":"Mar","Data1":1500,"Data2":1200,"Data3":1600,"Data4":2300,"Data5":740,"Data6":1990,"Data7":1320,"Data8":1100,"Data9":-1560},
				{"Month":"Apr","Data1":1900,"Data2":1300,"Data3":1300,"Data4":2300,"Data5":590,"Data6":2200,"Data7":2110,"Data8":1500,"Data9":-1770},
				{"Month":"May","Data1":1400,"Data2":900,"Data3":1000,"Data4":2300,"Data5":1200,"Data6":900,"Data7":1700,"Data8":1500,"Data9":-500},
				{"Month":"Jun","Data1":2000,"Data2":1000,"Data3":1200,"Data4":2300,"Data5":660,"Data6":1500,"Data7":1430,"Data8":1500,"Data9":2200}];

//----------------------- The end of the configuration for creating a chart. -----------------------


function renderLineWithKoolChart(divId, xAxis, dataSeries) {
	var chartVars = "KoolOnLoadCallFunction=chartReadyHandler";

	this.chartReadyHandler = function(id) {
		document.getElementById(id).setLayout(layoutStr);
		document.getElementById(id).setData(chartData);
	};

	KoolChart.create("chart1", divId, chartVars, "100%", "100%"); 
}