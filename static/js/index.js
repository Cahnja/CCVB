var s = document.getElementById("svg");
var topDiv = document.getElementById("top-div");
var fullDiv = document.getElementById("full-div");
var leftDiv = document.getElementById("left-div");
var rightDiv = document.getElementById("right-div");
var foreign = document.getElementById("foreign");


var topBox = document.createElementNS("http://www.w3.org/2000/svg","rect");
topBox.setAttribute('x', "33%");
topBox.setAttribute('y', 0);
topBox.setAttribute('width', "34%");
topBox.setAttribute('height',75);
topBox.setAttribute('rx', 10);
topBox.setAttribute('ry', 10);
topBox.setAttribute('fill', '#eeeeff');
topBox.setAttribute('stroke', '#d0d0ff');
topBox.setAttribute('id','topBox');
s.appendChild(topBox);

var leftSide = document.createElementNS("http://www.w3.org/2000/svg","rect");
leftSide.setAttribute('x', "10%");
leftSide.setAttribute('y', 100);
leftSide.setAttribute('width', "30%");
leftSide.setAttribute('height',500);
leftSide.setAttribute('rx', 10);
leftSide.setAttribute('ry', 10);
leftSide.setAttribute('fill', '#eeeeff');
leftSide.setAttribute('stroke', '#d0d0ff');
leftSide.setAttribute('id','leftSide');
s.appendChild(leftSide);

var rightSide = document.createElementNS("http://www.w3.org/2000/svg","rect");
rightSide.setAttribute('x', "60%");
rightSide.setAttribute('y', 100);
rightSide.setAttribute('width', "30%");
rightSide.setAttribute('height', 500);
rightSide.setAttribute('rx', 10);
rightSide.setAttribute('ry', 10);
rightSide.setAttribute('fill', '#eeeeff');
rightSide.setAttribute('stroke', '#d0d0ff');
rightSide.setAttribute('id','rightSide');
s.appendChild(rightSide);


topDiv.addEventListener('mouseover', function(e) {
    d3.selectAll('#left-div').transition().duration(350).style('opacity',1);
    d3.selectAll('#right-div').transition().duration(350).style('opacity',1);
});

rightDiv.addEventListener('mouseover', function(e) {
    d3.selectAll('#left-div').transition().duration(350).style('opacity',0.2);
    d3.selectAll('#right-div').transition().duration(350).style('opacity',1);
});

leftDiv.addEventListener('mouseover', function(e) {
    d3.selectAll('#left-div').transition().duration(350).style('opacity',1);
    d3.selectAll('#right-div').transition().duration(350).style('opacity',0.2);
});



