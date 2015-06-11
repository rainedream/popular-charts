function renderWithRealtimeData(engines) {
	$(engines).each(function(index, engineName) {
		window[engineName].renderLineWithRealtimeData(engineName + 'Container');
	});
}


$(document).ready(function() {
	var engines = ['highcharts', 'zingchart', 'amcharts'];
	renderWithRealtimeData(engines);
});