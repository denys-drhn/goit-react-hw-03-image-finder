import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number,
  };

  state = {
    isModalOpen: false,
    largeImageURL: '',
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  handleOpenModal = largeImageURL => {
    this.setState({
      isModalOpen: true,
      largeImageURL,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { image, index } = this.props;
    const { isModalOpen } = this.state;
    return (
      <li key={index} className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => this.handleOpenModal(image.largeImageURL)}
        />
        {isModalOpen && <Modal onClose={this.handleCloseModal} image={image} />}
      </li>
    );
  }
}
