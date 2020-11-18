import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div class="header-blue">
                    <nav class="navbar navbar-light navbar-expand-md navigation-clean-search">
                        <div class="container-fluid"><a class="navbar-brand" href="#">BBBOOTSTAP</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                            <div class="collapse navbar-collapse" id="navcol-1">
                                <ul class="nav navbar-nav">
                                    <li class="nav-item" role="presentation"><a class="nav-link" href="#">Contact</a></li>
                                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">Services</a></li>
                                </ul>
                                <form class="form-inline mr-auto" target="_self">
                                    <div class="form-group"><label for="search-field"><i class="fa fa-search text-white"></i></label><input class="form-control search-field" type="search" id="search-field" name="search" /></div>
                                </form>
                                <a class="btn btn-light action-button" role="button" href="#">Account</a>         
                            </div>
                        </div>
                    </nav>
                    <div class="container hero">
                        <div class="row">
                            <div class="col-12 col-lg-6 col-xl-5 offset-xl-1">
                                <h1>Business goal designs</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br /></p> <button class="btn btn-light btn-lg action-button" type="button">Learn More<i class="fa fa-long-arrow-right ml-2"></i></button>
                            </div>
                            <div class="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
                                <div class="iphone-mockup"> <img class="device" src="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}