import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchInput = document.querySelector('input[name="searchQuery"]');
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: 'YOUR_API_KEY',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    const images = response.data.hits;

    if (images.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    renderGallery(images);
    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
});

const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  gallery.innerHTML = '';

  images.forEach((image) => {
    const photoCard = createPhotoCard(image);
    gallery.appendChild(photoCard);
  });

  // Ініціалізувати SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

function createPhotoCard(image) {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const imageElement = document.createElement('img');
  imageElement.src = webformatURL;
  imageElement.alt = tags;
  imageElement.loading = 'lazy';

  const infoElement = document.createElement('div');
  infoElement.classList.add('info');

  const likesElement = createInfoItem('Likes', likes);
  const viewsElement = createInfoItem('Views', views);
  const commentsElement = createInfoItem('Comments', comments);
  const downloadsElement = createInfoItem('Downloads', downloads);

  infoElement.append(likesElement, viewsElement, commentsElement, downloadsElement);
  photoCard.append(imageElement, infoElement);

  return photoCard;
}

function createInfoItem(label, value) {
  const infoItem = document.createElement('p');
  infoItem.classList.add('info-item');
  infoItem.innerHTML = `<b>${label}:</b> ${value}`;
  return infoItem;
}

const loadMoreButton = document.querySelector('.load-more');
let currentPage = 1;

loadMoreButton.addEventListener('click', async () => {
  currentPage++;

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: 'YOUR_API_KEY',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });

    const images = response.data.hits;

    if (images.length === 0) {
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }

    renderGallery(images);

    // Scroll to the newly added images
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
});