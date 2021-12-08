import React,{Component} from "react";
import { Link } from "react-router-dom";
import "./food.styles.css";
export default class Food extends Component{
    constructor(props) {
        super(props); 
        this.state = {
            cart: [],   //Array of objects for user cart
            food: [],   //Array of Objects for food from DB
            cost: 0     //Total Cost of User Cart
        };
    }

    onConfirm=()=>{
        //Updating Transaction for User with Food Details including cost
        fetch('http://localhost:3000/transaction/food', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id: this.props.transaction_id,
                food: this.state.cart,
                cost: this.state.cost
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data);
            }
        })
        .catch(err => console.log(err));
    }

    UpdateValue=(cart,key,value) => {
        return cart.map(item => {
            var temp =Object.assign({},item);
            if(temp.name === key) {
                if(value)
                    temp.count+=1;
                else{
                    temp.count-=1;
                    if(temp.count==0)
                        return {};
                }
            }
            return temp;
        });
    }

    AddToCart = (key,value)=>{
        console.log("Key "+key+"Value "+value)
        let flag=0;
        this.state.cart.map(({name})=>{
            if(name.localeCompare(key)==0){
                flag=1;
            }
        })
        if(!flag){
            const arr={"name": key,"price": value,"count": 1};
            var newCart=this.state.cart.concat(arr);
            this.setState({
                cart: newCart
            })
            console.log(this.state.cart);
        }
        else{
            var newFood = this.UpdateValue(this.state.cart,key,1);
            this.setState({
                cart: newFood
            })
            console.log("Current Cart: ", this.state.cart);
        }
        this.state.cost+=value;
    }

    RemoveFromCart = (key,value)=>{
        let flag=0;
        this.state.cart.map(({name})=>{
            if(name.localeCompare(key)==0){
                flag=1;
            }
        })
        if(!flag){
            alert("Food Item has not been added to cart, Removal not possible");
            return;
        }
        else{
            var newFood = this.UpdateValue(this.state.cart,key,0).filter(value => Object.keys(value).length !== 0);
            this.setState({
                cart: newFood
            })
            this.state.cost-=value;
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/food/get', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data);
                this.setState({food: data});
                console.log(this.state.food);
            }
            else
                alert("Food not logged");
        })
        .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.cart);
        //console.log(this.state.food[0]?.img);
        return ( 
        <>
        <div className="Food-body">
            <h1>CHOOSE YOUR ADD-ONS!!!</h1>
            <div className="Food-Data"> 
                {this.state.food?.map(({name,price,img}) =>
                    <div className='Food-Container'>
                    <article className="Food-Banner">
                            <img className="banner" src={`${img}`}/>
                            <div className="Food-Text">
                                <h3>{name}</h3>
                                <p>
                                    ₹ {price}
                                </p>
                                <button className="Food-Add" onClick={()=>this.AddToCart(name,price)} >Add</button>
                                <button className="Food-Remove" onClick={()=>this.RemoveFromCart(name,price)}>Remove</button>
                            </div>
                    </article>
                </div>
                )}
            </div>
        <span>........</span>
        <div className="food-booking-container">
            <div className="food-booking-summary">
                    <p/>
                    <span className="food-key food-summary">Food Booking Summary</span>
                    <p/>
                    {this.state.cart?.map(({name,price,count}) => 
                            <div className="Food-Final">
                                <span className="food-key">Item: </span>
                                <span className="food-value">{name}</span>
                                <br/>
                                <span className="food-key">Price: </span>
                                <span className="food-value">₹ {price}</span>
                                <span className="food-key">Quantity: </span>
                                <span className="food-value">{count}</span>
                                <br/>
                                <span className="food-key">Cost: </span>
                                <span className="food-value">₹ {price*count}</span>
                                <p/>
                            </div>
        
                            
                    )}
                    <span className="food-key">Total Cost: </span>
                    <span className="food-value">₹ {this.state.cost}</span>
                    <Link to={'/stripe'} style={{ textDecoration: 'none' }} onClick={this.onConfirm} className='food-booking'>
                            <span >Proceed to Payment</span>
                    </Link> 
                </div>
            </div>
         
        </div>
        </>
        )
      }
}