const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
let apiKey = "4c32a628146841299f4f356e4276ba9a"; // Ganti dengan kunci API News Anda
let requestURL;
let selectedCategory = "general"; // Kategori default

const options = ["general", "sport", "science", "entertainment", "politics"];

// Create cards from data
const generateUI = (articles) => {
    for (let item of articles) {
        // Log the image URL to the console
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


// News API Call
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

// Category Selection
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });

    selectedCategory = category; // Menyimpan nilai kategori yang dipilih

    // Pastikan URL menggunakan HTTPS
    // let requestURL = `https://newsapi.org/v2/top-headlines?country=id&category=general&apiKey=4c32a628146841299f4f356e4276ba9a`;

    requestURL = `https://newsapi.org/v2/top-headlines?country=id&category=${selectedCategory}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
};

// Options Buttons
const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${
            i === selectedCategory ? "active" : ""
        }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

const init = (selectedCountry, selectedApiKey, selectedCategory) => {
    // Mengganti nilai country, apiKey, dan selectedCategory jika disediakan
    if (selectedCountry) {
        country = selectedCountry;
    }

    if (selectedApiKey) {
        apiKey = selectedApiKey;
    }

    if (selectedCategory) {
        selectedCategory = selectedCategory;
    }

    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${selectedCategory}&apiKey=${apiKey}`;
    init();
};