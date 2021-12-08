import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";

import Navbar from "./components/NavBars/navbar.component";
import Register from "./components/Forms/registration.component";
import Signin from "./components/Forms/signin.component";
import HomePage from "./components/Homepage/homepage.component";
import MoviePage from "./components/Movies/moviepage.component";
import ShowTimings from "./components/Timings/showtimings.component";
import Booking from "./components/Booking/booking.component";
import Summary from "./components/Summary/summary.component";
import UserTransaction from "./components/Summary/usertransaction.component";
import Stripe from "./components/Payment/StripeContainer";
import Food from "./components/Food/food.component";
import Footer from "./components/NavBars/Footer";
import Contact from "./components/ContactUs/Contact"
import AboutUs from "./components/AboutUs/AboutUs"
class App extends React.Component {
  constructor(){
    super();
    this.state={
      isSignedin: false,  
      user:{
        name: "",
        username: "",
        email: "",
        phone: ""
      },
      title: "",
      timing_id: "",
      date: new Date(),
      transaction_id: ""      
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

  loadTimingid = (data) => {
    console.log(data);
    this.setState({timing_id:data});
  }
  loadDate = (data) => {
    console.log(data);
    this.setState({date:data});
  }

  loadTransactionid = (data) => {
    this.setState({transaction_id:data});
    console.log("Transaction ID logged : "+this.state.transaction_id);
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
    console.log(this.state.timing_id);
    console.log(this.state.date);
    console.log("Transaction ID "+this.state.transaction_id)
    return (
      <Router>
        <Navbar isSignedin={this.state.isSignedin} authorize={this.authorize}/>
        <Routes>
           <Route path="/"element={<Navigate to="/home"/>}></Route>
          <Route path="/register" element={<Register authorize={this.authorize} loadUser={this.loadUser}/>}/>
          <Route path="/signin" element={<Signin authorize={this.authorize} loadUsers={this.loadUser} />}/>
          <Route path="/home" element={<HomePage isSignedin={this.state.isSignedin} user={this.state.user} loadTitle={this.loadTitle}/>}/>
          <Route path="/movie" element={<MoviePage isSignedin={this.state.isSignedin} user={this.state.user} title={this.state.title}/>}/>
          <Route path="/timing" element={<ShowTimings isSignedin={this.state.isSignedin} 
            user={this.state.user} title={this.state.title} loadTimingid={this.loadTimingid} loadDate={this.loadDate}/>}/>
          <Route path="/book" element={<Booking isSignedin={this.state.isSignedin} loadTransactionid ={this.loadTransactionid}
            user={this.state.user} title={this.state.title} timing_id={this.state.timing_id} date={this.state.date} />}/>
            <Route path="/stripe" element={<Stripe  transaction_id ={this.state.transaction_id} user={this.state.user}  />}/>
           <Route path="/summary" element={<Summary isSignedin={this.state.isSignedin} title={this.state.title} 
           timing_id={this.state.timing_id} transaction_id ={this.state.transaction_id} user={this.state.user}/>}/>
          <Route path="/userTransaction" element={<UserTransaction isSignedin={this.state.isSignedin} user={this.state.user}/>}/>
         <Route path="/food" element ={<Food transaction_id ={this.state.transaction_id} />}/>
         <Route path="/contactus" element={<Contact/>} />
         <Route path="/aboutus" element={<AboutUs/>} />
        </Routes>
      <Footer/>
      </Router>
    );
  }
}

export default App;
