import React from 'react';
import './ToggleSwitch.scss';

/* State that changes ProductCard view instead of a redirecting link */
class ToggleSwitch extends React.Component {

  constructor(props) {
      super(props);
      this.onSelector = this.onSelector.bind(this);
  }

  onSelector(event) {
      this.props.Selector(event.currentTarget.value);
  }
 
  render() {
      return (
        <div>
          <button onClick={this.onSelector} value="Default"><h2 className = "s2">Home</h2></button>
          <button onClick={this.onSelector} value="Hardy"><h2 className = "s2">Cold & Hardy</h2></button>
          <button onClick={this.onSelector} value="Tropical"><h2 className = "s2">Tropical</h2></button>
          <button onClick={this.onSelector} value="Byblis"><h2 className = "s2">Byblis</h2></button>
          <button onClick={this.onSelector} value="Nepenthes"><h2 className = "s2">Nepenthes</h2></button>
        </div>
      );
  }
}

export default ToggleSwitch;