const battleBackgroundImage = new Image()
battleBackgroundImage.src = "./images/grassbattle.png"

const battleBackground = new Sprite ({
    position: {
    x: 0,
    y: 0,
    },
    image: battleBackgroundImage
})

const shroomyImage = new Image()
shroomyImage.src = "./images/shroom.png"
const shroomy = new Sprite({
  position: {
    x: 760,
    y: 55
  },
  image:shroomyImage,
  frames: {
    max: 4,
    hold: 25,
  },
  animate: true,
  isEnemy: true,
  name: 'Shroomy'
})

const dracogonImage = new Image()
dracogonImage.src = "./images/dracogon.png"
const dracogon = new Monster({
  position: {
    x: 280,
    y: 305
  },
  image: dracogonImage,
  frames: {
    max: 4,
    hold: 25,
  },
  animate: true,
  name: 'Dracogon'
})


const renderedSprites = [shroomy, dracogon]
function animateBattle() {
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
 
  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

//animate()
animateBattle()



//our event listeners for our buttons (attack)
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]

      dracogon.attack({ 
        attack: selectedAttack,
      recipient: dracogon,
      renderedSprites
    })
  })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    e.currentTarget.style.display = 'none'
  console.log("clicked dialog")  
})