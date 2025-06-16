import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import { loadImages } from './js/pixabay-api';
import {
  addLoader,
  removeLoader,
  renderGallery,
  destroyGallery,
} from './js/render-functions';

let search;
let searchPage;
let maxPage;

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;
  const searchValue = form.search.value;
  if (!searchValue.trim()) return;

  destroyGallery();
  addLoader();

  try {
    const res = await loadImages(searchValue);
    loadMoreBtn.classList.remove('hidden');
    search = searchValue;
    searchPage = 1;

    const images = res.hits;
    maxPage = Math.ceil(res.totalHits / 15);

    if (!images.length)
      return iziToast.error({
        progressBar: false,
        position: 'topRight',
        animateInside: false,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

    renderGallery(images);
  } catch (err) {
    loadMoreBtn.classList.add('hidden');
    iziToast.error({
      progressBar: false,
      position: 'topRight',
      animateInside: false,
      message: err,
    });
  }
  removeLoader();
});

loadMoreBtn.addEventListener('click', async () => {
  if (!search) return;

  loadMoreBtn.classList.add('hidden');
  addLoader();
  try {
    searchPage += 1;
    const res = await loadImages(search, searchPage);
    const images = res.hits;
    renderGallery(images);
    const galleryItemEl = document.querySelector('.gallery-item');

    setTimeout(() => {
      window.scrollBy({
        behavior: 'smooth',
        top: galleryItemEl.getBoundingClientRect().height * 2,
      });
    });

    if (searchPage === maxPage) {
      iziToast.info({
        progressBar: false,
        position: 'topRight',
        animateInside: false,
        message: `We're sorry, but you've reached the end of search results.`,
      });
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (err) {
    console.error(err);
    iziToast.error({
      progressBar: false,
      position: 'topRight',
      animateInside: false,
      message: err,
    });
  }
  removeLoader();
});
