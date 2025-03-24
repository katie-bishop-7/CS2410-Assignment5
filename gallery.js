let gallery_cards = document.getElementById("gallery")

fetch("http://localhost:8000/favs.txt")
    .then(res => res.json())
    .then(favs => {
        let heart_counter = 1;
        for (link in favs) {
            let divContainer = document.createElement("div")
            divContainer.className = "gallery_card"
            

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

            heart.addEventListener("click", (e) => {
                e.preventDefault()
                heart.src = "empty-heart-glow.png"
                fetch("http://localhost:8000/favs.txt")
                    .then(curr_data => curr_data.json())
                    .then(curr_data_json => {
                        delete curr_data_json[heart.id]
                        gallery_cards.removeChild(divContainer)
                        console.log(curr_data_json)
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
            imageDiv.appendChild(apiDiv)
            imageDiv.appendChild(imageLinkDiv)
            imageDiv.appendChild(dateDiv)
            divContainer.appendChild(imageDiv)
            divContainer.appendChild(heart)

            gallery_cards.appendChild(divContainer)
        }
        // create new card. three divs nested inside one div
        // console.log(res)
    });