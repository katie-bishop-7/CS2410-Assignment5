console.log("Main loaded")
heart = document.getElementById("heart")
random_image = document.getElementById("random")
image_link = document.getElementById("image-link")
api_link = document.getElementById("api-link")

// set random image upon loading
let api_url = find_api_url()
let image_url = fetch_image(api_url).then(url => {
    random_image.src = url.url
    random_image.alt = "Random image"
    image_link.innerText = url.url
    api_link.innerText = api_url
}
)

// make the heart favorite and unfavorite
heart.addEventListener("click", e => {
    e.preventDefault()
    favorited = e.target.dataset.favorited
    if (favorited === "true") { // unfavorited when it was clicked
        heart.setAttribute("data-favorited", "false");
        heart.src = "empty-heart-glow.png"
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
                    "date-added": new Date()
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
    let WIDTH = 1500;
    let fetch_url = `https://picsum.photos/${WIDTH}`
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
        heart.src = "empty-heart-glow.png"
    },)
    api_link = document.getElementById("api-link")
    image_link = document.getElementById("image-link")
    api_link.innerText = api_url

}