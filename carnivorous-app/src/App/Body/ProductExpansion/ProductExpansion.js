import React from 'react';
import './ProductExpansion.scss';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Takes information from ProductCard To expand into an individual box model */
const ProductExpansion = ({ id, quantity, visible, view, closeView, plant_info}) => {
    if (view) {
        return (
            <div className="model">
                <Carousel>
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b>X</b></h2></button>
                        <img
                            alt="IMG_01"
                            className="d-block w-100"
                            src={plant_info[10][1]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b>X</b></h2></button>
                        <img
                            alt="IMG_02"
                            className="d-block w-100"
                            src={plant_info[10][1]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <button className="Close" onClick={() => closeView({ view: false })}><h2><b>X</b></h2></button>
                        <img
                            alt="IMG_03"
                            className="d-block w-100"
                            src={plant_info[10][1]}
                        />
                    </Carousel.Item>
                </Carousel>

                <h1 className="product-name">{plant_info[0]}</h1>
                <p><b>Description: </b></p>
                <p className="pad">{plant_info[2]}</p>
                <p><b>What you will recieve: </b></p>
                <p className="pad">{plant_info[4]}</p>
                <p><b>Zones: </b></p>
                <p className="pad">{plant_info[5]}</p>
                <p><b>Water: </b></p>
                <p className="pad">{plant_info[6]}</p>
                <p><b>Soil: </b></p>
                <p className="pad">{plant_info[7]}</p>
                <p><b>Lighting: </b></p>
                <p className="pad" id="end">{plant_info[8]}</p>
            </div>
        )
    } else {
        return <span></span>
    }
} 

export default ProductExpansion;