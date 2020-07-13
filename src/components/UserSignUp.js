import React, { Component } from 'react';
// eslint-disable-next-line
import { btnOnclick, spanOnclick, windowOnclick } from '../modal.js'

import axios from 'axios'
import ReactMarkdown from 'react-markdown'

// import POSTuser from '../action/POSTuser'

/** This component provides the "Sign Up" screen by rendering a 
 * form that allows a user to sign up by creating a new account. 
 * The component also renders a "Sign Up" button that when clicked 
 * sends a POST request to the REST API's /api/users route and signs 
 * in the user. This component also renders a "Cancel" button that 
 * returns the user to the default route (i.e. the list of courses). */

export default class UserSignUp extends Component {

constructor(props){
  super(props)
  this.state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    error: null,
  }
}

onChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
  
  console.log(
  this.setState({ [e.target.name]: e.target.value })
  );
}


handleSubmit= (e) => {
  // if `password` && confirmation match
  if(this.state.password === this.state.confirmPassword){

  // Prevent the page from loading
  e.preventDefault();

  // Store user info into this `body` variable
  let body = {
    firstName: this.state.firstName, // this current state of text on submit 
    lastName: this.state.lastName,
    emailAddress: this.state.emailAddress,
    password: this.state.password,
  };

  // --- AXIOS NOTES:
  // Make an HTTP POST request to the API server `api/users` with `body` variable as data
  //     set error state to null
  //     If the response status returned `Created`
  //       Alert user of succesful creation
  //       Redirect to sign in page
  //     Else if response status is 500 -- server Error
  //       Prevent page reload

  //   Catch error passed from Axios request
  //     store error response in Error state


  axios.post('http://localhost:5000/api/users', body)
  .then(response => {
    this.setState({error: []})
    if(response.status === 201){
      alert(JSON.stringify("User: " + body.emailAddress + " successfully created!"))
      window.location.href = '/signin'
    } else if (response.status === 500) {
      e.preventDefault()
    }
    // -- Catches any errors passed by axios
  }).catch(error => {
        this.setState({error: error.response.data.message}) // store errors in error array
        console.log('Axios POST User ERROR' + this.state.error)
    });

    // If password !== confirm
  } else {
    e.preventDefault();
    this.setState({error: "Password && Confirm Password do not match"})
  }
}

// If cancel button pressed, prevent page reload and redirect to Sign In page
handleCancel= (e) => {
  e.preventDefault();  
  window.location.href='/signin';
}

render() {
  const red = {
    color: 'red'
  };

    return (
        <div className="bounds">
          <div className="grid-33 grid-right pad-right">
            <h1>Sign Up</h1>
            <div className="validation-errors" style={red}>

              <ReactMarkdown source={this.state.error && this.state.error} />

            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                    <input id="firstName" 
                        name="firstName" 
                        type="text"
                        onChange={this.onChange} 
                        placeholder="First Name" 
                         />
                </div>
                <div>
                    <input id="lastName" 
                        name="lastName" 
                        type="text" 
                        onChange={this.onChange}
                        placeholder="Last Name" 
                         />
                </div>
                <div>
                    <input id="emailAddress" 
                        name="emailAddress" 
                        type="text" 
                        onChange={this.onChange}
                        placeholder="Email Address" 
                         />
                </div>
                <div>
                    <input id="password" 
                        name="password" 
                        type="password" 
                        onChange={this.onChange}
                        placeholder="Password" 
                         />
                </div>
                <div>
                    <input id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        onChange={this.onChange}
                        placeholder="Confirm Password" 
                         />
                </div>
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit" >Sign Up</button>
                    <button className="button button-secondary cancel-button" 
                    onClick={this.handleCancel}> Cancel </button>
                </div>
              </form>
            </div>
            {/* <p>&nbsp;</p> */}
            <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
          </div>

          <div className="z-ind pad-left">
            <h4 className="font-size-large grey"> You should definitely </h4>
            <h1 className="font-size-huge grey">Sign Up</h1>
            {/* <h1 className="font-size-huge z-ind-2 red-or title-2">New School</h1> */}
          </div>

          {/* <!-- The Modal --> */}
          <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close" onClick={spanOnclick}>&times;</span>
                    <p>Some text in the Modal..</p>
                </div>

            </div>

        </div>
    );
}
}