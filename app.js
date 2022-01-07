const auth = "563492ad6f917000010000016d4b1e8d5f674d8ea3cc9b0ea07a42c0";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//event listeners 
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e)=> {
    e.preventDefault();
    searchPhotos(searchValue);
})

function updateInput(e) {
    searchValue = e.target.value;
}


async function fetchApi(url) {
    const dataFetch = await fetch(url,
        {
            methods: "GET",
            headers: {
                Accept: "aplication/json",
                Authorization: auth
            }
        } 
    );
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
            <div class ="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original} target="_blank">Download</a>
            </div>
            <img src=${photo.src.large}></img>
            `;
        gallery.appendChild(galleryImg);
    });
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}



async function curatedPhotos() {
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15"); 
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15`);
    generatePictures(data);    
}

curatedPhotos();