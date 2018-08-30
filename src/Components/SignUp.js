import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';

class SignUp extends Component{
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            pass:"",
            email2:"",
            namee:"Please Login"
        }
    }
    name(ev){
        this.setState({name: ev.target.value})
    }
    email(ev){
        this.setState({email: ev.target.value})
    }
    password(ev){
        this.setState({pass: ev.target.value})
    }
    
    signUp(){
        if(this.state.name === ""){
            alert("All Fields Required!")
        }else{

        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass)
        .then(ev=>{

          firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref().child(`Users/${ev.uid}`).set({name:this.state.name,uid: ev.uid})
            this.props.history.push("/Home")
})
        })
        .catch(ev=> alert(ev.message))
        }
    }
     signIn(){
         console.log(this.state.email2)
         if(this.state.email === "admin123@admin.com" && this.state.pass === "admin123"){
             this.props.history.push("/Admin")
         }else{

        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(ev=>{
         this.props.history.push("/Home")
         firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).on("value",ev=>{
             if(!ev.val()){

                     firebase.auth().currentUser.delete()
                     .then(alert("User Deleted By Admin"))
         this.props.history.push("/")
             }
         })

            })
             
    
        .catch(ev=> alert(ev.message))
         }

        
    }
 
    onItemClick(event) {
document.getElementById("exm").style.transform = 'perspective( 600px ) rotateY( -180deg )';
document.getElementById("exm1").style.transform = 'perspective( 600px ) rotateY( 0deg )';
this.setState({namee: event})

}
    onItemClick1(event) {
document.getElementById("exm").style.transform = 'perspective( 600px ) rotateY( 0deg )';
document.getElementById("exm1").style.transform = 'perspective( 600px ) rotateY( -180deg )';
this.setState({namee: event})

}
    
render(){
    console.log('yeahhhhhhhhhhhhhhhh',this.state.namee)
    return(
        <div className="formm">   
        <div className="header">
        <p style={{float:"left",position:"absolute",marginLeft:"45%",marginTop:"-4%",fontSize:"30px"}}>Parking App</p> <p className="state">{this.state.namee}</p>
        </div>
        <RaisedButton label="Sign Up" onClick={()=>this.onItemClick("Create Your Account")} primary={true} buttonStyle={{backgroundColor:'red'}} style={{marginLeft:"5%",marginTop:"11%",position:"absolute"}}/>
        <div class="back" id="exm1">
       <form className="formm2">
 <p>
        <br />        
        <input type="text" className="field" placeholder="User Name:" onChange={this.name.bind(this)}/></p>

        <p>
        <br />        
        <input type="email" className="field" placeholder="Email:" onChange={this.email.bind(this)}/></p>
        
        <p>   
        <br />             
        <input type="password" className="field" placeholder="Password:" onChange={this.password.bind(this)}/></p>
        <br />
        <RaisedButton label="Sign Up" onClick={()=>this.signUp()} primary={true} buttonStyle={{backgroundColor:'#999999'}} labelColor="#FFA500" />
        
        </form>
        </div>
        <RaisedButton label="Sign In"  onClick={()=>this.onItemClick1("Please Login")} buttonStyle={{backgroundColor:'#FFFFFF'}} labelColor="red" style={{marginLeft:"-43%",marginTop:"29%",position:"absolute"}}/>        
         <div class="front" id="exm">
       
        <form className="formm2">
 <p>
        <br />        
        <input type="text" className="field4" placeholder="User Name:" onChange={this.name.bind(this)}/></p>

        <p>
        <br />        
        <input type="email" className="field" placeholder="Email:" onChange={this.email.bind(this)}/></p>
        
        <p>   
        <br />             
        <input type="password" className="field" placeholder="Password:" onChange={this.password.bind(this)}/></p>
        <br />
        <RaisedButton label="Sign In" onClick={()=>this.signIn()} primary={true} buttonStyle={{backgroundColor:'#999999'}} labelColor="#FFA500" />
        
        </form>
        </div>
        </div>
       
    )
}
}

export default SignUp;