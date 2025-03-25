let heart = document.getElementById("heart")
let random_image = document.getElementById("random")
let image_link = document.getElementById("image-link")
let api_link = document.getElementById("api-link")


// change theme if user changes the theme

const queryString = window.location.search
let theme;
if (queryString === ""){
    theme = "theme-1"
} else {
    const params = new URLSearchParams(queryString)
    theme = params.get("theme")
}
const theme_category = document.getElementById("theme")
setTheme(theme)
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
    const gallery_link = document.getElementById("gallery-link")
    gallery_link.setAttribute("href", `gallery.html?theme=${e.target.value}`)
})

function getCategory(){
    const category_num = document.getElementById("category").value
    let category;
    if (category_num === "1"){
        category = "Wallpaper"
    } else if (category_num === "?grayscale"){
        category = "Black and White"
    } else if (category_num === "?blur=10"){
        category = "Blur"
    }
    return category
}


// set random image upon loading
let api_url = find_api_url()
let image_url = fetch_image(api_url).then(url => {
    random_image.src = url.url
    random_image.alt = "Random image"
    image_link.innerText = url.url
    api_link.innerText = api_url
    fetch("http://localhost:8000/favs.txt")
        .then(curr_data => curr_data.json())
        .then(curr_data_json => {
            if (curr_data_json[url.url] !== undefined) {
                heart.src = "filled-heart-glow.png"
            }
        })
})



// make the heart favorite and unfavorite
heart.addEventListener("click", e => {
    e.preventDefault()
    favorited = e.target.dataset.favorited
    if (favorited === "true") { // unfavorited when it was clicked
        heart.setAttribute("data-favorited", "false");
        heart.src = "empty-heart-glow.png"

        fetch("http://localhost:8000/favs.txt")
            .then(curr_data => curr_data.json())
            .then(curr_data_json => {
                delete curr_data_json[document.getElementById("image-link").innerText]
                return fetch("http://localhost:8000/api/update-favs", {
                    method: "PUT",
                    body: JSON.stringify(curr_data_json),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })

            })

    }
    else if (favorited === "false") {
        heart.setAttribute("data-favorited", "true");
        heart.src = "filled-heart-glow.png"
        // add image to favs.txt
        fetch("http://localhost:8000/favs.txt")
            .then(curr_data => curr_data.json())
            .then(curr_data_json => {
                curr_data_json[document.getElementById("image-link").innerText] = {
                    "api-link": document.getElementById("api-link").innerText,
                    "date-added": new Date().toDateString(),
                    "category" : getCategory()
                }
                return fetch("http://localhost:8000/api/update-favs", {
                    method: "PUT",
                    body: JSON.stringify(curr_data_json),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
            })
    }
}
)

// regenerate image when you click regenerate button

regenerate_button = document.getElementById("regenerate")
regenerate_button.addEventListener("click", e => {
    e.preventDefault()
    regenerate_image()
})

// If category is changed, regenerate the image

image_category = document.getElementById("category")
image_category.addEventListener("change", e => {
    regenerate_image()
})

// generate the url for the api based on category and WIDTH

function find_api_url() {
    let category = document.getElementById("category").value
    let width = document.getElementById("width").value;
    if (width < 0 || width > 3000) {
        width = 1500;
    }
    let height = document.getElementById("height").value;
    if (height < 0 || height > 3000) {
        height = 1500;
    }
    let fetch_url = `https://picsum.photos/${width}/${height}`
    if (category !== "1") {
        fetch_url += `/${category}`
    }
    return fetch_url
}

// fetch image url from api (async)

async function fetch_image(fetch_url) {
    const result = await fetch(fetch_url)
    const pic_url = await result
    return pic_url
}

// regenerate the main image (calls async fetch_image)

function regenerate_image() {
    regenerate_button.innerText = "Regenerating..."
    let api_url = find_api_url()
    let image_url = fetch_image(api_url)
    image_url.then(result => {
        random_image.src = result.url
        image_link.innerText = result.url
        regenerate_button.innerText = "Regenerate"
        heart.setAttribute("data-favorited", "false");

        fetch("http://localhost:8000/favs.txt")
            .then(curr_data => curr_data.json())
            .then(curr_data_json => {
                if (curr_data_json[result.url] !== undefined) {
                    heart.src = "filled-heart-glow.png"
                } else {
                    heart.src = "empty-heart-glow.png"
                }
            })
    },)
    api_link = document.getElementById("api-link")
    image_link = document.getElementById("image-link")
    api_link.innerText = api_url

}