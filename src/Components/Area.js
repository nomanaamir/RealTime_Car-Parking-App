import React, { Component } from 'react';

import * as firebase from "firebase";
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
const slotsArray= [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]


class Area extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            timeTo: "",
            timeFrom: "",
            date: "",
            condition: false,
            slot: "",
            open: false,
            open2: false,
            futureDate: '',
            slotIndex: null,
            alreadyData: "",
            alreadyDataKeys: "",
            timeTo2: "",
            timeFrom2: "",
            date2: "",
            slot2: [],
            area2: "",
            userUid:"",
            open3: false,
            userName:"",
            futureTimeFrom:"",
            futureTimeTo:""
        }
    }
    componentDidMount() {
        this.setState({ name: this.props.match.params._uid })
        firebase.auth().onAuthStateChanged(user => {
            if(user){

            firebase.database().ref().child("area").on('value', ev => {
                // console.log(user.email)
                this.setState({userEmail: user.email})
                this.setState({userUid:user.uid})
                let data = ev.val();
                console.log('yahooooooooooooooo',data)
                if (data) {
                    this.setState({ alreadyData: Object.values(data), alreadyDataKeys: Object.keys(data) })
                    {
                        if(this.state.alreadyData){

                        this.state.alreadyData.map((val, ind) => {
                            console.log('51111111111',val.date)
                    //        if(!(val.date === this.state.date && val.timeFrom === this.state.timeFrom && val.timeTo === this.state.timeTo)){
                    //         slotsArray.splice(val.slot,1,false)
                    //         console.log( slotsArray.splice(val.slot,1,false))                        
                    // }else{
                            // slotsArray.splice(val.slot,1,true)
                        
                    // }
                            // slotsArray.splice(val.slot,1,true)
                            console.log(slotsArray)
                        })
                        }
                    }
                }
            })

            firebase.database().ref().child(`Users/${firebase.auth().currentUser.uid}`).on("value",ev=>{
                let data = ev.val()
                if(data){
                    this.setState({userName: data.name})
                }
            })
            }
        })
// console.log('eeeeeeeeeeeeeeeeeeeee',this.state.slot2)
    }

    timeFrom(event, date) {
        this.setState({futureTimeFrom : date})
        var date = date.toString()
        var time = date.slice(16, 21)
        console.log(date)
        console.log(time)
        this.state.timeFrom = time
        this.setState({ timeFrom: this.state.timeFrom , condition: false})

    };
    timeTo(event, date) {
        this.setState({futureTimeTo : date})
        var date = date.toString()
        var time = date.slice(16, 21)
        console.log(date)
        console.log(time)
        this.state.timeTo = time
        this.setState({ timeTo: this.state.timeTo ,condition: false})

    };
    date(event, date) {
        console.log('dafafaf', date)
        this.setState({ futureDate: date, condition: false })
        var date = date.toString()
        var datee = date.slice(3, 15)
        this.setState({ date: datee, condition: false })
        console.log(this.state.date)


    };
    submit() {
        if (this.state.date) {

            let currentDate = new Date()
            var currentDate2 = currentDate.getDate() +  + (currentDate.getMonth() + 1) +  + currentDate.getFullYear();
            var currentDate2 = String(currentDate2)
            let futureDate = this.state.futureDate;
            console.log('nnnnnnnnnnnnnnnnnnnn', futureDate)
            var futureDate2 = futureDate.getDate() +  + (futureDate.getMonth() + 1) +  + futureDate.getFullYear();
            var futureDate2 = String(futureDate2)
            console.log('nomannnnnn', futureDate2, currentDate2)
            let currentTimeFrom = new Date()
            var currentTimeFrom2 = currentTimeFrom.getHours() + ":" + currentTimeFrom.getMinutes();
            console.log(currentTimeFrom2)
            let futureTimeFrom = this.state.futureTimeFrom;
            var futureTimeFrom2 = futureTimeFrom.getHours() + ":" + futureTimeFrom.getMinutes();
            console.log(futureTimeFrom2)
            let currentTimeTo = new Date()
            var currentTimeTo2 = currentTimeTo.getHours() + ":" + currentTimeTo.getMinutes();
            console.log(currentTimeTo2)
            let futureTimeTo = this.state.futureTimeTo;
            var futureTimeTo2 = futureTimeTo.getHours() + ":" + futureTimeTo.getMinutes();
            console.log(futureTimeTo2)
            
            
        }

        if (!(this.state.name && this.state.date && this.state.timeFrom && this.state.timeTo)) {
            alert("All Input Fields Required")
            console.log(futureDate2 , currentDate2)
        } else if ( currentDate2 > futureDate2) {
            alert("Enter Future Date")
            console.log(futureDate2 , currentDate2)
            
        } else if((currentTimeFrom2 > futureTimeFrom2) ||(currentTimeTo2 > futureTimeTo2) || (futureTimeFrom2 === futureTimeTo2 )){
            alert("Enter Future Time")
        }
        else {
            firebase.database().ref().child("area").on("value",ev=>{
                console.log(ev.val())
                let data = ev.val()
                if(data){
                let a = Object.values(data)
                console.log(a)
                a.map((val,ind)=>{
                    console.log('dateeeeeeeeeeeee',val.date === this.state.date,val.date , this.state.date)
                    console.log('timeFrommmmmmmmmmmm',val.timeFrom === this.state.timeFrom,val.timeFrom , this.state.timeFrom)
                    console.log('timetooooooooooooo',val.timeTo === this.state.timeTo,val.timeTo , this.state.timeTo)
                        console.log('From Firebase',val.date , val.timeFrom , val.timeTo)
                        console.log('Present  ',this.state.date , this.state.timeFrom , this.state.timeTo)
                              
                              console.log("test >>>>1 ",(val.area , this.state.name))
                              console.log("test >>>>2 ",(val.date , this.state.date))
                              console.log("test >>>>3 ",val.area === this.state.name , val.date === this.state.date)
                              this.setState({slot2: val.slot,date2: val.date})
                              if (val.area === this.state.name && val.date === this.state.date) {

  if ((this.state.timeFrom <= val.timeFrom && this.state.timeTo >=  val.timeFrom)||(this.state.timeFrom >= val.timeFrom && this.state.timeFrom <= val.timeTo)) {
   slotsArray.splice(val.slot,1,true)
    this.setState({condition2:true})
   
  } else{
    slotsArray.splice(val.slot,1,false)
    
  }
  console.log(slotsArray)
                console.log(this.state.slotsArray2)
} else{
    slotsArray.splice(val.slot,1,false)    
}

                })
                }
            })
            console.log('oyeeeeeeeeeee',slotsArray)
            this.setState({ condition:  true })
        }
    

        

        // if(futureDate2 < currentDate2){
        //     console.log(futureDate2, currentDate2)
        //     alert("jo date apne daali wo choti hai")
        // }else{
        //     console.log(futureDate2, currentDate2)            
        //     alert("jo date apne daali wo badi hai")
        // }
            console.log('testttttttttttttttttttt.......',this.state.condition)
    }
    slot(ind) {
        // alert(ind)
        this.state.slot = ind
        this.setState({ slot: this.state.slot, open: true, slotIndex: ind })
        console.log('mmmmmmm',this.state.slot)
        console.log(this.state.alreadyData)
        console.log(this.state.slot2)        
    
    }

    booked() {
            firebase.database().ref().child("area").push({
                area: this.state.name,
                date: this.state.date,
                timeFrom: this.state.timeFrom,
                timeTo: this.state.timeTo,
                slot: this.state.slot,
                uid: this.state.userUid

            })
            this.setState({ open: false });
            // this.setState({condition2:true });            

            setTimeout(() => { this.setState({ open2: true }) }, 1000);
            setTimeout(() => { this.setState({ open2: false }) }, 2000);
        firebase.auth().onAuthStateChanged(user => {

            firebase.database().ref().child("area").on('value', ev => {
                console.log('dataaaaaaaaaaaaaaaaaaaaaaaaa',ev.val())
                let data = ev.val();
                console.log('yahooooooooooooooo',data)
                if (data) {
                    this.setState({ alreadyData: Object.values(data), alreadyDataKeys: Object.keys(data) })
                    {
                        if(this.state.alreadyData){

                        this.state.alreadyData.map((val, ind) => {
                            console.log('hyyyyyyyyyyyyyyyyyyy',val.slot === this.state.slot,val.timeFrom === this.state.timeFrom2)
            //   if(val.area === this.state.name && val.date === this.state.date) {
            //             console.log(val.date === this.state.date)
            //                 console.log(val.area === this.state.name)
            //                     if((this.state.timeFrom <= val.timeFrom && this.state.timeTo >=  val.timeFrom)||(this.state.timeFrom >= val.timeFrom && this.state.timeFrom <= val.timeTo)){
            //                         console.log('firebase',val.timeFrom === this.state.timeFrom)
            //                 slotsArray.splice(val.slot,1,true)
            //                 console.log( slotsArray.splice(val.slot,1,true))                        
                    
            //       }
            //     }else{
            //                 slotsArray.splice(val.slot,1,false)
                        
            //         } 
                        })
                        }
                    }
                }
            })

        })

    };
    handleClose() {
        this.setState({ open: false })
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
    back(){
        this.props.history.push("/Home")        
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleClose() }
                />,
            <FlatButton
                label="Booked"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.booked() }
                />,
        ];
        // console.log(this.state.timeFrom, this.state.timeTo)
        // console.log(this.state.condition)
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
                <Dialog
                    title={"Slot " + (this.state.slot + 1)}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    >
                    Are you sure to booked?
                </Dialog>
                <Snackbar
                    open={this.state.open2}
                    message={"Slot " + (this.state.slot + 1) + ' Successfully Booked'}
                    //   autoHideDuration={1700}
                    //   onRequestClose={this.handleRequestClose}
                    />
                <div className="header2">
                    <p style={{ fontSize: "30px", marginTop: "-4%", position: "absolute", marginLeft: "43%" }}>Parking App </p>
          <img src={require("./images/back.png")} onClick={()=>this.back()} style={{position: "absolute",marginLeft: "4%",marginTop: "-3.5%",cursor:"pointer"}} height="25px" width="35px"/>          <img style={{float:"right",marginTop:"-4.1%",marginRight: "4%",cursor:"pointer"}} height="45px" width="35px" onClick={this.handleToggle} src={require("./images/menu.png")}/>
                </div>
                <div  className="main2">
                    <div className="area2">
                        <br />
                        <center><h1>{this.state.name} Parking Booking</h1></center>
                        <br />
                        <center> <DatePicker hintText="Select Date"
                            onChange={this.date.bind(this) } mode="landscape" /></center>
                        <center> <TimePicker hintText="Time from"
                            hintText="Time From"
                            //    value={this.state.timeFrom}
                            onChange={this.timeFrom.bind(this) } minutesStep={5}/></center>
                        <center> <TimePicker hintText="Time to"
                            hintText="Time To"
                            //   value={this.state.timeTo}
                            onChange={this.timeTo.bind(this) } minutesStep={5}/></center>
                        <br /><br />
                        <center>  <button onClick={() => this.submit() } className="btn2">Submit</button></center>
                    </div>
                </div>

                {this.state.condition ?
                    <div style={{ textAlign: "center" }}>
                       {slotsArray.map((val,ind)=>{
                           if(slotsArray[ind] === true){
                                   return <RaisedButton style={{ margin: "10px" }} label={'Slot' + (ind + 1)} disabled={true} />
                           }
                           else{
                      
                               return  <RaisedButton onClick={() => this.slot(ind) } style={{ margin: "10px" }} label={'Slot ' + (1+ind)} primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
                            
                           }
                       })
                    }
                            
                    </div>
                    : null  }
                    
            </div>
        )
    }
}
export default Area;


