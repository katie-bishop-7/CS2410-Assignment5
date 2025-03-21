// let's say we get an image

console.log("here1")
image = document.createElement("img")
image.src = image_source
image.alt = "Random image"

document.getElementById("image").appendChild(image)


heart = document.getElementById("heart")
console.log(heart)

heart.addEventListener("click", e => {
    e.preventDefault()
    e.console.log("here")
    e.target.value.dataFavorited = !(e.target.value.dataFavorited)
    console.log(e.target.value)
})

