import React from 'react';
import './ProductCard.scss';

class ProductCardHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = { 
        backgroundImage: 'url(' +  image + ')', height:'200px',width:'100px',width:'100%',
    };
	
	//get rid of inline styles
    return (
      <div style={style} id={image} className="product-header"> 
        <h4 className="product-name">Product Name</h4>
      </div>
    )
  }
}

class Button extends React.Component {
  render() {
    return (
      <button>- Add to Cart +</button> //Add button -  p button +
    )
  }
}

class ProductCardBody extends React.Component {
  render() {
    return (
      <div className="product-card-body">
        
        <p className="price">{this.props.title}</p>
        
        <p className="product-body-content">{this.props.text}</p>
        
        <Button/>
      </div>
    )
  }
}

class ProductCard extends React.Component {	

	constructor(props){
		super(props);
		
	}
	
render() {
    return (
      <div className="product-card">
        <ProductCardHeader image={'https://source.unsplash.com/user/erondu/600x400'}/>
        <ProductCardBody title={'price'} text={'This is an example'}/>
      </div>
    )
  }
}

export default ProductCard;