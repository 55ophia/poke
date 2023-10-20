const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")


canvas.width = 1024
canvas.height = 576


const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}
 

const boundaries = []
const offset = {
    x: -2300,
    y: -930
}




collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025)
        boundaries.push(
         new Boundary({
            position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }
      })
    )
  })
})


const battleZones = []
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025)
        battleZones.push(
         new Boundary({
            position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }
      })
    )
  })
})

console.log(battleZones)
const image = new Image()
image.src = "./images/bg.png"

const foregroundImage = new Image()
foregroundImage.src = "./images/foreground.png"



const playerDown = new Image()
playerDown.src = "./images/down.png"

const playerUp = new Image()
playerUp.src = "./images/up.png"

const playerLeft = new Image()
playerLeft.src = "./images/left.png"

const playerRight = new Image()
playerRight.src = "./images/right.png"




const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDown,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUp,
        left: playerLeft,
        right: playerRight,
        down: playerDown,
    }
})




const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}




const movables = [background, ...boundaries, foreground, ...battleZones]

function rectangularCollision({rectangle1, rectangle2}) {
    return(
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    
    )
}
function animate() {
    window.requestAnimationFrame (animate) // you might need to change this
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    battleZones.forEach(battleZone => {
        battleZone.draw()
    })
    player.draw()
    foreground.draw()

    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                })
            ) {
                console.log('battle zone collision');
                break
            }
        }
    }

let moving = true
player.moving = false
if (keys.w.pressed && lastKey === 'w') {
    player.moving = true
    player.image = player.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                }
              }
            })
        ) {
            moving = false
            break
        }
    }

    if(moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
} else if (keys.a.pressed && lastKey === 'a') {
    player.moving = true
    player.image = player.sprites.left
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                }
              }
            })
        ) {
            moving = false
            break
        }
    }

    if(moving)
    movables.forEach((movable) => {
     movable.position.x += 3
  })
} else if (keys.s.pressed && lastKey === 's') {
    player.moving = true
    player.image = player.sprites.down
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                }
              }
            })
        ) {
            moving = false
            break
        }
    }

    if(moving)
    movables.forEach((movable) => {
     movable.position.y -= 3
  })
} else if (keys.d.pressed && lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
        player.moving = true
        player.image = player.sprites.right
        const boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y
                }
              }
            })
        ) {
            moving = false
            break
        }
    }

    if(moving)
    movables.forEach((movable) => {
     movable.position.x -= 3
    })
}
}


animate()






let lastKey = ''
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
             keys.w.pressed = true
             lastKey = 'w'
             break
        case 'a':
             keys.a.pressed = true
             lastKey = 'a'
             break
        case 's':
             keys.s.pressed = true
             lastKey = 's'
             break
        case 'd':
             keys.d.pressed = true
             lastKey = 'd'
             break
    }
} )




// do the dog thing sprite movement
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'w':
             keys.w.pressed = false
             break
        case 'a':
             keys.a.pressed = false
             break
        case 's':
             keys.s.pressed = false
             break
        case 'd':
             keys.d.pressed = false
             break
    }
})



