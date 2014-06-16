//People Results Script	
$('.button-group').each( function( i, buttonGroup ) {
	var $buttonGroup = $( buttonGroup );
	$buttonGroup.on( 'click', 'button', function() {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$( this ).addClass('is-checked');
	});
});

// InstagramEngTime
var InstagramEngTime = function (pics) {
    vals = pics["media_stats"]["eng_vals"]

    data = {
	"xScale": "linear",
	"yScale": "linear",
	"type": "line",
	"main": [
	    {
		"className": ".linked",
		"data": [] 
	    }
	]
    };

    for (i=0;i<vals.length;i++){
	myVal =  {
            "x": i ,
            "y": vals[i]
	};

	arr = data["main"][0]["data"]
	arr.push(myVal);
	data["main"][0]["data"] = arr;
    };
    var myChart = new xChart("line", data, "IG-EngvsTi");
};

// TwitterEngTime
var TwitterEngTime = function (tweets) {
    vals = tweets["eng_vals"]

    data = {
	"xScale": "linear",
	"yScale": "linear",
	"type": "line",
	"main": [
	    {
		"className": ".linked",
		"data": [] 
	    }
	]
    };

    for (i=0;i<vals.length;i++){
	myVal =  {
            "x": i ,
            "y": vals[i]
	};

	arr = data["main"][0]["data"]
	arr.push(myVal);
	data["main"][0]["data"] = arr;
    };
    var myChart = new xChart("line", data, "TW-EngvsTi");
};

//InstragramLikesTime
var InstagramLikesTime = function (pics) {
    likes= pics["media_stats"]["likes_vals"]
    imgval = pics["media_stats"]["images"]
    textVal = pics["media_stats"]["text_vals"]

    data = {
	"xScale": "linear",
	"yScale": "linear",
	"main": [
	    {
		"className": ".retfav",
		"data": [] 
	    }
	]
    };

    for (i=0;i<likes.length;i++){
	myVal =  {
            "x": i,
            "y": likes[i]
	};

	arr = data["main"][0]["data"]
	arr.push(myVal);
	data["main"][0]["data"] = arr;
    };

    var opts = {
	"mouseover": function (d,i) {
	    txt = textVal[i];
	    var txtNd=document.createTextNode(txt);
	    imageSRC = imgval[i];
	    var imgNd = document.createElement('img')
	    imgNd.src = imageSRC;
	    var br = document.createElement("br");

	    document.getElementById("IG-LivsTi-dialog").appendChild(imgNd)
	    document.getElementById("IG-LivsTi-dialog").appendChild(br)
	    document.getElementById("IG-LivsTi-dialog").appendChild(txtNd);
	    $( "#IG-LivsTi-dialog" ).dialog(); 
	},
	"mouseout": function (x,i) {
	    $("#IG-LivsTi-dialog").dialog('close');
	    document.getElementById("IG-LivsTi-dialog").innerHTML = "";

	},
    };

    var myChart = new xChart('line-dotted', data, '#IG-LivsTi', opts);
};

//TwitterRetFav
var TwitterRetFav = function (tweets) {
    favs = tweets["favorite_vals"]
    rets = tweets["retweet_vals"]
    textVal = tweets ["tweet_text"]    

    tt = document.createElement('div'),
    leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
    topOffset = 0;
    tt.className = 'ex-tooltip';
    document.body.appendChild(tt);

    data = {
	"xScale": "linear",
	"yScale": "linear",
	"main": [
	    {
		"className": ".retfav",
		"data": [] 
	    }
	]
    };

    for (i=0;i<favs.length;i++){
	myVal =  {
            "x": favs[i],
            "y": rets[i]
	};

	arr = data["main"][0]["data"]
	arr.push(myVal);
	data["main"][0]["data"] = arr;
    };

    var opts = {
	"mouseover": function (d,i) {
	    var pos = $(this).offset();
	    $(tt).text(textVal[i])
		.css({top: pos.top, left: pos.left })
		.show();
	},
	"mouseout": function (x) {
	    $(tt).hide();
	},
	"click": function(x,i) {
	    x = String(textVal[i]);
	    console.log(textVal[i]);
	    alert(x);
	}
    };
    var myChart = new xChart('line-dotted', data, '#TW-RTvsFav', opts);
};

