var wanderA = [];

(function() {
	var windowWidth = window.innerWidth,
		windowHeight = window.innerHeight;

	var makeTrail = function(x,y,w,g,z){
	    var t = document.createElement('div');
	    t.className = 'trail';
	    t.style.left = x - Math.floor(w/2) + 'px';
	    t.style.top = y - Math.floor(w/2) + 'px';
	    t.style.width = w + 'px';
	    t.style.height = w + 'px';
	    t.style.borderRadius = w + "px";
	    t.style.background= g;
	    t.style.opacity = 0.9;
	    t.style.zIndex = z - 1;

		setTimeout(function(){ t.style.opacity = 0; },1);
	    document.body.appendChild(t);
	    setTimeout(function(){ document.body.removeChild(t)},3000);
	};

	function Wanderer(x, y) {
		this.x = x;
		this.y = y;
		this.size = getRandomPoint(100);
		this.goalX = getRandomPoint(windowWidth);
		this.goalY = getRandomPoint(windowHeight);
		this.turn = (getRandomPoint(4) > 2) ? -1 : 1;
		this.directionX = 1;
		this.directionY = -1;
		this.moveXAmount = 0;
		this.moveYAmount = 0;
		this.timeBlock = getRandomPoint(500);
		this.domElement = document.createElement("div");
		this.domElement.style.position = "absolute";
		this.domElement.style.top = y - Math.floor(this.size/2) + "px";
		this.domElement.style.left = x - Math.floor(this.size/2) + "px";
		this.domElement.style.width = this.size + "px";
		this.domElement.style.height = this.size + "px";
		this.domElement.style.borderRadius = this.size + "px";
		this.domElement.style.background = "#f00";
		this.domElement.style.zIndex = Math.ceil(this.size);
        this.domElement.style.backgroundImage = "-webkit-radial-gradient(25% 25%,farthest-corner, " + randomColor() + ", " + randomColor() + ")";

        // wanderA[0].domElement.style.webkitTransition = "top 1s ease-in-out, left 1s ease-in-out";

		this.domElement.className = 'wander';
		document.body.appendChild(this.domElement);
	}

	Wanderer.prototype.update = function() {
		makeTrail(this.x + this.moveXAmount,this.y + this.moveYAmount,this.size,this.domElement.style.background,Math.ceil(this.size));
		this.domElement.style.left = this.x  - Math.floor(this.size/2) + "px";
		this.domElement.style.top = this.y  - Math.floor(this.size/2) + "px";
		this.directionX *= (getRandomPoint(4) > 2) ? -1 : 1;
		this.directionY *= (getRandomPoint(4) > 2) ? -1 : 1;
		this.moveXAmount = getRandomPoint(100) * this.directionX;
		this.moveYAmount = getRandomPoint(100) * this.directionY;

		// // How do we get the Wandere to stay here.
		// if (Math.abs(this.x + this.moveXAmount) < (windowWidth * 0.25 ) || Math.abs(this.x + this.moveXAmount) > (windowWidth * 0.75 )) {
		// 	this.moveXAmount = (this.x - (windowWidth / 2 )) / 10;
		// }

		// if (Math.abs(this.y + this.moveYAmount) < (windowHeight * 0.25 ) || Math.abs(this.y + this.moveYAmount) > (windowHeight * 0.75 )) {
		// 	this.moveYAmount = (this.y - (windowHeight / 2 )) / 10;
		// }

		if (distanceFromCenter(this.x + this.moveXAmount,this.y + this.moveYAmount) > windowHeight * 0.75) {
			console.log();
			this.moveXAmount = (this.x - (windowWidth / 2 )) / 10;
			this.moveYAmount = (this.y - (windowHeight / 2 )) / 10;
		}



		if(this.turn > 0){
			this.moveXAmount = 0;
		} else {
			this.moveYAmount = 0;
		}

		this.x -= this.moveXAmount;	
		this.y -= this.moveYAmount;

		this.turn *= -1;
	};

	function distanceFromCenter(x,y) {
		return (Math.sqrt(Math.pow(windowWidth/2 - x, 2) +
						  Math.pow(windowHeight/2 - y, 2)));
	};

	function getRandomPoint(max) {
		return Math.ceil(Math.random() * max);
	};

    var randomColor = function() {
        return 'rgb(' + getRandomPoint(255) + ',' + getRandomPoint(255) + ',' + getRandomPoint(255) + ')';
        function getColor() {
            return Math.floor(Math.random() * 256);
        }
    };


    var actorCount = 112;
    document.body.style.backgroundImage = "-webkit-radial-gradient(25% 25%,farthest-corner, " + randomColor() + ", " + randomColor() + ")";

    for(var i = 0; i < actorCount; i++){
		wanderA[i] = new Wanderer(parseInt(windowWidth/2), parseInt(windowHeight/2));
    }

	function update() {
	    for(var i = 0; i < actorCount; i++){
			wanderA[i].update();
	    }
		// setTimeout(update, getRandomPoint(200) + 50);
		setTimeout(update, 1000);
		// setTimeout(update, getRandomPoint(1000) + 1000);
	}

	update();

})();