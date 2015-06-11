(function(zingchart) {
	var colors = ['#7CB5EC', '#434348', '#90ED7D', '#F7A35C'];
	var latestValue = -1;

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

	zingchart.renderLineWithRealtimeData = function(divId) {
		var chartData = {
	        "type":"line",
	        "background-color":"white",
		    "title":{
		        "text":"Shanghai Composite Index",
		        "color":"#333",
		        "background-color":"white"
		    },
		    "scaleX":{
		    	"transform":{
		            "type":"date",
		            "all":"%H.%i.%s"
		        },
		        "values":[]
			},
		    "scaleY":{
		        "line-color":"#333",
		        "values":"4500:5500:200"
			},
	        "refresh": {
	            "type": "feed",
	            "transport": "js",
	            "url": "this.feed()",
	            "interval": 1000
	        },
	        "series":[
	            {
	                "values":[]
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

	this.feed = function(callback) {
	    // var tick = {};
	    // tick.scaleX = toHHMMSS(new Date().getTime());
	    // tick.plot0 = parseInt(10+900*Math.random(), 10);
	    var url = 'http://localhost:8081/shcomp';
	    console.log('latest', latestValue);
	    if (latestValue > 0) {
	    	url = 'http://localhost:8081/shcomp/last/' + latestValue;
	    }

	    $.get(url, function(data) {
			var tick = {'scale-x':data['Time'], 'plot0':data['Value']};
			callback(JSON.stringify(tick));
			latestValue = Math.floor(data['Value']);
		});
	};

	function toHHMMSS(tick) {
	    var secNum = tick;
	    var hours   = Math.floor(secNum / 3600);
	    var minutes = Math.floor((secNum - (hours * 3600)) / 60);
	    var seconds = secNum - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    
	    return hours + ':' + minutes + ':' + seconds;
	}
})(window.zingchart = window.zingchart || {});