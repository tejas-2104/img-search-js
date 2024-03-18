const accessKey = 'gLMJEUT3BH-VKeLldsV2ve6VqMOVWdZdHeGD71OZgaI';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const imageContainer = document.getElementById('imageContainer');
const showMoreBtn = document.getElementById('showMoreBtn');
let page = 1;

searchBtn.addEventListener('click', searchImages);
showMoreBtn.addEventListener('click', loadMoreImages);

async function searchImages() {
    page = 1;
    imageContainer.innerHTML = '';
    const query = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

async function loadMoreImages() {
    page++;
    const query = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error fetching more images:', error);
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');
        const img = document.createElement('img');
        img.src = image.urls.regular;
        img.alt = image.alt_description;
        imageItem.appendChild(img);
        imageContainer.appendChild(imageItem);
    });
}
