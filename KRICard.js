function KRICard(placeholderName, configuration)

{

	this.placeholderName = placeholderName;

	

	var self = this; // for internal d3 functions

	

	this.configure = function(configuration)

	{

		this.config = configuration;

		switch (this.config.zone) {
			case "red" :
				this.config.zoneColor = "rgb(235,50,35)";
				this.config.bandColor = "rgb(167,35,25)";
				break;
			case "yellow" :
				this.config.zoneColor = "rgb(247,193,67)";
				this.config.bandColor = "rgb(175,137,48)";
				break;
			default :
				this.config.zoneColor = "rgb(78,172,91)";
				this.config.bandColor = "rgb(55,122,65)";
		}
		
		//this.config.value = configuration.value;
		
		this.config.unit = configuration.unit;
		
		this.config.period = configuration.period;
		
		this.config.desc = configuration.desc;
		
//		this.config.size = this.config.size * 0.9;
//		green rgb(78,172,91)
//		green_line rgb(55,122,65)
//		red rgb(235,50,35)
//		red_line rgb(167,35,25)
//		yellow rgb(78,172,91)
//		yellow_line rgb(55,122,65)


	}



	this.render = function()

	{

		this.body = d3.select("#" + this.placeholderName)

					.append("svg:svg")

					.attr("class", "rect")

					.attr("width", this.config.size)

					.attr("height", this.config.size / 2);
		

		this.body.append("svg:rect")

					.attr("width", this.config.size)

					.attr("height", this.config.size / 2)

					.style("fill", this.config.zoneColor);
					

		this.body.append("svg:rect")

					.attr("width", this.config.size)

					.attr("height", this.config.size / 10)
					
					.attr("y", 80)

					.style("fill", this.config.bandColor);


		this.body.append("svg:text")

					.attr("x", 120)

					.attr("y", 90)

					.attr("dy", ".35em")

					.attr("text-anchor", "right")

					.text("Подробнее" + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0" + "->")

					.style("font-size", "8px")

					.style("fill", "white")
					
					.style("font-weight", "bold");
						
						
		this.body.append("svg:text")

					.attr("x", 10)

					.attr("y", 20)

					.attr("dy", ".35em")

					.attr("text-anchor", "left")

					.text(this.config.value + "\u00A0" + this.config.unit)

					.style("font-size", "18px")

					.style("fill", "white")
					
					.style("font-weight", "bold");
						
						
		this.body.append("svg:text")

					.attr("x", 10)

					.attr("y", 40)

					.attr("dy", ".35em")

					.attr("text-anchor", "left")

					.text("за" + "\u00A0" + this.config.period)

					.style("font-size", "10px")

					.style("fill", "white");
						
		this.body.append("svg:text")

					.attr("x", 10)

					.attr("y", 55)

					.attr("dy", ".35em")

					.attr("text-anchor", "left")

					.text(this.config.desc)
					
					.call(wrap, 200) 

					.style("font-size", "8px")

					.style("fill", "white");
												
	}
		

	// initialization

	this.configure(configuration);	

}

// wrap long labels
 
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
		x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
