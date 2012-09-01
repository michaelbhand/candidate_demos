
// (function() {

var STARS_PER_ITERTION = 10;

var WARP_SPEED = .5; // should be less than 1

var getRandomValue = function(lbound, ubound) {
    return window.Math.random() * (ubound - lbound) + lbound;
};

var getBrightness = function(star) {
    return Math.sqrt(5 - (1/(( star.distance / 5) + 0.2))) * star.brightness;
};

var windowCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

var spawnStar = function() {
    var star = {
        x: getRandomValue(1, window.innerWidth),
        y: getRandomValue(1, window.innerHeight),
        brightness: getRandomValue(1, 3),
        distance: getRandomValue(0.01, 1),
        element: document.createElement('div')
    };
    star.element.className = 'star';
    document.body.appendChild(star.element);
    return star;
};

var makeTrail = function(x,y,w){
    var t = document.createElement('div');
    t.className = 'trail';
    t.style.left = x + 'px';
    t.style.top = y + 'px';
    t.style.width = w + 'px';
    t.style.height = w + 'px';
    t.style.opacity = 0.9;

    setTimeout(function(){ t.style.opacity = 0; t.style.backgroundColor = '#f00';},1);

    document.body.appendChild(t);
    setTimeout(function(){ document.body.removeChild(t)},2000);
};

var updateStarPosition = function(star) {
    if (star.x < 0 || star.x > window.innerWidth ||
        star.y > window.innerHeight || star.y < 0) {
        // Remove star from field
        return false;
    } else {
        star.element.style.left = star.x + 'px';
        star.element.style.top = star.y + 'px';
        star.element.style.width = star.brightness + 'px';
        star.element.style.height = star.brightness + 'px';
        // makeTrail(star.x,star.y,star.brightness);
        return true;
    }
};

/**
 * Total collection of stars
 */
var stars = [];

var incrementFrame = function() {

    var star;

    // Move existing stars
    // Start from end and move to front, since we might be removing as we go
    for (var i = stars.length - 1; i >= 0; i--) {
        star = stars[i];

        var xVector = (windowCenter.x - star.x) * WARP_SPEED * star.distance;
        var yVector = (windowCenter.y - star.y) * WARP_SPEED * star.distance;

        star.x -= xVector
        star.y -= yVector
            
        star.brightness += (star.distance * 0.1);

        makeTrail(star.x + xVector,star.y + yVector,star.brightness);

        if (!updateStarPosition(star)) {
            star.element.parentNode.removeChild(star.element);
            stars.splice(i, 1);
        }
    }

    // Create new stars
    for (var i = 0; i < STARS_PER_ITERTION; i++) {
        star = spawnStar();
        stars.push(star);
        updateStarPosition(star);
    }

};

window.addEventListener('mousemove', function(e) {
    windowCenter.x = e.screenX
    windowCenter.y = e.screenY;
});

var timer = window.setInterval(function(){
    if (document.body) {
        incrementFrame();
    }
}, 50);


// })();