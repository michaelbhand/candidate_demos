(function() {

	var windowWidth = window.innerWidth,
		windowHeight = window.innerHeight;

	function Wanderer(x, y) {
		this.x = x;
		this.y = y;
		this.opacity = 1;
		this.live = 1;
		this.goalX = getRandomPoint(windowWidth);
		this.goalY = getRandomPoint(windowHeight);
		this.domElement = document.createElement("div");
		this.domElement.style.position = "absolute";
		this.domElement.style.top = y + "px";
		this.domElement.style.left = x + "px";
		this.domElement.style.width = "32px";
		this.domElement.style.height = "24px";
		this.domElement.style.background = "url(x_wing_2.png)";
		this.domElement.style.zIndex = "3000";
		// this.domElement.style.border = "solid 1px #f00";
		this.pointAtGoal();
		document.body.appendChild(this.domElement);
	}

	Wanderer.prototype.update = function() {
		var moveXAmount, moveYAmount;
		moveXAmount = (this.x - this.goalX)/50;
		moveYAmount = (this.y - this.goalY)/50;
		this.x -= moveXAmount;
		this.y -= moveYAmount;
		this.domElement.style.left = this.x + "px";
		this.domElement.style.top = this.y + "px";
		if(moveYAmount < 1 && moveXAmount < 1) {
			this.goalY = getRandomPoint(windowHeight);
			this.goalX = getRandomPoint(windowWidth);
			this.pointAtGoal();
		}
	};


	Wanderer.prototype.pointAtGoal = function() {
		var diffx, diffy;
		diffx = this.x - this.goalX;
		diffy = this.y - this.goalY;
		this.domElement.style.webkitTransform = 'rotate(' + Math.floor(Math.atan2(diffy , diffx) * (180/Math.PI)) + 'deg)';
	};


	function Follower(x, y, targetWanderer) {
		this.x = x;
		this.y = y;
		this.opacity = 1;
		this.live = 1;
		this.target = targetWanderer;
		this.speed = getRandomPoint(10);
		this.seed = Math.random() < 0.5 ? 1 : -1;
		this.domElement = document.createElement("div");
		this.domElement.style.position = "absolute";
		this.domElement.style.top = y + "px";
		this.domElement.style.left = x + "px";
		this.domElement.style.width = "32px";
		this.domElement.style.height = "24px";
		this.domElement.style.background = "url(mini_ty_2.png)";
		this.domElement.style.borderRadius = "5px";
		this.domElement.style.opacity = "1";
		document.body.appendChild(this.domElement);
	}

	Follower.prototype.distanceToTarget = function() {
		return (Math.sqrt(Math.pow(this.target.x - this.x, 2) +
						  Math.pow(this.target.y - this.y, 2)));
	};

	Follower.prototype.pointAtGoal = function() {
		var diffx, diffy;
		diffx = this.x - this.target.x;
		diffy = this.y - this.target.y;
		this.domElement.style.webkitTransform = 'rotate(' + Math.floor(Math.atan2(diffy , diffx) * (180/Math.PI)) + 'deg)';
	};

	Follower.prototype.relocate = function(){
		this.x = getRandomPoint(windowWidth);
		this.y = getRandomPoint(windowHeight);
		this.seed = Math.random() < 0.1 ? 1 : -1;
	};

	Follower.prototype.fade = function(){
		this.opacity -= 0.02;
		this.domElement.style.opacity = this.opacity;
		if(this.opacity <= 0.1){
			// this.parentNode.removeChild(this);
			document.body.removeChild(this.domElement);
		}
	};

	Follower.prototype.explode = function(){
		this.domElement.style.background = "url(explode.png)";
		this.seed = 0;
		this.live = 0;
	};

	Follower.prototype.update = function() {
		var moveXAmount, moveYAmount,
			distanceToTarget = this.distanceToTarget();
		if(this.opacity > 0 && !this.live){
			this.fade();
		}
		if(distanceToTarget < 800) {
			moveXAmount = ((this.x - this.target.x)/500) * this.speed;
			moveYAmount = ((this.y - this.target.y)/500) * this.speed;
			this.x += moveXAmount * this.seed;
			this.y += moveYAmount * this.seed;
			this.domElement.style.left = this.x + "px";
			this.domElement.style.top = this.y + "px";
			this.pointAtGoal();

			if(this.x <= 0 || this.x >= windowWidth || this.y <= 0 || this.y >= windowHeight ){
				this.relocate();
			}

			if (distanceToTarget < 100) {
			    this.explode();
			}
		}
	};

	function getRandomPoint(max) {
		return Math.ceil(Math.random() * max);
	}

	function createWanderersWithFollowers(wCount, fCount) {
		var actors = [],
			wanderer;
		while(wCount--) {
			wanderer = new Wanderer(parseInt(windowWidth/2), parseInt(windowHeight/2));
			actors.push(wanderer);
			actors = actors.concat(createFollowers(fCount, wanderer));
		}

		return actors;
	}

	var actors = createWanderersWithFollowers(20, 50);

	function createFollowers(numToCreate, targetWanderer) {
		var followers = [], x, y;
		for(var i = numToCreate; i--;) {
			x = getRandomPoint(windowWidth);
			y = getRandomPoint(windowHeight);
			followers.push(new Follower(x, y, targetWanderer));
		}
		return followers;
	}

	function update() {
		for(var i = 0, l = actors.length; i < l; i++) {
			// actors[i].update();
			if(actors[i].opacity > 0.1){
				actors[i].update();			
			}
		}
		setTimeout(update, 10);
	}

	update();

})();