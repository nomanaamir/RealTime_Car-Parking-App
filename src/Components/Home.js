import React, { Component } from 'react';
import * as firebase from "firebase";
import RaisedButton from 'material-ui/RaisedButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
   underlineStyle: {
    borderColor: "black",
  },
  slide: {
    padding: 10,
  },
};
class Home extends Component {
  constructor() {
    super();
    this.state = {
      parkingArea: 6,
      slotsData: [],
      slideIndex: 1,
      userId:"",
      open3: false,
      userName:"",
      feedBack:"",
      slotsKeys:[]
    }
  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };



  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({userEmail: user.email})
        this.setState({userId:firebase.auth().currentUser.uid})
        console.log(this.state.userId)
        firebase.database().ref().child("area").on("value", ev => {
          console.log(ev.val())
          let data = ev.val()
          if (data) {

            this.setState({ slotsData: Object.values(data), slotsKeys: Object.keys(data) })
            // console.log(this.state.slotsData)

          }else{
            this.setState({slotsData:['Not Booked Slots Yet']})
          }
        })
      }
       firebase.database().ref().child(`Users/${this.state.userId}`).on("value",ev=>{
                console.log(ev.val())
                let data = ev.val()
                if(data){
                    this.setState({userName: data.name})
                }
            })
    })
       
  }

  goToARea = (name) => {
    this.props.history.push(`/Area/${name}`)
  }
  dlt(ind){
    // console.log(this.state.slotsKeys[ind])
    firebase.database().ref().child(`area/${this.state.slotsKeys[ind]}`).remove()
  }
  handleToggle = () => this.setState({open3: !this.state.open3});
    closeMenu(){
        this.setState({open3:false})
    }
    logout(){
        this.props.history.push("/")         
       firebase.auth().signOut();
        this.props.history.push("/")   
    }
    feedback(ev){
      this.setState({feedBack: ev.target.value})
    }
    sendFeedback(){
      firebase.database().ref().child(`feedback`).push({feedback: this.state.feedBack,name: this.state.userName,email: this.state.userEmail,uid: this.state.userId})
       this.setState({feedBack: ""})
    }
  render() {
    return (
      <div>
      <div>
        <Drawer containerStyle={{backgroundColor:"rgba(255, 0, 0, 0.7)"}} width={235} openSecondary={true} open={this.state.open3} >
          <AppBar style={{backgroundColor:"black"}} onClick={()=>this.closeMenu()} title="Profile" />
        <center><p style={{visibility: "hidden"}}>{this.state.userName}</p></center>
          <center><p style={{visibility: "hidden"}}>{this.state.userEmail}</p></center>
           <p style={{marginLeft:"8px",fontWeight:"bold"}}>Name: {this.state.userName}</p>
          <p style={{marginLeft:"8px",marginTop:"30px",fontWeight:"bold",borderBottom: "2px dashed black",paddingBottom: "32px"}}>Email: {this.state.userEmail}</p>
          <center> <RaisedButton label="Log Out" onClick={()=>this.logout()} primary={true} buttonStyle={{backgroundColor:"black"}} style={{marginTop: "15.5%"}} /></center>                
        </Drawer>
      </div>
        <div className="header2">
          <p style={{ fontSize: "30px", marginTop: "-4%", position: "absolute", marginLeft: "43%" }}>Parking App</p>        <img style={{float:"right",marginTop:"-4.1%",marginRight: "4%",cursor:"pointer"}} height="45px" width="35px" onClick={this.handleToggle} src={require("./images/menu.png")}/>
        </div>
        <div>
          <Tabs tabItemContainerStyle={{backgroundColor:"black"}}
          inkBarStyle={{backgroundColor:"rgba(255, 0, 0, 0.7)"}} 
            onChange={this.handleChange}
            value={this.state.slideIndex}
            >
            <Tab label="My Bookings" value={0} />
            <Tab label="Booking Areas" value={1} />
            <Tab label="Feedback" value={2} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
            >
            <div style={styles.headline}>
              { this.state.slotsData.map((val, ind) => {
                console.log('nahiiiiiiiiiiiiiiiii',this.state.userId,val.uid)
                return (
                this.state.userId === val.uid ?
                  <div key={ind.toString()} className="area3">
                    <center><h4>{val.area}</h4></center>
                   <p style={{textAlign: "center",fontSize: "30px"}}>Slot {val.slot + 1} </p>
                   <p style={{textAlign: "center",fontSize: "20px"}}>{val.date}</p>
                   <p style={{textAlign: "center",fontSize: "20px"}}>From: {val.timeFrom} -- To: {val.timeTo}</p>
                   
              <div class="middle">
    <div class="text" onClick={()=>this.dlt(ind)}>Delete</div>
  </div>
                  </div>
                : <p style={{color: "red",textAlign: "center",marginTop: "10%",fontSize: "40px"}}>Not Booked Slots Yet</p>
                )
              })
              }
                  
                              
            </div>
            <div style={styles.slide}>
              <div className="main">
                <div className="area">
                  <center> <h1 style={{ color: "#323232" }}>1</h1></center>
                  <center> <h2>Tariq Road</h2></center>
                  <br /><br />
                  <center>  <button onClick={() => this.goToARea('Tariq-Road') } className="btn">BOOKING</button></center>
                </div>
                <div className="area">
                  <center> <h1 style={{ color: "#323232" }}>2</h1></center>
                  <center> <h2>Saddar</h2></center>
                  <br /><br />
                  <center>  <button onClick={() => this.goToARea('Saddar') } className="btn">BOOKING</button></center>
                </div>
                <div className="area">
                  <center> <h1 style={{ color: "#323232" }}>3</h1></center>
                  <center> <h2>Gulshan</h2></center>
                  <br /><br />
                  <center>  <button onClick={() => this.goToARea('Gulshan') } className="btn">BOOKING</button></center>
                </div>
              </div>
            </div>
            <div style={styles.slide}>
           <div className="area4">
                  <center><p style={{position: "absolute",width: "18%",marginLeft: "7.5%",fontSize: "24px"}}>Send Your Feedback</p></center>
                  <br />
                  <br />
                  <br />
                  <br />                                                      
                   <center style={{marginTop:"3%"}}><TextField
      hintText="Your Feedback"
      hintStyle={{color:"black"}}
      onChange={this.feedback.bind(this)}
      underlineFocusStyle={styles.underlineStyle}
      value={this.state.feedBack}
    /></center>
    <br />
    <br />
    <center>    
     <RaisedButton
      backgroundColor="white"
      label="Send"
      labelPosition="before"
      icon={<img height="35px" width="35px" src={require("./images/send2.png")}/>}
      onClick={()=>this.sendFeedback()}
    />
    </center>
                </div>
            </div>
          </SwipeableViews>
        </div>
      </div>
    )
  }
}
export default Home;

