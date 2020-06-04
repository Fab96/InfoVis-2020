//numero di click
var numberclick = 0;
//base del primo triangolo cliccato, sarà la base del secondo triangolo cliccato
var newbase;
//altezza del primo triangolo cliccato, sarà l'altezza del secondo triangolo cliccato 
var newaltezza;
//riferimento al primo triangolo cliccato 
var oldtriangle;
//riferimento al primo triangolo cliccato SVGPath
var oldtriangleSVG;

var svg = d3.select("body").append("svg")
			.attr("id","plain");


function drawTriangles(data){
	
	svg.selectAll("path")
	.data(data)
	.enter()
	.append("path")
	.attr("fill", function(d) { return d.tonalita})
	.attr("d", function(d) { 
		return isosceles_triangle(d.px,d.py,d.base,d.altezza);
	})
	.on("click", function(d,i) {
		numberclick++;

		//se il numero di click è dispari => è il primo triangolo 
		if (numberclick%2==1) { 
			newbase = d.base;
			newaltezza = d.altezza;
			oldtriangle = d;
			oldtriangleSVG = this;
			d3.select(this).attr("fill","transparent");

		}
		//se il numero di click è pari => è il secondo triangolo
	    else {
	    	oldtriangle.base = d.base;
	    	oldtriangle.altezza = d.altezza;
	    	d.base = newbase;
	    	d.altezza = newaltezza;	    	
	    	d3.select(this)
	    	.transition()
	    	.duration(5000)
	    	.attr("d", function(d) {
	    		return isosceles_triangle(d.px,d.py,newbase,newaltezza);
			});
			d3.select(oldtriangleSVG)
			.transition()
			.duration(5000)
			.attr("fill", oldtriangle.tonalita)
			.attr("d", function(d) {
	    		return isosceles_triangle(d.px,d.py,oldtriangle.base,oldtriangle.altezza);
			});

	    }


	});

}


function isosceles_triangle(x,y,base,heigth) {
	return 'M ' + x +' '+ y + ' L ' + (x+base) +' '+ y +' L '+ (x+base/2) +' '+ (y+heigth) +' Z';
}

d3.json("data/dataset.json")
.then(function(data) {
	drawTriangles(data);
})
.catch(function(error) {
		console.log(error); 
	});