//TweetsFavTime
var TweetsFavTime = function (tweets) {
    favorite_vals = tweets["favorite_vals"]
    text_vals = tweets ["tweet_text"]
 
    console.log("here")
    window.onload = function () {
	document.getElementById("TW-FavvsTi-dialog").innerHTML = "";
    }

    var height=400, width=1500;
    var yPadding=10;
    var xPadding=40;

    var svg = d3.select("body").append('svg')
	.attr('width',width)
	.attr('height',height)
	.attr('id','svg')
	.style('border','1px solid')
    
    d1 = []
    

    for (i=0; i<favorite_vals.length; i++) {
	d1.push ({
	    'label':i,
	    'x':i,
	    'y':favorite_vals[i],
	    'text':text_vals[i]
	})
    }

    var yScale = d3.scale.linear()
	.domain([-2, d3.max(d1,function(d){return d.y;}) ])
	.range([height,0]);

    var xScale = d3.scale.linear()
	.domain([d3.max(d1,function(d){return d.x;})+20,-9 ])
	.range([width,0]);
    var yAxis = d3.svg.axis()
	.scale(yScale)
	.ticks(10)
	.orient('left')

    var xAxis = d3.svg.axis()
	.scale(xScale)
	.ticks(10)
	.orient('')

    svg.append("g")
	.attr('class','axis')
	.attr('transform','translate (25,0)')
	.call(yAxis);

    svg.append("g")
	.attr('class','axis')
	.attr('transform','translate (0,375)')
	.call(xAxis);

    var c = svg.selectAll("circle")
	.data(d1)
	.enter()
	.append("circle")
	.attr('r',5)
	.attr('cx',function(d) {return xScale (d.x);})
	.attr('cy',function(d) {return yScale (d.y);})
	.attr('fill','steelblue')

    $("#svg").on("mouseover", "circle", function(event){
	document.getElementById("TW-FavvsTi-dialog").innerHTML = "";

	xCor = this.cx.baseVal.value;
	xVal = Math.round(xScale.invert(xCor));
	txt = text_vals[xVal];
	var txtNd=document.createTextNode(txt);
	document.getElementById("TW-FavvsTi-dialog").appendChild(txtNd);
	$( "#TW-FavvsTi-dialog" ).dialog(); 
    });

    $("#svg").on("mouseout", "circle", function(event){
	$("#TW-FavvsTi-dialog").dialog('close');
    });

};

//TwitterRetweetsTime
var TwitterRetweetsTime = function (tweets) {    
    retweet_vals = tweets["retweet_vals"]
    text_vals = tweets ["tweet_text"]

    console.log("here")
    window.onload = function () {
	document.getElementById("TW-RTvsTi-dialog").innerHTML = "";
    }

    var height=400, width=1500;
    var yPadding=10;
    var xPadding=40;

    var svg = d3.select("body").append('svg')
	.attr('width',width)
	.attr('height',height)
	.attr('id','svg')
	.style('border','1px solid')
    
    d1 = []
    

    for (i=0; i<retweet_vals.length; i++) {
	d1.push ({
	    'label':i,
	    'x':i,
	    'y':retweet_vals[i],
	    'text':text_vals[i]
	})
    }

    var yScale = d3.scale.linear()
	.domain([-2, d3.max(d1,function(d){return d.y;}) ])
	.range([height,0]);

    var xScale = d3.scale.linear()
	.domain([d3.max(d1,function(d){return d.x;})+20,-9 ])
	.range([width,0]);
    var yAxis = d3.svg.axis()
	.scale(yScale)
	.ticks(10)
	.orient('left')

    var xAxis = d3.svg.axis()
	.scale(xScale)
	.ticks(10)
	.orient('')

    svg.append("g")
	.attr('class','axis')
	.attr('transform','translate (25,0)')
	.call(yAxis);

    svg.append("g")
	.attr('class','axis')
	.attr('transform','translate (0,375)')
	.call(xAxis);

    var c = svg.selectAll("circle")
	.data(d1)
	.enter()
	.append("circle")
	.attr('r',5)
	.attr('cx',function(d) {return xScale (d.x);})
	.attr('cy',function(d) {return yScale (d.y);})
	.attr('fill','steelblue')

    $("#svg").on("mouseover", "circle", function(event){
	document.getElementById("TW-RTvsTi-dialog").innerHTML = "";

	xCor = this.cx.baseVal.value;
	xVal = Math.round(xScale.invert(xCor));
	txt = text_vals[xVal];
	var txtNd=document.createTextNode(txt);
	document.getElementById("TW-RTvsTi-dialog").appendChild(txtNd);
	$( "#TW-RTvsTi-dialog" ).dialog(); 
    });

    $("#svg").on("mouseout", "circle", function(event){
	$("#TW-RTvsTi-dialog").dialog('close');
    });

};

