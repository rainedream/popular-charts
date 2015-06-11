function renderWithRealtimeData(engines) {
	var serviceHost = 'http://localhost:8081';
	$(engines).each(function(index, engineName) {
		window[engineName].renderLineWithRealtimeData(engineName + 'Container', serviceHost);
	});
}


$(document).ready(function() {
	var engines = ['highcharts', 'zingchart', 'amcharts'];
	renderWithRealtimeData(engines);
});