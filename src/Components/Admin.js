import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import * as firebase from "firebase";
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
       visibility: "hidden"
  },
  slide: {
    padding: 10,
  },
};
class Admin extends Component { 
  constructor(){
    super();
    this.state={
      open: false,
 slideIndex: 0,
 slots:[],
 slotKeys:[],
 feedBack:[],
 feedbackKeys:[],
 feedback22:"Not Updated Yet",
 userId:"",
 users:[],
 userUids:[],
     open2: false,
    }
  }
   handleChange(value){
    this.setState({
      slideIndex: value,
    });
  };
  componentWillMount(){
    firebase.database().ref().child("feedback").on("value", ev => {
      // console.log(ev.val()[0])
      // console.log(ev.val())      
      let data = ev.val()
      if(data){

      this.setState({feedBack: Object.values(data),feedbackKeys: Object.keys(data)})
      // console.log(this.state.feedbackKeys)
      }else{
        this.setState({feedBack:['Not Updated Yet']}) 
      }
    })
  }
  componentDidMount(){

    firebase.database().ref().child("area").on("value", ev => {
      console.log(ev.val())
      let data = ev.val()
      if(data){

      this.setState({slots: Object.values(data),slotKeys:Object.keys(data)})
      }else{
        this.setState({slots:["Not Booked slots yet"]})
        
        
      }
    })
    // firebase.database().ref().child("feedback").on("value", ev => {
    //   // console.log(ev.val()[0])
    //   // console.log(ev.val())      
    //   let data = ev.val()
    //   if(data){

    //   this.setState({feedBack: Object.values(data),feedbackKeys: Object.keys(data)})
    //   // console.log(this.state.feedbackKeys)
    //   }else{
    //     this.setState({feedBack:[]}) 
    //   }
    // })
    firebase.database().ref().child("Users").on("value",ev=>{
      // console.log(ev.val())
      let data = ev.val()
      if(data){
        this.setState({users: Object.values(data),userUids: Object.keys(data)})
      }else{
        this.setState({users:[]})
      }
    })
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  details(id){
    // alert(id2)
    // alert(email)    
       this.setState({userId: id}) 
       var open = true
    this.setState({open: open})
    // console.log(this.state.open)
  }
  dltSlot(ind){
    firebase.database().ref().child(`area/${this.state.slotKeys[ind]}`).remove()
  }
  dltFeed(ind){
    firebase.database().ref().child(`Users/${this.state.userUids[ind]}`).remove()

  }
  dltFeed2(ind){
    firebase.database().ref().child(`feedback/${this.state.feedbackKeys[ind]}`).remove()

  }
  // openAlert(){
  //   this.setState({open2: true})    
  // }
  // closeAlert(){
  //   this.setState({open2: false})
  // }
  logout(){
      firebase.auth().signOut();
    this.props.history.push("/")
  }
  render() {
    console.log(this.state.feedbackKeys)
     const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    //  const actions2 = [
    //   <FlatButton
    //     label="Delete User"
    //     primary={true}
    //   />,
    //   <FlatButton
    //     label="Delete FeedBack"
    //     primary={true}
    //     onClick={()=> this.dltFeed()}
    //   />,
    //    <FlatButton
    //     label="Cancel"
    //     primary={true}
    //     onClick={()=>this.closeAlert()}
    //   />,
    // ];
    return (
    <div>
     
    <div className="header2">
                   <p className="admin">ADMIN PANEL</p> <p style={{ fontSize: "30px", marginTop: "-4%", position: "absolute", marginLeft: "43%" }}>Parking App </p> <RaisedButton label="Log Out" onClick={()=>this.logout()} primary={true} buttonStyle={{backgroundColor:"black"}} style={{float:"right",marginTop:"-3.4%",marginRight:"2%"}} />
    </div>
    <div>

        <Tabs
        tabItemContainerStyle={{backgroundColor:"black"}}
          inkBarStyle={{backgroundColor:"rgba(255, 0, 0, 0.7)"}} 
          onChange={this.handleChange.bind(this)}
          value={this.state.slideIndex}
        >
          <Tab label="FeedBack" value={0} />
          <Tab label="All Slots" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange.bind(this)}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
           <List className="listss">
           <Dialog
          title="User FeedBack With Email"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
           autoScrollBodyContent={true}
        >
           <table className="tab">
                        <tr className="trr">                     
                          <th className="thh">User Email</th>
                          <th className="thh">User FeedBack</th>
                          <th className="thh">Action</th>                                                                              
                        </tr>
                        {this.state.feedBack.map((val,ind)=>{
                          console.log(this.state.userId)
                          console.log(this.state.feedbackKeys)
                          console.log( this.state.userUids[ind] === this.state.userId)
                          return(
                         val.uid === this.state.userId ?
                        <tr className="trr">                      
                          <td className="tdd">{val.email}</td>
                          <td className="tdd">{val.feedback}</td>
                          <td className="tdd"><img height="25px" width="25px" style={{cursor:"pointer"}} onClick={()=>this.dltFeed2(ind)} src={require("./images/dlt.png")}/></td>
                        </tr>
                          :null
                          )
                        })}
                      </table>
        </Dialog>
      <Subheader style={{color:"black",fontStyle:"italic",fontSize:"16px"}}>Users FeedBack</Subheader>
     
     { 
       this.state.users.map((val,ind) =>{
       return(
      <ListItem
     style={{borderRadius:"48px",backgroundColor:"#f8f8f8",margin:"10px"}}
        leftAvatar={<Avatar>{val.name[0]}</Avatar>}
        rightIcon={<img onClick={()=>this.dltFeed(ind)} src={require("./images/dlt.png")}/>}
        primaryText={val.name}
        secondaryText={<a style={{textDecoration: "none",color:"red"}} onClick={()=>this.details(this.state.userUids[ind])} href="#">Click To See FeedBack</a>}
      />
       )
    })
     }
    </List>
    
          </div>
          <div style={styles.slide}>
            { this.state.slots.map((val, ind) => {
                console.log("fafafafafafaf",val.uid)
                return (
                  (val.slot && val.date && val.timeFrom && val.timeTo)? 

                 <div className="area5">
                    <center><h2>{val.area}</h2></center>
                   <p style={{textAlign: "center",fontSize: "30px"}}>Slot {val.slot + 1} </p>
                   <p style={{textAlign: "center",fontSize: "20px"}}>{val.date}</p>
                   <p style={{textAlign: "center",fontSize: "20px"}}>From: {val.timeFrom} -- To: {val.timeTo}</p>
                   
              <div class="middle">
    <div class="text" onClick={()=>this.dltSlot(ind)}>Delete</div>
  </div>
                  </div>
                  
                 : <p style={{color: "red",textAlign: "center",marginTop: "10%",fontSize: "40px"}}>Not Booked Slots Yet</p>
                )
              })
              }
          </div>
         
        </SwipeableViews>
      </div>
    </div>
    );
  }
}

export default Admin;

//  <Dialog
    //       actions={actions2}
    //       modal={false}
    //       open={this.state.open2}
    //     >
    //       Discard draft?
    //     </Dialog>