import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import ImagesApiServise from 'services/ImagesApiServise';
import Spinner from 'components/Loader/Loader';

const imagesApiServise = new ImagesApiServise();

export default class ImageGallery extends Component {
  static propTypes = {
    imageName: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    currentPage: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ images: [], currentPage: 1 });
      this.loadImage();
    }
  }

  loadImage = () => {
    const { imageName } = this.props;
    if (!imageName) {
      return;
    }

    this.setState({ isLoading: true });

    const { currentPage } = this.state;
    imagesApiServise.query = imageName;
    imagesApiServise.page = currentPage;

    imagesApiServise.fechImages().then(({ hits }) => {
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
        isLoading: false,
      }));
    });
  };

  // for button
  handleLoadMore = () => {
    this.loadImage();
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <div>
        <ul className={css.ImageGallery}>
          {images.map((image, index) => (
            <ImageGalleryItem key={index} image={image} />
          ))}
        </ul>
        {isLoading && <Spinner />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
