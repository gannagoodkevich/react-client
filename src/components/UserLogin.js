import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.openPopup = this.openPopup.bind(this);
    }

    openPopup() {
        const provider = 'facebook'
        //const socket = io("http://localhost:3000")
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `http://localhost:3001/users/auth/facebook`


        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
        )
    }

    render() {
        return (
            <div className="content"> <h1> Login page </h1>
                <button
                    onClick={this.openPopup}
                >
                    Login with facebook
                </button>
            </div>
        )
    }
}

export default UserLogin;
