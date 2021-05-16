import React from 'react';
import './ToggleSwitch.scss';

import { NavLink } from "react-router-dom";

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
          <NavLink activeClassName="active" exact to='/'><button onClick={this.onSelector} value="Default"><h2 className = "s2">Home</h2></button></NavLink>
          <NavLink activeClassName="active" exact to='/Starter'><button onClick={this.onSelector} value="Starter"><h2 className = "s2">Starter</h2></button></NavLink>
          <NavLink activeClassName="active" exact to='/Bogs'><button onClick={this.onSelector} value="Bogs"><h2 className = "s2">Bogs</h2></button></NavLink>
          <NavLink activeClassName="active" exact to='/Hardy'><button onClick={this.onSelector} value="Hardy"><h2 className = "s2">Cold & Hardy</h2></button></NavLink>
          <NavLink activeClassName="active" exact to='/Tropical'><button onClick={this.onSelector} value="Tropical"><h2 className = "s2">Tropical</h2></button></NavLink>
          <NavLink activeClassName="active" exact to='/Nepenthes'><button onClick={this.onSelector} value="Nepenthes"><h2 className = "s2">Nepenthes</h2></button></NavLink>
        </div>
      );
  }
}

export default ToggleSwitch;