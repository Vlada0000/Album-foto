
function search() {
    let parolaCercata = document.getElementById("cerca").value;
    let tipologia = document.getElementById("tipologia").value;
    let url = "";
    let urlFoto = "https://api.pexels.com/v1/search/?page=1&per_page=30&query=";
    let urlVideo = "https://api.pexels.com/videos/search?per_page=5&query=";
    if (tipologia === "foto") {
        url = urlFoto;
    } else {
        url = urlVideo;
    }
    fetch(url + parolaCercata, {
        method: "GET",
        headers: {
            "authorization": "mtpgYfjQch10GeMRqP3Dr8dMC5nh0CXtJHUYokaMOlilbxencA6cBH46",
            "content-type": "application/json"
        }
    }).then((response) => {
        response.json().then((data) => {
            let container = document.querySelector("#contenitoreImg");
            container.innerHTML = "";
            let contenuto = "";
            if (tipologia === "foto") {
                data.photos.forEach(element => {
                    contenuto = `
                                <div class="col-md-4">
                                    <div class="card">
                                        <img class="card-img-top" src="${element.src.medium}" alt="${element.alt}">
                                        <div class="card-body">
                                            <p class="card-text">${element.alt}</p>
                                        </div>
                                    </div>
                                </div>`;
                    container.innerHTML += contenuto;
                });
            } else {
                data.videos.forEach(item => {
                    contenuto = `
                                <div class="col-md-6">
                                    <div class="card">
                                        <video class="card-img-top" controls>
                                            <source src="${item.video_files[0].link}" type="video/mp4">
                                        </video>
                                        <div class="card-body">
                                            <p class="card-text">Video</p>
                                        </div>
                                    </div>
                                </div>`;
                    container.innerHTML += contenuto;
                });
            }
        });
    });
}