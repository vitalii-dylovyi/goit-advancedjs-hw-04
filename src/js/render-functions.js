import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery;

export const addLoader = () => {
  // const loaderEl = document.createElement('span');
  // loaderEl.classList.add('loader');
  // document.querySelector('.loader-container').append(loaderEl);
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');
};

export const removeLoader = () => {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
  // loader.remove();
};

const getGalleryEl = () => document.querySelector('ul.gallery');

const createInfoCol = (label, value) => {
  const colEl = document.createElement('div');
  colEl.classList.add('info-col');
  const labelEl = document.createElement('span');
  labelEl.classList.add('info-label');
  labelEl.textContent = label;
  const valueEl = document.createElement('span');
  valueEl.classList.add('info-value');
  valueEl.textContent = value;
  colEl.append(labelEl, valueEl);

  return colEl;
};

const createGalleryItemInfo = image => {
  const galleryItemInfoEl = document.createElement('div');
  galleryItemInfoEl.classList.add('gallery-item-info');
  const likesEl = createInfoCol('Likes', image.likes);
  const viewsEl = createInfoCol('Views', image.views);
  const commentsEl = createInfoCol('Comments', image.comments);
  const downloadsEl = createInfoCol('Downloads', image.downloads);

  galleryItemInfoEl.append(likesEl, viewsEl, commentsEl, downloadsEl);

  return galleryItemInfoEl;
};

export const destroyGallery = () => {
  if (gallery) {
    gallery.destroy();

    const galleryEl = getGalleryEl();
    galleryEl.replaceChildren();
  }
};

export const renderGallery = images => {
  const galleryEl = getGalleryEl();

  const galleryElements = images.map(image => {
    const galleryItemEl = document.createElement('li');
    galleryItemEl.classList.add('gallery-item');

    const galleryItemInfoEl = createGalleryItemInfo(image);

    const galleryLinkEl = document.createElement('a');
    galleryLinkEl.classList.add('gallery-link');
    galleryLinkEl.setAttribute('href', image.webformatURL);

    const imageEl = document.createElement('img');
    imageEl.classList.add('gallery-image');
    imageEl.setAttribute('alt', image.tags);
    imageEl.setAttribute('src', image.largeImageURL);
    // imageEl.setAttribute('data-source', image.largeImageURL);

    galleryItemEl.append(galleryLinkEl);
    galleryItemEl.append(galleryItemInfoEl);

    galleryLinkEl.append(imageEl);

    return galleryItemEl;
  });

  galleryEl.append(...galleryElements);

  gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};
