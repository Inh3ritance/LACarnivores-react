import React from 'react';
import './ToggleSwitch.scss';

import { Link } from "react-router-dom";

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
          <Link to='/'><button onClick={this.onSelector} value="Default"><h2 className = "s2">Home</h2></button></Link>
          <Link to='/Starter'><button onClick={this.onSelector} value="Starter"><h2 className = "s2">Starter</h2></button></Link>
          <Link to='/Bogs'><button onClick={this.onSelector} value="Bogs"><h2 className = "s2">Bogs</h2></button></Link>
          <Link to='/Hardy'><button onClick={this.onSelector} value="Hardy"><h2 className = "s2">Cold & Hardy</h2></button></Link>
          <Link to='/Tropical'><button onClick={this.onSelector} value="Tropical"><h2 className = "s2">Tropical</h2></button></Link>
          <Link to='/Nepenthes'><button onClick={this.onSelector} value="Nepenthes"><h2 className = "s2">Nepenthes</h2></button></Link>
        </div>
      );
  }
}

export default ToggleSwitch;