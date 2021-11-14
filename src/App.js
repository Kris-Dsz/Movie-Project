import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Register from "./components/Forms/registration.component";
import Signin from "./components/Forms/signin.component";
import LaunchPage from "./components/launchpage.component";
import HomePage from "./components/homepage.component";
import MoviePage from "./components/moviepage.component"
class App extends React.Component {
  constructor(){
    super();
    this.state={
      isSignedin: false,  //CHANGE TO FALSE WHEN NOT DEVELOPING 
      user:{
        name: "",
        username: "",
        email: "",
        phone: ""
      },
      title: ""
    };
  }

  authorize = (authn) =>{
    if(authn)
      this.setState({isSignedin: true})
    else
      this.setState({isSignedin: false})
    console.log(this.state.isSignedin);
  }

  loadTitle = (data) => {
    console.log(data);
    this.setState({title:data});
  }

  loadUser = (data) => {
    console.log(data);
    this.setState({
      user:{
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone
      }
    });
    console.log(this.state.user);
  }
  render(){
    console.log(this.state.title);
    return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/"  element={<LaunchPage />}/>
          <Route path="/register" element={<Register authorize={this.authorize} loadUser={this.loadUser}/>}/>
          <Route path="/signin" element={<Signin authorize={this.authorize} loadUsers={this.loadUser} />}/>
          <Route path="/home" element={<HomePage isSignedin={this.state.isSignedin} user={this.state.user} loadTitle={this.loadTitle}/>}/>
          <Route path="/movie" element={<MoviePage isSignedin={this.state.isSignedin} user={this.state.user} title={this.state.title}/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
