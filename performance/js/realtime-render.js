function renderWithRealtimeData(engines) {
	$(engines).each(function(index, engineName) {
		window[engineName].renderLineWithRealtimeData(engineName + 'Container');
	});
}


$(document).ready(function() {
	renderWithRealtimeData(['highcharts']);
});