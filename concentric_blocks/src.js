var GRIDSIZE = 100;

function distance(origin, point) {
	return Math.sqrt(Math.pow(origin.x - point.x, 2) + Math.pow(origin.y - point.y, 2))
}

var col, row, square, squarePos, squareDist, squareColor24Bit, squareColor;
var windowSize = {
	height: window.innerHeight,
	width: window.innerWidth	
};

var gridSize = {
	height: GRIDSIZE,
	width: GRIDSIZE	
};

var squareSize = {
	height: Math.floor(windowSize.height / gridSize.height),
	width: Math.floor(windowSize.width / gridSize.width)
};

document.firstChild.style.width = "100%";
document.body.style.width = "100%";

var originPosition = {
	x: Math.round(Math.random() * windowSize.width),
	y: Math.round(Math.random() * windowSize.height)
};

var distanceRange = distance({ x: 0, y: 0 }, { x: windowSize.width, y: windowSize.height });
var colorDst = (16777216 / distanceRange);
var colorScale = (Math.sin(colorDst*0.5)+1)*128;

function generate() {
	for (var i = 0; i < gridSize.width * gridSize.height; i++) {
		row = Math.floor(i / gridSize.width);
		col = i % gridSize.width;

		squarePos = {
			x: row * squareSize.width,
			y: col * squareSize.height	
		};
		square = document.createElement("div");
		square.style.width = squareSize.width + "px";
		square.style.height = squareSize.height + "px";
		square.style.margin = "0";
		square.style.padding = "0";
		square.style.position = "absolute";
		square.style.left = squarePos.x + "px";
		square.style.top = squarePos.y + "px";

		squareDist = distance(originPosition, squarePos);
		squareColor24Bit = squareDist * colorScale;

		squareColor = {
			r: Math.floor(squareColor24Bit % 255),
			g: (squareColor24Bit >> 16) % 255,
			b: (squareColor24Bit >> 8) % 255
		};

		square.style.background = "rgb(" + squareColor.r + "," + squareColor.g + "," + squareColor.b + ")";
	
		document.body.appendChild(square);
	}
}

generate();

// document.onclick = function(e){
// 	originPosition = e.screenX;
// 	generate();
// };
