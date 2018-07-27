// Enemies Class
class Enemy {
    constructor({sprite = "images/enemy-bug.png", x = 0, y = 60, speed = 100} = {}) {
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
        this.x += this.speed * dt; 
        if (this.x > 500) {
            this.x = 0; 
        }
    }

    render() {
    // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Player Class
class Player {
    constructor({sprite = 'images/char-boy.png', x = 200, y = 400, speed = 80} = {}) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;  
    }

    update() {
        // Handles collision 
        for (let enemy of allEnemies) {
            // console.log(enemy); 
            if (this.x >= enemy.x-40 && this.x <= enemy.x+40
                && this.y >= enemy.y-40 && this.y <= enemy.y+40) {
                console.log(this.x, this.y);
                console.log(enemy.x, enemy.y); 
                console.log("COLLIDED"); 
                this.reset(); 
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {
        this.x = 200;
        this.y = 400;
        this.speed = 80; 
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
            this.speed = 80; 
        }

        // If the player reaches the water the game should be reset by 
        // moving the player back to the initial location
        if (this.y <= -50) {
            this.reset();
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// const allEnemies = [new Enemy({y:150}), new Enemy({y:220, speed:70})]; 
var enemySource = [new Enemy(), new Enemy({speed:220}), new Enemy({speed: 450}),  
                    new Enemy({y:140}), new Enemy({y:140, speed:60}), new Enemy({y:140, speed:160}),
                    new Enemy({y:220}), new Enemy({y:220, speed:40}), new Enemy({y:220, speed:400})]; 

function generateEnemies(arrSource, neededElements) {
    // select a certain number of enemies, randomely selected from the source
    var result = [];
    for (var i = 0; i < neededElements; i++) {
        result.push(arrSource[Math.floor(Math.random() * arrSource.length)]);
    }
    return result;
}

var allEnemies = generateEnemies(enemySource, 4); 

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
