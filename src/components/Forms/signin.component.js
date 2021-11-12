import React, {Component} from 'react';
import './log.css';
import { Link } from 'react-router-dom';

export default class Signin extends Component{
    constructor(props) {
        super(props); 
        this.state = {
            signinUsername: "",
            signinPassword: "",
            authorize: false
        };
    }

    onUsernameChange = (event) => {
        this.setState({signinUsername: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value})
    }
  
    onSubmitSignin = () => {
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.signinUsername,
                password: this.state.signinPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                console.log(user);
                this.props.loadUsers(user);
                this.props.authorize(true);
                this.setState({authorize: true});
            }
            else
                alert("Enter valid username/password");
        })
        .catch(err => console.log(err));
    }

    verify = () =>{
        if(!this.state.authorize)
            alert("Please Verify before Sign In");
    }


    render() {
        return (
        <div className='Container'>
            <div className='FormWrap'>
                <div className='FormContent'>
                    <form className='form'>
                        <h1>Sign in to your account</h1>
                        <label>Username</label>
                        <input type="text" id="usr_name" required onChange={this.onUsernameChange}/> <br/>
                        <label>Password</label> 
                        <input type="password" id="usr_password" required onChange={this.onPasswordChange}/> <br/>
                        <a className='buttons' type="submit" value="Signin" onClick={this.onSubmitSignin} >Verify</a>
                        <Link to="/home" className="buttons" onClick={this.verify}>Sign In</Link>
                        <label>New User? Create a new account</label>
                        <Link to="/register" className='buttons' type="submit" value="Register">Register</Link>
                    </form>
                </div>
            </div>
        </div>
        );
      }
}