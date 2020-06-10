import React from 'react';
import './ProductExpansion.scss';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Takes information from ProductCard To expand into an individual box model */
const ProductExpansion = ({ id, visible, view, closeView, images, metadata, name}) => {
    if (view) {
        return (
            <div className="model">
                <Carousel className = "carousel-fade">
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b>X</b></h2></button>
                        <img
                            alt="IMG_01"
                            className="d-block w-100"
                            src={images[0]}//should be [1][2][3] 
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b>X</b></h2></button>
                        <img
                            alt="IMG_02"
                            className="d-block w-100"
                            src={images}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b>X</b></h2></button>
                        <img
                            alt="IMG_03"
                            className="d-block w-100"
                            src={images}
                        />
                    </Carousel.Item>
                </Carousel>

                <h1 className="product-name">{name}</h1>
                <p><b>Description: </b></p>
                <p className="pad">{""}</p>
                <p><b>What you will recieve: </b></p>
                <p className="pad">{""}</p>
                <p><b>Zones: </b></p>
                <p className="pad">{""}</p>
                <p><b>Water: </b></p>
                <p className="pad">{""}</p>
                <p><b>Soil: </b></p>
                <p className="pad">{""}</p>
                <p><b>Lighting: </b></p>
                <p className="pad" id="end">{""}</p>
            </div>
        )
    } else {
        return <span></span>
    }
} 

export default ProductExpansion;