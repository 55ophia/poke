class Sprite {
    constructor({ 
      position,
      velocity,
      image,
      frames = { max: 1, hold: 10 }, 
      sprites,
      animate = false,
      isEnemy = false, 
      rotation = 0,
      name,
      attacks
    }) {
      this.position = position
      this.image = image
      this.frames = {...frames, val: 0, elapsed: 0}
      
      this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
      }
      this.animate = animate
      this.sprites = sprites
      this.opacity = 1
      this.health = 100
      this.isEnemy = isEnemy
      this.rotation = rotation
      this.name = name
      this.attacks = attacks
    }
  
  
  draw() {
      c.save()
      c.drawImage (
          this.image,
          this.frames.val * this.width,
          0,
          this.image.width / this.frames.max,
          this.image.height,
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height,
      )
      c.restore()
      if (!this.animate) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        
if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
        }
    }

     attack ({ attack, recipient, renderedSprites }) {
      let healthBar = "#enemyHealthBar"
      if (this.isEnemy) healthBar = "#playerHealthBar"
      let test = 'test'
      test = attack.damage
      this.health -= attack.damage

      

       switch (attack.name) {
         case 'Flamebreath':
          const flamebreathImage = new Image()
          flamebreathImage.src = './images/fireball.png'
         const flamebreath = new Sprite({
           position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: flamebreathImage,
          frames: {
            max: 4,
            hold: 10 
          },
          animate: true
         })

         renderedSprites.splice(1, 0, flamebreath)

         gsap.to(flamebreath.position, {
           x: recipient.position.x,
           y: recipient.position.y,
           onComplete: () => {
          // enemy hit or somn
          gsap.to(healthBar, {
            width: recipient.health + '%'
          })

          gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            yoyo: true,
            repeat: 5,
            duration: 0.08
          })

          gsap.to(recipient, {
            opacity: 0,
            repeat: 5,
            yoyo: true,
            duration: 0.08
          })
          renderedSprites.splice(1, 1)

           }
         })
         break
         case 'WingSlap':
          const tl = gsap.timeline()
 
          let movementDistance = 20
          if (this.isEnemy) movementDistance = -20
   
          tl.to(this.position, {
            x: this.position.x - movementDistance
          })
            .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              //Enemy actually gets hit
              gsap.to(healthBar, {
                width: recipient.health + '%'
              })
              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08
              })
   
                gsap.to(recipient, {
                 opacity: 0,
                 repeat: 5,
                 yoyo: true,
                 duration: 0.08
                })  
              }
          }).to(this.position, {
            x: this.position.x 
          })
         break;
         
       }
         }
     }
  
     class Boundary {
       static height = 48
       static width = 48
       constructor({position}) {
           this.position = position
           this.width = 48
           this.height = 48
       }
  
       draw() {
           c.fillStyle = 'rgba(255, 0, 0, 0.5)'
           c.fillRect(this.position.x, this.position.y, this.width, this.height)
      }
    }

   