import React, { Component } from 'react';

 

export default class HomePage extends Component {
 constructor(props){
     super(props);
     this.state={
         
     };
 }   

    render() {
        const {user}=this.props;
        console.log(this.props);
        return (
            <div>
                <h3>Home Page</h3>
                
            </div>
        )
    }
}