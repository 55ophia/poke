const battleBackgroundImage = new Image()
battleBackgroundImage.src = "./images/grassbattle.png"

const battleBackground = new Sprite ({
    position: {
    x: 0,
    y: 0,
    },
    image: battleBackgroundImage
})


const shroomy = new Monster(monsters.Shroomy)
const dracogon = new Monster(monsters.Dracogon)



const renderedSprites = [shroomy, dracogon]

dracogon.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)
})

function animateBattle() {
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
 
  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

//animate()
animateBattle()


const queue = []

//our event listeners for our buttons (attack)
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
      dracogon.attack({ 
        attack: selectedAttack,
      recipient: shroomy,
      renderedSprites
    })

    //enemy attk
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
})
document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})