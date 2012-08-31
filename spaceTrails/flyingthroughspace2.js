
// (function() {

var STARS_PER_ITERTION = 100;

var WARP_SPEED = 0.1;

var getRandomValue = function(lbound, ubound) {
    return window.Math.random() * (ubound - lbound) + lbound;
};

var windowCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

var spawnStar = function() {
    var star = {
        x: getRandomValue(1, window.innerWidth),
        y: getRandomValue(1, window.innerHeight),
        brightness: getRandomValue(0.1, 2),
        // distance: getRandomValue(1, 10),
        element: document.createElement('div')
    };
    star.element.className = 'star';
    document.body.appendChild(star.element);
    return star;
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

        // console.log('move star:', star);

        var xVector = (windowCenter.x - star.x) * WARP_SPEED;
        var yVector = (windowCenter.y - star.y) * WARP_SPEED;

        star.x -= xVector
        star.y -= yVector
        star.brightness += 2 * WARP_SPEED;

        if (!updateStarPosition(star)) {
            star.element.parentNode.removeChild(star.element);
            stars.splice(i, 1);
            // console.log('removing star:', star);
        }
    }

    // Create new stars
    for (var i = 0; i < STARS_PER_ITERTION; i++) {
        star = spawnStar();
        stars.push(star);
        // console.log('new star: ', star);
        updateStarPosition(star);
    }

};

var timer = window.setInterval(function(){
    if (document.body) {
        incrementFrame();
        // console.log('__________')
    }
}, 50);


// })();