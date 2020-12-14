import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import image from "./robot.png"
export default function Header(props) {
    return (
        <div>
            <div className="header-blue">
                <div className="robot-image">
                <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
                    <div className="container-fluid"><a className="navbar-brand" href="#">ROBOT RESERVATION</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="nav navbar-nav">
                                <li className="nav-item" role="presentation"><a className="nav-link" href="#">Contact</a></li>
                                <Link to='/reservation'><li className="nav-item dropdown"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">Services</a></li></Link>
                            </ul>
                            <form className="form-inline mr-auto" target="_self">
                                <div className="form-group"><label for="search-field"><i className="fa fa-search text-white"></i></label></div>
                            </form>
                            {
                                props.isAuthenticated ? 
                                <a className="btn btn-light action-button" role="button" href="#" onClick={props.onLogout}>Logout</a>
                                :
                                <Link to='/login'><a className="btn btn-light action-button" role="button" href="#">Account</a></Link>
                            }
                        </div>
                    </div>
                </nav>
                <div className="container hero">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
                            <h1>Robot reservation app</h1>
                            <p>This application's aim is to help students and teachers to reserved laboratory's robots for their study and research. Students must reserve for using robot before using them. <br /></p> <button className="btn btn-light btn-lg action-button" type="button">Learn More<i className="fa fa-long-arrow-right ml-2"></i></button>
                        </div>
                        <div className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
                            <div className="iphone-mockup"> <img className="device" src="" />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}