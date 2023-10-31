const battleBackgroundImage = new Image()
battleBackgroundImage.src = "./images/grassbattle.png"

const battleBackground = new Sprite ({
    position: {
    x: 0,
    y: 0,
    },
    image: battleBackgroundImage
})


let shroomy 
let dracogon 
let renderedSprites 
let battleAnimationId
let queue

function initBattle() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.display = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  shroomy = new Monster(monsters.Shroomy)
  dracogon = new Monster(monsters.Dracogon)
  renderedSprites = [shroomy, dracogon]
  queue = []

  dracogon.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })
  //our event listeners for our buttons (attack)
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
  const selectedAttack = attacks[e.currentTarget.innerHTML]
    dracogon.attack({ 
      attack: selectedAttack,
    recipient: shroomy,
    renderedSprites
  })

  if(shroomy.health <= 0){
    queue.push(() => {
     shroomy.faint()
  })
  queue.push(() => {
    // fade back to black budad buda buda bum
    WebGLSampler.toString('#overlappingDiv', {
      opacity: 1,
      onComplete: () => {
        cancelAnimationFrame(battleAnimationID)
        animate()
        document.querySelector('#userInterface').style.display = "none"
        WebGLSampler.to('#overlappingDiv', {
          opacity: 0
        })
      }
    })
  })
  return
  }
  //shroomy or enemy attacks here
  const randomAttack =
  shroomy.attacks[Math.floor(Math.random() * shroomy.attacks.length)]
  
  queue.push(() => {
    shroomy.attack({ 
    attack: randomAttack,
    recipient: dracogon,
    renderedSprites
  })
})
})
button.addEventListener('mouseenter', (e) => {
const selectedAttack = attacks[e.currentTarget.innerHTML]
document.querySelector('#attackType').innerHTML = selectedAttack.type
document.querySelector('#attackType').style.color = selectedAttack.color
console.log('go')

}) 

})
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
 
  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

//animate()
initBattle()
animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})