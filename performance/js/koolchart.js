(function(koolchart) {
	koolchart.renderLine = function(divId, xAxis, dataSeries) {
		// Setting the name of the function which is called when KoolChart is ready to be created.
	    var chartVars = "KoolOnLoadCallFunction=chartReadyHandler";
	    
	    KoolChart.create("chart1", divId, chartVars, "100%", "100%");
	    
	  // The JavaScript function which is set to the value of KoolOnLoadCallFunction
	    function chartReadyHandler(id) {
	      document.getElementById(id).setLayout(layoutStr);
	      document.getElementById(id).setData(chartData);
	    }
		
	  // Setting the layout using the XML-formatted string.
	    var layoutStr =
	      '<KoolChart backgroundColor="0xFFFFFF" cornerRadius="12" borderStyle="solid">'
	      +'  <Options>'
	      +'    <Caption text="Anual Report"/>'
	      +'  </Options>'
	      +'  <NumberFormatter id="numFmt" precision="0"/>'
	      +'  <Column3DChart showDataTips="true">'
	      +'    <horizontalAxis>'
	      +'      <CategoryAxis categoryField="Month" />'
	      +'    </horizontalAxis>'
	      +'    <series>'
	      +'      <Column3DSeries labelPosition="inside" yField="Profit" displayName="Profit">'
	      +'        <showDataEffect>'
	      +'          <SeriesInterpolate/>'
	      +'        </showDataEffect>'
	      +'      </Column3DSeries>'
	      +'    </series>'
	      +'  </Column3DChart>'
	      +'</KoolChart>';
	      
	  // Setting the dataset using JSON format.
	    var chartData = [ {"Month":"Jan", "Profit":10000},
	      {"Month":"Feb", "Profit":15000},
	      {"Month":"Mar", "Profit":12000},
	      {"Month":"Apr", "Profit":30200},
	      {"Month":"May", "Profit":28000},
	      {"Month":"Jun", "Profit":12000},
	      {"Month":"Jul", "Profit":22000},
	      {"Month":"Aug", "Profit":13000},
	      {"Month":"Sep", "Profit":22000},
	      {"Month":"Oct", "Profit":29000},
	      {"Month":"Nov", "Profit":18000},
	      {"Month":"Dec", "Profit":30000} ];
	};
})(window.koolchart = window.koolchart || {});