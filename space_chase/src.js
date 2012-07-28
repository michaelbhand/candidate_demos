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
		this.blasterElement = document.createElement("div");
		this.blasterElement.style.borderTop = "solid 1px #0f0";
		this.blasterElement.style.borderBottom = "solid 1px #0f0";
		this.blasterElement.style.height = "20";
		this.blasterElement.style.width = "20px";
		this.blasterElement.style.position = "relative";
		this.blasterElement.style.top = "10px";
		this.blasterElement.style.left = "-25px";
		// this.blasterElement.style.opacity = "0";
		this.blasterElement.style.webkitTransform = 'rotate(-15deg)';
		this.domElement.appendChild(this.blasterElement);
		// this.domElement.style.border = "solid 1px #f00";
		this.pointAtGoal();
		document.body.appendChild(this.domElement);
	}

	Wanderer.prototype.update = function() {
		if(this.live) {
			var moveXAmount, moveYAmount,
			moveXAmount = (this.x - this.goalX)/50;
			moveYAmount = (this.y - this.goalY)/50;
			this.x -= moveXAmount;
			this.y -= moveYAmount;
			this.domElement.style.left = this.x + "px";
			this.domElement.style.top = this.y + "px";
			this.blasterElement.style.borderBottomWidth = Math.random() < 0.5 ? "1px" : "0";
			this.blasterElement.style.borderTopWidth = Math.random() < 0.5 ? "1px" : "0";
			if(Math.abs(this.distanceToTarget()) < 20) {
				this.updateGoal();
			}
		} else {
			if(this.opacity > 0 && !this.live){
				this.fade();
			}
		}
	};

	Wanderer.prototype.distanceToTarget = function() {
		return (Math.sqrt(Math.pow(this.goalX - this.x, 2) +
						  Math.pow(this.goalY - this.y, 2)));
	};

	Wanderer.prototype.updateGoal = function() {
		this.goalY = getRandomPoint(windowHeight);
		this.goalX = getRandomPoint(windowWidth);
		this.pointAtGoal();
	};


	Wanderer.prototype.pointAtGoal = function() {
		var diffx, diffy;
		diffx = this.x - this.goalX;
		diffy = this.y - this.goalY;
		this.domElement.style.webkitTransform = 'rotate(' + Math.floor(Math.atan2(diffy , diffx) * (180/Math.PI)) + 'deg)';
	};

	Wanderer.prototype.explode = function(){
		this.blasterOff();
		this.domElement.style.background = "url(explode.png)";
		this.seed = 0;
		this.live = 0;
	};

	Wanderer.prototype.blasterOff = function(){
		this.blasterElement.style.display = 'none';
	};

	Wanderer.prototype.fade = function(){
		this.opacity -= 0.02;
		this.domElement.style.opacity = this.opacity;
		if(this.opacity <= 0.1 && this.domElement.parentNode !== null){
			// this.parentNode.removeChild(this);
			document.body.removeChild(this.domElement);
		}
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

		this.blasterElement = document.createElement("div");
		this.blasterElement.style.borderTop = "solid 1px #f00";
		this.blasterElement.style.borderBottom = "solid 1px #f00";
		this.blasterElement.style.height = "5px";
		this.blasterElement.style.width = "10px";
		this.blasterElement.style.position = "relative";
		this.blasterElement.style.top = "8px";
		this.blasterElement.style.left = "-15px";
		// this.blasterElement.style.webkitTransform = 'rotate(-15deg)';
		this.domElement.appendChild(this.blasterElement);

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
		if(this.opacity <= 0.1 && this.domElement.parentNode !== null){
			// this.parentNode.removeChild(this);
			document.body.removeChild(this.domElement);
		}
	};

	Follower.prototype.blasterOff = function(){
		this.blasterElement.style.display = 'none';
	};

	Follower.prototype.blasterFire = function(){
		this.blasterElement.style.display = 'block';
		this.blasterElement.style.borderBottomWidth = Math.random() < 0.5 ? "1px" : "0";
		this.blasterElement.style.borderTopWidth = Math.random() < 0.5 ? "1px" : "0";
	};



	Follower.prototype.explode = function(){
		this.blasterOff();
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

			if(this.x <= 0 || this.x >= windowWidth || this.y <= 0 || this.y >= windowHeight ){
				this.relocate();
			}

			if (distanceToTarget < 100) {
			    this.explode();
			}

		if(this.live){
			this.pointAtGoal();
			this.blasterFire();
		}

		} else {
			this.blasterOff();
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
		var followersAlive = false,
			lastActor;
		for(var i = 0, l = actors.length; i < l; i++) {
			if(actors[i] && actors[i].opacity > 0.1 ){
				actors[i].update();
				if(actors[i] instanceof Follower) followersAlive = true;
			} else {
				delete actors[i];
			}
		}
		if(!followersAlive) {
			for(var i = 0, l = actors.length; i < l; i++) {
				if(!actors[i]) {
					actors.splice(i, 1);
					l--;
					i--;
				}
			}
			for(var i = 0, l = actors.length; i < l; i++) {
				actors[i].goalX = getRandomPoint(600) + 700;
				actors[i].goalY = getRandomPoint(250) + 400;
				actors[i].pointAtGoal();
			}

			Wanderer.prototype.updateGoal = function() {
				var explosion = document.createElement("div");
				explosion.style.background = "url(explode.png)";
				explosion.style.width = "32px";
				explosion.style.height = "24px";
				explosion.style.position = "absolute";
				explosion.style.top = this.y;
				explosion.style.left = this.x;
				document.body.appendChild(explosion);

				this.goalX = getRandomPoint(600) + 700;
				this.goalY = getRandomPoint(250) + 400;
				this.pointAtGoal();
			};
			
			setTimeout(endGameUpdate, 10);
		} else {
			setTimeout(update, 10);
		}
	}

	Explosion = (function() {
		var img = document.createElement("img"),
			top = 700,
			left = 1100,
			opacity = 1;
			
		img.src = "explosion.png";
		img.width = 0;
		img.height = 0;
		img.style.position = "absolute";
		img.style.top = "" + top + "px";
		img.style.left = ""+ left + "px";
		img.style.display = "none";
		img.style.zIndex = "5000";

		

		return {
			show: function() {
				img.style.display = "block";
				document.body.appendChild(img);
			},
			grow: function() {
				img.width += 6;
				img.height += 6;
				top -= 3;
				left -= 3;
				img.style.top = "" + top + "px";
				img.style.left = "" + left + "px";
			},
			fade: function() {
				opacity -= 0.01;
				img.style.opacity = opacity;
			}
		};
	})();

	var tick = 0;
	function endGameUpdate() {
		tick++;
		if(tick < 500) {
			updateActors();
		} else if(tick === 500) {
			updateActors();
			Explosion.show();
		} else if (tick > 500 && tick < 900) {
			updateActors();
			Explosion.grow();
		} else if (tick === 900) {
			document.body.style.background = "url(star_chase_bg_empty.png)";
			document.body.innerHTML = "";
			Explosion.show();
		} else if (tick > 900 && tick < 2000) {
			if(tick % 2 === 0) Explosion.fade();
		} else if (tick > 2000) {
			return;
		}
		setTimeout(endGameUpdate, 10);
	}

	function updateActors() {
		for(var i = 0, l = actors.length; i < l; i++) {
			actors[i].update();
		}
	}

	update();
})();