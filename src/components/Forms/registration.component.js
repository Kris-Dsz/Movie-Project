import React, {Component} from 'react';
import './log.css';
import { Link } from 'react-router-dom';

export default class Register extends Component{
    constructor(props) {
        super(props); 
        this.state = {
            name: '',
            username:'',
            password:'',
            email:'',
            phone:'',
            accountCreated: false
        }
    }

    onInputChange=(event)=>{
      const val=event.target.value;
      const id=event.target.id;
      this.setState({[id]:val});
  }
  
  onRegister=()=>{
    fetch('http://localhost:3000/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name:this.state.name,
            username:this.state.username,
            password:this.state.password,
            email:this.state.email,
            phone:this.state.phone
        })
    })
    .then(response=>response.json())
    .then(user=>{
        if(user){
            console.log(user);
            console.log(this.state.accountCreated);
            this.props.loadUser(user);
            this.props.authorize(true);
            this.setState({accountCreated: true});
        }
    })
    .catch(err=>console.log(err))
    }
    goToLogin = () =>{
        if(this.state.accountCreated){
            alert("Account created"); 
        }     
    }


    render() {
        return (
          <div className='Container'>
                <div className='FormWrap'>
                    <div className='FormContent'>
                        <form className='form'>
                            <h1>Register Yourself</h1>
                            <label>Full Name</label>
                            <input type="text" id="name" value={this.state.name} onChange={this.onInputChange} required />
                            <label>Phone Number</label>
                            <input type="text" id="phone" value={this.state.phone} onChange={this.onInputChange} required />
                            <label>Email</label>
                            <input id="email" value={this.state.email} onChange={this.onInputChange} type="email" />
                            <label>Username</label>
                            <input type="text" id="username" value={this.state.username} onChange={this.onInputChange} required />
                            <label>Password</label>
                            <input type="password" id="password" value={this.state.password} onChange={this.onInputChange} required />
                            <label>Confirm Password</label>
                            <input type="password" id="confirmPassword" required />
                            <a className='buttons' type="submit" value="Register" onClick={this.onRegister}>I accept the T&Cs</a>
                            <Link to="/home" className='buttons' type="submit" value="Register" onClick={this.goToLogin}>Register</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
      }
}