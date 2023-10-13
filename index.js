const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")


canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = "./images/bg.png"


const playerImage = new Image()
playerImage.src = "./images/charDown.png"


image.onload = () => {
    c.drawImage(image, -2300, -920) // you might need to change this
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        // canvas.width / 2 - playerImage.width / 4, //take a look at these too pls
        // canvas.height / 2 - playerImage.height / 2, 
        0,
        0,
        playerImage.width / 8,
        playerImage.height / 2,
    )
}

