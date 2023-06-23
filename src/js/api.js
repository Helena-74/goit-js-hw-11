import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchInput = document.querySelector('input[name="searchQuery"]');
  searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '37685879-75fb45f515a39c48fce6291c7',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
      },
    });

    const images = response.data.hits.map((image) => ({
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
      likes: image.likes,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
    }));

    if (images.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    renderGallery(images);
    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    loadMoreButton.style.display = 'block';
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '37685879-75fb45f515a39c48fce6291c7',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });
    const images = response.data.hits.map((image) => ({
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
      likes: image.likes,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
    }));

    if (images.length === 0) {
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.info('No more images to load.');
      return;
    }

    renderGallery(images);
    Notiflix.Notify.success(`Loaded ${images.length} more images.`);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred while fetching more images. Please try again later.');
  }
});

function renderGallery(images) {
  const galleryItems = images.map((image) => {
    return `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        <div class="image-details">
          <span class="likes">${image.likes} likes</span>
          <span class="views">${image.views} views</span>
          <span class="comments">${image.comments} comments</span>
          <span class="downloads">${image.downloads} downloads</span>
        </div>
      </a>
    `;
  });

  gallery.innerHTML = galleryItems.join('');

  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });

  lightbox.on('show.simplelightbox', () => {
    document.body.style.overflow = 'hidden';
  });

  lightbox.on('closed.simplelightbox', () => {
    document.body.style.overflow = 'auto';
  });
}