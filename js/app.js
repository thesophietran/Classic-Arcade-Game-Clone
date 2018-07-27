// gameboard measurements: each column is 101px and each row is 83px 
const oneCol = 101;
const oneRow = 83; 
const padding = 20; // use to center object 

// Enemies the Player must avoid
class Enemy {
    constructor({sprite = "images/enemy-bug.png", x = -oneCol, y = oneRow, speed = 100} = {}) {
        // load an enemy image
        this.sprite = sprite;
        // Setting the Enemy initial location
        this.x = x;
        this.y = y - padding; 
        // Setting the Enemy speed 
        this.speed = speed;
    }

    update(dt) {
    // Updates the Enemy location
    // multiply any movement by the dt parameter to ensure the game runs at the same speed for all computers.
        if (this.x > oneCol * 5) {
        // when the bug runs off canvas, set it to the start position 
            this.x = 0; 
        } 
        else {
        // otherwise, runs at the normal set speed
            this.x += this.speed * dt; 
        }
    }

    render() {
    // Draw the enemy on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// The Player
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = oneCol * 2;
        this.y = oneRow * 5 - padding; 
        this.win = false; 
    }

    update() {
        // Handles collision with the enemies 
        for (let enemy of allEnemies) {
            if (this.x >= enemy.x-oneCol/2 && this.x <= enemy.x+oneCol/2
                && this.y === enemy.y) {
                // console.log(this.x, this.y);
                // console.log(enemy.x, enemy.y); 
                // console.log("COLLIDED"); 
                this.reset(); 
            }
        }

        // Handles diamond acquisiton 
        for (let collectibles of allCollectibles) {
            if (this.x >= collectibles.x-oneCol/2 && this.x <= collectibles.x+oneCol/2
                && this.y === collectibles.y) {
                console.log("GOT A DIAMOND"); 
                allCollectibles.splice(allCollectibles.indexOf(collectibles), 1); 
            }
        }

        // The Player wins the game if reaching the last tile and acquiring all the diamonds
        if (this.y === oneRow - padding && allCollectibles.length === 0) {
            console.log("WIN!"); 
            this.win = true; 
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {
        // Return the Player to the starting position 
        this.x = oneCol * 2;
        this.y = oneRow * 5 - padding;
    }

    handleInput(input) {
        // move the Player using keyboard
        // make sure the Player cannot move off screen
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= oneCol; 
                }
                break; 
            case 'up':
                if (this.y > oneRow) {
                    this.y -= oneRow;
                } 
                break;
            case 'right':
                if (this.x < oneCol * 4) {
                    this.x += oneCol;
                }
                break; 
            case 'down':
                if (this.y < oneRow * 4) {
                    this.y += oneRow;   
                }
                break;
        }
    }
}

// Collectibles the Player can collect for higher score 
class Collectibles {
    constructor({sprite = 'images/Gem Orange.png', x = oneCol, y = oneRow} = {}) {
        this.sprite = sprite;
        this.x = x;
        this.y = y - padding;
    }

    update() {
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// function randomly selects a numbers of elements from an array source
function generateElements(arrSource, neededElements) {
    var result = [];
    var count = 0; 
    while (count < neededElements) {
        var newElement = arrSource[Math.floor(Math.random() * arrSource.length)];
        // only accept different elements
        if (!result.includes(newElement)) {
            result.push(newElement);
            count++; 
        }
    }
    console.log(result); 
    return result;
}

// Now instantiate objects
var enemySource = [new Enemy(), new Enemy({speed:220}), new Enemy({speed:250}),  
                    new Enemy({y:oneRow*2}), new Enemy({y:oneRow*2, speed:60}), new Enemy({y:oneRow*2, speed:160}),
                    new Enemy({y:oneRow*3}), new Enemy({y:oneRow*3, speed:40}), new Enemy({y:oneRow*3, speed:250})]; 

// Place all enemy objects in an array called allEnemies
var allEnemies = generateElements(enemySource, 5); 

// Place the player object in a variable called player
var player = new Player(); 

// Generate collectibles 
var collectiblesSource = [new Collectibles(), new Collectibles({sprite:'images/Gem Blue.png', x:oneCol*2}), new Collectibles({sprite:'images/Gem Green.png', x:oneCol*3}),  
                            new Collectibles({y:oneRow*2}), new Collectibles({sprite:'images/Gem Blue.png', x:oneCol*3, y:oneRow*2}), new Collectibles({sprite:'images/Gem Green.png', x:oneCol*4, y:oneRow*2}),
                            new Collectibles({x:oneCol*2,y:oneRow*3}), new Collectibles({sprite:'images/Gem Blue.png', x:oneCol*3, y:oneRow*3}), new Collectibles({sprite:'images/Gem Green.png', x:oneCol*4,y:oneRow*3}),
                            new Collectibles({sprite:'images/Gem Blue.png', y:oneRow*4}), new Collectibles({x:oneCol*4,y:oneRow*4})]; 


var allCollectibles = generateElements(collectiblesSource, 4); 

// This listens for key presses and sends the keys to your Player.handleInput() method 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