var useDataCLUSTER = function (data) {
    console.log(data);
    width = 400;
    height = 400;

    var svg = d3.select("body")
	.append('svg')
	.attr('id','svg')
	.attr('height',height)
	.attr('width',width)
	.style('border', 'solid 1px');

    var xMin = d3.min(data,function(d){return d.features[0];});
    var xMax = d3.max(data,function(d){return d.features[0];});
    var yMin = d3.min(data,function(d){return d.features[1];});
    var yMax = d3.max(data,function(d){return d.features[1];});

    xScale = d3.scale.linear()
	.domain([xMin,xMax])
	.range([20,width-20]);
    yScale = d3.scale.linear()
	.domain([yMin,yMax])
	.range([20,height-20]);

    centroids = [ data [0],data [1], data [2]];
    centroidColors= ['green','blue','yellow'];
    data2 = data.slice (3, data.length);
    items = svg.selectAll ('item')
	.data(data2)
	.enter()
	.append('circle') 
	.attr('class','item')
	.attr('r',5)
	.attr('cx',function(d) {return xScale(d.features [0]);})
	.attr('cy',function(d) {return yScale(d.features [1]);})
	.attr('fill','red')

    centroidCirciles = svg.selectAll ('centroids')
	.data (centroids)
	.enter()
	.append ('circle')
	.attr ('class','centroid')
	.attr ('r',5)
	.attr('cx',function(d) {return xScale(d.features [0]);})
	.attr('cy',function(d) {return yScale(d.features [1]);})
	.attr('fill',function(d,i) {return centroidColors[i];});

    var dist = function (a,b) {
	var z = _.zip(a,b);
	var sqs = _.map(z,function(d) {return (d[0]-d[1]) * (d[0] - d[1])});
	var sum = _.reduce(sqs,function(a,b) {return a + b;});
	return Math.sqrt(sum);
    }

    var assign = function (centroids,data) {
	console.log ('assigning values');
	_.each(data, function(d){	    
	    var mins = _.map(centroids,function(d2) {
		return dist(d2.features,d.features);
	    });
	    console.log(mins);
	    var min = _.min(mins);
	    var minIndex = _.indexOf(mins,min);
	    d['type'] = minIndex;
	});
    }

    var recenter = function(centroids,data,data2) {
	_.each(centroids,function(d,i,c) {
	    var subset = _.filter(data, function(d2) {
		return d.type==d2.type;    
	    });
	    subset = _.map(subset,function(d){return d.features;});
	    var z = _.zip(subset);
	    var sums = _.map(z,function(d){
		return _.reduce(d,function(a,b) {return a+b;});
	    });
	    var avgs = _.map (sums,function(d,i) {
		return parseInt(d)/z[i].length;
	    });
	    c[i].features = avgs; 
	});
    }

    var clusterIt = function () {

	assign (centroids, data,data2);
	items
	//	.transition()
	//	.delay(function(d,i) {return 50*i})
	    .attr('stroke-width',3)
	    .attr('stroke', function (d) {return centroidColors[d.type];});

	recenter(centroids,data);

	centroidCirciles
	    .transition()
	    .delay(function(d,i){return 1000*i;})
	    .duration(3000)
	    .attr('cx',function(d){return xScale( d.features[0]);})
	    .attr('cy',function(d){return yScale( d.features[1]);})
    }

    //d3.csv("/static/instagram.csv",doit);

    var clickme = d3.select("#clickme").on('click', clusterIt);
    //var bd = d3.select("#build").on('click', build);
};

var getDataCLUSTER = function (pics) {
    
    mediaStats = pics["media_stats"]
    comments = mediaStats ["comments_vals"]
    likes =  mediaStats ["likes_vals"]
    text =  mediaStats ["text_vals"]

    var data = []
    console.log('runningFunction');
    
    for (i = 0;i<comments.length;i++) {
	info = {
	    'type': 1,
	    features:[likes[i],comments[i]],
	    'text':text
	};
	data.push(info);
    };
    return data;
};

var clickEventCLUSTER = function (pics) {
    
    mediaStats = pics["media_stats"]
    comments = mediaStats ["comments_vals"]
    likes =  mediaStats ["likes_vals"]
    text =  mediaStats ["text_vals"]
    
    console.log (likes);
    $("#svg").on("mouseover", "circle", function(event){
	document.getElementById("IG-LivsvsCm-dialog").innerHTML = "";

	xCor = this.cx.baseVal.value;
	xVal = Math.round(xScale.invert(xCor));
	indx = likes.indexOf (xVal);
	txt = text[indx];
	var txtNd=document.createTextNode(txt);
	document.getElementById("IG-LivsvsCm-dialog").appendChild(txtNd);
	$( "#IG-LivsvsCm-dialog" ).dialog({dialogClass: "no-close"}); 
    });

    $("#svg").on("mouseout", "circle", function(event){
	$("#IG-LivsvsCm-dialog").dialog('close');
    });

};

var $container = $('.graphs').isotope({
	itemSelector: '.pgraph',
	layoutMode: 'masonry',
});
