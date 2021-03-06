function getRandomPoint(max) {
    return Math.ceil(Math.random() * max);
}


(function() {
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        actors, deathStar;

    function DeathStar() {
        this.opacity = 1;
        this.live = 1;
        this.directionX = getRandomPoint(10) / 100;
        this.directionY = getRandomPoint(10) / 100;
        this.width = "1024px";
        this.height = "1024px";
        this.domElement = document.createElement("div");
        this.domElement.style.position = "absolute";
        this.domElement.style.width = this.width;
        this.domElement.style.height = this.height;
        this.x = Math.floor(windowWidth / 2) - 512;
        this.y = Math.floor(windowHeight / 2) - 512;

        this.domElement.style.top = this.y + "px";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.background = "url(Death_Star.png)";
        this.domElement.style.zIndex = "0";
        this.domElement.style.opacity = this.opacity;
        this.domElement.style.webkitTransformOrigin = "50% 50%";
        document.body.appendChild(this.domElement);
    };

    DeathStar.prototype.fade = function() {
        var rad2deg = 180 / Math.PI;
        this.opacity -= 0.01;
        this.domElement.style.opacity = this.opacity;
        this.domElement.style.webkitTransformOrigin = "50% 50%";
        this.domElement.style.webkitTransform = 'scale(' + (1.0 + 1 - this.opacity) + ') rotate(' + (1 - this.opacity) * 20 + 'deg)';
    };

    DeathStar.prototype.update = function() {
        this.x += this.directionX;
        this.y += this.directionY;
        this.domElement.style.top = this.y + "px";
        this.domElement.style.left = this.x + "px";

    };

    deathStar = new DeathStar();

    function Wanderer(x, y) {
        this.x = x;
        this.y = y;
        this.opacity = 1;
        this.live = 1;
        this.goalX = getRandomPoint(windowWidth);
        this.goalY = getRandomPoint(windowHeight);
        this.scale = Math.max(0.2, getRandomPoint(100) / 100);

        // Sounds
        this.embed_element = document.createElement('embed');
        this.embed_element.src = 'Laser_Sound_Effect.mp3';
        this.embed_element.hidden = true;
        this.embed_element.autostart = true;
        this.embed_element.loop = false;
        this.domElement = document.createElement("div");
        this.domElement.style.position = "absolute";
        this.domElement.style.top = y + "px";
        this.domElement.style.left = x + "px";
        this.domElement.style.width = "100px";
        this.domElement.style.height = "70px";
        this.domElement.style.background = "url(x_wing_medium.png)";
        this.domElement.style.zIndex = Math.ceil(this.scale * 100);
        this.blasterElement = document.createElement("div");
        this.blasterElement.style.borderTop = "solid 1px #0f0";
        this.blasterElement.style.borderBottom = "solid 1px #0f0";
        this.blasterElement.style.height = "70px";
        this.blasterElement.style.width = "40px";
        this.blasterElement.style.position = "relative";
        this.blasterElement.style.top = "5px";
        this.blasterElement.style.left = "-20px";
        this.blasterElement.style.webkitTransform = 'rotate(-15deg) skew(10deg,10deg)';
        this.domElement.appendChild(this.blasterElement);
        this.pointAtGoal();
        document.body.appendChild(this.domElement);
    }

    Wanderer.prototype.update = function() {
        this.pointAtGoal();
        if (this.live) {
            this.move();
        } else {
            if (this.opacity > 0 && !this.live) {
                this.fade();
            }
        }
    };

    Wanderer.prototype.move = function() {
        var moveXAmount = (this.x - this.goalX) * 0.02,
            moveYAmount = (this.y - this.goalY) * 0.02;
        this.x -= moveXAmount;
        this.y -= moveYAmount;
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";
        this.blasterElement.style.borderBottomWidth = Math.random() < 0.5 ? "1px" : "0";
        this.blasterElement.style.borderTopWidth = Math.random() < 0.5 ? "1px" : "0";
        if (Math.abs(this.distanceToTarget()) < 20) {
            this.updateGoal();
        }
    };

    Wanderer.prototype.distanceToTarget = function() {
        return (Math.sqrt(Math.pow(this.goalX - this.x, 2) +
            Math.pow(this.goalY - this.y, 2)));
    };

    Wanderer.prototype.updateGoal = function() {
        this.goalY = getRandomPoint(windowHeight);
        this.goalX = getRandomPoint(windowWidth);
    };

    function Destroyer() {
        this.width = 1847;
        this.height = 462;
        this.opacity = 1;
        this.x = windowWidth;
        this.y = getRandomPoint(windowHeight - this.height);
        this.domElement = document.createElement("div");
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.zIndex = "50";
        this.domElement.style.opacity = "1";
        this.domElement.style.background = "url(Imperial_I-Class_HD.png)";
        this.domElement.style.webkitTransformOrigin = "75% 50%";
        document.body.appendChild(this.domElement);
    }

    Destroyer.prototype.reset = function() {
        this.y = getRandomPoint(windowHeight - this.height);
        this.x = windowWidth;
        this.domElement.style.top = this.y + "px";
    };

    Destroyer.prototype.update = function() {
        if (this.x > this.width * -1) {
            this.x -= 1;
        } else {
            this.reset();
        }
        this.domElement.style.left = this.x + "px";
    };

    Destroyer.prototype.fade = function() {
        var rad2deg = 180 / Math.PI;
        this.opacity -= 0.01;
        this.domElement.style.opacity = this.opacity;
        this.domElement.style.webkitTransformOrigin = "75% 50%";
        this.domElement.style.webkitTransform = 'scale(' + this.opacity + ') rotate(' + (1 - this.opacity) * -1 * 20 + 'deg)';
    };

    Wanderer.prototype.pointAtGoal = (function() {
        var rad2deg = 180 / Math.PI;
        return function() {
            var diffx, diffy;
            diffx = Math.round(this.x - this.goalX);
            diffy = Math.round(this.y - this.goalY);
            this.domElement.style.webkitTransform = 'scale(' + this.scale + ') rotate(' + Math.floor(memoizedAtan2(diffy, diffx) * rad2deg) + 'deg)';
        };
    })();

    var memoizedAtan2 = (function() {
        var cache = {};
        return function(a, b) {
            var hash = "" + a + ":" + b;
            if (cache[hash]) {
                return cache[hash];
            } else {
                return cache[hash] = Math.atan2(a, b);
            }
        };
    })();

    Wanderer.prototype.explode = function() {
        this.blasterOff();
        this.domElement.style.background = "url(explode_medium.png)";
        this.seed = 0;
        this.live = 0;
    };

    Wanderer.prototype.blasterOff = function() {
        this.blasterElement.style.display = 'none';
    };

    Wanderer.prototype.fade = function() {
        this.opacity -= 0.02;
        this.domElement.style.opacity = this.opacity;
        this.domElement.style.webkitTransformOrigin = "50% 50%";
        this.domElement.style.webkitTransform = 'scale(' + (1.0 + 1 - this.opacity) + ') rotate(' + (1 - this.opacity) * 20 + 'deg)';
        if (this.opacity <= 0.1 && this.domElement.parentNode !== null) {
            document.body.removeChild(this.domElement);
        }
    };


    function Follower(x, y, targetWanderer) {
        this.x = x;
        this.y = y;
        this.opacity = 1;
        this.scale = 0.1;
        this.live = 1;
        this.target = targetWanderer;
        this.speed = getRandomPoint(10);
        this.seed = Math.random() < 0.5 ? 1 : -1;
        this.domElement = document.createElement("div");
        this.domElement.style.position = "absolute";
        this.domElement.style.top = y + "px";
        this.domElement.style.left = x + "px";
        this.domElement.style.width = "100px";
        this.domElement.style.height = "85px";
        this.domElement.style.background = "url(tie_fighter_medium.png)";
        this.domElement.style.borderRadius = "5px";
        this.domElement.style.opacity = "1";
        this.domElement.style.webkitTransform = 'scale(' + this.scale + ')';
        this.blasterElement = document.createElement("div");
        this.blasterElement.style.borderTop = "solid 1px #f00";
        this.blasterElement.style.borderBottom = "solid 1px #f00";
        this.blasterElement.style.height = "5px";
        this.blasterElement.style.width = "30px";
        this.blasterElement.style.position = "relative";
        this.blasterElement.style.top = "45px";
        this.blasterElement.style.left = "-30px";
        this.blasterElement.style.webkitTransform = 'skew(60deg,0)';
        this.domElement.appendChild(this.blasterElement);
        document.body.appendChild(this.domElement);
    }

    Follower.prototype.distanceToTarget = function() {
        return (Math.sqrt(Math.pow(this.target.x - this.x, 2) +
            Math.pow(this.target.y - this.y, 2)));
    };

    Follower.prototype.pointAtGoal = (function() {
        var rad2deg = 180 / Math.PI;
        return function() {
            var diffx, diffy;
            var distanceToTarget = this.distanceToTarget();
            diffx = Math.round(this.x - this.target.x);
            diffy = Math.round(this.y - this.target.y);
            this.domElement.style.webkitTransform = 'scale(' + 100 / distanceToTarget + ') rotate(' + Math.floor(memoizedAtan2(diffy, diffx) * rad2deg) + 'deg)';
        };
    })();

    Follower.prototype.relocate = function() {
        this.x = getRandomPoint(windowWidth);
        this.y = getRandomPoint(windowHeight);
        this.seed = Math.random() < 0.1 ? 1 : -1;
    };

    Follower.prototype.fade = function() {
        var rad2deg = 180 / Math.PI;
        this.opacity -= 0.02;
        this.domElement.style.opacity = this.opacity;

        diffx = Math.round(this.x - this.target.x);
        diffy = Math.round(this.y - this.target.y);
        this.domElement.style.webkitTransform = 'scale(' + (1.0 + 1 - this.opacity) + ') rotate(' + Math.floor(memoizedAtan2(diffy, diffx) * rad2deg) + 'deg)';
        if (this.opacity <= 0.1 && this.domElement.parentNode !== null) {
            document.body.removeChild(this.domElement);
        }
    };

    Follower.prototype.blasterOff = function() {
        this.blasterElement.style.display = 'none';
        this.target.blasterElement.style.display = 'none';
    };

    Follower.prototype.blasterFire = function() {
        this.blasterElement.style.display = 'block';
        this.target.blasterElement.style.display = 'block';
        this.blasterElement.style.borderBottomWidth = Math.random() < 0.5 ? "1px" : "0";
        this.blasterElement.style.borderTopWidth = Math.random() < 0.5 ? "1px" : "0";
    };

    Follower.prototype.explode = function() {
        this.blasterOff();
        this.domElement.style.background = "url(explode_medium.png)";
        this.seed = 0;
        this.live = 0;
    };

    Follower.prototype.update = function() {
        var distanceToTarget = this.distanceToTarget();

        if (this.opacity > 0 && !this.live) {
            this.fade();
        }

        if (distanceToTarget < 800) {
            this.moveTowardTarget();

            if (distanceToTarget < 100) {
                this.explode();
            }

            if (this.live) {
                this.pointAtGoal();
                if (this.seed < 0) {
                    this.blasterFire();
                } else {
                    this.blasterOff();
                }
            }
        } else {
            this.blasterOff();
        }
    };

    Follower.prototype.moveTowardTarget = function() {
        var moveXAmount = ((this.x - this.target.x) * 0.002) * this.speed,
            moveYAmount = ((this.y - this.target.y) * 0.002) * this.speed;

        this.x += moveXAmount * this.seed;
        this.y += moveYAmount * this.seed;
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";

        if (this.x <= 0 || this.x >= windowWidth || this.y <= 0 || this.y >= windowHeight) {
            this.relocate();
        }
    };

    function createWanderersWithFollowers(wCount, fCount) {
        var actors = [],
            wanderer,
            spawnX = parseInt(windowWidth * 0.5, 10),
            spawnY = parseInt(windowWidth * 0.5, 10);

        while (wCount--) {
            wanderer = new Wanderer(spawnX, spawnY);
            actors.push(wanderer);
            actors = actors.concat(createFollowers(fCount, wanderer));
        }

        return actors;
    }


    var destroyer = new Destroyer();

    function createFollowers(numToCreate, targetWanderer) {
        var followers = [],
            x, y;
        for (var i = numToCreate; i--;) {
            x = getRandomPoint(windowWidth);
            y = getRandomPoint(windowHeight);
            followers.push(new Follower(x, y, targetWanderer));
        }
        return followers;
    }

    function update() {
        destroyer.update();
        deathStar.update();
        var followersAlive = false;
        for (var i = 0, l = actors.length; i < l; i++) {
            if (actors[i] && actors[i].opacity > 0.1) {
                actors[i].update();
                if (actors[i] instanceof Follower) followersAlive = true;
            } else {
                delete actors[i];
            }
        }
        if (!followersAlive) {
            cleanUpActors();
            targetDeathStar();
            setTimeout(endGameUpdate, 10);
        } else {
            setTimeout(update, 10);
        }
    }



    function cleanUpActors() {
        var filteredActors = [];
        for (var i = 0, l = actors.length; i < l; i++) {
            if (actors[i]) {
                filteredActors.push(actors[i]);
            }
        }
        actors = filteredActors;
    }

    function targetDeathStar() {
        for (var i = 0, l = actors.length; i < l; i++) {
            actors[i].blasterElement.style.display = 'block';
            actors[i].goalX = getRandomPoint(600) + 700;
            actors[i].goalY = getRandomPoint(250) + 400;
            actors[i].pointAtGoal();
        }

        Wanderer.prototype.updateGoal = function() {
            var expl = document.createElement("div");
            expl.style.background = "url(explode_medium.png)";
            expl.style.width = "100px";
            expl.style.height = "100px";
            expl.style.position = "absolute";
            expl.style.top = this.y - deathStar.y;
            expl.style.left = this.x - deathStar.x;
            expl.style.opacity = '0.8';

            deathStar.domElement.appendChild(expl);

            this.goalX = deathStar.x + getRandomPoint(512) + 256;
            this.goalY = deathStar.y + getRandomPoint(512) + 256;
            this.pointAtGoal();
        };
    }

    function flyAway() {
        var flightDirection = 0,
            x, y;
        for (var i = 0, l = actors.length; i < l; i++) {
            flightDirection = Math.random();

            if (flightDirection < 0.25) {
                actors[i].goalX = getRandomPoint(windowWidth);
                actors[i].goalY = -100;
            } else if (flightDirection >= 0.25 && flightDirection < 0.5) {
                actors[i].goalX = -100;
                actors[i].goalY = getRandomPoint(windowHeight);
            } else if (flightDirection >= 0.5 && flightDirection < 0.75) {
                actors[i].goalX = getRandomPoint(windowWidth);
                actors[i].goalY = windowHeight + 100;
            } else {
                actors[i].goalX = windowWidth + 100;
                actors[i].goalY = getRandomPoint(windowHeight);
            }

            actors[i].pointAtGoal();
        }

        Wanderer.prototype.updateGoal = function() {}; //Don't move once offscreen
    }

    var Explosion = (function() {
        var img = document.createElement("img"),
            top = Math.floor(deathStar.y),
            left = Math.floor(deathStar.x),
            opacity = 1;
        img.src = "Space_Explosion.png";
        img.width = 1536;
        img.height = 1152;
        img.style.position = "absolute";
        img.style.top = top + "px";
        img.style.left = left + "px";
        img.style.zIndex = "5000";

        return {
            show: function() {
                document.body.appendChild(img);
            },
            grow: function() {
                destroyer.fade();
                deathStar.fade();
                img.width += 10;
                img.height += 10;
                top -= 5;
                left -= 5;
                img.style.top = "" + top + "px";
                img.style.left = "" + left + "px";
            },
            fade: function() {
                opacity -= 0.01;
                img.style.opacity = opacity;
                // Fade Ex
                Wanderer.prototype.updateGoal = function() {}
            },
            remove: function() {
                document.body.removeChild(img);
            }

        };
    })();

    function updateActors() {
        for (var i = 0, l = actors.length; i < l; i++) {
            actors[i].update();
        }
    }

    var endGameUpdate = (function() {
        var tick = 0;
        return function() {
            tick++;
            if (tick < 500) {
                updateActors();
            } else if (tick === 500) {
                flyAway();
                updateActors();
                Explosion.show();
            } else if (tick > 500 && tick < 700) {
                updateActors();
                Explosion.grow();
            } else if (tick === 700) {
                document.body.style.background = "url(star_chase_bg_empty.png)";
                document.body.innerHTML = "";
                Explosion.show();
            } else if (tick > 700 && tick < 1400) {
                Explosion.grow();
                if (tick % 2 === 0) {
                    Explosion.fade();
                }
            } else if (tick > 1400) {
                Explosion.remove();
                credits();
                return;
            }
            setTimeout(endGameUpdate, 10);
        };
    })();

    var credits = (function() {
        var tick = 0,
            creditImage = document.createElement("img"),
            top = windowHeight + 200,
            left = windowWidth * 0.5 - 488;

        creditImage.src = "theend.png";
        creditImage.style.position = "absolute";
        creditImage.width = 976;
        creditImage.height = 194;
        creditImage.style.top = top + "px";
        creditImage.style.left = left + "px";

        return function() {
            if (tick === 0) {
                document.body.appendChild(creditImage);
                tick++;
            }

            top--;
            creditImage.style.top = top + "px";

            if (((top + creditImage.height / 2) - windowHeight / 2) < 5) return;

            setTimeout(credits, 10);
        };
    })();

    actors = createWanderersWithFollowers(30, 2);
    update();
})();