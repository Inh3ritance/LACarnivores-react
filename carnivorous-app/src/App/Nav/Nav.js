import React from 'react';
import './Nav.scss';

class Nav extends React.Component {
  constructor(props) {
        super(props);

        this.state = {};

        this.handleScroll = this.handleScroll.bind(this);
  }

    handleScroll() {
        this.setState({scroll: window.scrollY});
  }
  
  componentDidMount() {
        const move = document.querySelector('nav');
        this.setState({top: move.offsetTop, height: move.offsetHeight});
        window.addEventListener('scroll', this.handleScroll);
  }
  
  componentDidUpdate() {
        this.state.scroll > this.state.top ? 
            document.body.style.paddingTop = `${this.state.height}px` :
            document.body.style.paddingTop = 0;
  }
    
  render() {
    return (
    <nav className={this.state.scroll > this.state.top ? "fixed-nav" : ""}>
		<h1 id = "Company_Name">LA CARNIVORES</h1>
		<div id = "Right_Buttons">
			<h2>Search</h2>
			<h2>shopping cart image</h2>
		</div>
	</nav>
    );
  }

}

export default Nav;