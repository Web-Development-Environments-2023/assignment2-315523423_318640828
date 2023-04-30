// global variables
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
var scoreEl = document.getElementById("scoreEl");
var livesEl = document.getElementById("livesEl")

var imageEnemy = new Image()
imageEnemy.src = 'images/enemy.png'
var enemyNum = 0

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor() {
        const image = new Image()
        image.src = 'images/spaceship.png'
        this.rotate = 0
        this.opacity = 1
        this.position = { x: 0, y: 0 }
        this.speed = { x: 0, y: 0 }
        image.onload = () => {
            this.image = image
            const scale = 0.20
            this.position = { x: (canvas.width - this.image.width / 2), y: (canvas.height - 50) }
            this.width = image.width * scale
            this.height = image.height * scale
        }
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2)
        c.rotate(this.rotate)
        c.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        c.restore()
    }

    update({ position = null } = {}) {
        if (this.image) {
            if (position) {
                this.position.x = position.x
                this.position.y = position.y
                this.draw()
            }
            else {
                this.draw()
                this.position.x += this.speed.x
                this.position.y += this.speed.y
            }
        }
    }
}


class Enemy {

    constructor({ position }) {
        this.enemyNumber = enemyNum++
        this.speed = { x: 0, y: 0 }
        var imageEnemy = new Image()
        imageEnemy.src = 'images/enemy.png'
        this.position = { x: 0, y: 0 }
        imageEnemy.onload = () => {
            const scale = 1
            this.image = imageEnemy
            this.width = this.image.width * scale;
            this.height = this.image.height * scale;
            this.position = { x: position.x, y: position.y }

        }


    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

    }

    update({ speed }) {
        if (this.image) {
            this.draw()
            this.position.x = this.position.x + speed.x
            this.position.y = this.position.y + speed.y
        }
    }

    shoot(enemySs) {
        enemySs.push(new enemyShot({ position: { x: this.position.x + this.width / 2, y: this.position.y + this.height }, speed: { x: 0, y: 5 } }))
    }
}

class Grid {
    constructor() {
        this.position = { x: 0, y: 0 }
        this.speed = { x: 5, y: 0 }

        // if we want random rows or columns
        // const rows = Math.floor(Math.random() * 5 + 2)
        // const columns = Math.floor(Math.random() * 5 + 2)

        // this.width = columns * enemy_width
        this.width = 6 * 30

        this.enemies = []
        for (let c = 0; c < 5; c++) {
            for (let r = 0; r < 4; r++) {
                this.enemies.push(new Enemy({
                    position: {
                        x: c * 30,
                        y: r * 30
                    }
                }))
            }
        }
    }

    enemySh() {

    }

    update() {

        this.position.x += this.speed.x
        this.position.y += this.speed.y
        this.speed.y = 0
        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.speed.x = -this.speed.x
            this.speed.y = 30
        }
    }
}

class enemyShot {
    constructor({ position, speed }) {
        this.position = position
        this.speed = speed
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}

class shot {
    constructor({ position, speed }) {
        this.position = position
        this.speed = speed
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}

class Particle {
    constructor({ position, velocity, radius, color, fade }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.fade = fade;
        this.opacity = 1;
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath
        c.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.fade) this.opacity -= 0.01; // make enemy ship & player ship particles fade away after explosion
    }
}

const keys = {
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    final_key: { pressed: false }

}

// represent our 

let imagesPictures = [new Image('./images/enemy.png')]
const player = new Player()
const shots = [new shot({ position: { x: player.position.x + player.width / 2, y: player.position.y }, speed: { x: 0, y: -5 } })]
const grids = [new Grid()]
const interval = Math.floor(Math.random() * 500 + 500)
const enemyShots = []
const particles = []
let match = {
    over: false,
    active: false
}
let score = 0
let lives = 2
let frames = 0
document.getElementById("myLifeBeLike").innerHTML = lives + 1;
localStorage.setItem('myLifeBeLike', lives);
document.getElementById("myScore").innerHTML = score;

function createParticles({ object, how_many, fade, color }) {
    for (let i = 0; i < how_many; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 3
            },
            radius: Math.random() * 3,
            color: color || '#BAA0DE',
            fade: fade
        }))
    }
}

