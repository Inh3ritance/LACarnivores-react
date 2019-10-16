import React from 'react';
import Body from '../Body.js';
import './ProductExpansion.scss';


//import { Stage, Sprite } from '@inlet/react-pixi';
/*const BI = () => (
    <div>
        <Stage width={1200} height={600} options={{ backgroundColor: 0xeef1f5 }}>
            <Sprite
                    image="https://source.unsplash.com/user/erondu/600x400"
            scale={{ x: 2, y: 2 }}
            />
        </Stage>
     </div>
);*/

const ProductExpansion = ({ id, quantity, type, name, description, img, price, visible, view, closeView}) => {
    if (view) {
        return (
            <div className="model">
                <div className="Carousel" style={{ backgroundImage: 'url(.' + img[1] + ')' }}> {/* <BI/> */}
                    <button className="Close" onClick={() => closeView({view:false})}><h2>X</h2></button>
                </div>
                <h1 className="product-name">Name</h1>
            </div>
        )
    } else {
        return <span></span>
    }
} 

export default ProductExpansion;