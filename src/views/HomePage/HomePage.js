import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pagination from 'react-js-pagination'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { PAGE_PER_COUNT, PAGE_RANGE_DISPLAYED } from '../../constants/page'
import {
    fetchPhotoListRequest,
    favoritePhotoRequest,
} from '../../actions/photo'
import 'react-lazy-load-image-component/src/effects/opacity.css' // one of opacity | blur | black-and-white
import './style.scss'

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: 1,
            selectedIndex: 0,
            lightboxIsOpen: false,
        }
    }

    componentDidMount() {
        const { fetchPhotoList } = this.props
        fetchPhotoList()
    }

    handlePageChange = pageNumber => {
        this.setState({ activePage: pageNumber })
    }

    toggleLightbox = selectedIndex => {
        this.setState(state => ({
            lightboxIsOpen: !state.lightboxIsOpen,
            selectedIndex,
        }))
    }

    render() {
        const { photos, favorites, favoritePhoto } = this.props
        const { activePage, selectedIndex, lightboxIsOpen } = this.state
        const images = photos
            .slice(
                (activePage - 1) * PAGE_PER_COUNT,
                activePage * PAGE_PER_COUNT
            )
            .map(({ id, title, thumbnailUrl, url }) => {
                return {
                    id,
                    caption: title,
                    source: {
                        thumbnail: thumbnailUrl,
                        regular: url,
                    },
                }
            })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 my-3">
                        <h3 className="text-center">
                            Your Favorites:
                            <span className="text-success ml-3">
                                {favorites.length}
                            </span>
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 gallery">
                        {images.map(({ id, caption, source }, j) => (
                            <div key={id} className="img-wrap m-1">
                                <LazyLoadImage
                                    alt={caption}
                                    src={source.thumbnail}
                                    effect="opacity"
                                    height={150}
                                    width={150}
                                />
                                <div
                                    className="img-overlay"
                                    onClick={() => this.toggleLightbox(j)}
                                    role="presentation"
                                />
                                <button
                                    type="button"
                                    className={`btn favorite-btn ${
                                        favorites.includes(id)
                                            ? 'favorited'
                                            : ''
                                    }`}
                                    onClick={() => favoritePhoto(id)}
                                >
                                    <i
                                        className={`fa ${
                                            favorites.includes(id)
                                                ? 'fa-heart'
                                                : 'fa-heart-o'
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                        <ModalGateway>
                            {lightboxIsOpen ? (
                                <Modal
                                    onClose={this.toggleLightbox}
                                    allowFullscreen={false}
                                >
                                    <Carousel
                                        currentIndex={selectedIndex}
                                        views={images}
                                    />
                                </Modal>
                            ) : null}
                        </ModalGateway>
                    </div>
                </div>
                <Pagination
                    innerClass="pagination pagination-sm justify-content-center my-3"
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={activePage}
                    itemsCountPerPage={PAGE_PER_COUNT}
                    totalItemsCount={photos.length}
                    pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}

HomePage.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object),
    favorites: PropTypes.arrayOf(PropTypes.number),
    fetchPhotoList: PropTypes.func.isRequired,
    favoritePhoto: PropTypes.func.isRequired,
}

HomePage.defaultProps = {
    photos: [],
    favorites: [],
}

const mapStateToProps = state => ({
    photos: state.photo.photoList,
    favorites: state.photo.favoriteList,
})

const mapDispatchToProps = {
    fetchPhotoList: fetchPhotoListRequest,
    favoritePhoto: favoritePhotoRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
