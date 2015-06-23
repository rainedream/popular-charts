(function(zingchart) {
	var colors = ['#7CB5EC', '#434348', '#90ED7D', '#F7A35C'];

	function formatDataSeries(dataSeries) {
		var series = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			series.push({
				'text': dataSeries[i].name, 
				'line-color': colors[i], 
				'values': dataSeries[i].data, 
				'marker': {
					'background-color': colors[i],
		            'border-color': colors[i]
		        }
		    });
		}
		return series;
	}

	zingchart.renderMultiYAxises = function(divId) {
		var chartData = {
			"background-color":"white",
	        "type":"line",
	        "title":{
	            "text":"Axis Placement",
	            "adjust-layout":true,
	            "color":"#333",
		        "background-color":"white"
	        },
	        "plotarea":{
	            "margins":"dynamic",
	            "adjust-layout":true
	        },
	        "scale-x":{
	            "label":{
	                "text":"Scale X 1"
	            }
	        },
	        "scale-y":{
	            "values":"0:100:10",
	            "label":{
	                "text":"Scale Y 1"
	            }
	        },
	        "scale-y-2":{
	            "values":"0:1000:100",
	            "placement":"default",
	            "label":{
	                "text":"Scale Y 2"
	            }
	        },
	        "scale-y-3":{
	            "values":"0:2000:200",
	            "placement":"opposite",
	            "label":{
	                "text":"Scale Y 3"
	            }
	        },
	        "plot":{
	            
	        },
	        "series":[
	            {
	                "values":[69,68,54,48,70,74,98,70,72,68,49,69],
	                "scales":"scale-x,scale-y"
	            },
	            {
	                "values":[510,530,470,600,480,520,750,520,550,470,600,480],
	                "scales":"scale-x,scale-y-2"
	            },
	            {
	                "values":[1542,1243,1630,1440,1031,1148,1055,1246,1048,1032,1038,1038],
	                "scales":"scale-x,scale-y-3"
	            }
	        ]
		};
		
		zingchart.render({
		    id: divId,
		    height: 400,
		    width: '100%',
		    data: chartData
		});
	};

	zingchart.renderLine = function(divId, xAxis, dataSeries) {
		var chartData = {
		    "background-color":"white",
		    "type":"line",
		    "title":{
		        "text":"Monthly Average Temperature",
		        "color":"#333",
		        "background-color":"white"
		    },
		    "subtitle":{
		        "text":"Source: WorldClimate.com"
		    },
			"legend":{
		        "layout":"x1",
		        "width":"5%",
		        "margin-top":47,
		        "border-width":"0",
		        "shadow":false,
		        "marker":{
		            "cursor":"hand",
		            "border-width":"0"
		        },
		        "background-color":"white",
		        "item":{
		            "cursor":"hand"
		        },
		        "toggle-action":"remove"
		    },
			"scaleX":{
		        "values":xAxis
			},
			"scaleY":{
		        "line-color":"#333"
			},
			"crosshair-x": {
                "line-color": "#00baf0",
                "value-label": {
                    "border-radius": "5px",
                    "border-width": "1px",
                    "border-color": "#f6f7f8",
                    "padding": "10px",
                    "font-weight": "bold"
                },
                "scale-label": {
                    "font-color": "#00baf0",
                    "background-color": "#f6f7f8"
                }
            },
            "tooltip": {
                "visible": false
            },
			"plot":{
		        "line-width":3,
		        "marker":{
		            "size":2
		        },
		        "selection-mode":"multiple",
		        "background-mode":"graph",
		        "selected-state":{
		            "line-width":4
		        },
		        "background-state":{
		            "line-color":"#eee",
		            "marker":{
		                "background-color":"none"
		            }
		        }
			},
		    "plotarea":{
		        "width":"95%",
		        "height":"96%"
		    },
			"series":formatDataSeries(dataSeries)
		};

		zingchart.render({
		    id: divId,
		    height: 400,
		    width: '100%',
		    data: chartData
		});
	};
})(window.zingchart = window.zingchart || {});