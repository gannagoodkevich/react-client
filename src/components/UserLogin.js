import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import ListsContainer from "./ListsContainer";

class UserLogin extends Component {
    render() {
        return (
            <div className="content"> <h1> Login page </h1>
                <BrowserRouter>
                    <nav className="navbar navbar-light">
                        <ul className="nav navbar-nav">
                            <li><Link to="/users/auth/google_oauth2">Login with google</Link></li>
                        </ul>
                    </nav>

                </BrowserRouter>
            </div>
        )
    }
}

export default UserLogin;
