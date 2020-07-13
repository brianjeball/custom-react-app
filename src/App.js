// eslint-disable-next-line 
import React, { Component } from 'react';

// import './App.css';
import '../src/styles/global.css'

// eslint-disable-next-line 
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import axios from 'axios';
// import fetch from 'isomorphic-fetch'

import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';

import Button from './components/Button'

import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import RouteIsPrivate from './RouteIsPrivate';
import Header from './components/Header'
// eslint-disable-next-line
import NotFoundPage from './NotFoundPage'

import ErrorBoundary from './ErrorBoundary'

const PrivateRoute = ({ component: Component, ...rest }) => (
  // conditional rendering: 
  <Route {...rest}
  // if user exist... Render passed Component
    render={props =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        // else... Redirect to signin Page
        // <Redirect
        //   to={{
        //     pathname: "/signin",
        //     state: { from: props.location }
        //   }}
        // />
        <RouteIsPrivate />
      )
    }
  />
);

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: [],
      userPass: ''
    };
  }

  // called after component loaded to DOM
  componentDidMount() {
    // GETcourse(); // Check this

  }

  // function for fetching API 
  getUser = (body) => {

    axios({	
      method: 'get',
      url: "http://localhost:5000/api/users", 
      auth:
            {
              username: `${body.emailAddress}`,
              password: `${body.password}`
            }
    }).then(res => {

      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('password', body.password)
      
      this.setState({user: JSON.parse(localStorage.getItem('user'))})

      this.setState({userPass: localStorage.getItem('password')})
      window.location.href='/'

    })
  }

  signOut = () => {
    this.setState({user: []})
    this.setState({userPass: ''})
    localStorage.clear();
    window.location.href='/'
  }

  render() {
    return (
      <BrowserRouter>
      {/* <Switch> */}
        <div>

          <ErrorBoundary>
          
          <Route path="/" component={() => <Header signOut={this.signOut} user={this.state.user}/>} />

          <Route exact path="/" component={() => <Courses />} />
          <PrivateRoute exact path="/course/create" 
            component={() => <CreateCourse 
              user={this.state.user} 
              userPass={this.state.userPass}/>} 
          />
          <PrivateRoute exact path="/courses/:id/update" component={(props) => <UpdateCourse {...props} />} />
          <PrivateRoute exact path="/courses/:id" component={ (props) => <CourseDetail {...props} /> } />

          <Route exact path="/button" component={() => <Button />}/>

          <Route exact path="/signin" component={() => <UserSignIn getUser={this.getUser}/>} />
          <Route exact path="/signup" component={() => <UserSignUp />} />
          <PrivateRoute exact path="/signout" component={() => <UserSignOut />} />

          {/* <Route path="*" component={NotFoundPage} /> */}
          
          </ErrorBoundary>

        </div>
      {/* </Switch> */}
      </BrowserRouter>
    );
  }
}

export default App;