// <RaisedButton onClick={() => this.slot('1', 1) } style={{ margin: "10px" }} label="Slot 1" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('2', 2) } style={{ margin: "10px" }} label="Slot 2" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton  onClick={() => this.slot('3', 3) } style={{ margin: "10px" }} label="Slot 3" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton  onClick={() => this.slot('4', 4) } style={{ margin: "10px" }} label="Slot 4" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('5', 5) } style={{ margin: "10px" }} label="Slot 5" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('6', 6) } style={{ margin: "10px" }} label="Slot 6" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('7', 7) } style={{ margin: "10px" }} label="Slot 7" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('8', 8) } style={{ margin: "10px" }} label="Slot 8" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('9', 9) } style={{ margin: "10px" }} label="Slot 9" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('10', 10) } style={{ margin: "10px" }} label="Slot 10" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('11', 11) } style={{ margin: "10px" }} label="Slot 11" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('12', 12) } style={{ margin: "10px" }} label="Slot 12" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('13', 13) } style={{ margin: "10px" }} label="Slot 13" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('14', 14) } style={{ margin: "10px" }} label="Slot 14" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>
//                         <RaisedButton onClick={() => this.slot('15', 15) } style={{ margin: "10px" }} label="Slot 15" primary={true} buttonStyle={{ backgroundColor: 'tomato' }}/>

  


