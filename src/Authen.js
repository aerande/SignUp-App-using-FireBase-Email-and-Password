import React,{Component} from 'react';
var firebase = require('firebase');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCAfa3OMb52YcDYAyOJ5RuzU-ECnNn6BJU",
    authDomain: "login-1adf5.firebaseapp.com",
    databaseURL: "https://login-1adf5.firebaseio.com",
    projectId: "login-1adf5",
    storageBucket: "login-1adf5.appspot.com",
    messagingSenderId: "8539407404"
  };
  firebase.initializeApp(config);

export default class Authen extends Component {


  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

   const auth = firebase.auth(auth);

   const promise = auth.signInWithEmailAndPassword(email,password);
   promise.then(user=> {
     console.log(user);
     var err = "gus gaye"
     var lout = document.getElementById('logout');
     lout.classList.remove('hide')
     this.setState({err})
   });

   promise.catch(e => {
     var err = e.message;
     alert(err);
     this.setState({err:err})
   });

}
  SignUp() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth(auth);

    const promise = auth.createUserWithEmailAndPassword(email,password);

    promise
    .then(user => {
      var err = "Welcome JI"+user.email;
      firebase.database().ref('users/'+user.uid).set({
        email:user.email
      });
      console.log(user)
      this.setState({err:err})
    });
    promise
    .catch(e => {
      var err = e.message;
      this.setState({err:err})
    });
  }

  logout(event) {
    firebase.auth().signOut;
    var err="Nikal liye g";
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
    this.setState({err});
  }
  constructor(props){
    super(props);

    this.state = {
      err:'',

    };
    this.login = this.login.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

    render() {
        return (
            <div>
              <input type="email" placeholder="Email daal bhai" id="email" ref="email"/> <br/>
              <input type="password" placeholder="password daal bhai" id="password" ref="password"/> <br/>
              <p>{this.state.err}</p>

              <button onClick = {this.login}>Login</button>
              <button onClick={this.SignUp}>SignUp</button>
              <button id="logout" className="hide" onClick={this.logout}>LogOut</button>

            </div>
        );
    }
}
