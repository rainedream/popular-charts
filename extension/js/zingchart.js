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

	function formatDataSeriesInScope(dataSeries) {
		var series = new Array();
		var lineColor = '#d4d4d4';
		for (var i = 0; i < dataSeries.length; i++) {
			series.push({
				'text': dataSeries[i].name, 
				'line-color': lineColor, 
				'values': dataSeries[i].data, 
				'marker': {
					'background-color': lineColor,
		            'border-color': lineColor
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

	function renderLine(divId, dataSeries) {
		var chartData = {
		    "background-color":"none",
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
			"scale-y":{
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
		        "height":"96%",
		        "margin-top": 110
		    },
			"series":formatDataSeries(dataSeries)
		};

		zingchart.render({
		    id: divId,
		    height: 550,
		    width: '100%',
		    data: chartData
		});
	};

	function renderScopeControl(targetId, dataSeries) {
		var chartData = {
		    "background-color":"none",
		    "type":"line",
		    "title":{
		        "height": 0
		    },
		    "subtitle":{
		        "height": 0
		    },
		    "scale-x": {
		    	"visible": false
		    },
			"scale-y":{
		        "visible": false
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
		        "width":"94.9%",
		        "height":"96%",
		        "margin-top": 110
		    },
			"series":formatDataSeriesInScope([dataSeries[0]])
		};

		zingchart.render({
		    id: targetId + 'Scope',
		    height: 230,
		    width: '100%',
		    data: chartData
		});

		maskScope(targetId, dataSeries[0].data.length, dataSeries);
	}

	function extractInRange(array, fromIndex, toIndex) {
		var series = new Array();
		for (var i = fromIndex; i <= toIndex; i++) {
			series.push(array[i]);
		}
		return series;
	}

	function filterDataSeries(dataSeries, fromIndex, toIndex) {
		var series = new Array();
		for (var i = 0; i < dataSeries.length; i++) {
			series.push({'name':dataSeries[i].name, 'data':extractInRange(dataSeries[i].data, fromIndex, toIndex)});
		}
		return series;
	}

	function maskScope(targetId, dataSeriesLength, dataSeries) {
		var scopeControl = $('#' + targetId + 'Scope');
		var mask = $('#' + targetId + 'ScopeMask .data-scope-mask');
		var leftButton = $('.mask-button.left');
		var rightButton = $('.mask-button.right');

		var offsetLeft = leftButton.position().left - parseInt(mask.css('marginLeft').replace('px', ''));
		var leftButtonXAtBeginning = leftButton.position().left;
		var rightButtonWidth = rightButton.width();
		var rangeValue = rightButton.position().left - leftButtonXAtBeginning + Math.ceil(rightButtonWidth / 2.0);

		$('.mask-button').draggable({ 
			axis: "x",
			containment: "parent",
			scroll: false,
			drag: function(event) {
				var targetElem = $(event.target);
				var x = targetElem.position().left;
				var oldMarginLeft = parseInt(mask.css('marginLeft').replace('px', ''));

				var x1 = leftButtonXAtBeginning;

				if (targetElem.hasClass('left')) {
					mask.css({'margin-left': (x - offsetLeft) + 'px'});
					var newMarginLeft = parseInt(mask.css('marginLeft').replace('px', ''));
					mask.width(mask.width() - (newMarginLeft - oldMarginLeft));
				} else {
					var buttonMarginRight = parseInt(targetElem.css('marginRight').replace('px', ''));
					var buttonWidth = targetElem.width();
					mask.width(x - buttonWidth - oldMarginLeft - 5);
				}
			},
			stop: function() {
				var x0 = leftButton.position().left - leftButtonXAtBeginning;
				var x1 = rightButton.position().left - leftButtonXAtBeginning + Math.ceil(rightButtonWidth / 2.0);
				var startIndex = Math.floor(dataSeriesLength * 1.0 * x0 / rangeValue);
				var endIndex = Math.ceil(dataSeriesLength * 1.0 * x1 / rangeValue);

				var filteredSeries = filterDataSeries(dataSeries, startIndex, endIndex);
				refreshChartInRange(targetId, filteredSeries);
			}
		});
	}

	function refreshChartInRange(id, dataSeries) {
		zingchart.exec(id, 'setseriesdata', {'data': formatDataSeries(dataSeries)});
	}

	zingchart.renderLineWithinScope = function(divId, dataSeries) {
		renderLine(divId, dataSeries);
		renderScopeControl(divId, dataSeries);
	};

	zingchart.renderLineWithinScopeInNativeMode = function(divId, xAxis, dataSeries) {
		var chartData = {
		    "background-color":"none",
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
		    "scale-x":{
			    "zooming":true,
			    "values":xAxis,
			    "zoom-to-values":["2000/1", "2010/12"]
			},
			"scale-y":{
		        "line-color":"#333"
			},
			"preview":{
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
		        "height":"96%",
		        "margin-top": 110
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