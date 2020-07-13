import React, { Component } from 'react';

// import axios from 'axios'

// import POSTuser from '../action/POSTuser'

/** This component provides the "Sign In" screen by rendering a 
 * form that allows a user to sign using their existing account 
 * information. The component also renders a "Sign In" button that 
 * when clicked signs in the user and a "Cancel" button that returns 
 * the user to the default route (i.e. the list of courses). */

export default class UserSignIn extends Component {

constructor(props){
    super(props)
    this.state = {
        emailAddress: '',
        password: '',
    }
}
    
onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    
    console.log(
    this.setState({ [e.target.name]: e.target.value })
    );
}
    
handleSubmit= (e) => {
    e.preventDefault();
    
    let body = this.state;
    console.log(body.emailAddress)
    
    // const users = axios.get('http://localhost:5000/api/users', { auth: { body }})
    // console.log(users)

    this.props.getUser(body);

    // axios({	
    //   method: 'get',
    //   url: "http://localhost:5000/api/users", 
    //   auth:
    //         {
    //           username: `${body.emailAddress}`,
    //           password: `${body.password}`
    //         }
    // }).then(function(response){
    //   console.log(response.data);
    //   alert("Welcome " + response.data.firstName)
    // })

    // console.log(user)
    
    e.currentTarget.reset();
}

handleCancel= (e) => {
    alert("Cancel Clicked")
    e.preventDefault(); 
    // window.location.href='/';
    e.currentTarget.reset();
}

render() {
  
    return (

        <div className="bounds">
          <div className="grid-33 grid-right">
            <h1>Sign In</h1>
            <div>
              <form 
              onSubmit={this.handleSubmit}
              >
                <div>
                    <input id="emailAddress" 
                        name="emailAddress" 
                        type="text" 
                        onChange={this.onChange}
                        // className 
                        placeholder="Email Address" 
                         />
                </div>
                <div>
                    <input id="password" 
                        name="password" 
                        type="password" 
                        onChange={this.onChange}
                        // className 
                        placeholder="Password" 
                         />
                </div>
                <div className="grid-100 pad-bottom">
                    <button className="button sign-in-button" type="submit">Sign In</button>
                    <button className="button button-secondary cancel-button" 
                    onClick={this.handleCancel}> Cancel </button>
                </div>
                {/* <a className="button button-secondary" href="/" onClick={this.handleCancel}>Cancel</a>  */}
              </form> 
            </div>
            {/* <p>&nbsp;</p> */}
            <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
          
          </div>
        
          <div className="z-ind pad-left">
            <h4 className="font-size-large grey">Welcome to the </h4>
            <h1 className="font-size-huge grey">New School</h1>
            {/* <h1 className="font-size-huge z-ind-2 red-or title-2">New School</h1> */}
          </div>

        </div>
      );
    }
}