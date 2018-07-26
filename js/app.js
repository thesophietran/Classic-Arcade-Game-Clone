// Enemies our player must avoid
class Enemy {
    constructor() {
        // load an enemy image
        this.sprite = 'images/enemy-bug.png';

        // Setting the Enemy initial location
        this.x = 0;
        this.y = 60; 

        // Setting the Enemy speed 
        this.speed = 150;
    }

    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location
        this.x += (this.speed * dt); 
        if (this.x > 500) {
            this.x = 0; 
        }

    // Handles collision with the Player
    }

    render() {
    // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed = 100; 
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    this.speed = 100; 
}

Player.prototype.handleInput = function(dt) {
    // console.log(dt);

    // move the Player
    switch(event.keyCode) {
        case 37:
            this.x -= this.speed; 
            break; 
        case 38:
            this.y -= this.speed;
            break;
        case 39:
            this.x += this.speed;
            break; 
        case 40:
            this.y += this.speed; 
            break;
    }

    // the player cannot move off screen
    if (this.x >= 400) {
        this.speed = 0; 
        this.x = 399; 
    } 
    else if (this.x <= 0) {
        this.speed = 0; 
        this.x = 1;
    }
    else if (this.y >= 400) {
        this.speed = 0; 
        this.y = 399;
    }
    else {
        this.speed = 100; 
    }

    // If the player reaches the water the game should be reset by 
    // moving the player back to the initial location
    if (this.y <= -10) {
        this.reset();
    }
    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()]; 

var player = new Player(); 

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
