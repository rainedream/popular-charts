(function(temperature) {
	var seasons = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'fall', 'fall', 'fall', 'winter'];	// Jan - Dec
	var temperatureRange = {
			'winter':{'min':0, 'max':7}, 
			'spring':{'min':5, 'max':18}, 
			'summer':{'min':17, 'max':28}, 
			'fall':{'min':6, 'max':20}
		};

	temperature.random = function(years) {
		var totalMonths = years * 12;
		var temps = new Array();
		for (var i = 0; i < totalMonths; i++) {
			var season = seasons[i % 12];
			temps.push(randomInSeason(season));
		}

		return temps;
	};

	function randomInSeason(season) {
		var tempRange = temperatureRange[season];
		var min = tempRange.min;
		var max = tempRange.max;

		return Math.floor(Math.random() * (max - min + 1) * 10) / 10.0 + min;
	}
})(window.temperature = window.temperature || {});


(function(monthMark) {
	monthMark.generate = function(max, years) {
		var start = max - years + 1;
		var months = new Array();
		for (var i = start; i < start + years; i++) {
			for (var j = 1; j <= 12; j++) {
				months.push(i + '/' + j);
			}
		}
		return months;
	};
})(window.monthMark = window.monthMark || {});


(function(SHCOMP) {
	SHCOMP.IndexGenerator = function() {
		var baseIndex = 5000;
		var changeLimitInPercentage = 2;
		var lastIndex = baseIndex;

		function randomIndex(base) {
			var up = Math.random() < 0.5 ? -1 : 1;
			var change = base * (Math.random() * changeLimitInPercentage / 100); 
			lastIndex = base + change * up;
			return lastIndex;
		}

		this.initData = function() {
			var data = [],
	        	time = (new Date()).getTime();

	        for (var i = -19; i <= 0; i += 1) {
	        	var index = randomIndex(lastIndex);
	            data.push({x: time + i * 1000, y: index});
	        }
	        return data;
		};

		this.realtime = function(pointArray) {
			var lastPoint = pointArray.data[pointArray.data.length - 1];
			setInterval(function () {
	            var x = (new Date()).getTime(),
	                y = randomIndex(lastIndex);
	            pointArray.addPoint([x, y], true, true);
	        }, 1000);
		};
	}
})(window.SHCOMP = window.SHCOMP || {});