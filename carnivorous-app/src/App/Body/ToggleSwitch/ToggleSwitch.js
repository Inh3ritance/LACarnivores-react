import React from 'react';
import './ToggleSwitch.scss';

class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = '';
    //this.handleClick = this.handleClick.bind(this);
  }

    onSelector(selector) {
        this.props.Selector(selector.target.value);
    }

  /*handleClick(e){
	var eVal = e.target.value;
    this.setState(state => ({
      value :  eVal
    }));      
  }*/
    
  render(){
	  
  return (
	<div>
      <button onClick={this.onSelector.bind(this)} value = "Default"><h2>Home</h2></button>
      <button onClick={this.onSelector.bind(this)} value = "Hardy"><h2>Cold & Hardy</h2></button>
      <button onClick={this.onSelector.bind(this)} value = "Tropical"><h2>Tropical</h2></button>
      <button onClick={this.onSelector.bind(this)} value = "Byblis"><h2>Byblis</h2></button>
      <button onClick={this.onSelector.bind(this)} value = "Nepenthes"><h2>Nepenthes</h2></button>
	</div>
    );
  }
}

export default ToggleSwitch;