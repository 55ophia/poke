const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")


canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = "./images/bg.png"

//i wonder if we can take these sprites and change this code up?? //
const playerImage = new Image()
playerImage.src = 'x'

image.onload = () => {
    c.drawImage(image, -2100, -900) // you might need to change this
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2, //take a look at these too pls
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height,
    )
}