function animate() {
    requestAnimationFrame(animate)
    // this is the style of the background
    c.fillStyle = 'black'
    // this need to be change to adaptive screen resolution
    c.fillRect(0, 0, canvas.width, canvas.height)
    // c.fillRect(0, 0, 1366, 768)
    player.update()
    // console.log(player.position)

    c.draw

    particles.forEach((particle, i) => {
        if (particle.opacity <= 0) { // garbage collection for particles that faded away
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0)
        }
        else {
            particle.update()
        }
    })

    enemyShots.forEach((enemS, esI) => {
        if (enemS.position.y + enemS.height >= canvas.height) {
            setTimeout(() => {
                enemyShots.splice(esI, 1)
            })
        }
        else { enemS.update() }

        let solution = false
        if (enemS.position.y + enemS.radius >= player.position.y &&
            enemS.position.x + enemS.radius >= player.position.x &&
            enemS.position.y <= player.position.y + player.height &&
            enemS.position.x <= player.position.x + player.width)
            solution = true

        if (!match.over && solution) {
            setTimeout(() => {
                enemyShots.splice(esI, 1);
                if (lives < 1) {
                    match.over = true;
                }
                else {
                    lives--
                    document.getElementById("myLifeBeLike").innerHTML = lives + 1;

                    //localStorage.setItem('myLifeBeLike', lives);
                }
                if_match_over()
            }, 0)
            createParticles({ object: player, how_many: 50, fade: true, color: 'white' }); // ship explode
            player.update({ position: { x: (canvas.width - 100), y: (canvas.height - 50) } })

        }
    })

    shots.forEach((shot, index) => {
        if (shot.position.y + shot.radius <= 0) {
            setTimeout(() => {
                shots.splice(index, 1)
            }, 0)
        }
        else {
            shot.update()
        }
    })

    grids.forEach((grid, gI) => {
        grid.update()

        // spawn enemy shots
        if (frames % 100 === 0 && grid.enemies.length > 0) {
            grid.enemies[Math.floor(Math.random() * grid.enemies.length)].shoot(enemyShots)
        }

        grid.enemies.forEach(async (enemy, i) => {
            enemy.update({ speed: grid.speed })

            // await imageEnemy.complete
            shots.forEach((shot, j) => {
                if (shot.position.y - shot.radius <= enemy.position.y + enemy.height &&
                    shot.position.x + shot.radius >= enemy.position.x &&
                    shot.position.x - shot.radius <= enemy.position.x + enemy.width &&
                    shot.position.y + shot.radius >= enemy.position.y) {
                    setTimeout(() => {
                        const enemyIndex = grid.enemies.findIndex(enem => enem === enemy);
                        console.log(enemyIndex)
                        const findEnemy = grid.enemies.find(enem => {
                            return enem === enemy
                        })
                        const findShot = shots.find(sho => {
                            return sho === shot
                        })

                        // if (enemyIndex >= grid.enemies.length)
                        // {
                        //     var new_index = grid.enemies.length - enemyIndex
                        //     new_index = grid.enemies.length - new_index
                        // }
                        // else {new_index = enemyIndex}

                        if (findEnemy && findShot) {
                            // update the score
                            if (enemy.enemyNumber % 4 === 0)
                                score += 20
                            if (enemy.enemyNumber % 4 === 1)
                                score += 15
                            if (enemy.enemyNumber % 4 === 2)
                                score += 10
                            if (enemy.enemyNumber % 4 === 3)
                                score += 5
                            // localStorage.setItem('scoring', score);
                            document.getElementById("myScore").innerHTML = score;
                            // scoreEl.innerHTML = score
                            createParticles({ object: enemy, how_many: 15, fade: true, color: '#BAA0DE' });
                            grid.enemies.splice(i, 1)
                            shots.splice(j, 1)

                            if (grid.enemies.length > 0) {
                                const firstEnem = grid.enemies[0]
                                const lastEnem = grid.enemies[grid.enemies.length - 1]

                                grid.width = lastEnem.position.x - firstEnem.position.x + lastEnem.width
                                grid.position.x = firstEnem.position.x
                            }
                            else {
                                grids.splice(gI, 1)
                                ChampGame();
                            }
                        }
                    }, 0)
                }
            })
        })

    })
    // the speed of the player
    if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.speed.x = 5
        player.rotate = 0.15
    }

    else if (keys.ArrowLeft.pressed && player.position.x > 0) {
        player.speed.x = -5
        player.rotate = -0.15
    }

    else {
        player.speed.x = 0
        player.rotate = 0
    }

    if (keys.ArrowUp.pressed && player.position.y > (0.6 * canvas.height - player.height))
        player.speed.y = -5

    else if (keys.ArrowDown.pressed && player.position.y <= canvas.height - player.height)
        player.speed.y = 5

    else {
        player.speed.y = 0
        player.rotate = 0
    }

    frames++
}

animate()

addEventListener('keydown', ({ key }) => {
    var final_key = localStorage.getItem('shootingK');
    // console.log(key)
    switch (key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            // console.log("turning right")
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            // console.log("turning left")
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            // console.log("turning up")
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            // console.log("turning down")
            break
        case final_key:
            shots.push(new shot({ position: { x: player.position.x + player.width / 2, y: player.position.y }, speed: { x: 0, y: -5 } }))
            break
    }

})


addEventListener('keyup', ({ key }) => {
    // console.log(key)
    switch (key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
    }
})

function if_match_over() {
    if (match.over)
        LostGame()
}

function LostGame() {
    alert("You Lost");
}

function ChampGame() {
    alert("Champion!");
}