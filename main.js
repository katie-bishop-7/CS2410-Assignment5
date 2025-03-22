
console.log("Main loaded")
heart = document.getElementById("heart")
random_image = document.getElementById("random")

// async function getData(){
//     const res = await fetch("favs.txt")
//     const text = await res.text();
//     return text
// }

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
    }
    // add image to favs.txt

    const favs_data = {
        url: "cake.jpg",
    }
    fetch("http://localhost:8000/api/update-favs", {
        method: "PUT",
        body: JSON.stringify(favs_data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
})


// regenerate image
random_image = document.getElementById("random")

regenerate_button = document.getElementById("regenerate")
regenerate_button.addEventListener("click", e => {
    e.preventDefault()
    regenerate_button.innerText = "Regenerating..."
    let res = regenerate_image(document.getElementById("category").value)
    res.then(result => {
        random_image.src = result.url
        regenerate_button.innerText = "Regenerate"
        heart.setAttribute("data-favorited", "false");
        heart.src = "empty-heart-glow.png"
    },)
})

// assign category to regenerate image

image_category = document.getElementById("category")
image_category.addEventListener("change", e => {
    e.preventDefault();
    let category = e.target.value;
    console.log(category)
})

// fetch image from api
async function regenerate_image(category) {
    let fetch_url = "https://picsum.photos/1500"
    if (category !== "1") {
        fetch_url += `/${category}`
    }
    const result = await fetch(fetch_url)
    const data = await result
    return data
}
