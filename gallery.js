console.log("Javascript Gallery loaded")

let gallery_cards = document.getElementById("gallery")

const url = "http://localhost:8000/";
const filename = "favs.txt";


fetch(url + filename)
    .then(res => res.json())
    .then(res => {
        console.log (res.url);
    });