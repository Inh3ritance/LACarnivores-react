import React from 'react';
import './Nav.scss';

class Nav extends React.Component {

  /* Constructor */
  constructor(props) {
        super(props);
        this.state = { };
        this.handleScroll = this.handleScroll.bind(this);
  }

  /* Function handling/setting scroll state*/
  handleScroll() {
        this.setState({scroll: window.scrollY});
  }

  /* Immediatly set the state for scroll */
  componentDidMount() {
        const move = document.querySelector('nav');
        this.setState({top: move.offsetTop, height: move.offsetHeight});
        window.addEventListener('scroll', this.handleScroll);
  }

  /* Update scroll position after mounting */
  componentDidUpdate() {
        this.state.scroll > this.state.top ? 
            document.body.style.paddingTop = `${this.state.height}px` :
            document.body.style.paddingTop = 0;
  }
    
  render() {
    return (
        <div>
            <nav className={this.state.scroll > this.state.top ? "fixed-nav" : ""}>
		        <h1 id = "Company_Name">LA Carnivores</h1>
                <div id="Right_Buttons"> <h2>My Cart 0</h2> </div>
            </nav>
        </div>
    );
  }

}

export default Nav;