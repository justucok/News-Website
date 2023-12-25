const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
let apiKey = "4c32a628146841299f4f356e4276ba9a";
let requestURL;
let selectedCategory = "general";
let country = "id"; // Menambahkan inisialisasi variabel country

const options = ["general", "sport", "science", "entertainment", "politics"];

const generateUI = (articles) => {
    for (let item of articles) {
        console.log("Image URL:", item.urlToImage);

        let card = document.createElement("div");
        card.classList.add("news-card");

        let imageUrl = item.urlToImage || 'assets/newspaper.jpg';

        card.innerHTML = `<div class="news-image-container">
            <img src="${imageUrl}" alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
                ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        </div>`;
        container.appendChild(card);
    }
};

const getNews = async() => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });

    selectedCategory = category;
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${selectedCategory}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
};

const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${
            i === selectedCategory ? "active" : ""
        }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

const init = () => {
    // Menambahkan nilai default atau sesuaikan kebutuhan
    country = "id";
    apiKey = "4c32a628146841299f4f356e4276ba9a";
    selectedCategory = "general";

    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${selectedCategory}&apiKey=${apiKey}`;
    init();
};