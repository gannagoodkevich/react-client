import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios';
import Cookies from 'js-cookie';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.openPopup = this.openPopup.bind(this);
        this.destroy = this.destroy.bind(this);
        this.google = this.google.bind(this);
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

    destroy(){
        //Cookies.get('user_id')
        axios.delete('http://localhost:3001/not_devise/users/sign_out', {params: {user_id:  Cookies.get('user_id')}})
        Cookies.set('user_id', 'nil', { path: '/' });
    }

    google(){
        const provider = 'google_oauth2'
        //const socket = io("http://localhost:3000")
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `http://localhost:3001/users/auth/google_oauth2`


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
                <button
                    onClick={this.google}
                >
                    Login with google
                </button>
                <button onClick={this.destroy}>
                    Log out
                </button>
            </div>
        )
    }
}

export default UserLogin;
