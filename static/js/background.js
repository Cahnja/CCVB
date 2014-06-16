var s = document.getElementById('svg');
var foreign = document.getElementById('foreign');

if(document.getElementById('full-div') != null) {
    var intro = true;
} else {
    var intro = false;
}

var makeBackground = function() {
    if(intro) {
	var leftButton = document.getElementById("left-button");
	var rightButton = document.getElementById("right-button");
	var leftForm = document.getElementById("left-form");
	var rightForm = document.getElementById("right-form");
	leftButton = leftForm.removeChild(leftButton);
	rightButton = rightForm.removeChild(rightButton);
    }

    var width = parseInt(document.body.clientWidth);
    var height = parseInt(document.body.clientHeight);
    
    var circles = s.getElementsByTagName('circle');
    var lines = s.getElementsByTagName('line');
    var len = circles.length

    
    for(var i = 0; i < len; i++) {
	circles[0].parentNode.removeChild(circles[0]);
    }
    len = lines.length;
    for(var i = 0; i < len; i++) {
	lines[0].parentNode.removeChild(lines[0]);
    }

    var newCircles = [];
    
    for(var i = 0; i < 100; i++) {
	var randpixel = document.createElementNS("http://www.w3.org/2000/svg","circle");
	var dimension = Math.random() * 2 + 5;
	randpixel.setAttribute('cx',Math.random() * width * 1.5 - width * .25);
	randpixel.setAttribute('cy',Math.random() * height * 1.5 - height * .25);
	randpixel.setAttribute('r',dimension);
//	randpixel.setAttribute('fill','#6a55ff');
	randpixel.setAttribute('fill','#ffffff');
	
	newCircles.push(randpixel);
	
	var randpixel2 = document.createElementNS("http://www.w3.org/2000/svg","circle");
	var dimension2 = Math.random() * 2 + 5;
	randpixel2.setAttribute('cx',Math.random() * width * 1.5 - width * .25);
	randpixel2.setAttribute('cy',Math.random() * height * 1.5 - height * .25);
	randpixel2.setAttribute('r',dimension2);
//	randpixel2.setAttribute('fill','#5a70ff');
	randpixel2.setAttribute('fill','#ffffff');

	newCircles.push(randpixel2);
	
	var randpixel3 = document.createElementNS("http://www.w3.org/2000/svg","circle");
	var dimension3 = Math.random() * 2 + 5;
	randpixel3.setAttribute('cx',Math.random() * width * 1.5 - width * .25);
	randpixel3.setAttribute('cy',Math.random() * height * 1.5 - height * .25);
	randpixel3.setAttribute('r',dimension3);
//	randpixel3.setAttribute('fill','#5e86ff');
	randpixel3.setAttribute('fill','#ffffff');

	newCircles.push(randpixel3);
    }
    

    for(var i = 0; i < newCircles.length; i++){
	var xcoord = newCircles[i].getAttribute('cx');
	var ycoord = newCircles[i].getAttribute('cy');
	var dists = _.map(newCircles, function(d,i) {
	    return [Math.sqrt(Math.pow(xcoord - d.getAttribute('cx'),2) +
			     Math.pow(ycoord - d.getAttribute('cy'),2)),i];
	    });

	var neighbors = _.filter(dists, function(d) {
	    return d[0] < 200 && d[1] != i;});


	var skipRate = 1 / j;

	for(var j = 0; j < neighbors.length && j < 4; j++) {
	    if(j != 0 && Math.random() > skipRate) {
		continue;
	    }
	    
	    var newline = document.createElementNS("http://www.w3.org/2000/svg","line");
	    newline.setAttribute('x1',xcoord);
	    newline.setAttribute('y1',ycoord);
	    newline.setAttribute('x2',newCircles[neighbors[j][1]].getAttribute('cx'));
	    newline.setAttribute('y2',newCircles[neighbors[j][1]].getAttribute('cy'));
	  
	    newline.setAttribute('stroke-width',1);
//	    newline.setAttribute('stroke','#8888ff');
	    newline.setAttribute('stroke','#ffffff');

	    s.appendChild(newline);
	}
    }

    for(var i = 0; i < newCircles.length; i++) {
	s.appendChild(newCircles[i]);
    }


    if(intro) {
	var introMessage1 = document.createElementNS("http://www.w3.org/2000/svg","text");
	introMessage1.appendChild(document.createTextNode("Re-inventing Social Media"));
	introMessage1.setAttribute('x',width/2 - 480);
	introMessage1.setAttribute('y',200);
	introMessage1.setAttribute('fill','#888888');
	introMessage1.setAttribute('style',"font-family:'Changa One', cursive; font-size:80px");
	introMessage1.setAttribute('id','intro1');
	s.appendChild(introMessage1);

	var introMessage2 = document.createElementNS("http://www.w3.org/2000/svg","text");
	introMessage2.appendChild(document.createTextNode("Analytics For The Average Joe"));
	introMessage2.setAttribute('x',width/2 - 535);
	introMessage2.setAttribute('y',300);
	introMessage2.setAttribute('fill','#888888');
	introMessage2.setAttribute('style',"font-family:'Changa One', cursive; font-size:80px");
	introMessage2.setAttribute('id','intro2');
	s.appendChild(introMessage2);


	var introMessage3 = document.createElementNS("http://www.w3.org/2000/svg","text");
	introMessage3.appendChild(document.createTextNode("Socialpedia"));
	introMessage3.setAttribute('x',width/2 - 405);
	introMessage3.setAttribute('y',250);
	introMessage3.setAttribute('fill','#888888');
	introMessage3.setAttribute('style','font-family:"Changa One", cursive; font-size:150px');
	introMessage3.setAttribute('id','intro3');


	d3.selectAll('#intro1').style('opacity',0).transition().duration(3000).style('opacity',0.99).attr('y',300).transition().duration(3000).style('opacity',0).attr('y',400);
	d3.selectAll('#intro2').style('opacity',0).transition().duration(3000).style('opacity',0.99).attr('y',400).transition().duration(3000).style('opacity',0).attr('y',500);


	d3.selectAll('rect').style('opacity',0);


	d3.timer(function() {
	    leftForm.appendChild(leftButton);
	    rightForm.appendChild(rightButton);
	    d3.selectAll('rect').transition().duration(2000).style('opacity',0.95);
	    d3.selectAll('div').style('opacity',0).transition().duration(2000).style('opacity',0.99);
	    return true;
	}, 8000);

	d3.timer(function() {
	    s.appendChild(introMessage3);
	    d3.selectAll('#intro3').style('opacity',0.5).transition().duration(2000).style('opacity',0.99).attr('y',350).transition().duration(2000).style('opacity',0).attr('y',450);
	    return true;
	}, 6000);
	    
	intro = false;


	d3.timer(function() {
	    var delete1 = document.getElementById('intro1');
	    if(delete1 != null) {
		s.removeChild(delete1);
	    }
	    var delete2 = document.getElementById('intro2');
	    if(delete2 != null) {
		s.removeChild(delete2);
	    }
	    var delete3 = document.getElementById('intro3');
	    if(delete3 != null) {
		s.removeChild(delete3);
	    }
	}, 10500);
    }
    
    var leftSide = document.getElementById('leftSide'); 
    var rightSide = document.getElementById('rightSide');
    //var topBox = document.getElementById('topBox');

    if (leftSide != null) {
	if(width >= 850) {
	    leftSide.setAttribute('x', width / 4 - 200.5);
	    s.appendChild(leftSide);
	    
	    rightSide.setAttribute('x', 3 * width / 4 - 200.5);
	    s.appendChild(rightSide);
	    
	    //topBox.setAttribute('x', width / 2 - 207);
	    //s.appendChild(topBox);
	} else {
	    leftSide.setAttribute('x', "12px");
	    rightSide.setAttribute('x', "436px");
	    //topBox.setAttribute('x', "218px");

	    s.appendChild(leftSide);
	    s.appendChild(rightSide);
	    //s.appendChild(topBox);
	}
    }

    s.removeChild(foreign);
    s.appendChild(foreign);
}


window.onresize = makeBackground;
makeBackground();
