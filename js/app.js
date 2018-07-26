// Enemies Class
class Enemy {
    constructor({sprite = "images/enemy-bug.png", x = 0, y = 60, speed = 150} = {}) {
        // load an enemy image
        this.sprite = sprite;

        // Setting the Enemy initial location
        this.x = x;
        this.y = y; 

        // Setting the Enemy speed 
        this.speed = speed;
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
        // if (this.x === Player.x) {
        //     console.log("COLLIDED");
        // }
    }

    render() {
    // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Player Class
class Player {
    constructor({sprite = 'images/char-boy.png', x = 200, y = 400, speed = 100} = {}) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;  
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {
        this.x = 200;
        this.y = 400;
        this.speed = 100; 
    }

    handleInput(dt) {
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
        if (this.x > 400) {
            this.speed = 0; 
            this.x = 400; 
        } 
        else if (this.x < 0) {
            this.speed = 0; 
            this.x = 0;
        }
        else if (this.y > 400) {
            this.speed = 0; 
            this.y = 400;
        }
        else {
            this.speed = 100; 
        }

        // If the player reaches the water the game should be reset by 
        // moving the player back to the initial location
        if (this.y <= -10) {
            this.reset();
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// const allEnemies = [new Enemy({y:150}), new Enemy({y:220, speed:70})]; 
var allEnemies = [new Enemy(), new Enemy({y:150, speed:50}), new Enemy({y:240, speed:20})]; 

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
