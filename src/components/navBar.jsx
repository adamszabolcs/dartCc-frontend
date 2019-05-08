import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css'
import whitedart from '../whitedart.png';
import 'bootstrap/js/src/collapse';


class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        }
    }

    componentDidMount() {
        let mainNavLinks = document.getElementsByClassName("nav-link");
        for (let i = 0; i < mainNavLinks.length; i++) {
            let currentNav = mainNavLinks[i];
            mainNavLinks[i].addEventListener('click', function () {
                let current = document.getElementsByClassName("isactive");
                current[0].className = current[0].className.replace(" isactive", "");
                currentNav.className += " isactive";
            })
        }

        window.onscroll = function() {
            let scrollDistance = window.pageYOffset;
            let sections = document.getElementsByClassName("resume-section");

            for (let i = 0; i < sections.length; i++) {
                let section = sections[i];
                if (section.offsetTop <= scrollDistance) {
                    document.querySelector(".nav-item a.isactive").classList.remove("isactive");
                    document.querySelectorAll(".nav-item a")[i].classList.add("isactive");
                }
            }
        }

    };

    toggleNavBar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                <a className="navbar-brand js-scroll-trigger" href="#board">
                    <span className="d-block d-lg-none">
                        <img className="mx-auto mb-3"
                             src={whitedart}
                             height="30px"
                             width="30px"
                             alt=""/></span>
                    <span className="d-none d-lg-block">
                        <img className="mx-auto mb-3"
                             src={whitedart}
                             height="30px"
                             width="30px"
                             alt=""/>
                    </span>
                </a>
                <button onClick={this.toggleNavBar} className={`${classTwo}`} type="button" data-toggle="collapse"
                        data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${classOne}`} id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger isactive" href="#letsplay">Let's play!</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#board">Board</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#help">About the game</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#register">Register/Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#aboutus">About us</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;