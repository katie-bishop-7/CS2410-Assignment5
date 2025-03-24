const queryString = window.location.search

const splitQueries = queryString.split("=")
const image_link = decodeURIComponent(splitQueries[1].split("&")[0])
const api_link = splitQueries[2].split("&")[0]
const date_added = decodeURIComponent(splitQueries[3].split("&")[0])


const page = document.getElementById("page")

let image = document.createElement("img")
image.src = image_link
image.alt = "image"
image.id = "image"

console.log(image.src)

let informationContainer = document.createElement("div")
informationContainer.id = "information-container"

let image_link_div = document.createElement("div")
image_link_div.innerText = "Image Link: " + image_link
image_link_div.setAttribute("style", "word-wrap: break-word")

let api_link_div = document.createElement("div")
api_link_div.innerText = "API Link: " + api_link

let date_added_div = document.createElement("div")
date_added_div.innerText = "Date Added: " + date_added

informationContainer.appendChild(image)
informationContainer.appendChild(image_link_div)
informationContainer.appendChild(api_link_div)
informationContainer.appendChild(date_added_div)
page.appendChild(informationContainer)

const back_button = document.getElementById("back-button")
back_button.addEventListener("click", () => {
    window.history.back()
})
back_button.innerText = "<  Go Back"