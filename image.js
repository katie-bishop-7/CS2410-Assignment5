// change theme if user changes the theme

const queryString = window.location.search
let theme;
const params = new URLSearchParams(queryString)
if (queryString === ""){
    theme = "theme-1"
} else {
    theme = params.get("theme")
}
const theme_category = document.getElementById("theme")
setTheme(theme)
const home_link = document.getElementById("home-link")
home_link.setAttribute("href", `index.html?theme=${theme}`)
const gallery_link = document.getElementById("gallery-link")
gallery_link.setAttribute("href", `gallery.html?theme=${theme}`)

function setTheme(theme){
    var r = document.querySelector(':root');
    if (theme === "theme-1"){
        r.style.setProperty("--background-color", "#D1D5DE")
        r.style.setProperty("--secondary-1", "#94b284")
        r.style.setProperty("--secondary-2", "#8AAA79")
        r.style.setProperty("--secondary-3", "#728457")
        r.style.setProperty("--dark-text", "#2b3124")
        r.style.setProperty("--primary-font", "DMSerif")
        r.style.setProperty("--secondary-font", "DMSans")
    }
    if (theme === "theme-2"){
        r.style.setProperty("--background-color", "gainsboro")
        r.style.setProperty("--secondary-1", "cadetblue")
        r.style.setProperty("--secondary-2", "cornsilk")
        r.style.setProperty("--secondary-3", "#B5B682")
        r.style.setProperty("--dark-text", "#1B221D")
        r.style.setProperty("--primary-font", "Caveat")
        r.style.setProperty("--secondary-font", "Lexend")
    } else if (theme === "theme-3"){
        r.style.setProperty("--background-color", "slategray")
        r.style.setProperty("--secondary-1", "darkslategrey")
        r.style.setProperty("--secondary-2", "floralwhite")
        r.style.setProperty("--secondary-3", "darkseagreen")
        r.style.setProperty("--dark-text", "#1B221D")
        r.style.setProperty("--primary-font", "Oswald")
        r.style.setProperty("--secondary-font", "Roboto")
    }
    // update selected theme
    if (theme === "theme-1"){
        document.getElementById("theme-1").setAttribute("selected","true")
    } else if (theme === "theme-2"){
        document.getElementById("theme-2").setAttribute("selected","true")
    } else if (theme === "theme-3"){
        document.getElementById("theme-3").setAttribute("selected","true")
    }
}

theme_category.addEventListener("change", (e) =>{
    e.preventDefault()
    setTheme(e.target.value)
    const home_link = document.getElementById("home-link")
    home_link.setAttribute("href", `index.html?theme=${e.target.value}`)
    const gallery_link = document.getElementById("gallery-link")
    gallery_link.setAttribute("href", `gallery.html?theme=${e.target.value}`)
})


const image_link = params.get("image_link")
const api_link = params.get("api_link")
const date_added = params.get("date_added")
const category = params.get("category")
const page = document.getElementById("page")

let image = document.createElement("img")
image.src = image_link
image.alt = "image"
image.id = "image"

let informationContainer = document.createElement("div")
informationContainer.id = "information-container"

let image_link_div = document.createElement("div")
image_link_div.innerText = "Image Link: " + image_link
image_link_div.setAttribute("style", "word-wrap: break-word")

let category_div = document.createElement("div")
category_div.innerText = "Category: " + category

let api_link_div = document.createElement("div")
api_link_div.innerText = "API Link: " + api_link

let date_added_div = document.createElement("div")
date_added_div.innerText = "Date Added: " + date_added

let unfavorite = document.createElement("button")
unfavorite.innerHTML="Unfavorite"
unfavorite.id = "unfavorite"

unfavorite.addEventListener("click", (e) => {
    fetch("http://localhost:8000/favs.txt")
            .then(curr_data => curr_data.json())
            .then(curr_data_json => {
                delete curr_data_json[image_link]
                fetch("http://localhost:8000/api/update-favs", {
                    method: "PUT",
                    body: JSON.stringify(curr_data_json),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                return window.location.href = "gallery.html?theme=" + document.getElementById("theme").value
            })
    
}) 


informationContainer.appendChild(image)
informationContainer.appendChild(category_div)
informationContainer.appendChild(image_link_div)
informationContainer.appendChild(api_link_div)
informationContainer.appendChild(date_added_div)
informationContainer.appendChild(unfavorite)
page.appendChild(informationContainer)

const back_button = document.getElementById("back-button")
back_button.addEventListener("click", () => {
    window.history.back()
})
back_button.innerText = "<  Go Back"