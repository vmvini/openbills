(function(){

	angular
		.module('sisamclient')
		.service('chartservice', chartservice);

	//chartservice.$inject = [''];
	function chartservice(){

		var drawChart = function(data, var1, var2){
			d3.select("svg").remove();
			var margin = {top: 60, right: 60, bottom: 60, left: 60};
			var xTimeScale, y0Scale, y1Scale;
			var xAxis, yAxisLeft, yAxisRight;
			var valueLine, valueLine2;
			var filteredData;
			var svgContainer = new SvgContainer(margin, 600, 300);

			//verifica se os campos (var1 e var2) de cada elemento possuem valores validos
			/*filteredData = filterResults(data, function(d){
				return d[var1];
			}, function(d){
				return d[var2];
			});*/

			//data = data;

			console.log("recebeu valores de bens para desenhar no grafico", data);

			/*data.forEach(function(d){
				//d.data.$value = formatDate(d.data.$value);
				var date = Date.parse("11/30/" + d.anoEleicao);
				d.anoEleicao = data;
				console.log(d);
			});	*/


/*
private String anoEleicao;

    private double valorBem;

    private String cpfCandidato;

    private String nomeCandidato;
*/

			
			//Configurando Escalas
			xTimeScale = new TimeScale(0, svgContainer.width );
			xTimeScale.create();
			xTimeScale.scaleByDataRange(data, function(d){
				//return d.anoEleicao;
				return Date.parse("11/30/" + d.anoEleicao);
			});

			y0Scale = new Scale(svgContainer.height, 0);
			y0Scale.create();
			y0Scale.scaleByDataRange(data, function(d){
				console.log("escala valor de bem", Number(d.valorBem));
				return Number(d.valorBem);
				//return d;
			});


			//Configurando Eixos
			xAxis = new Axis(xTimeScale.scale);
			xAxis.create(5, "bottom");
			xAxis.draw(svgContainer.svg, "x axis", "black", function(svg){
				svg.attr("transform", "translate(0," + svgContainer.height + ")");
			});


			yAxisLeft = new Axis(y0Scale.scale);
			yAxisLeft.create(5, "left");
			yAxisLeft.draw(svgContainer.svg, "y axis", "steelblue");

			




			//Configurando Linhas
			valueLine = new Line(xTimeScale.scale, y0Scale.scale );
			valueLine.create(function(d){
				return Date.parse("11/30/" + d.anoEleicao);
			}, function(d){
				return Number(d.valorBem);
			});
			valueLine.draw(svgContainer.svg, "blue", data);

		};

		return {
			drawChart: drawChart
		};

	}


	function Scale(start, end){

		this.scale;

		this.create = function(){
			this.scale = d3.scale.linear().range([start, end]);
			console.log("criando scale", this.scale);
		};

		this.scaleByDataRange = function(data, field){
			console.log("scale: ",this.scale);
			this.scale.domain([0, d3.max(data, function(d){
				return Math.max( field(d) );
			}) ] );

		};

	}

	function TimeScale(start, end){
		this.scale;

		this.create = function(){
			this.scale = d3.time.scale().range([start, end]);
			console.log("criando scale", this.scale);
		};

		this.scaleByDataRange = function(data, field){
			console.log("scale: ",this.scale);
			this.scale.domain(d3.extent(data, function(d){
				return field(d);
			}));
		};
	}


	/*
		xscale = d3.scale
		yscale = d3.scale
	*/
	function Line(xscale, yscale){

		var line;

		/*
			xData = function(d){ return d.campoDado }
			yData = function(d){ return d.campoDado }
		*/
		this.create = function(xData, yData){
			line = d3.svg.line()
					.x(function(d){ return xscale( xData(d) );  })
					.y(function(d){ return yscale( yData(d) ); });
		};

		this.draw = function(svg, color, data){
			svg.append("path")
				.style("stroke", color)
        		.attr("d", line(data));
		};

	}


	function Axis(scale){

		var axis;

		this.create = function(tick, orient){
			axis = d3.svg.axis().scale(scale)
    			.orient(orient).ticks(tick);
		};	

		this.draw = function(svg, axisClass, numberColor, transform){
			var o = svg.append("g")				
		        .attr("class", axisClass)
		        .style("fill", numberColor)		
		        .call(axis);

		    if(transform){
		    	transform(o);
		    }
		};

	}

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


	function formatDate(date, format){
		var localTime = moment().format('YYYY-MM-DD');
		var parseDate; 
		if(format === undefined){
			parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;
		}
		else{
			parseDate = d3.time.format(format).parse;
		}

		var formated = parseDate(date);
		console.log("data formatada: ", formated);
		

		return formated;
	}

	//filterResults(dataArray, [fields,...])
	function filterResults(array){
		var resultArray = [];
		var fields = Array.prototype.slice.call(arguments, 1);
		
		var j, k;
		var current;
		var invalid;

		for(j = 0; j < array.length; j++){

			invalid = false;

			for(k = 0; k < fields.length; k++){
				current = fields[k]( array[j] );
				if( current === "99999.0" || current === "99999" ){
					invalid = true;
				}
			}

			if(!invalid){
				resultArray.push( array[j] );
			}

		}

		return resultArray;

	}


})();