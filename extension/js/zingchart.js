(function(zingchart) {
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
})(window.zingchart = window.zingchart || {});