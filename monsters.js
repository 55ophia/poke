const dracogonImage = new Image()
dracogonImage.src = "./images/dracogon.png"

const shroomyImage = new Image()
shroomyImage.src = "./images/shroom.png"

const monsters = {
    Dracogon: {
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
        name: 'Dracogon',
        attacks: [attacks.FlameBreath, attacks.WingSlap]
      },
    Shroomy: {
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
        name: 'Shroomy',
        attacks: [attacks.FlameBreath, attacks.WingSlap]
      }
    }