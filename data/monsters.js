const monsters = {
    Dracogon: {
        position: {
            x: 280,
            y: 305
        },
        image: {
            src: "./images/dracogon.png"
        },
        frames: {
            max: 4,
            hold: 25
    },
    animate: true,
    name: 'Dracogon',
    attacks: [attacks.Wingslap, attacks.Flamebreath]
    },
    Shroomy: {
        position: {
            x: 760,
            y: 55
        },
        image: {
            src: "./images/shroom.png"
        },
        frames: {
            max: 4,
            hold: 25
        },
        animate: true,
        isEnemy: true,
        name: 'Shroomy',
        attacks: [attacks.Wingslap, attacks.Flamebreath]
    }
    }