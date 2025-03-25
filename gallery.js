// change theme if user changes the theme

const queryString = window.location.search
let theme;
if (queryString === ""){
    theme = "theme-1"
} else {
    console.log(queryString)
    const params = new URLSearchParams(queryString)
    console.log(params)
    theme = params.get("theme")
}
setTheme(theme)

const home_link = document.getElementById("home-link")
home_link.setAttribute("href", `index.html?theme=${theme}`)
const theme_category = document.getElementById("theme")

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
})


const gallery_cards = document.getElementById("gallery")
const filter_category = document.getElementById("category")
let total_cards = [];

// let user filter

filter_category.addEventListener("change", e => {
    e.preventDefault()
    let display_cards = [];
    for (card of total_cards) {
        if (card.value === e.target.value || e.target.value === "None") {
            display_cards.push(card)
        }
        if (display_cards.includes(card) && !(gallery_cards.contains(card))){
            gallery_cards.appendChild(card)
        }
        if (gallery_cards.contains(card) && !(display_cards.includes(card))){
            gallery_cards.removeChild(card)
        }
    }
})

fetch("http://localhost:8000/favs.txt")
    .then(res => res.json())
    .then(favs => {
        let heart_counter = 1;
        for (link in favs) {
            // create individual gallery cards

            let divContainer = document.createElement("div")
            divContainer.className = "gallery_card"
            divContainer.value = favs[link]["category"]

            let image = document.createElement("img")
            image.className = "image_gallery_card"
            image.src = link
            image.alt = "image gallery card"

            let imageDiv = document.createElement("div")
            imageDiv.className = "image-div"
            let apiDiv = document.createElement("div")
            apiDiv.className = "image-info"
            apiDiv.innerHTML = "<b>API Link:</b> "
            apiDiv.innerHTML += favs[link]["api-link"]

            let categoryDiv = document.createElement("div")
            categoryDiv.className = "image-info"
            categoryDiv.innerHTML = "<b>Category:</b> "
            categoryDiv.innerHTML += favs[link]["category"]

            let imageLinkDiv = document.createElement("div")
            imageLinkDiv.className = "image-info"
            imageLinkDiv.innerHTML = "<b>Image Link:</b> "
            imageLinkDiv.innerHTML += link

            let dateDiv = document.createElement("div")
            dateDiv.className = "image-info"
            dateDiv.innerHTML = "<b>Date Added:</b> "
            dateDiv.innerHTML += favs[link]["date-added"]

            let heart = document.createElement("img")
            heart.className = "heart"
            heart.id = link
            heart.src = "filled-heart-glow.png"
            heart.alt = "heart"

            // unfavorite using the heart
            heart.addEventListener("click", (e) => {
                e.preventDefault()
                heart.src = "empty-heart-glow.png"
                fetch("http://localhost:8000/favs.txt")
                    .then(curr_data => curr_data.json())
                    .then(curr_data_json => {
                        delete curr_data_json[heart.id]
                        gallery_cards.removeChild(divContainer)
                        return fetch("http://localhost:8000/api/update-favs", {
                            method: "PUT",
                            body: JSON.stringify(curr_data_json),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        })

                    })
            }
            )
            heart_counter += 1;

            divContainer.appendChild(image)
            imageDiv.appendChild(categoryDiv)
            imageDiv.appendChild(apiDiv)
            imageDiv.appendChild(imageLinkDiv)
            imageDiv.appendChild(dateDiv)
            divContainer.appendChild(imageDiv)
            divContainer.appendChild(heart)

            divContainer.addEventListener("mouseover", (e) => {
                e.preventDefault()
                divContainer.setAttribute("style", "transform: scale(1.05)")

            })

            divContainer.addEventListener("mouseout", (e) => {
                e.preventDefault()
                divContainer.setAttribute("style", "transform: scale(1)")
            })

            // click the gallery card to see the image page
            divContainer.addEventListener("click", (e) => {
                e.preventDefault()
                console.log(e.target)
                if (e.target.className !== "heart") {

                    window.location.href =
                        "image.html"
                        + "?image_link=" + encodeURIComponent(heart.id)
                        + "&api_link=" + favs[heart.id]["api-link"]
                        + "&date_added=" + encodeURIComponent(favs[heart.id]["date-added"])
                        + "&category=" + favs[heart.id]["category"]
                        + "&theme=" + document.getElementById("theme").value
                }
            })
            gallery_cards.appendChild(divContainer)
            total_cards.push(divContainer)
        }
    });