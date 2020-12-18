import React from 'react';
import './ProductExpansion.scss';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Takes information from ProductCard To expand into an individual box model */
const ProductExpansion = ({ view, closeView, meta }) => {
    if (view) {
        return (
            <div className="model">
                <Carousel className="carousel-fade">
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b><svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                        </svg></b></h2></button>
                        <img
                            alt="IMG_01"
                            className="d-block w-100"
                            src={meta.images[0]}//should be [1][2][3] 
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b><svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                        </svg></b></h2></button>
                        <img
                            alt="IMG_02"
                            className="d-block w-100"
                            src={meta.images[1]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b><svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                        </svg></b></h2></button>
                        <img
                            alt="IMG_03"
                            className="d-block w-100"
                            src={meta.images[2]}
                        />
                    </Carousel.Item>
                </Carousel>

                <h1 className="product-name">{meta.name}</h1>
                <p><b>Description: </b></p>
                <p className="pad">{meta.description}</p>
                <p><b>What you will recieve: </b></p>
                <p className="pad">{meta.metadata.receive}</p>
                <p><b>Zones: </b></p>
                <p className="pad">{meta.metadata.zones}</p>
                <p><b>Water: </b></p>
                <p className="pad">{meta.metadata.water}</p>
                <p><b>Soil: </b></p>
                <p className="pad">{meta.metadata.soil}</p>
                <p><b>Lighting: </b></p>
                <p className="pad" id="end">{meta.metadata.light}</p>
            </div>
        )
    } else {
        return <span></span>
    }
}

export default ProductExpansion;