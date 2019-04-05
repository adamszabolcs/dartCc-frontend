import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../resume.css'
import whitedart from '../whitedart.png';
import $ from 'jquery';


class NavBar extends Component {

    componentDidMount() {
        let mainNavLinks = document.getElementsByClassName("nav-link");
        for (let i = 0; i < mainNavLinks.length; i++) {
            let currentNav = mainNavLinks[i];
            mainNavLinks[i].addEventListener('click', function() {
                let current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                currentNav.className += " active";
            })
        }

        $(window).scroll(function() {
            var scrollDistance = $(window).scrollTop();

            // Assign active class to nav links while scolling
            $('.resume-section').each(function(i) {
                if ($(this).position().top <= scrollDistance) {
                    $('.nav-item a.active').removeClass('active');
                    $('.nav-item a').eq(i).addClass('active');
                }
            });
        }).scroll();

    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">
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
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger active" href="#letsplay">Let's play!</a>
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