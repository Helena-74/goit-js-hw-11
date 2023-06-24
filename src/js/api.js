// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const form = document.getElementById('search-form');
// const gallery = document.getElementById('gallery');
// const loadMoreButton = document.getElementById('load-more');
// let currentPage = 1;
// let searchQuery = '';
// let totalHits = 0;

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   resetGallery();
//   resetSearch();
//   hideLoadMoreButton();

//   const searchInput = document.querySelector('input[name="searchQuery"]');
//   searchQuery = searchInput.value.trim();

//   if (searchQuery === '') {
//     return;
//   }

//   currentPage = 1;

//   try {
//     const response = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: '37685879-75fb45f515a39c48fce6291c7',
//         q: searchQuery,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: currentPage,
//         per_page: 40,
//       },
//     });

//     const { hits, totalHits: newTotalHits } = response.data;

//     totalHits = newTotalHits;

//     const images = hits.map((image) => ({
//       webformatURL: image.webformatURL,
//       largeImageURL: image.largeImageURL,
//       tags: image.tags,
//       likes: image.likes,
//       views: image.views,
//       comments: image.comments,
//       downloads: image.downloads,
//     }));

//     if (images.length === 0) {
//       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//       return;
//     }

//     renderGallery(images);
//     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

//     if (images.length < 40 || images.length >= totalHits) {
//       hideLoadMoreButton();
//     } else {
//       showLoadMoreButton();
//     }
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
//   }
// });

// loadMoreButton.addEventListener('click', async () => {
//   currentPage++;

//   try {
//     const response = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: '37685879-75fb45f515a39c48fce6291c7',
//         q: searchQuery,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: currentPage,
//         per_page: 40,
//       },
//     });

//     const { hits } = response.data;

//     const images = hits.map((image) => ({
//       webformatURL: image.webformatURL,
//       largeImageURL: image.largeImageURL,
//       tags: image.tags,
//       likes: image.likes,
//       views: image.views,
//       comments: image.comments,
//       downloads: image.downloads,
//     }));

//     if (images.length === 0) {
//       hideLoadMoreButton();
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//       return;
//     }

//     renderGallery(images);
//     Notiflix.Notify.success(`Loaded ${images.length} more images.`);

//     if (images.length + (currentPage - 1) * 40 >= totalHits) {
//       hideLoadMoreButton();
//     } else {
//       showLoadMoreButton();
//     }
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('An error occurred while fetching more images. Please try again later.');
//   }
// });

// function renderGallery(images) {
//   const galleryItems = images.map((image) => {
//     return `
//       <a href="${image.largeImageURL}" class="gallery-item">
//         <img src="${image.webformatURL}" alt="${image.tags}" />
//         <div class="image-details">
//           <span class="likes">${image.likes} likes</span>
//           <span class="views">${image.views} views</span>
//           <span class="comments">${image.comments} comments</span>
//           <span class="downloads">${image.downloads} downloads</span>
//         </div>
//       </a>
//     `;
//   });

//   gallery.innerHTML += galleryItems.join('');

//   const lightbox = new SimpleLightbox('.gallery-item', {
//     captionsData: 'alt',
//     captionDelay: 250,
//     captionPosition: 'bottom',
//   });

//   lightbox.on('show.simplelightbox', () => {
//     document.body.style.overflow = 'hidden';
//   });

//   lightbox.on('closed.simplelightbox', () => {
//     document.body.style.overflow = 'auto';
//   });
// }

// function resetGallery() {
//   gallery.innerHTML = '';
// }

// function resetSearch() {
//   searchQuery = '';
// }

// function showLoadMoreButton() {
//   loadMoreButton.style.display = 'block';
// }

// function hideLoadMoreButton() {
//   loadMoreButton.style.display = 'none';
// }

// function resetGallery() {
//   gallery.innerHTML = '';
// }

// function resetSearch() {
//   searchQuery = '';
//   totalHits = 0;
// }

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   resetGallery();
//   resetSearch();
//   hideLoadMoreButton();

//   const searchInput = document.querySelector('input[name="searchQuery"]');
//   searchQuery = searchInput.value.trim();

//   if (searchQuery === '') {
//     return;
//   }

//   currentPage = 1;

//   try {
//     const response = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: '37685879-75fb45f515a39c48fce6291c7',
//         q: searchQuery,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: currentPage,
//         per_page: 40,
//       },
//     });

//     const { hits, totalHits: newTotalHits } = response.data;

//     totalHits = newTotalHits;

//     const images = hits.map((image) => ({
//       webformatURL: image.webformatURL,
//       largeImageURL: image.largeImageURL,
//       tags: image.tags,
//       likes: image.likes,
//       views: image.views,
//       comments: image.comments,
//       downloads: image.downloads,
//     }));

//     if (images.length === 0) {
//       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//       return;
//     }

//     renderGallery(images);
//     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//     showLoadMoreButton();
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
//   }
// });


import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
let currentPage = 1;
let searchQuery = '';
let totalHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  resetGallery();
  resetSearch();
  hideLoadMoreButton();

  const searchInput = document.querySelector('input[name="searchQuery"]');
  searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  currentPage = 1;

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

    const { hits, totalHits: newTotalHits } = response.data;

    totalHits = newTotalHits;

    const images = hits.map((image) => ({
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
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    if (images.length < 40 || images.length >= totalHits) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
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

    const { hits } = response.data;

    const images = hits.map((image) => ({
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
      likes: image.likes,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
    }));

    if (images.length === 0) {
      hideLoadMoreButton();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }

    renderGallery(images);
    Notiflix.Notify.success(`Loaded ${images.length} more images.`);

    if (images.length + (currentPage - 1) * 40 >= totalHits) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
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

  gallery.innerHTML += galleryItems.join('');

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

function resetGallery() {
  gallery.innerHTML = '';
}

function resetSearch() {
  searchQuery = '';
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

function resetGallery() {
  gallery.innerHTML = '';
}

function resetSearch() {
  searchQuery = '';
  totalHits = 0;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  resetGallery();
  resetSearch();
  hideLoadMoreButton();

  const searchInput = document.querySelector('input[name="searchQuery"]');
  searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  currentPage = 1;

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

    const { hits, totalHits: newTotalHits } = response.data;

    totalHits = newTotalHits;

    const images = hits.map((image) => ({
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
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    showLoadMoreButton();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
});
