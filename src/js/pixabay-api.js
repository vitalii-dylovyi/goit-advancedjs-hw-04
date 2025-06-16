import axios from 'axios';

const apiKey = '50706028-1c89dce29f588a1d4e8ec62d3';

export const loadImages = async (search, page = 1) => {
  const url = new URL('https://pixabay.com/api/');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', search);
  url.searchParams.set('page', page);
  url.searchParams.set('per_page', 15);
  url.searchParams.set('image_type', 'photo');
  url.searchParams.set('orientation', 'horizontal');
  url.searchParams.set('safesearch', true);

  try {
    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
