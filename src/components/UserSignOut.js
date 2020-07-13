import React, { Component } from 'react'

export default class UserSignOut extends Component {

    handleCancel= (e) => {
        alert("Cancel Clicked")
        e.preventDefault();  
        window.location.href='/signin';
    }

    signOut = () => {
        this.setState({user: []})
        this.setState({userPass: ''})
        localStorage.clear();
        window.location.href='/signin'
      }

    render(){
        return(
            <div className="centered">
                <h1 className="grid-33 centered">Signout</h1>
                <div className="grid-33 centered pad-bottom">
                    <button className="button" onClick={this.signOut}>Sign Out</button>
                    <button className="button button-secondary" 
                    onClick={this.handleCancel}> Cancel </button>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
        )
    }
}