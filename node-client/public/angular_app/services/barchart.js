(function(){

	angular
		.module('sisamclient')
		.service('barchartService', barchartService);

	function barchartService(){

		var drawChart = function(data){
			d3.select("svg").remove();
			var margin = {top: 20, right: 20, bottom: 30, left: 40};

			//var margin = {top: 60, right: 60, bottom: 60, left: 60};
			var svgContainer = new SvgContainer(margin, 600, 300);


		    //width = 960 - margin.left - margin.right,
		    //height = 500 - margin.top - margin.bottom;

		    var x = d3.scale.ordinal()
    					.rangeRoundBands([0, svgContainer.width], .1);

    		var y = d3.scale.linear()
    					.range([svgContainer.height, 0]);

    		var xAxis = d3.svg.axis()
							    .scale(x)
							    .orient("bottom");


	        //var ticks = [0, 100, 1000, 10000, 100000, 1000000, 5000000, 10000000, 100000000, 1000000000, 10000000000  ];
	        //var labels = ['0', 'R$100,00', 'R$mil', 'R$ 10mil', 'R$cem mil', 'R$ 1milhão', 'R$5milhões', 'R$10milhões', 'R$100milhões', 'R$1Bilhão', 'R$10Bilhões' ];

			var yAxis = d3.svg.axis()
							    .scale(y)
							    .orient("left")
							    .ticks(3, "R$");
							    //.tickValues(ticks)
							    //.tickFormat(function(d, i){
							    //	return labels[i];
							    //});


			/*var svg = d3.select("body").append("svg")
					    .attr("width", width + margin.left + margin.right)
					    .attr("height", height + margin.top + margin.bottom)
					  .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

			
			

			x.domain(data.map(function(d) { return d.anoEleicao; }));
  			y.domain([0, d3.max(data, function(d) { return Number(d.valorBem); })]);
  			//y.domain([0, 10000000000]);

  			svgContainer.svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + svgContainer.height + ")")
			      .call(xAxis);

			svgContainer.svg.append("g")
			      .attr("class", "y axis")
			      .attr("transform", "translate(" + 30 + ",0)")
			      .call(yAxis)
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 0)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text("Reais");

	    	svgContainer.svg.selectAll(".bar")
			      .data(data)
			    .enter().append("rect")
			      .attr("class", "bar")
			      .attr("x", function(d) { return x(d.anoEleicao); })
			      .attr("width", x.rangeBand())
			      .attr("y", function(d) { return y(Number(d.valorBem)); })
			      .attr("height", function(d) { return svgContainer.height - y(Number(d.valorBem)); });


		};


		function SvgContainer(margin, w, h){

			this.width = w - margin.left - margin.right,
	    	this.height = h - margin.top - margin.bottom;

	    	this.svg = d3.select("#svgContainer")
			    .append("svg")
			        .attr("width", this.width + margin.left + margin.right)
			        .attr("height", this.height + margin.top + margin.bottom)
			    .append("g")
			        .attr("transform", 
			              "translate(" + margin.left + "," + margin.top + ")");

		}


		return{
			drawChart:drawChart
		};

	}


})();