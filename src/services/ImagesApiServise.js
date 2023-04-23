import axios from 'axios';
export default class ImagesApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fechImages() {
    const params = {
      key: '34146115-f93b131a505bf9d05e96b838b',
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      orientation: 'horizontal',
      safesearch: true,
      image_type: 'photo',
    };
    const response = await axios.get('https://pixabay.com/api/', { params });
    // console.log(response);
    const data = response.data;
    // console.log(response.data);
    // console.log(data);
    this.page += 1;
    return data;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
